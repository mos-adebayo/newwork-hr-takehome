// Placeholder API layer. Replace with real backend endpoints.

import type { Feedback } from "../types/feedback.ts";
import type { AbsenceFormValues, AbsenceRequest } from "../types/absence.ts";
import type { Employee } from "../types/employee.ts";
import { OpenAI } from "openai";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let EMPLOYEE: Employee = {
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

const FEEDBACK: Feedback[] = [
  {
    id: "f1",
    author: "Chris",
    message: "Great collaborator on the Q3 launch",
    createdAt: new Date().toISOString(),
  },
];

const ABSENCES: AbsenceRequest[] = [];

export async function fetchEmployee(): Promise<Employee> {
  await delay(200);
  return EMPLOYEE;
}

export async function updateEmployee(
  patch: Partial<Employee>,
): Promise<Employee> {
  await delay(200);
  EMPLOYEE = { ...EMPLOYEE, ...patch };
  return EMPLOYEE;
}

export async function listFeedback(): Promise<Feedback[]> {
  await delay(150);
  return FEEDBACK.slice().reverse();
}

export async function addFeedback(
  author: string,
  message: string,
  polished = false,
): Promise<Feedback> {
  await delay(150);
  const fb = {
    id: Math.random().toString(36).slice(2),
    author,
    message,
    polished,
    createdAt: new Date().toISOString(),
  };
  FEEDBACK.push(fb);
  return fb;
}

export async function polishFeedback(message: string): Promise<string> {
  // Simulate model call. Replace by backend route that proxies HuggingFace.
  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: `${import.meta.env.VITE_HF_API_KEY}`,
    dangerouslyAllowBrowser: true, // set temporarily because it is called from the browser
  });

  const prompt = `Polish the message in a professional tone:\n\n${message}\n\n**don't add any other info just the polished message**`;

  const chatCompletion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:together",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.choices[0].message.content || message;
}

export async function submitAbsence(
  req: AbsenceFormValues,
): Promise<AbsenceRequest> {
  await delay(200);
  const saved: AbsenceRequest = {
    id: Math.random().toString(36).slice(2),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...req,
  };
  ABSENCES.push(saved);

  return saved;
}

export async function listAbsences(): Promise<AbsenceRequest[]> {
  await delay(150);
  return ABSENCES.slice().reverse();
}
