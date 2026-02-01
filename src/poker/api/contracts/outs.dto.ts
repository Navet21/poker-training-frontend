import type { Board, Street, BoardTexture } from "../../types";
import type { Card } from "../../types";

export type OutsComponentDto = {
  type:
    | "OVER_CARDS"
    | "FLUSH_DRAW"
    | "STRAIGHT_DRAW"
    | "BACKDOOR_STRAIGHT"
    | "BACKDOOR_FLUSH";
  outs: number;
  reason: string;
};


export type BoardFlagsDto = {
  pairedType: "none" | "paired" | "double_paired" | "trips";
  isPaired88Plus: boolean;
  flushState: "rainbow" | "two_tone" | "three_tone";
  straightPressure:
    | "none"
    | "two_card_straight_possible"
    | "one_card_straight_possible";
  texture: BoardTexture;
};

export type TrainingOutsAnswerDto = {
  correct: boolean;
  street: Street;

  hole: Card[];
  cards: Board;

  userOuts: number;
  correctOuts: number;

  components: OutsComponentDto[];
  explanation: string;

  meta: BoardFlagsDto;

  nextStreet?: Street;
  nextCards?: Board;
  finished: boolean;
};

export type TrainingOutsSessionInitDto = {
  sessionId: string;
  street: Street;
  hole: Card[];
  cards: Board;
};

