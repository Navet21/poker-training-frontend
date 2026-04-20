import "./Home.css";

type Props = {
  onSelect: (mode: "texture" | "outs" | "glossary") => void;
};

export function Home({ onSelect }: Props) {
  return (
    <section className="home">
      <div className="home-hero">
        <h1 className="home-title">BoardLab</h1>

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

        <button
          className="home-card"
          onClick={() => onSelect("glossary")}
        >
          <span className="home-card-title">📚 Glosario</span>
          <span className="home-card-desc">
            Términos y conceptos básicos para principiantes.
          </span>
        </button>

        <button
          className="home-card home-card--disabled"
          disabled
          aria-disabled="true"
          title="Próximamente"
        >
          <span className="home-card-title">💪 Fuerza de la mano</span>
          <span className="home-card-desc">
            Evalúa la fuerza relativa de tu mano según board y street.
          </span>
          <span className="home-card-soon">Próximamente</span>
        </button>
      </div>

      <div className="home-about">
        <p>
          Esta aplicación nace de mi dificultad para estudiar apuntes de forma tradicional.
          Leer teoría sin contexto real nunca me ha funcionado, así que decidí convertir el
          aprendizaje en algo interactivo: ver el board, tomar una decisión y recibir feedback
          inmediato, calle a calle sin tener necesidad de entrar a la mesas, puede servir como estudio o como herramienta de práctica.
        </p>

        <p>
          Este proyecto es solo un primer paso. Aún necesita muchas mejoras y ajustes,
          pero nace con la idea de aprender haciendo: ver situaciones reales, cometer errores
          y entender por qué una decisión es mejor que otra, street a street.
        </p>

        <p className="home-about-list-title">
          Próximas mejoras previstas:
        </p>

        <ul className="home-about-list">
          <li>Evaluación de la fuerza de la mano según board y street</li>
          <li>Sesiones de usuario para guardar progreso y estadísticas</li>
          <li>Nuevos modos de entrenamiento</li>
          <li>Mejoras visuales (skins de mesa, cartas, animaciones, etc.)</li>
        </ul>

        <p className="home-about-note">
          El proyecto está abierto a cualquier tipo de mejora, sugerencia o feedback.
        </p>
      </div>
    </section>    
  );
}