import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/leave",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const applyLeave = (payload) => API.post("/apply", payload);

export const getMyLeaves = (employeeId) => API.get(`/my/${employeeId}`);

export const getAllLeaves = () => API.get("/all");

export const reviewLeave = (id, decision) => API.post(`/review/${id}`, { decision });