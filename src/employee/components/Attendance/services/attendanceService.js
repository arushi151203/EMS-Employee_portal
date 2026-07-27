import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/attendance",
});

export const checkIn = (employee_id) =>
  API.post("/checkin", { employee_id });

export const checkOut = (employee_id) =>
  API.post("/checkout", { employee_id });

export const updateBreak = (employeeId, breakSeconds) =>
    API.put(`/break`, {
        employee_id: employeeId,
        break_seconds: breakSeconds,
    });

export const getToday = (employee_id) =>
  API.get(`/today/${employee_id}`);

export const getHistory = (employee_id) =>
  API.get(`/history/${employee_id}`);

export const getCalendar = (employeeId, month, year) => {
  return API.get(`/calendar/${employeeId}?month=${month}&year=${year}`);
};

export const getSummary = (employeeId) =>
  API.get(`/summary/${employeeId}`);