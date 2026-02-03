import { SkinToggle } from "../SkinToggle/SkinToggle";
import "./Header.css";

export type Mode = "texture" | "outs";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function Header({ mode, onModeChange }: Props) {
  return (
    <header className="app-header">
      <h1 className="app-title">Poker Trainer</h1>

      <div className="app-controls">
        <button
          type="button"
          className={`tab ${mode === "texture" ? "tab--active" : ""}`}
          onClick={() => onModeChange("texture")}
          aria-pressed={mode === "texture"}
        >
          Textura
        </button>

        <button
          type="button"
          className={`tab ${mode === "outs" ? "tab--active" : ""}`}
          onClick={() => onModeChange("outs")}
          aria-pressed={mode === "outs"}
        >
          Outs
        </button>

        <SkinToggle />
      </div>
    </header>
  );
}
