import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/auth",
});

export const signup = (payload) => API.post("/signup", payload);

export const login = (email, password) => API.post("/login", { email, password });