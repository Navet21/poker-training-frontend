import type { Card as CardType } from "../../types";
import { useCardSkin } from "../../theme/useCardSkin";

import "./Card.css";
import "../../theme/skins/flat.css";
import "../../theme/skins/classic.css";

const SUIT_SYMBOL: Record<CardType["suit"], string> = {
  S: "♠",
  H: "♥",
  D: "♦",
  C: "♣",
};

const SUIT_CLASS: Record<CardType["suit"], string> = {
  S: "suit-spades",
  H: "suit-hearts",
  D: "suit-diamonds",
  C: "suit-clubs",
};

export function Card({ card }: { card: CardType }) {
  const { skin } = useCardSkin();
  const symbol = SUIT_SYMBOL[card.suit];

  return (
    <div className={`card card--${skin} ${SUIT_CLASS[card.suit]}`}>
      {/* Esquina superior izquierda */}
      <div className="card__corner card__corner--tl">
        <div className="card__rank">{card.rank}</div>
        <div className="card__suit">{symbol}</div>
      </div>

      {/* Centro */}
      <div className="card__center">
        <div className="card__suit card__suit--big">{symbol}</div>
      </div>

      {/* Esquina inferior derecha (rotada) */}
      <div className="card__corner card__corner--br">
        <div className="card__rank">{card.rank}</div>
        <div className="card__suit">{symbol}</div>
      </div>
    </div>
  );
}
