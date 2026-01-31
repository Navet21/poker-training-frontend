import { useState } from "react";
import {
  createTrainingSession,
  answerTrainingSession,
  getTrainingSessionSummary,
} from "../../api/training-/trainingApi";
import type {
  TrainingAnswerResponse,
  TrainingSessionSummaryResponse,
} from "../../interfaces";
import type { BoardTexture, Street, Board } from "../../types";
import { Card } from "../Card/Card";
import { PokerTable } from "../PokerTable/PokerTable";
import "./TextureTrainer.css";


const TEXTURE_LABELS: Record<BoardTexture, string> = {
  dry: "Seca",
  semi_coordinated: "Semi-coordinada",
  coordinated: "Coordinada",
  super_coordinated: "Súper coordinada",
};

export function TextureTrainer() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStreet, setCurrentStreet] = useState<Street | null>(null);
  const [currentCards, setCurrentCards] = useState<Board>([]);
  const [lastAnswer, setLastAnswer] = useState<TrainingAnswerResponse | null>(null);
  const [summary, setSummary] = useState<TrainingSessionSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setAnswering] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleNewSession() {
    try {
      setError("");
      setSummary(null);
      setLastAnswer(null);
      setLoading(true);

      const data = await createTrainingSession();
      setSessionId(data.sessionId);
      setCurrentStreet(data.street);
      setCurrentCards(data.cards);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Error al crear sesión";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTextureClick(texture: BoardTexture) {
    if (!sessionId || !currentStreet) return;
    console.log("[FRONT] sending answer", { sessionId, currentStreet, texture });

    try {
      setError("");
      setAnswering(true);

      const answer = await answerTrainingSession(sessionId, {
        street: currentStreet,
        texture,
      });

      setLastAnswer(answer);

      if (answer.finished) {
        const summaryData = await getTrainingSessionSummary(sessionId).catch(() => null);
        if (summaryData) setSummary(summaryData);
        setSessionId(null);
      } else {
        if (answer.nextStreet && answer.nextCards) {
          setCurrentStreet(answer.nextStreet);
          setCurrentCards(answer.nextCards);
        }
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Error al enviar la respuesta";
      setError(message);
    } finally {
      setAnswering(false);
    }
  }

  const fullBoard =
    summary?.streets.find((s) => s.street === "river")?.cards ?? currentCards;

  return (
    <div className="hand-container">
      <h2>Trainer: Textura</h2>

      <div className="controls">
        <button onClick={handleNewSession} disabled={loading || !!sessionId}>
          {loading ? "Creando sesión..." : "Nueva sesión"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {currentStreet && currentCards.length > 0 && (
        <>
          <h3>
            Street actual:{" "}
            <span style={{ textTransform: "capitalize" }}>{currentStreet}</span>
          </h3>

          <PokerTable boardCards={currentCards} />


          <p>¿Cómo describirías la textura de este board?</p>

          <div className="texture-buttons">
            {(Object.keys(TEXTURE_LABELS) as BoardTexture[]).map((tex) => (
              <button key={tex} onClick={() => handleTextureClick(tex)}>
                {TEXTURE_LABELS[tex]}
              </button>
            ))}
          </div>

          {lastAnswer && (
            <div className="answer-result">
              <p>
                Tu respuesta fue:{" "}
                <strong>
                  {lastAnswer.correct ? "CORRECTA ✅" : "INCORRECTA ❌"}
                </strong>
              </p>

              {!lastAnswer.correct && (
                <div>
                    {lastAnswer.helpText && <p className="help-text">{lastAnswer.helpText}</p>}
                    <p>
                    Textura correcta: <strong>{TEXTURE_LABELS[lastAnswer.correctTexture]}</strong>
                    </p>
                </div>
                )}


              {lastAnswer.finished && (
                <p>La sesión ha terminado. Puedes ver el resumen abajo.</p>
              )}
            </div>
          )}
        </>
      )}

      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>Resumen de la sesión</h3>

          <h4>Board completo</h4>
          <div className="table-wrapper">
            <div className="poker-table">
              <div className="community-row">
                {fullBoard.map((card, idx) => (
                  <Card key={idx} card={card} />
                ))}
              </div>
            </div>
          </div>

          <div className="streets-summary">
            {summary.streets.map((s) => (
              <div key={s.street} className="street-summary">
                <h4 style={{ textTransform: "capitalize" }}>{s.street}</h4>
                <div className="board-cards">
                  {s.cards.map((card, idx) => (
                    <Card key={idx} card={card} />
                  ))}
                </div>
                <p>
                  Textura: <strong>{TEXTURE_LABELS[s.texture]}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!currentStreet && !summary && !loading && (
        <p>Pulsa &quot;Nueva sesión&quot; para empezar a entrenar.</p>
      )}
    </div>
  );
}
