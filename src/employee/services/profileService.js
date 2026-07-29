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

export const getSkills = (employeeId) => API.get(`/${employeeId}/skills`);
export const addSkill = (employeeId, payload) => API.post(`/${employeeId}/skills`, payload);
export const updateSkill = (employeeId, skillId, payload) => API.put(`/${employeeId}/skills/${skillId}`, payload);
export const deleteSkill = (employeeId, skillId) => API.delete(`/${employeeId}/skills/${skillId}`);

export const getEmergencyContacts = (employeeId) => API.get(`/${employeeId}/emergency`);
export const saveEmergencyContacts = (employeeId, payload) => API.put(`/${employeeId}/emergency`, payload);