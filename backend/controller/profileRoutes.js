const express = require("express");
const router = express.Router();

const { getProfile, updatePersonal, updateEmployment } = require("../controller/profileController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:employeeId", verifyToken, getProfile);
router.put("/:employeeId/personal", verifyToken, updatePersonal);
router.put("/:employeeId/employment", verifyToken, updateEmployment);

module.exports = router;