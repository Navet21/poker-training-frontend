import type { BoardTexture, Street, Board } from "../../types";

export type TrainingSessionInitDto = {
  sessionId: string;
  street: Street;
  cards: Board;
};

export type TrainingAnswerDto = {
  correct: boolean;
  correctTexture: BoardTexture;
  street: Street;
  nextStreet?: Street;
  nextCards?: Board;
  finished: boolean;
  helpText?: string;
};

export type TrainingSessionSummaryDto = {
  sessionId: string;
  streets: Array<{
    street: Street;
    cards: Board;
    texture: BoardTexture;
  }>;
};
