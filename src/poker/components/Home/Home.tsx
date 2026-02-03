import "./Home.css";

type Props = {
  onSelect: (mode: "texture" | "outs") => void;
};

export function Home({ onSelect }: Props) {
  return (
    <section className="home">
      <div className="home-hero">
        <h1 className="home-title">Poker Trainer</h1>

        <p className="home-subtitle">
          Entrena lectura de boards y cálculo de outs con feedback real,
          street a street. Pensado para mejorar decisiones, no memorizar tablas.
        </p>
      </div>

      <div className="home-actions">
        <button
          className="home-card"
          onClick={() => onSelect("texture")}
        >
          <span className="home-card-title">🧠 Textura del board</span>
          <span className="home-card-desc">
            Aprende a clasificar boards y entender su impacto en rangos.
          </span>
        </button>

        <button
          className="home-card"
          onClick={() => onSelect("outs")}
        >
          <span className="home-card-title">🎯 Cálculo de outs</span>
          <span className="home-card-desc">
            Entrena outs ajustadas según textura, bloqueadores y backdoors.
          </span>
        </button>
      </div>
    </section>
  );
}
