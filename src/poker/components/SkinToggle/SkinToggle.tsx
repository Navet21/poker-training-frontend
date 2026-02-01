import { useState } from "react";

import { useCardSkin } from "../../theme/useCardSkin";
import { TextureTrainer } from "../TextureTrainer/TextureTrainer";
import { OutsTrainer } from "../OutsTrainer/OutsTrainer";


type Mode = "texture" | "outs";

export function SkinToggle() {
  const { skin, toggle } = useCardSkin();
  return (
    <button onClick={toggle}>
      Skin: {skin === "flat" ? "Flat" : "Classic"}
    </button>
  );
}

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

        {/* 👇 Toggle al lado */}
        <SkinToggle />
      </div>

      {mode === "texture" ? <TextureTrainer /> : <OutsTrainer />}
    </div>
  );
}

export default App;
