import { useState } from "react";
import "./App.css";
import { Home } from "./poker/components/Home/Home";
import { TextureTrainer } from "./poker/components/TextureTrainer/TextureTrainer";
import { OutsTrainer } from "./poker/components/OutsTrainer/OutsTrainer";
import { Glossary } from "./poker/components/Glossary/Glossary";
import { Footer } from "./poker/components/Footer/Footer";
import { TrainerLayout } from "./poker/components/TrainerLayout/TrainerLayout";
import { BackToTop } from "./poker/components/BackToTop/BackToTop";

type Mode = "home" | "texture" | "outs" | "glossary";

function App() {
  const [mode, setMode] = useState<Mode>("home");

  return (
    <div className="app">
      {mode === "home" && <Home onSelect={setMode} />}
      {mode === "texture" && (
        <TrainerLayout title="Textura del board" onBack={() => setMode("home")}>
          <TextureTrainer />
        </TrainerLayout>
      )}

      {mode === "outs" && (
        <TrainerLayout title="Cálculo de outs" onBack={() => setMode("home")}>
          <OutsTrainer />
        </TrainerLayout>
      )}

      {mode === "glossary" && (
        <TrainerLayout title="Glosario" onBack={() => setMode("home")}>
          <Glossary />
        </TrainerLayout>
      )}
      
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;