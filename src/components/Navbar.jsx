import { Link, NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// Barra in alto, sempre visibile su tutte le pagine.
// Struttura: logo a sinistra, subito accanto le due icone di navigazione
function Navbar() {
  // NavLink è come Link, ma sa da solo se il suo "to" corrisponde alla
  // pagina in cui ci troviamo: in quel caso aggiunge automaticamente la
  // classe "active" al link, che noi usiamo in App.css per colorarlo.
  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        SkyCast
      </Link>

      <div className="navbar__link-icone">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "navbar__icona navbar__icona--attiva" : "navbar__icona"
          }
          title="Home"
        >
          <i className="bi bi-house-fill"></i>
        </NavLink>

        <NavLink
          to="/ricerca"
          className={({ isActive }) =>
            isActive ? "navbar__icona navbar__icona--attiva" : "navbar__icona"
          }
          title="Cerca"
        >
          <i className="bi bi-search"></i>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;