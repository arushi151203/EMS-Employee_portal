import { useSyncExternalStore } from "react";
const KEY = "nexus.role";
const AUTH_KEY = "nexus.authed";
const listeners = /* @__PURE__ */ new Set();
function read() {
  if (typeof window === "undefined") return "employee";
  const v = window.localStorage.getItem(KEY);
  return v === "hr" || v === "admin" ? v : "employee";
}
function setRole(role) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, role);
  window.localStorage.setItem(AUTH_KEY, "1");
  listeners.forEach((l) => l());
}
function getRole() {
  return read();
}
function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}
function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
  listeners.forEach((l) => l());
}
function useRole() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => "employee"
  );
}
const roleLabels = {
  employee: "Employee",
  hr: "HR Manager",
  admin: "Administrator"
};
export {
  getRole,
  isAuthenticated,
  logout,
  roleLabels,
  setRole,
  useRole
};
