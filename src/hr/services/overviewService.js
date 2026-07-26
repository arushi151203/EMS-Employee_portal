import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/hr-overview",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSummary = () => API.get("/summary");

export const getAttendanceByDepartment = () => API.get("/attendance-by-department");

export const getHeadcountByDepartment = () => API.get("/headcount-by-department");

export const getPendingLeaves = () => API.get("/pending-leaves");