import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/auth",
});

export const signup = (payload) => API.post("/signup", payload);

export const login = (email, password) => API.post("/login", { email, password });

export const forgotPassword = (email) => API.post("/forgot-password", { email });

export const verifyOtp = (email, otp) => API.post("/verify-otp", { email, otp });

export const sendLoginOtp = (email) => API.post("/send-login-otp", { email });

export const verifyLoginOtp = (email, otp) => API.post("/verify-login-otp", { email, otp });

export const resetPassword = (email, otp, newPassword) =>
  API.post("/reset-password", { email, otp, newPassword });