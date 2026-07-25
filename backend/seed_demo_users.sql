USE ems_db;

-- Demo accounts matching the login page's role tabs.
-- These use real bcrypt hashes, so they work through the actual /auth/login endpoint.

INSERT IGNORE INTO employees (employee_id, name, email, password_hash, role, designation) VALUES
('EMP001', 'Demo Employee', 'employee.demo@nexus.io', '$2b$10$6PKcEib0YzFULOO1Mzh99uNBj6q2o9DvNK6RbKB/1swl/cgUEAs/u', 'employee', 'Software Engineer'),
('HR001',  'Demo HR Manager', 'hr.demo@nexus.io',       '$2b$10$23ncdIPkuUYQvEiGwYdHFOCz0xe8rrBVOfrucfY3xl0ofFN2cu9MG', 'hr',       'HR Manager'),
('ADM001', 'Demo Admin', 'admin.demo@nexus.io',          '$2b$10$ByVhpVFzW9yL6AkFIH/tG.L/k8nedFLL5petQKqHqJpL6HNBbZzX6', 'admin',    'System Administrator');

-- Passwords (for your reference only — never store plaintext like this in real systems):
-- employee.demo@nexus.io / password
-- hr.demo@nexus.io       / hrpass123
-- admin.demo@nexus.io    / adminpass123