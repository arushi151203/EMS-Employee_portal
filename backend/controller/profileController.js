const db = require("../db");

// ---------------- GET PROFILE (merged employees + employee_profile) ----------------

exports.getProfile = (req, res) => {
  const { employeeId } = req.params;

  if (req.user.employee_id !== employeeId && !["hr", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "You can only view your own profile" });
  }

  db.query(
    `SELECT e.employee_id, e.name, e.email, e.phone, e.designation, e.date_of_joining, e.status,
            d.name AS department,
            p.dob, p.gender, p.address, p.city, p.state, p.zip_code, p.country,
            p.employment_type, p.manager, p.work_location
     FROM employees e
     LEFT JOIN departments d ON e.department_id = d.id
     LEFT JOIN employee_profile p ON p.employee_id = e.employee_id
     WHERE e.employee_id = ?`,
    [employeeId],
    (err, rows) => {
      if (err) {
        console.log("GET PROFILE ERROR:", err);
        return res.status(500).json(err);
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(rows[0]);
    }
  );
};

// ---------------- UPDATE PERSONAL INFO ----------------

exports.updatePersonal = (req, res) => {
  const { employeeId } = req.params;

  if (req.user.employee_id !== employeeId) {
    return res.status(403).json({ message: "You can only update your own profile" });
  }

  const { name, email, phone, dob, gender, address, city, state, zip_code, country } = req.body;

  db.query(
    "UPDATE employees SET name=?, email=?, phone=? WHERE employee_id=?",
    [name, email, phone, employeeId],
    (err) => {
      if (err) {
        console.log("UPDATE PERSONAL (employees) ERROR:", err);
        return res.status(500).json(err);
      }

      db.query(
        `INSERT INTO employee_profile (employee_id, dob, gender, address, city, state, zip_code, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           dob=VALUES(dob), gender=VALUES(gender), address=VALUES(address),
           city=VALUES(city), state=VALUES(state), zip_code=VALUES(zip_code), country=VALUES(country)`,
        [employeeId, dob || null, gender, address, city, state, zip_code, country],
        (err) => {
          if (err) {
            console.log("UPDATE PERSONAL (profile) ERROR:", err);
            return res.status(500).json(err);
          }
          res.json({ message: "Personal information saved!" });
        }
      );
    }
  );
};

// ---------------- UPDATE EMPLOYMENT INFO ----------------

exports.updateEmployment = (req, res) => {
  const { employeeId } = req.params;

  if (req.user.employee_id !== employeeId && !["hr", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "You don't have permission to update this" });
  }

  const { designation, department, employment_type, manager, date_of_joining, work_location, status } = req.body;

  db.query(
    "SELECT id FROM departments WHERE name=?",
    [department],
    (err, deptRows) => {
      if (err) {
        console.log("EMPLOYMENT DEPT LOOKUP ERROR:", err);
        return res.status(500).json(err);
      }

      const departmentId = deptRows.length > 0 ? deptRows[0].id : null;

      db.query(
        "UPDATE employees SET designation=?, department_id=?, date_of_joining=?, status=? WHERE employee_id=?",
        [designation, departmentId, date_of_joining || null, status, employeeId],
        (err) => {
          if (err) {
            console.log("UPDATE EMPLOYMENT (employees) ERROR:", err);
            return res.status(500).json(err);
          }

          db.query(
            `INSERT INTO employee_profile (employee_id, employment_type, manager, work_location)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               employment_type=VALUES(employment_type), manager=VALUES(manager), work_location=VALUES(work_location)`,
            [employeeId, employment_type, manager, work_location],
            (err) => {
              if (err) {
                console.log("UPDATE EMPLOYMENT (profile) ERROR:", err);
                return res.status(500).json(err);
              }
              res.json({ message: "Employment details saved!" });
            }
          );
        }
      );
    }
  );
};