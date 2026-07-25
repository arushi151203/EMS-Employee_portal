const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// ---------------- SIGNUP ----------------

exports.signup = async (req, res) => {

    const { employee_id, name, email, password, role } = req.body;

    if (!employee_id || !name || !email || !password) {
        return res.status(400).json({ message: "employee_id, name, email and password are required" });
    }

    const allowedRoles = ["employee", "hr", "admin"];
    const finalRole = allowedRoles.includes(role) ? role : "employee";

    db.query(
        "SELECT id FROM employees WHERE email=? OR employee_id=?",
        [email, employee_id],
        async (err, rows) => {
            if (err) {
                console.log("SIGNUP CHECK ERROR:", err);
                return res.status(500).json(err);
            }

            if (rows.length > 0) {
                return res.status(409).json({ message: "An account with this email or employee ID already exists" });
            }

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