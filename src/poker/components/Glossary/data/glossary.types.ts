export type GlossaryCategory = "general" | "texture" | "outs" | "positions";

export type GlossaryTerm = {
  term: string;
  definition: string;
  category: GlossaryCategory;
};
