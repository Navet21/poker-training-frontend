import { CATEGORIES } from "./data/categories";
import { GLOSSARY_TERMS } from "./data/glossaryTerms";
import "./Glossary.css";
import { useGlossary } from "./hooks/useGlossary";


export function Glossary() {
  const { state, actions, data } = useGlossary(GLOSSARY_TERMS, { itemsPerPage: 6 });

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
          value={state.searchTerm}
          onChange={(e) => actions.setSearchTerm(e.target.value)}
        />

        <div className="glossary__filters">
          <button
            className={`glossary__filter ${state.selectedCategory === "all" ? "glossary__filter--active" : ""}`}
            onClick={() => actions.setSelectedCategory("all")}
          >
            Todos
          </button>

          {Object.entries(CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              className={`glossary__filter ${state.selectedCategory === key ? "glossary__filter--active" : ""}`}
              onClick={() => actions.setSelectedCategory(key as keyof typeof CATEGORIES)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary__list">
        {data.filteredTerms.length === 0 ? (
          <p className="glossary__empty">No se encontraron términos.</p>
        ) : (
          <>
            {data.paginatedTerms.map((t) => (
              <div key={t.term} className="glossary__item">
                <div className="glossary__term-header">
                  <h3 className="glossary__term">{t.term}</h3>
                  <span className="glossary__category">{CATEGORIES[t.category]}</span>
                </div>
                <p className="glossary__definition">{t.definition}</p>
              </div>
            ))}

            {Array.from({ length: state.itemsPerPage - data.paginatedTerms.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="glossary__item glossary__item--placeholder" aria-hidden="true" />
            ))}
          </>
        )}
      </div>

      {state.totalPages > 1 && (
        <div className="glossary__pagination">
          <button className="btn glossary__pagination-btn" onClick={actions.prevPage} disabled={state.currentPage === 1}>
            Anterior
          </button>

          <span className="glossary__pagination-info">
            {state.currentPage} / {state.totalPages}
          </span>

          <button
            className="btn glossary__pagination-btn"
            onClick={actions.nextPage}
            disabled={state.currentPage === state.totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
