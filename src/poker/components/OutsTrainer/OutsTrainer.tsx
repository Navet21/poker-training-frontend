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

type PendingNext = {
  street: OutsSession["street"];
  board: OutsSession["cards"];
};

export function OutsTrainer() {
  const [session, setSession] = useState<OutsSession | null>(null);
  const [answer, setAnswer] = useState<OutsAnswer | null>(null);
  const [outsInput, setOutsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingNext, setPendingNext] = useState<PendingNext | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);

  async function handleNewSession() {
    try {
      setError("");
      setAnswer(null);
      setOutsInput("");
      setPendingNext(null);
      setSessionEnded(false);

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

      if (res.next) {
        setPendingNext({
          street: res.next.street,
          board: res.next.board,
        });
      } else {
        setPendingNext(null);
      }

      setSessionEnded(res.finished);

      setOutsInput("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al enviar la respuesta";
      console.error("[OUTS][ERROR]", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleDealNext() {
    if (!session || !pendingNext) return;

    setSession({
      sessionId: session.sessionId,
      street: pendingNext.street,
      hole: session.hole,
      cards: pendingNext.board,
    });
    setPendingNext(null);
    if (pendingNext.street !== "river") {
      setAnswer(null);
      setSessionEnded(false);
    }
  }

  const ctaLabel = pendingNext?.street
    ? pendingNext.street === "river"
      ? "Ver River"
      : `Pedir ${pendingNext.street.charAt(0).toUpperCase()}${pendingNext.street.slice(1)}`
    : "Pedir carta";

  const locked = !!answer || loading;

  return (
    <div className="hand-container">
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
              Street actual: <span className="street-value">{session.street}</span>
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
            <form
              className="outs-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!locked && session.street !== "river") handleSubmit();
              }}
            >
              <label className="outs-label">
                Outs:
                <input
                  className="outs-input"
                  type="number"
                  value={outsInput}
                  onChange={(e) => setOutsInput(e.target.value)}
                  disabled={locked || session.street === "river"}
                />
              </label>

              <button
                className="btn btn-primary"
                disabled={locked || session.street === "river"}
                type="submit"
              >
                Responder
              </button>
            </form>
          </div>

          {answer && (
            <>
              <FeedbackPanel
                verdict={answer.verdict}
                primary={{ label: "Tu outs", value: answer.userOuts }}
                secondary={{ label: "Correctas", value: answer.correctOuts }}
                explanation={answer.explanation}
              />

              {pendingNext && (
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-start"
                    onClick={handleDealNext}
                  >
                    {ctaLabel}
                  </button>
                </div>
              )}

              {sessionEnded && !pendingNext && (
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-start"
                    onClick={handleNewSession}
                  >
                    Nueva mano
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
