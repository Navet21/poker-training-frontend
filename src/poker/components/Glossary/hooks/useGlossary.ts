import { useMemo, useState } from "react";
import type { GlossaryCategory, GlossaryTerm } from "../data/glossary.types";



type UseGlossaryOptions = {
  itemsPerPage?: number;
};

export function useGlossary(terms: GlossaryTerm[], options: UseGlossaryOptions = {}) {
  const itemsPerPage = options.itemsPerPage ?? 6;

  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTerms = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return terms.filter((t) => {
      const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
      const matchesSearch =
        q === "" ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [terms, selectedCategory, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredTerms.length / itemsPerPage));

  const paginatedTerms = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTerms.slice(start, start + itemsPerPage);
  }, [filteredTerms, currentPage, itemsPerPage]);

  const resetPage = () => setCurrentPage(1);

  if (currentPage > totalPages) setCurrentPage(totalPages);

  return {
    state: { selectedCategory, searchTerm, currentPage, totalPages, itemsPerPage },
    actions: {
      setSelectedCategory: (cat: GlossaryCategory | "all") => {
        setSelectedCategory(cat);
        resetPage();
      },
      setSearchTerm: (value: string) => {
        setSearchTerm(value);
        resetPage();
      },
      prevPage: () => setCurrentPage((p) => Math.max(1, p - 1)),
      nextPage: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
      setPage: setCurrentPage,
    },
    data: { filteredTerms, paginatedTerms },
  };
}
