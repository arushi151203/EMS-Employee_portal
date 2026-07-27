import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/departments",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDepartments = () => API.get("/");

export const createDepartment = (payload) => API.post("/", payload);

export const updateDepartment = (id, payload) => API.put(`/${id}`, payload);