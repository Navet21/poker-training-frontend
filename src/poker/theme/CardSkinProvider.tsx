import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CardSkin } from "./card-skin.type";
import { CardSkinContext } from "./cardSkinContext";

export function CardSkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkin] = useState<CardSkin>("flat");

  const value = useMemo(
    () => ({
      skin,
      setSkin,
      toggle: () => setSkin((prev) => (prev === "flat" ? "classic" : "flat")),
    }),
    [skin],
  );

  return (
    <CardSkinContext.Provider value={value}>
      {children}
    </CardSkinContext.Provider>
  );
}
