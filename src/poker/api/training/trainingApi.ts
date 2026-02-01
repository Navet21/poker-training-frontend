import type { Street, BoardTexture } from "../../types";

import type {
  TrainingSessionInitDto,
  TrainingAnswerDto,
} from "../contracts/texture.dto";
import type { TextureSession, TextureAnswer } from "../../domain/texture/texture.types";
import {
  mapTextureSessionInitDtoToDomain,
  mapTextureAnswerDtoToDomain,
} from "../mappers/texture.mapper";
import type { TrainingSessionSummaryDto } from "../contracts/texture.dto";


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

export async function createTrainingSession(): Promise<TextureSession> {
  const res = await fetch(`${API_URL}/training/session`, {
    method: "POST",
  });

  const dto = await handleResponse<TrainingSessionInitDto>(res);
  return mapTextureSessionInitDtoToDomain(dto);
}

export async function answerTrainingSession(
  sessionId: string,
  payload: AnswerPayload,
): Promise<TextureAnswer> {
  const res = await fetch(`${API_URL}/training/session/${sessionId}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const dto = await handleResponse<TrainingAnswerDto>(res);
  return mapTextureAnswerDtoToDomain(dto);
}

export async function getTrainingSessionSummary(
  sessionId: string,
): Promise<TrainingSessionSummaryDto> {
  const res = await fetch(`${API_URL}/training/session/${sessionId}`);
  return handleResponse<TrainingSessionSummaryDto>(res);
}

