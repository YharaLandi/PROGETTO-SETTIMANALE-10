import { Link } from "react-router-dom";

// Header generico: titolo + eventuale freccia indietro (per la pagina Dettaglio).
function Header({ titolo, backTo }) {
  return (
    <div className="dettaglio__header">
      {backTo && <Link to={backTo}>←</Link>}
      <span className="dettaglio__titolo">{titolo}</span>
    </div>
  );
}

export default Header;
