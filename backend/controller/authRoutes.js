const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  sendLoginOtp,
  verifyLoginOtp,
} = require("../controller/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/send-login-otp", sendLoginOtp);
router.post("/verify-login-otp", verifyLoginOtp);

module.exports = router;