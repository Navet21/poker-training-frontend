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
  const [showDebug, setShowDebug] = useState(false);


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

  // ✅ LOG 1: estado actual antes de enviar
  console.log("[OUTS][SUBMIT] current session", {
    sessionId: session.sessionId,
    street: session.street,
    board: session.cards?.map((c) => `${c.rank}${c.suit}`).join(" "),
    hole: session.hole?.map((c) => `${c.rank}${c.suit}`).join(" "),
    userOuts: outs,
  });

  try {
    setError("");
    setLoading(true);

    // ✅ LOG 2: payload exacto que sale al backend
    const payload = { street: session.street, outs };
    console.log("[OUTS][SUBMIT] payload -> backend", payload);

    const res = await answerOutsTrainingSession(session.sessionId, payload);

    // ✅ LOG 3: respuesta (DOMINIO) que llega al front
    console.log("[OUTS][ANSWER] response (domain)", {
      verdict: res.verdict,
      street: res.street,
      userOuts: res.userOuts,
      correctOuts: res.correctOuts,
      finished: res.finished,
      next: res.next,
      flags: res.flags,
      components: res.components,
      explanation: res.explanation,
    });

    setAnswer(res);

    // ✅ LOG 4: avance de street
    if (!res.finished && res.next) {
      console.log("[OUTS][ADVANCE] moving to next street", res.next);

      setSession({
        sessionId: session.sessionId,
        street: res.next.street,
        hole: session.hole,
        cards: res.next.board,
      });

      setOutsInput("");
    } else {
      console.log("[OUTS][END] session finished, clearing session");
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

          <PokerTable boardCards={session.cards} holeCards={session.hole} />

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
        <FeedbackPanel
          verdict={answer.verdict}
          primary={{ label: "Tu outs", value: answer.userOuts }}
          secondary={{ label: "Correctas", value: answer.correctOuts }}
          explanation={answer.explanation}
          breakdown={
            showDebug
              ? answer.components.map((c) => ({
                  label: c.kind.replace("_", " "),
                  value: `${c.outs} outs`,
                }))
              : undefined
          }
        />
      )}
    </div>
  );
}
