import { getSession } from "../lib/auth.ts";
import { EMPLOYEE, MANAGER } from "./constant.ts";

export function canViewSensitiveData(): boolean {
  const role = getSession();
  return role === MANAGER || role === EMPLOYEE;
}
