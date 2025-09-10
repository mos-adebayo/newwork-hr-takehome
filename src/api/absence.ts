// Placeholder API layer. Replace with real backend endpoints.
import type { AbsenceFormValues, AbsenceRequest } from "../types/absence.ts";
import { ABSENCES_DATA } from "../utils/data.ts";
import { delayPromise } from "../utils/api.ts";

export async function submitAbsence(
  req: AbsenceFormValues,
): Promise<AbsenceRequest> {
  await delayPromise(200);
  const saved: AbsenceRequest = {
    id: Math.random().toString(36).slice(2),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...req,
  };
  ABSENCES_DATA.push(saved);

  return saved;
}

export async function listAbsences(): Promise<AbsenceRequest[]> {
  await delayPromise(150);
  return ABSENCES_DATA;
}
