// Placeholder API layer. Replace with real backend endpoints.

import type { Feedback } from "../types/feedback.ts";
import { OpenAI } from "openai";
import { FEEDBACK_DATA } from "../utils/data.ts";
import { delayPromise } from "../utils/api.ts";

export async function listFeedback(): Promise<Feedback[]> {
  await delayPromise(150);
  return FEEDBACK_DATA.slice();
}

export async function addFeedback(
  author: string,
  message: string,
  polished = false,
): Promise<Feedback> {
  await delayPromise(150);
  const fb = {
    id: Math.random().toString(36).slice(2),
    author,
    message,
    polished,
    createdAt: new Date().toISOString(),
  };
  FEEDBACK_DATA.push(fb);
  return fb;
}

export async function polishFeedback(message: string): Promise<string> {
  // Huggingface model call. Replace by backend route that proxies HuggingFace.
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
