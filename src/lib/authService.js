import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/auth",
});

// Attach the logged-in user's token automatically for protected endpoints
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (payload) => API.post("/signup", payload);

export const login = (email, password) => API.post("/login", { email, password });

export const forgotPassword = (email) => API.post("/forgot-password", { email });

export const verifyOtp = (email, otp) => API.post("/verify-otp", { email, otp });

export const sendLoginOtp = (email) => API.post("/send-login-otp", { email });

export const verifyLoginOtp = (email, otp) => API.post("/verify-login-otp", { email, otp });

export const resetPassword = (email, otp, newPassword) =>
  API.post("/reset-password", { email, otp, newPassword });

export const getPendingApprovals = () => API.get("/pending-approvals");

export const getAllEmployees = () => API.get("/employees");

export const reviewSignup = (id, decision) => API.post(`/review/${id}`, { decision });