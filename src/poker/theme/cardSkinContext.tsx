import { createContext } from "react";
import type { CardSkin } from "./card-skin.type";

export type CardSkinCtx = {
  skin: CardSkin;
  setSkin: (s: CardSkin) => void;
  toggle: () => void;
};

export const CardSkinContext = createContext<CardSkinCtx | null>(null);
