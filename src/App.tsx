import { useState } from "react";
import "./App.css";
import { TextureTrainer } from "./poker/components/TextureTrainer/TextureTrainer";
import { OutsTrainer } from "./poker/components/OutsTrainer/OutsTrainer";

type Mode = "texture" | "outs";

function App() {
  const [mode, setMode] = useState<Mode>("texture");

  return (
    <div className="app">
      <h1>Poker Trainer</h1>

      <div className="controls">
        <button onClick={() => setMode("texture")} disabled={mode === "texture"}>
          Textura
        </button>
        <button onClick={() => setMode("outs")} disabled={mode === "outs"}>
          Outs
        </button>
      </div>

      {mode === "texture" ? <TextureTrainer /> : <OutsTrainer />}
    </div>
  );
}

export default App;
