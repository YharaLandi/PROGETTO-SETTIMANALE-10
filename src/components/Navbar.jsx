import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// Barra in alto, sempre visibile su tutte le pagine.
// Struttura: logo a sinistra, subito accanto le due icone di navigazione
// (Home e Cerca), come nella navbar di riferimento vista a lezione.
function Navbar() {
  return (
    <div className="navbar">
      {/* Link è come un tag <a>, ma non ricarica tutta la pagina */}
      <Link to="/" className="navbar__logo">
        SkyCast
      </Link>

      <div className="navbar__link-icone">
        <Link to="/" className="navbar__icona" title="Home">
          <i className="bi bi-house-fill"></i>
        </Link>

        <Link to="/ricerca" className="navbar__icona" title="Cerca">
          <i className="bi bi-search"></i>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;