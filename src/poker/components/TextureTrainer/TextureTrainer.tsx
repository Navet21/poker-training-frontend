import { useState } from "react";
import {
  createTrainingSession,
  answerTrainingSession,
  getTrainingSessionSummary,
} from "../../api/training/trainingApi";
import type { TextureSession, TextureAnswer } from "../../domain/texture/texture.types";
import type { BoardTexture } from "../../types";
import { Card } from "../Card/Card";
import { PokerTable } from "../PokerTable/PokerTable";
import { FeedbackPanel } from "../FeedbackPanel/FeedbackPanel";
import "./TextureTrainer.css";
import type { TrainingSessionSummaryDto } from "../../api/contracts/texture.dto";
const TEXTURE_LABELS: Record<BoardTexture, string> = {
  dry: "Seca",
  semi_coordinated: "Semi-coordinada",
  coordinated: "Coordinada",
  super_coordinated: "Súper coordinada",
};

export function TextureTrainer() {
  const [session, setSession] = useState<TextureSession | null>(null);
  const [lastAnswer, setLastAnswer] = useState<TextureAnswer | null>(null);
  const [summary, setSummary] = useState<TrainingSessionSummaryDto | null>(null);
  const [lastPick, setLastPick] = useState<BoardTexture | null>(null);
  const [loading, setLoading] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [error, setError] = useState<string>("");
  const [pendingNext, setPendingNext] = useState<TextureSession | null>(null);
  const [awaitingSummary, setAwaitingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [finishedSessionId, setFinishedSessionId] = useState<string | null>(null);
  const [lastBoard, setLastBoard] = useState<TextureSession | null>(null);

  async function handleNewSession() {
    try {
      setError("");
      setSummary(null);
      setLastAnswer(null);
      setLastPick(null);
      setPendingNext(null);
      setAwaitingSummary(false);
      setShowSummary(false);
      setFinishedSessionId(null);
      setLastBoard(null);

      setLoading(true);
      const data = await createTrainingSession();
      setSession(data);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Error al crear sesión";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTextureClick(texture: BoardTexture) {
    if (!session) return;

    setLastPick(texture);

    try {
      setError("");
      setAnswering(true);

      const answer = await answerTrainingSession(session.sessionId, {
        street: session.street,
        texture,
      });

      setLastAnswer(answer);

      if (answer.finished) {
        setFinishedSessionId(session.sessionId);
        setLastBoard({ sessionId: session.sessionId, street: session.street, board: session.board });
        setAwaitingSummary(true);
        setSession(null);
        setPendingNext(null);
      } else if (answer.next) {
        setPendingNext({
          sessionId: session.sessionId,
          street: answer.next.street,
          board: answer.next.board,
        });
      }
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Error al enviar la respuesta";
      setError(message);
    } finally {
      setAnswering(false);
    }
  }

  function handleDealNext() {
    if (!pendingNext) return;
    setSession(pendingNext);
    setPendingNext(null);
    setLastAnswer(null);
    setLastPick(null);
  }

  async function handleRequestSummary() {
    if (!finishedSessionId) return;
    try {
      setError("");
      setLoading(true);
      const summaryData = await getTrainingSessionSummary(finishedSessionId);
      setSummary(summaryData);
      setShowSummary(true);
      setAwaitingSummary(false);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Error al obtener el resumen";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const fullBoard =
    summary?.streets.find((s) => s.street === "river")?.cards ??
    session?.board ??
    [];

  const nextStreetLabel = pendingNext?.street
    ? `Pedir ${pendingNext.street.charAt(0).toUpperCase()}${pendingNext.street.slice(
        1
      )}`
    : "Pedir carta";

  return (
    <div className="hand-container">
      {error && <p className="error">{error}</p>}
      
      {!session && !summary && !awaitingSummary && (
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary btn-start"
            onClick={handleNewSession}
            disabled={loading}
          >
            {loading ? "Creating session..." : "Start"}
          </button>
        </div>
      )}

      {session && session.board.length > 0 && (
        <>
          <h3>
            Street actual:{" "}
            <span style={{ textTransform: "capitalize" }}>{session.street}</span>
          </h3>

          <div className="table-zone table-zone--controls">
            <button
              className="btn table-action"
              onClick={handleNewSession}
              disabled={loading}
              type="button"
              title="Nueva mano"
            >
              ↻ Nueva mano
            </button>

            <PokerTable boardCards={session.board} />
          </div>

          <p>¿Cómo describirías la textura de este board?</p>

          <div className="texture-buttons">
            {(Object.keys(TEXTURE_LABELS) as BoardTexture[]).map((tex) => (
              <button
                key={tex}
                type="button"
                className="texture-btn"
                onClick={() => handleTextureClick(tex)}
                disabled={answering || !!lastAnswer}
              >
                {TEXTURE_LABELS[tex]}
              </button>
            ))}
          </div>

          {lastAnswer && !summary && (
            <>
              <FeedbackPanel
                verdict={lastAnswer.verdict}
                primary={{
                  label: "Tu respuesta",
                  value: lastPick ? TEXTURE_LABELS[lastPick] : "—",
                }}
                secondary={{
                  label: "Correcta",
                  value: TEXTURE_LABELS[lastAnswer.correctTexture],
                }}
                explanation={lastAnswer.helpText}
              />

              {pendingNext && (
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-start"
                    onClick={handleDealNext}
                  >
                    {nextStreetLabel}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {awaitingSummary && !summary && lastAnswer && lastBoard && (
        <div style={{ marginTop: 20 }}>
          <h3>
            Street actual:{" "}
            <span style={{ textTransform: "capitalize" }}>{lastBoard.street}</span>
          </h3>

          <div className="table-zone">
            <PokerTable boardCards={lastBoard.board} />
          </div>

          <FeedbackPanel
            verdict={lastAnswer.verdict}
            primary={{
              label: "Tu respuesta",
              value: lastPick ? TEXTURE_LABELS[lastPick] : "—",
            }}
            secondary={{
              label: "Correcta",
              value: TEXTURE_LABELS[lastAnswer.correctTexture],
            }}
            explanation={lastAnswer.helpText}
          />

          <div className="actions" style={{ marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-primary btn-start"
              onClick={handleRequestSummary}
              disabled={loading}
            >
              {loading ? "Cargando resumen..." : "Ver resumen de la sesión"}
            </button>
            <button
              type="button"
              className="btn btn-start"
              onClick={handleNewSession}
              disabled={loading}
            >
              Nueva sesión
            </button>
          </div>
        </div>
      )}

      {summary && showSummary && (
        <div style={{ marginTop: 20 }}>
          <h3>Resumen de la sesión</h3>

          <h4>Board completo</h4>
          <div className="table-wrapper">
            <div className="poker-table">
              <div className="community-row">
                {fullBoard.map((card, idx) => (
                  <Card key={`${card.rank}${card.suit}-${idx}`} card={card} />
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
                    <Card key={`${card.rank}${card.suit}-${idx}`} card={card} />
                  ))}
                </div>
                <p>
                  Textura: <strong>{TEXTURE_LABELS[s.texture]}</strong>
                </p>
              </div>
            ))}
          </div>

          <div className="actions" style={{ marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-primary btn-start"
              onClick={handleNewSession}
              disabled={loading}
            >
              Nueva sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}