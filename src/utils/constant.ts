import type { Role } from "../types/user.ts";

export const MANAGER = "manager";
export const EMPLOYEE = "employee";
export const CO_WORKER = "coworker";

export const roles: Role[] = [MANAGER, EMPLOYEE, CO_WORKER];
