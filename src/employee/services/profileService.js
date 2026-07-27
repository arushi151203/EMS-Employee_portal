import axios from "axios";
import { getToken } from "@/lib/auth";

const API = axios.create({
  baseURL: "http://localhost:5000/profile",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = (employeeId) => API.get(`/${employeeId}`);

export const updatePersonal = (employeeId, payload) =>
  API.put(`/${employeeId}/personal`, payload);

export const updateEmployment = (employeeId, payload) =>
  API.put(`/${employeeId}/employment`, payload);