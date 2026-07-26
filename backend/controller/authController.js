const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// ---------------- SIGNUP ----------------

exports.signup = async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    const allowedRoles = ["employee", "hr", "admin"];
    const finalRole = allowedRoles.includes(role) ? role : "employee";

    db.query(
        "SELECT id FROM employees WHERE email=?",
        [email],
        async (err, rows) => {
            if (err) {
                console.log("SIGNUP CHECK ERROR:", err);
                return res.status(500).json(err);
            }

            if (rows.length > 0) {
                return res.status(409).json({ message: "An account with this email already exists" });
            }

            const rolePrefix = { employee: "EMP", hr: "HR", admin: "ADM" }[finalRole];

            db.query(
                "SELECT employee_id FROM employees WHERE employee_id LIKE ? ORDER BY id DESC LIMIT 1",
                [`${rolePrefix}%`],
                async (err, prefixRows) => {
                    if (err) {
                        console.log("SIGNUP ID GEN ERROR:", err);
                        return res.status(500).json(err);
                    }

                    let nextNumber = 1;
                    if (prefixRows.length > 0) {
                        const lastId = prefixRows[0].employee_id;
                        const lastNumber = parseInt(lastId.replace(rolePrefix, ""), 10);
                        if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
                    }
                    const employee_id = `${rolePrefix}${String(nextNumber).padStart(3, "0")}`;

                    try {
                        const passwordHash = await bcrypt.hash(password, 10);

                        db.query(
                            `INSERT INTO employees (employee_id, name, email, password_hash, role)
                             VALUES (?, ?, ?, ?, ?)`,
                            [employee_id, name, email, passwordHash, finalRole],
                    (err, result) => {
                                if (err) {
                                    console.log("SIGNUP INSERT ERROR:", err);
                                    return res.status(500).json(err);
                                }

                                const user = { id: result.insertId, employee_id, name, email, role: finalRole };
                                const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

                                res.status(201).json({ message: "Account created successfully", token, user });
                            }
                        );
                    } catch (hashErr) {
                        console.log("SIGNUP HASH ERROR:", hashErr);
                        res.status(500).json({ message: "Something went wrong creating your account" });
                    }
                }
            );
        }
    );
};

// ---------------- LOGIN ----------------

exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query(
        "SELECT * FROM employees WHERE email=?",
        [email],
        async (err, rows) => {
            if (err) {
                console.log("LOGIN ERROR:", err);
                return res.status(500).json(err);
            }

            if (rows.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const employee = rows[0];

            try {
                const match = await bcrypt.compare(password, employee.password_hash);

                if (!match) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }

                const user = {
                    id: employee.id,
                    employee_id: employee.employee_id,
                    name: employee.name,
                    email: employee.email,
                    role: employee.role,
                };

                const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

                res.json({ message: "Login successful", token, user });

            } catch (compareErr) {
                console.log("LOGIN COMPARE ERROR:", compareErr);
                res.status(500).json({ message: "Something went wrong logging you in" });
            }
        }
    );
};

// ---------------- FORGOT PASSWORD: SEND OTP ----------------

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  db.query(
    "SELECT id FROM employees WHERE email=?",
    [email],
    async (err, rows) => {
      if (err) {
        console.log("FORGOT PASSWORD CHECK ERROR:", err);
        return res.status(500).json(err);
      }

      if (rows.length === 0) {
        return res.json({ message: "If that email exists, a code has been sent." });
      }

      const otpCode = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      db.query(
        "INSERT INTO password_resets (email, otp_code, expires_at, purpose) VALUES (?, ?, ?, 'reset')",
        [email, otpCode, expiresAt],
        async (err) => {
          if (err) {
            console.log("FORGOT PASSWORD INSERT ERROR:", err);
            return res.status(500).json(err);
          }

          try {
            await sendOtpEmail(email, otpCode, "reset");
            res.json({ message: "If that email exists, a code has been sent." });
          } catch (mailErr) {
            console.log("EMAIL SEND ERROR:", mailErr);
            res.status(500).json({ message: "Could not send email. Please try again." });
          }
        }
      );
    }
  );
};

