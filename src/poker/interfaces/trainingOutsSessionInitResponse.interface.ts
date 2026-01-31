import type { Board, Street } from "../types";
import type { Card } from "./card.interface";

export interface TrainingOutsSessionInitResponse {
  sessionId: string;
  street: Street;
  hole: Card[];
  cards: Board;
}
