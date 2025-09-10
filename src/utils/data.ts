import type { Employee } from "../types/employee.ts";
import type { Feedback } from "../types/feedback.ts";
import type { AbsenceRequest } from "../types/absence.ts";

//  Employee data
export const EMPLOYEE_DATA: Employee = {
  id: "e1",
  name: "Alex Example",
  email: "alex@example.com",
  phone: "+49 170 000000",
  address: "Sample Str. 1, 10115 Berlin",
  department: "Engineering",
  title: "Product Engineer",
  salary: 90000,
  ssn: "DE-XX-XXXX",
};

//  Feedback data
export const FEEDBACK_DATA: Feedback[] = [
  {
    id: "f1",
    author: "Chris",
    message: "Great collaborator on the Q3 launch",
    createdAt: new Date().toISOString(),
  },
];

// Absences
export const ABSENCES_DATA: AbsenceRequest[] = [];
