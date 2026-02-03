import "./FeedbackPanel.css";

type BreakdownItem = {
  label: string;
  value?: string | number;
};

type Props = {
  title?: string; 
  verdict: "correct" | "incorrect" | null;
  primary: { label: string; value: string | number };
  secondary: { label: string; value: string | number };
  explanation?: string;
  breakdown?: BreakdownItem[];
  takeaway?: string;
};

export function FeedbackPanel({
  title,
  verdict,
  primary,
  secondary,
  explanation,
  breakdown,
  takeaway,
}: Props) {
  const isCorrect = verdict === "correct";

  return (
    <div className="fp">
      <div className="fp__header">
        <h3 className="fp__title">{title}</h3>
        <span className={`fp__badge ${isCorrect ? "fp__badge--ok" : "fp__badge--ko"}`}>
          {isCorrect ? "CORRECTA ✅" : "INCORRECTA ❌"}
        </span>
      </div>

      <div className="fp__grid">
        <div className="fp__metric">
          <div className="fp__label">{primary.label}</div>
          <div className="fp__value">{primary.value}</div>
        </div>
        <div className="fp__metric">
          <div className="fp__label">{secondary.label}</div>
          <div className="fp__value">{secondary.value}</div>
        </div>
      </div>

      {explanation && (
        <div className="fp__box">
          <p className="fp__text" style={{ whiteSpace: "pre-line" }}>
            {explanation}
          </p>
        </div>
      )}

      {breakdown && breakdown.length > 0 && (
        <div className="fp__breakdown">
          <h4 className="fp__subtitle">Desglose</h4>
          <ul className="fp__list">
            {breakdown.map((b, i) => (
              <li key={`${b.label}-${i}`} className="fp__item">
                <span className="fp__itemLabel">{b.label}</span>
                {b.value !== undefined && (
                  <span className="fp__itemValue">{b.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {takeaway && (
        <div className="fp__takeaway">
          <h4 className="fp__subtitle">Regla</h4>
          <p className="fp__text">{takeaway}</p>
        </div>
      )}
    </div>
  );
}
