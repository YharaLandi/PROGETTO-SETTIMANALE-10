import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Ricerca from "./pages/Ricerca.jsx";
import Dettaglio from "./pages/Dettaglio.jsx";
import { CAPITALI } from "./data/citta.js";

function App() {
  // stato sollevato (lift state up): lista città + cronologia ricerche,
  // condivisi tra le pagine
  const [citta, setCitta] = useState(CAPITALI);
  const [ricercheRecenti, setRicercheRecenti] = useState([]);

  function aggiungiRicercaRecente(nome) {
    setRicercheRecenti((prev) => {
      const senzaDuplicati = prev.filter((r) => r !== nome);
      return [nome, ...senzaDuplicati].slice(0, 6);
    });
  }

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home citta={citta} />} />
        <Route
          path="/ricerca"
          element={
            <Ricerca
              ricercheRecenti={ricercheRecenti}
              aggiungiRicercaRecente={aggiungiRicercaRecente}
            />
          }
        />
        <Route path="/dettaglio/:id" element={<Dettaglio citta={citta} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
