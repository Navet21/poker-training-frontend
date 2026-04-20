import type { GlossaryCategory } from "./glossary.types";




export const CATEGORIES: Record<GlossaryCategory, string> = {
  general: "General",
  texture: "Texturas",
  outs: "Outs y Proyectos",
  positions: "Posiciones",
} as const;
