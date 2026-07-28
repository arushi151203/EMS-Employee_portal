const express = require("express");
const cors = require("cors");

const attendanceRoutes = require("./controller/attendanceRoutes");
const authRoutes = require("./controller/authRoutes");
const leaveRoutes = require("./controller/leaveRoutes");
const hrOverviewRoutes = require("./controller/hrOverviewRoutes");
const departmentsRoutes = require("./controller/departmentsRoutes");
const profileRoutes = require("./controller/profileRoutes");
const documentsRoutes = require("./controller/documentsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRoutes);
app.use("/auth", authRoutes);
app.use("/leave", leaveRoutes);
app.use("/hr-overview", hrOverviewRoutes);
app.use("/departments", departmentsRoutes);
app.use("/profile", profileRoutes);
app.use("/documents", documentsRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});