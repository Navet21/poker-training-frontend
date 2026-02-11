import { useState } from "react";
import "./Glossary.css";

type GlossaryTerm = {
  term: string;
  definition: string;
  category: "general" | "texture" | "outs" | "positions";
};

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Board",
    definition: "Las cartas comunitarias que se reparten en la mesa y que todos los jugadores pueden usar.",
    category: "general",
  },
  {
    term: "Flop",
    definition: "Las primeras tres cartas comunitarias que se reparten simultáneamente después de la primera ronda de apuestas.",
    category: "general",
  },
  {
    term: "Turn",
    definition: "La cuarta carta comunitaria que se reparte después del flop.",
    category: "general",
  },
  {
    term: "River",
    definition: "La quinta y última carta comunitaria.",
    category: "general",
  },
  {
    term: "Street",
    definition: "Cada fase del juego: preflop, flop, turn y river.",
    category: "general",
  },

  // Texturas
  {
    term: "Textura del board",
    definition: "Características del board que determinan qué tipo de manos son más probables. Se clasifican según la conectividad y coordinación de las cartas.",
    category: "texture",
  },
  {
    term: "Board seco",
    definition: "Un board con cartas desconectadas donde es difícil ligar proyectos. Ejemplo: K♥ 7♣ 2♦",
    category: "texture",
  },
  {
    term: "Board semi-coordinado",
    definition: "Board con algunas posibilidades de proyectos pero no muy conectado. Ejemplo: Q♠ 9♥ 5♦",
    category: "texture",
  },
  {
    term: "Board coordinado",
    definition: "Board donde hay múltiples posibilidades de proyectos de color o escalera. Ejemplo: J♥ 10♥ 8♠",
    category: "texture",
  },
  {
    term: "Board súper coordinado",
    definition: "Board muy conectado donde hay muchas combinaciones posibles. Ejemplo: 9♠ 8♠ 7♦",
    category: "texture",
  },

  // Outs
  {
    term: "Outs",
    definition: "Cartas que quedan en el mazo que pueden mejorar tu mano para ganar el bote.",
    category: "outs",
  },
  {
    term: "Draw",
    definition: "Una mano que necesita mejorar para ganar, pero que tiene potencial (proyecto).",
    category: "outs",
  },
  {
    term: "Proyecto de color (Flush draw)",
    definition: "Cuando tienes 4 cartas del mismo palo y necesitas 1 más. Normalmente tienes 9 outs.",
    category: "outs",
  },
  {
    term: "Proyecto de escalera abierta (OESD)",
    definition: "Cuando puedes completar una escalera por ambos extremos. Normalmente tienes 8 outs. Ejemplo: tienes 9-8 y el board es 7-6.",
    category: "outs",
  },
  {
    term: "Gutshot",
    definition: "Proyecto de escalera por el medio (belly buster). Solo tienes 4 outs. Ejemplo: tienes 9-8 y el board es J-10.",
    category: "outs",
  },
  {
    term: "Overcards",
    definition: "Cartas en tu mano que son más altas que cualquier carta del board.",
    category: "outs",
  },

  // Posiciones
  {
    term: "Posición",
    definition: "Tu ubicación en la mesa relativa al botón. Actuar después de tus oponentes es una ventaja (posición).",
    category: "positions",
  },
  {
    term: "BTN (Botón)",
    definition: "La mejor posición en la mesa. Actúas último en todas las calles post-flop.",
    category: "positions",
  },
  {
    term: "SB (Small Blind)",
    definition: "Posición a la izquierda del botón. Pone una apuesta obligatoria pequeña antes de ver cartas.",
    category: "positions",
  },
  {
    term: "BB (Big Blind)",
    definition: "Posición a la izquierda del small blind. Pone una apuesta obligatoria mayor antes de ver cartas.",
    category: "positions",
  },
  {
    term: "UTG (Under The Gun)",
    definition: "Primera posición en actuar preflop. La peor posición.",
    category: "positions",
  },
];

const CATEGORIES = {
  general: "General",
  texture: "Texturas",
  outs: "Outs y Proyectos",
  positions: "Posiciones",
} as const;

const ITEMS_PER_PAGE = 6;

export function Glossary() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE);
  const paginatedTerms = filteredTerms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="glossary">
      <div className="glossary__intro">
        <h2>Glosario de Poker</h2>
        <p>Términos y conceptos básicos para ayudarte a entender mejor el juego.</p>
      </div>

      <div className="glossary__controls">
        <input
          type="text"
          className="glossary__search"
          placeholder="Buscar término..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="glossary__filters">
          <button
            className={`glossary__filter ${selectedCategory === "all" ? "glossary__filter--active" : ""}`}
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
          >
            Todos
          </button>
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((cat) => (
            <button
              key={cat}
              className={`glossary__filter ${selectedCategory === cat ? "glossary__filter--active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {CATEGORIES[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary__list">
        {filteredTerms.length === 0 ? (
          <p className="glossary__empty">No se encontraron términos.</p>
        ) : (
          <>
            {paginatedTerms.map((term, idx) => (
              <div key={`${term.term}-${idx}`} className="glossary__item">
                <div className="glossary__term-header">
                  <h3 className="glossary__term">{term.term}</h3>
                  <span className="glossary__category">{CATEGORIES[term.category]}</span>
                </div>
                <p className="glossary__definition">{term.definition}</p>
              </div>
            ))}
            {Array.from({ length: ITEMS_PER_PAGE - paginatedTerms.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="glossary__item glossary__item--placeholder" aria-hidden="true" />
            ))}
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="glossary__pagination">
          <button
            className="btn glossary__pagination-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="glossary__pagination-info">
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn glossary__pagination-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}