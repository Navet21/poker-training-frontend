import { useState } from "react";
import type {
  TrainingOutsAnswerResponse,
  TrainingOutsSessionInitResponse,
} from "../../interfaces";
import {
  answerOutsTrainingSession,
  createOutsTrainingSession,
} from "../../api/training-/outsApi";
import { PokerTable } from "../PokerTable/PokerTable";
import "./OutsTrainer.css";
import "../TextureTrainer/TextureTrainer.css";



export function OutsTrainer() {
  const [session, setSession] =
    useState<TrainingOutsSessionInitResponse | null>(null);
  const [answer, setAnswer] = useState<TrainingOutsAnswerResponse | null>(null);
  const [outsInput, setOutsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const SHOW_DEBUG = false;

  async function handleNewSession() {
    try {
      setError("");
      setAnswer(null);
      setOutsInput("");
      setLoading(true);

      const data = await createOutsTrainingSession();
      setSession(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear sesión";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!session) return;

    const outs = Number(outsInput);
    if (Number.isNaN(outs)) {
      setError("Introduce un número válido de outs");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await answerOutsTrainingSession(session.sessionId, {
        street: session.street,
        outs,
      });

      setAnswer(res);

      if (!res.finished && res.nextStreet && res.nextCards) {
        setSession({
          sessionId: session.sessionId,
          street: res.nextStreet,
          hole: res.hole,
          cards: res.nextCards,
        });
        setOutsInput("");
      } else {
        setSession(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al enviar la respuesta";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hand-container">
      <h2>Outs Trainer</h2>

      <div className="controls">
        <button onClick={handleNewSession} disabled={loading || !!session}>
          {loading ? "Creando sesión..." : "Nueva sesión"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {session && (
        <>
          <h3>
            Street actual:{" "}
            <span style={{ textTransform: "capitalize" }}>{session.street}</span>
          </h3>

          {/* Mesa centrada + board + hole debajo */}
          <PokerTable boardCards={session.cards} holeCards={session.hole} />

          {/* Input centrado */}
          <div className="outs-form">
            <label className="outs-label">
              Outs:
              <input
                className="outs-input"
                type="number"
                value={outsInput}
                onChange={(e) => setOutsInput(e.target.value)}
              />
            </label>

            <button
              className="outs-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              Responder
            </button>
          </div>
        </>
      )}

      {answer && (
        <div className="answer-result" style={{ marginTop: 16 }}>
          {/* Cabecera: primero resultado + números */}
          <div className="answer-header">
            <strong className={answer.correct ? "ok" : "ko"}>
              {answer.correct ? "CORRECTA ✅" : "INCORRECTA ❌"}
            </strong>

            <div className="answer-numbers">
              Tu outs: <strong>{answer.userOuts}</strong> · Correctas:{" "}
              <strong>{answer.correctOuts}</strong>
            </div>
          </div>

          {/* Explicación principal (modo estudio) */}
          <div className="study-box">
            <p
              className="outs-explanation"
              style={{ whiteSpace: "pre-line", margin: 0 }}
            >
              {answer.explanation}
            </p>
          </div>

          {/* Breakdown opcional SOLO debug (desactivado por defecto) */}
          {SHOW_DEBUG && answer?.components.length > 0 && (
            <>
              <h4 style={{ marginTop: 14 }}>Breakdown (debug)</h4>
              <ul>
                {answer.components.map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.type}</strong> — {c.outs} outs — {c.reason}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
