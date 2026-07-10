import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

// Questo è il "punto di ingresso" del progetto: dice a React di disegnare
// il componente App dentro l'elemento con id="root" (che sta in index.html).
// BrowserRouter avvolge tutto per far funzionare il routing (react-router-dom).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
