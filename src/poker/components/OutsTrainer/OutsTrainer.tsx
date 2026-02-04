import { useState } from "react";
import type { OutsSession } from "../../domain/outs/outs.session";
import {
  answerOutsTrainingSession,
  createOutsTrainingSession,
} from "../../api/training/outsApi";
import { PokerTable } from "../PokerTable/PokerTable";
import { FeedbackPanel } from "../FeedbackPanel/FeedbackPanel";
import "./OutsTrainer.css";
import type { OutsAnswer } from "../../domain/outs/out.types";

export function OutsTrainer() {
  const [session, setSession] = useState<OutsSession | null>(null);
  const [answer, setAnswer] = useState<OutsAnswer | null>(null);
  const [outsInput, setOutsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (outsInput.trim() === "") {
    setError("Introduce un número de outs");
    return;
  }

  const outs = Number(outsInput);
  if (!Number.isFinite(outs) || outs < 0) {
    setError("Introduce un número válido de outs");
    return;
  }


  try {
    setError("");
    setLoading(true);

    const payload = { street: session.street, outs };

    const res = await answerOutsTrainingSession(session.sessionId, payload);

    setAnswer(res);

    if (!res.finished && res.next) {

      setSession({
        sessionId: session.sessionId,
        street: res.next.street,
        hole: session.hole,
        cards: res.next.board,
      });

      setOutsInput("");
    } else {
      setSession(null);
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al enviar la respuesta";
    console.error("[OUTS][ERROR]", err);
    setError(message);
  } finally {
    setLoading(false);
  }
}


  return (
  <div className="hand-container">
    <h2>Outs Trainer</h2>

    {error && <p className="error">{error}</p>}

    {!session && (
      <div className="actions">
        <button
          className="btn btn-primary btn-start"
          onClick={handleNewSession}
          disabled={loading}
          type="button"
        >
          {loading ? "Creando sesión..." : "Start"}
        </button>
      </div>
    )}

    {session && (
      <>
        <div className="trainer-row">
          <h3 className="street-title">
            Street actual:{" "}
            <span className="street-value">{session.street}</span>
          </h3>

        </div>

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

          <PokerTable boardCards={session.cards} holeCards={session.hole} />
        </div>

        <div className="panel">
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
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              type="button"
            >
              Responder
            </button>
          </div>
        </div>
      </>
    )}

    {answer && (
      <FeedbackPanel
        verdict={answer.verdict}
        primary={{ label: "Tu outs", value: answer.userOuts }}
        secondary={{ label: "Correctas", value: answer.correctOuts }}
        explanation={answer.explanation}
      />
    )}

  </div>
);

}
