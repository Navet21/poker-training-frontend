import type { Street, Board, Card } from "../../types";


export type OutsSession = {
  sessionId: string;
  street: Street;
  hole: Card[];
  cards: Board;
};
