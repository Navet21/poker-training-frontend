import type { Street } from "../../types";

import type {
  TrainingOutsAnswerDto,
  TrainingOutsSessionInitDto,
} from "../contracts/outs.dto";


import type { OutsSession } from "../../domain/outs/outs.session";

import { mapOutsAnswerDtoToDomain } from "../mappers/outs.mapper";
import { mapOutsSessionInitDtoToDomain } from "../mappers/outsSession.mapper";
import type { OutsAnswer } from "../../domain/outs/out.types";




const API_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:3000")
  : "/api";


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

export async function createOutsTrainingSession(): Promise<OutsSession> {
  const res = await fetch(`${API_URL}/training/outs/session`, { method: "POST" });
  const dto = await handleResponse<TrainingOutsSessionInitDto>(res);
  return mapOutsSessionInitDtoToDomain(dto);
}



export async function answerOutsTrainingSession(
  sessionId: string,
  payload: { street: Street; outs: number },
): Promise<OutsAnswer> {
  const res = await fetch(`${API_URL}/training/outs/session/${sessionId}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const dto = await handleResponse<TrainingOutsAnswerDto>(res);
  return mapOutsAnswerDtoToDomain(dto);
}
