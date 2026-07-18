const express = require("express");
const cors = require("cors");

const attendanceRoutes = require("./controller/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRoutes);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
