
CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    attendance_date DATE NOT NULL,
    check_in DATETIME NULL,
    check_out DATETIME NULL,
    break_seconds INT DEFAULT 0,
    working_seconds INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Present',
    UNIQUE KEY unique_employee_day (employee_id, attendance_date)
);

-- Optional: quick test row so you can confirm the API works immediately
-- INSERT INTO attendance (employee_id, attendance_date, status) VALUES ('EMP001', CURDATE(), 'Present');