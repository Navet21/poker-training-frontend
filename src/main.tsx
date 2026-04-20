import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { CardSkinProvider } from "./poker/theme/CardSkinProvider";

console.log("Running in dev mode");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardSkinProvider>
      <App />
    </CardSkinProvider>
  </React.StrictMode>,
);
