# Nexus HR — Employee Management System

A full-featured, role-based HR management platform built with React (frontend) and Node.js/Express + MySQL (backend). Supports three portals — **Employee**, **HR**, and **Admin** — each with a dedicated set of modules and dashboards.

---

## 🛠️ Tech Stack

**Frontend:** React 18, React Router v6, Tailwind CSS v4, shadcn/ui (Base UI primitives), Recharts, Axios, Vite

**Backend:** Node.js, Express 5, MySQL (mysql2), JWT auth, bcrypt, Multer (file uploads), Nodemailer (OTP emails)

---

## ✅ What's Built

**Frontend** — All 3 portals (Employee, HR, Admin) are fully built out with every page, following the Figma design.

**Backend-connected modules** — these are fully wired to a live MySQL database via REST APIs:

- Authentication (Login, Signup, OTP, role-based approval flow)
- Attendance (check-in/out, calendar, history)
- Leave Management (apply, approve/reject, balance tracking)
- Profile (Personal, Employment, Skills, Emergency contact — full CRUD)
- Documents (upload, view, download — file storage via Multer)
- HR Overview Dashboard (live attendance/headcount data)
- Departments (full CRUD)

---

## 🔜 What's Left to Build

The following modules currently have complete UI but run on local/mock data instead of the database:

- Tasks
- Employee Payroll
- Performance (Employee & HR views)
- Training
- Chat
- Notifications
- HR Recruitment
- Admin panels (Analytics, User Management, Payroll, Reports, System Settings, Audit Logs)

Since the backend-connected modules already establish the pattern (service file → Express route → controller → MySQL), extending the remaining modules should follow the same structure. Suggested order:

1. Tasks, Notifications, Training — simplest, similar CRUD pattern to Leave
2. Payroll, Performance — read-heavy, moderate effort
3. Chat — needs WebSocket/polling for real-time updates
4. Admin Analytics — needs aggregation queries
5. HR Recruitment, remaining Admin panels

---
## 📁 Project Structure

```
src/
├── employee/       # Employee portal (pages, components, services)
├── hr/             # HR portal
├── admin/          # Admin portal
├── components/     # Shared UI components (shadcn-based)
└── lib/            # Auth, utils, shared store

backend/
├── controller/     # Route handlers + route definitions
├── middleware/      # Auth verification, role guards, file upload
├── uploads/         # Uploaded document storage
├── db.js            # MySQL connection pool
├── schema.sql       # Database schema
└── server.js        # Express app entry
```


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL server running locally

### 1. Database Setup
```bash
mysql -u root -p < backend/schema.sql
```
Optionally seed demo data:
```bash
node backend/seedDemoData.js
```

### 2. Backend
```bash
cd backend
npm install
# Create a .env file with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm start
```
Runs on `http://localhost:5000`

### 3. Frontend
```bash
npm install
npm run dev
```
Runs on `http://localhost:5173`

---

## 🔐 Demo Credentials
(after seeding demo data — password for all: `password123`)

| Role | Email |
|---|---|
| Employee | rahul.kapoor@nexus.io |
| HR | neha.verma@nexus.io |
| Admin | karan.mehta@nexus.io |