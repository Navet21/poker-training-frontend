import type { Board, Card as CardType } from "../../types";
import { Card as CardView } from "../Card/Card";
import "./PokerTable.css";

type Props = {
  boardCards: Board;
  holeCards?: CardType[];
};

export function PokerTable({ boardCards, holeCards }: Props) {
  return (
    <div className="table-wrapper">
      <div className="poker-table">
        <div className="community-row">
          {boardCards.map((card, idx) => (
            <CardView key={idx} card={card} />
          ))}
        </div>

        {holeCards && holeCards.length > 0 && (
          <div className="hero-row hero-row--overlay">
            {holeCards.map((card, idx) => (
              <div
                key={idx}
                className={`hero-card ${idx === 1 ? "hero-card--overlap" : ""}`}
              >
                <CardView card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
