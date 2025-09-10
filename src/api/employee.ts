// Placeholder API layer. Replace with real backend endpoints.
import type { Employee } from "../types/employee.ts";
import { EMPLOYEE_DATA } from "../utils/data.ts";
import { delayPromise } from "../utils/api.ts";

export async function fetchEmployee(): Promise<Employee> {
  await delayPromise(200);
  return EMPLOYEE_DATA;
}

export async function updateEmployee(
  patch: Partial<Employee>,
): Promise<Employee> {
  await delayPromise(200);
  return { ...EMPLOYEE_DATA, ...patch };
}
