import { useContext } from "react";
import { CardSkinContext } from "./cardSkinContext";

export function useCardSkin() {
  const ctx = useContext(CardSkinContext);
  if (!ctx) throw new Error("useCardSkin must be used within CardSkinProvider");
  return ctx;
}
