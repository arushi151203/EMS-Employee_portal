const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  updateBreak,
  getTodayAttendance,
  getAttendanceHistory,
  getCalendarData,
} = require("../controller/attendanceController");

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.put("/break", updateBreak);

router.get("/today/:employeeId", getTodayAttendance);

router.get("/history/:employeeId", getAttendanceHistory);

router.get("/calendar/:employeeId", getCalendarData);

module.exports = router;