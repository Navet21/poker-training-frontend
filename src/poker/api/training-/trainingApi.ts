import type { TrainingSessionInitResponse, TrainingAnswerResponse, TrainingSessionSummaryResponse } from "../../interfaces";
import type { Street, BoardTexture } from "../../types";


export interface AnswerPayload {
  street: Street;
  texture: BoardTexture;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function createTrainingSession(): Promise<TrainingSessionInitResponse> {
  const res = await fetch(`${API_URL}/training/session`, {
    method: "POST",
  });
  const data = await handleResponse<TrainingSessionInitResponse>(res);
  console.log("[createTrainingSession] response:", data);
  return data;
}

export async function answerTrainingSession(
  sessionId: string,
  payload: AnswerPayload,
): Promise<TrainingAnswerResponse> {
  console.log("[answerTrainingSession] body:", payload);

  const res = await fetch(`${API_URL}/training/session/${sessionId}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await handleResponse<TrainingAnswerResponse>(res);
  console.log("[answerTrainingSession] response:", data);
  return data;
}

export async function getTrainingSessionSummary(
  sessionId: string,
): Promise<TrainingSessionSummaryResponse> {
  const res = await fetch(`${API_URL}/training/session/${sessionId}`);
  const data = await handleResponse<TrainingSessionSummaryResponse>(res);
  console.log("[getTrainingSessionSummary] response:", data);
  return data;
}
