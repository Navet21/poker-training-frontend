import type { BoardTexture, Street, Board } from "../../types";
export type OutsComponentKind =
  | "overcards"
  | "flush_draw"
  | "straight_draw"
  | "backdoor_straight"
  | "backdoor_flush";


export type OutsComponent = {
  kind: OutsComponentKind;
  outs: number;
  reason: string;
};

export type BoardFlags = {
  pairedType: "none" | "paired" | "double_paired" | "trips";
  isPaired88Plus: boolean;
  flushState: "rainbow" | "two_tone" | "three_tone";
  straightPressure: "none" | "two_card" | "one_card";
  texture: BoardTexture;
};

export type OutsAnswer = {
  verdict: "correct" | "incorrect";
  street: Street;

  userOuts: number;
  correctOuts: number;

  explanation: string;
  components: OutsComponent[];
  flags: BoardFlags;

  finished: boolean;

  next?: {
    street: Street;
    board: Board;
  };
};
