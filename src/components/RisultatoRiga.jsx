import { Link } from "react-router-dom";
import WeatherIcon from "./WeatherIcon.jsx";
import Loader from "./Loader.jsx";
import { useMeteoAttuale } from "../hooks/useMeteo.js";

// Riga di un risultato di ricerca: nome + paese a sinistra,
// icona + temperatura a destra.
function RisultatoRiga({ citta, onClick }) {
  const { meteo, loading } = useMeteoAttuale(citta.lat, citta.lon);

  return (
    <Link
      to={`/dettaglio/${citta.id}`}
      state={citta}
      className="risultato-riga"
      onClick={onClick}
    >
      <div>
        <div className="risultato-riga__nome">{citta.nome}</div>
        <div className="risultato-riga__paese">{citta.paese}</div>
      </div>
      <div className="risultato-riga__destra">
        {loading || !meteo ? (
          <Loader />
        ) : (
          <>
            <WeatherIcon condizione={meteo.condizione} size={24} />
            <span>{meteo.temp}°</span>
          </>
        )}
      </div>
    </Link>
  );
}

export default RisultatoRiga;
