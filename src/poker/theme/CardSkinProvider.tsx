import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CardSkin } from "./card-skin.type";
import { CardSkinContext } from "./cardSkinContext";

const STORAGE_KEY = "pokertrainer.cardSkin";

function readInitialSkin(): CardSkin {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === "classic" || raw === "flat" ? raw : "flat";
}

export function CardSkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkin] = useState<CardSkin>(() => readInitialSkin());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, skin);
  }, [skin]);

  const value = useMemo(
    () => ({
      skin,
      setSkin,
      toggle: () => setSkin((prev) => (prev === "flat" ? "classic" : "flat")),
    }),
    [skin],
  );

  return <CardSkinContext.Provider value={value}>{children}</CardSkinContext.Provider>;
}
