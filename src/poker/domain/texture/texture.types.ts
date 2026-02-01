import type { BoardTexture, Street, Board } from "../../types";

export type TextureSession = {
  sessionId: string;
  street: Street;
  board: Board;
};

export type TextureAnswer = {
  verdict: "correct" | "incorrect";
  street: Street;

  // si fallas, qué era lo correcto
  correctTexture: BoardTexture;

  // texto educativo opcional
  helpText?: string;

  finished: boolean;

  next?: {
    street: Street;
    board: Board;
  };
};