// ---------------- FORGOT PASSWORD: VERIFY OTP ----------------

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  db.query(
    `SELECT * FROM password_resets
     WHERE email=? AND otp_code=? AND verified=0
     ORDER BY id DESC LIMIT 1`,
    [email, otp],
    (err, rows) => {
      if (err) {
        console.log("VERIFY OTP ERROR:", err);
        return res.status(500).json(err);
      }

      if (rows.length === 0) {
        return res.status(400).json({ message: "Incorrect or already-used code" });
      }

      const record = rows[0];

      if (new Date(record.expires_at) < new Date()) {
        return res.status(400).json({ message: "This code has expired. Please request a new one." });
      }

      db.query(
        "UPDATE password_resets SET verified=1 WHERE id=?",
        [record.id],
        (err) => {
          if (err) {
            console.log("VERIFY OTP UPDATE ERROR:", err);
            return res.status(500).json(err);
          }
          res.json({ message: "Code verified" });
        }
      );
    }
  );
};

// ---------------- FORGOT PASSWORD: RESET ----------------

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, code, and new password are required" });
  }

  if (newPassword.length < 4) {
    return res.status(400).json({ message: "Password must be at least 4 characters" });
  }

  db.query(
    `SELECT * FROM password_resets
     WHERE email=? AND otp_code=? AND verified=1
     ORDER BY id DESC LIMIT 1`,
    [email, otp],
    async (err, rows) => {
      if (err) {
        console.log("RESET PASSWORD CHECK ERROR:", err);
        return res.status(500).json(err);
      }

      if (rows.length === 0) {
        return res.status(400).json({ message: "Please verify your code again before resetting your password" });
      }

      try {
        const passwordHash = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE employees SET password_hash=? WHERE email=?",
          [passwordHash, email],
          (err) => {
            if (err) {
              console.log("RESET PASSWORD UPDATE ERROR:", err);
              return res.status(500).json(err);
            }
            res.json({ message: "Password updated successfully" });
          }
        );
      } catch (hashErr) {
        console.log("RESET PASSWORD HASH ERROR:", hashErr);
        res.status(500).json({ message: "Something went wrong resetting your password" });
      }
    }
  );
};

// ---------------- LOGIN: SEND OTP ----------------

exports.sendLoginOtp = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  db.query(
    "SELECT id FROM employees WHERE email=?",
    [email],
    async (err, rows) => {
      if (err) {
        console.log("SEND LOGIN OTP CHECK ERROR:", err);
        return res.status(500).json(err);
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: "No account found with that email" });
      }

      const otpCode = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      db.query(
        "INSERT INTO password_resets (email, otp_code, expires_at, purpose) VALUES (?, ?, ?, 'login')",
        [email, otpCode, expiresAt],
        async (err) => {
          if (err) {
            console.log("SEND LOGIN OTP INSERT ERROR:", err);
            return res.status(500).json(err);
          }

          try {
            await sendOtpEmail(email, otpCode, "login");
            res.json({ message: "Code sent to your email" });
          } catch (mailErr) {
            console.log("EMAIL SEND ERROR:", mailErr);
            res.status(500).json({ message: "Could not send email. Please try again." });
          }
        }
      );
    }
  );
};

// ---------------- LOGIN: VERIFY OTP ----------------

exports.verifyLoginOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  db.query(
    `SELECT * FROM password_resets
     WHERE email=? AND otp_code=? AND purpose='login' AND verified=0
     ORDER BY id DESC LIMIT 1`,
    [email, otp],
    (err, rows) => {
      if (err) {
        console.log("VERIFY LOGIN OTP ERROR:", err);
        return res.status(500).json(err);
      }

      if (rows.length === 0) {
        return res.status(400).json({ message: "Incorrect or already-used code" });
      }

      const record = rows[0];

      if (new Date(record.expires_at) < new Date()) {
        return res.status(400).json({ message: "This code has expired. Please request a new one." });
      }

      db.query("UPDATE password_resets SET verified=1 WHERE id=?", [record.id], (err) => {
        if (err) {
          console.log("VERIFY LOGIN OTP UPDATE ERROR:", err);
          return res.status(500).json(err);
        }

        db.query("SELECT * FROM employees WHERE email=?", [email], (err, empRows) => {
          if (err) return res.status(500).json(err);
          if (empRows.length === 0) return res.status(404).json({ message: "Account not found" });

          const employee = empRows[0];
          const user = {
            id: employee.id,
            employee_id: employee.employee_id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
          };
          const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

          res.json({ message: "Login successful", token, user });
        });
      });
    }
  );
};