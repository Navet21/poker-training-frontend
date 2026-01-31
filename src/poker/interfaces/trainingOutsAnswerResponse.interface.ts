import type { Board, Street } from "../types";
import type { Card } from "./card.interface";

export interface OutsComponent {
  type: "OVER_CARDS" | "FLUSH_DRAW" | "STRAIGHT_DRAW";
  outs: number;
  reason: string;
}

export interface BoardFlags {
  pairedType: "none" | "paired" | "double_paired" | "trips";
  isPaired88Plus: boolean;
  flushState: "rainbow" | "two_tone" | "three_tone";
  straightPressure: "none" | "two_card_straight_possible" | "one_card_straight_possible";
  texture: "dry" | "semi_coordinated" | "coordinated" | "super_coordinated";
}

export interface TrainingOutsAnswerResponse {
  correct: boolean;
  street: Street;

  hole: Card[];
  cards: Board;

  userOuts: number;
  correctOuts: number;

  components: OutsComponent[];
  explanation: string;

  meta: BoardFlags;

  nextStreet?: Street;
  nextCards?: Board;
  finished: boolean;
}
