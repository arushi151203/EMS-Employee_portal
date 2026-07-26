const express = require("express");
const cors = require("cors");

const attendanceRoutes = require("./controller/attendanceRoutes");
const authRoutes = require("./controller/authRoutes");
const leaveRoutes = require("./controller/leaveRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRoutes);
app.use("/auth", authRoutes);
app.use("/leave", leaveRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});