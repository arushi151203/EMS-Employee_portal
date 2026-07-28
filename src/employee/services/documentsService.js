import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/documents",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMyDocuments = () => API.get("");

export const getEmployeeDocuments = (employeeId) => API.get(`/employee/${employeeId}`);

export const uploadDocument = (formData) =>
  API.post("", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteDocument = (id) => API.delete(`/${id}`);

export const FILE_BASE_URL = "http://localhost:5000";