import type { Role } from "../types/user.ts";

const KEY = "nw_session";

export function setSession(role: Role) {
  localStorage.setItem(KEY, role);
}

export function getSession(): Role | null {
  return (localStorage.getItem(KEY) as Role) || null;
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
