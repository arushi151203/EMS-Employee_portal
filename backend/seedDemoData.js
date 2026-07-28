require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const MINIMAL_PDF = Buffer.from(
  "%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 150]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n5 0 obj<</Length 55>>stream\nBT /F1 18 Tf 20 80 Td (Sample Document) Tj ET\nendstream endobj\nxref\n0 6\n0000000000 65535 f \ntrailer<</Size 6/Root 1 0 R>>\nstartxref\n0\n%%EOF",
  "utf-8"
);

async function main() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ems_db",
    port: process.env.DB_PORT || 3306,
  });

  console.log("Connected to database. Seeding demo data...\n");

  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const [depts] = await db.query("SELECT id, name FROM departments");
  const deptId = (name) => depts.find((d) => d.name === name)?.id || null;

  const demoPassword = await bcrypt.hash("password123", 10);

  const people = [
    {
      employee_id: "EMP101",
      name: "Rahul Kapoor",
      email: "rahul.kapoor@nexus.io",
      role: "employee",
      department: "Engineering",
      designation: "Software Engineer",
      phone: "+91 98765 43210",
    },
    {
      employee_id: "EMP102",
      name: "Priya Sharma",
      email: "priya.sharma@nexus.io",
      role: "employee",
      department: "Marketing",
      designation: "Marketing Associate",
      phone: "+91 98765 43211",
    },
    {
      employee_id: "HR101",
      name: "Neha Verma",
      email: "neha.verma@nexus.io",
      role: "hr",
      department: "Human Resources",
      designation: "HR Manager",
      phone: "+91 98765 43212",
    },
    {
      employee_id: "ADM101",
      name: "Karan Mehta",
      email: "karan.mehta@nexus.io",
      role: "admin",
      department: "Operations",
      designation: "System Administrator",
      phone: "+91 98765 43213",
    },
  ];

  for (const p of people) {
    await db.query(
      `INSERT INTO employees (employee_id, name, email, password_hash, role, department_id, designation, phone, date_of_joining, status, approval_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, '2023-06-01', 'Active', 'Approved')
       ON DUPLICATE KEY UPDATE
         name=VALUES(name), password_hash=VALUES(password_hash), role=VALUES(role),
         department_id=VALUES(department_id), designation=VALUES(designation), phone=VALUES(phone),
         status='Active', approval_status='Approved'`,
      [p.employee_id, p.name, p.email, demoPassword, p.role, deptId(p.department), p.designation, p.phone]
    );
    console.log(`✓ Employee: ${p.name} (${p.email})`);
  }

  // Approve any existing pending accounts too (e.g. earlier demo seed)
  await db.query("UPDATE employees SET approval_status='Approved' WHERE approval_status='Pending'");

  // ---------------- Profile details ----------------
  const profileExtras = {
    EMP101: { dob: "1996-03-14", gender: "Male", city: "Bengaluru", state: "Karnataka", country: "India", employment_type: "Full Time", manager: "Neha Verma", work_location: "Bengaluru HQ" },
    EMP102: { dob: "1998-07-22", gender: "Female", city: "Mumbai", state: "Maharashtra", country: "India", employment_type: "Full Time", manager: "Neha Verma", work_location: "Mumbai Office" },
  };

  for (const [empId, d] of Object.entries(profileExtras)) {
    await db.query(
      `INSERT INTO employee_profile (employee_id, dob, gender, city, state, country, employment_type, manager, work_location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE dob=VALUES(dob), gender=VALUES(gender), city=VALUES(city), state=VALUES(state),
         country=VALUES(country), employment_type=VALUES(employment_type), manager=VALUES(manager), work_location=VALUES(work_location)`,
      [empId, d.dob, d.gender, d.city, d.state, d.country, d.employment_type, d.manager, d.work_location]
    );
  }
  console.log("✓ Profile details added");

  // ---------------- Attendance (last 7 workdays) ----------------
  await db.query("DELETE FROM attendance WHERE employee_id IN ('EMP101','EMP102')");

  const today = new Date();
  let daysAdded = 0;
  let offset = 0;
  while (daysAdded < 7) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    offset++;
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue; // skip weekends
    const dateStr = d.toISOString().slice(0, 10);

    for (const empId of ["EMP101", "EMP102"]) {
      const checkIn = new Date(`${dateStr}T09:${empId === "EMP101" ? "05" : "20"}:00`);
      const checkOut = new Date(`${dateStr}T18:${empId === "EMP101" ? "10" : "05"}:00`);
      const workingSeconds = Math.floor((checkOut - checkIn) / 1000) - 1800;
      await db.query(
        `INSERT INTO attendance (employee_id, attendance_date, check_in, check_out, break_seconds, working_seconds, status)
         VALUES (?, ?, ?, ?, 1800, ?, 'Present')`,
        [empId, dateStr, checkIn.toISOString().slice(0, 19).replace("T", " "), checkOut.toISOString().slice(0, 19).replace("T", " "), workingSeconds]
      );
    }
    daysAdded++;
  }
  console.log("✓ Attendance history added (last 7 workdays)");

  // ---------------- Leave requests ----------------
  await db.query("DELETE FROM leave_requests WHERE employee_id IN ('EMP101','EMP102')");

  const leaveRows = [
    ["EMP101", "Annual Leave", "2026-06-10", "2026-06-12", "Family trip", "Approved", "HR101"],
    ["EMP101", "Sick Leave", "2026-07-02", "2026-07-02", "Fever", "Approved", "HR101"],
    ["EMP102", "Casual Leave", "2026-08-05", "2026-08-06", "Personal work", "Pending", null],
  ];
  for (const row of leaveRows) {
    await db.query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status, reviewed_by, reviewed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ${row[5] === "Pending" ? "NULL" : "NOW()"})`,
      row
    );
  }
  console.log("✓ Leave requests added");

  // ---------------- Documents ----------------
  await db.query("DELETE FROM employee_documents WHERE employee_id IN ('EMP101','EMP102')");

  const docSets = [
    { empId: "EMP101", name: "Employment Contract.pdf", category: "contract" },
    { empId: "EMP101", name: "Offer Letter.pdf", category: "offer" },
    { empId: "EMP101", name: "June 2026 Payslip.pdf", category: "payslip" },
    { empId: "EMP102", name: "Employment Contract.pdf", category: "contract" },
    { empId: "EMP102", name: "NDA Agreement.pdf", category: "legal" },
  ];

  for (const doc of docSets) {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;
    fs.writeFileSync(path.join(uploadDir, filename), MINIMAL_PDF);
    await db.query(
      `INSERT INTO employee_documents (employee_id, document_name, file_path, file_size, category, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [doc.empId, doc.name, `/uploads/${filename}`, MINIMAL_PDF.length, doc.category, doc.empId]
    );
  }
  console.log("✓ Sample documents added");

  await db.end();

  console.log("\n=== Demo data seeded successfully ===\n");
  console.log("Login credentials (password for all: password123):");
  console.log("  Employee: rahul.kapoor@nexus.io");
  console.log("  Employee: priya.sharma@nexus.io");
  console.log("  HR:       neha.verma@nexus.io");
  console.log("  Admin:    karan.mehta@nexus.io");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});