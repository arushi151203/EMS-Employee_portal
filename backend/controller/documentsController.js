const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.uploadDocument = (req, res) => {
  const { document, status, expiry } = req.body;
  const employeeId = req.user.employee_id;

  if (!document || !req.file) {
    return res.status(400).json({ message: "Document name and file are required" });
  }

  const filePath = `/uploads/${req.file.filename}`;
  const fileSize = req.file.size;
  const finalStatus = ["Approved", "Pending", "Expired"].includes(status) ? status : "Pending";

  db.query(
    `INSERT INTO employee_documents (employee_id, document_name, file_path, file_size, status, expiry_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [employeeId, document, filePath, fileSize, finalStatus, expiry || null],
    (err, result) => {
      if (err) {
        console.log("UPLOAD DOCUMENT ERROR:", err);
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Document uploaded successfully", id: result.insertId });
    }
  );
};

exports.getMyDocuments = (req, res) => {
  const employeeId = req.user.employee_id;

  db.query(
    "SELECT * FROM employee_documents WHERE employee_id=? ORDER BY uploaded_at DESC",
    [employeeId],
    (err, rows) => {
      if (err) {
        console.log("GET DOCUMENTS ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(rows);
    }
  );
};

exports.deleteDocument = (req, res) => {
  const { id } = req.params;
  const employeeId = req.user.employee_id;

  db.query(
    "SELECT * FROM employee_documents WHERE id=? AND employee_id=?",
    [id, employeeId],
    (err, rows) => {
      if (err) {
        console.log("DELETE DOCUMENT LOOKUP ERROR:", err);
        return res.status(500).json(err);
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: "Document not found" });
      }

      const filePath = path.join(__dirname, "..", rows[0].file_path);

      db.query("DELETE FROM employee_documents WHERE id=?", [id], (err) => {
        if (err) {
          console.log("DELETE DOCUMENT ERROR:", err);
          return res.status(500).json(err);
        }
        fs.unlink(filePath, () => {}); // best-effort file cleanup
        res.json({ message: "Document deleted successfully" });
      });
    }
  );
};