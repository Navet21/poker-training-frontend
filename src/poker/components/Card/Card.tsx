import type { Card } from "../../interfaces";


const SUIT_SYMBOL: Record<Card["suit"], string> = {
  S: "♠",
  H: "♥",
  D: "♦",
  C: "♣",
};

// Colores de fondo por palo
const SUIT_COLORS: Record<Card["suit"], string> = {
  H: "#e11d48", // corazones - rojo
  C: "#16a34a", // tréboles - verde
  S: "#020617", // picas - casi negro
  D: "#2563eb", // diamantes - azul
};

export function Card({ card }: { card: Card }) {
  const bg = SUIT_COLORS[card.suit];
  const symbol = SUIT_SYMBOL[card.suit];

  return (
    <div
      style={{
        width: "3.3rem",
        height: "4.6rem",
        borderRadius: "0.6rem",
        border: "2px solid rgba(15,23,42,0.9)",
        padding: "0.3rem",
        background: bg,
        boxShadow: "0 8px 18px rgba(0,0,0,0.6)",
        color: "#ffffff", // número y palo blancos
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: 700,
        fontSize: "1rem",
      }}
    >
      <div style={{ alignSelf: "flex-start", lineHeight: 1 }}>
        {card.rank}
      </div>
      <div style={{ fontSize: "1.2rem", lineHeight: 1 }}>{symbol}</div>
      <div style={{ alignSelf: "flex-end", transform: "rotate(180deg)", lineHeight: 1 }}>
        {card.rank}
      </div>
    </div>
  );
}
