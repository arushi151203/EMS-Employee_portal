const express = require("express");
const cors = require("cors");

const attendanceRoutes = require("./controller/attendanceRoutes");
const authRoutes = require("./controller/authRoutes");
const leaveRoutes = require("./controller/leaveRoutes");
const hrOverviewRoutes = require("./controller/hrOverviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRoutes);
app.use("/auth", authRoutes);
app.use("/leave", leaveRoutes);
app.use("/hr-overview", hrOverviewRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});