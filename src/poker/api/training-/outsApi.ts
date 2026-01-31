import type { Street } from "../../types";
import type {
  TrainingOutsSessionInitResponse,
  TrainingOutsAnswerResponse,
} from "../../interfaces";

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

export async function createOutsTrainingSession(): Promise<TrainingOutsSessionInitResponse> {
  const res = await fetch(`${API_URL}/training/outs/session`, { method: "POST" });
  return handleResponse(res);
}

export async function answerOutsTrainingSession(
  sessionId: string,
  payload: { street: Street; outs: number },
): Promise<TrainingOutsAnswerResponse> {
  const res = await fetch(`${API_URL}/training/outs/session/${sessionId}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}
