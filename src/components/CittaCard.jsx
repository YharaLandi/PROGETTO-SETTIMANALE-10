import { Link } from "react-router-dom";
import WeatherIcon from "./WeatherIcon.jsx";
import Loader from "./Loader.jsx";
import { useMeteoAttuale } from "../hooks/useMeteo.js";
import { testoCondizione } from "../data/weatherApi.js";

const GRADIENTI = {
  sunny: "var(--grad-sunny)",
  "clear-night": "var(--grad-clear-night)",
  cloudy: "var(--grad-cloudy)",
  rain: "var(--grad-rain)",
  storm: "var(--grad-storm)",
  snow: "var(--grad-snow)",
};

// Card di una singola città in Home: fa il proprio fetch del meteo attuale
// tramite l'hook useMeteoAttuale (mount/update gestiti dentro l'hook).
function CittaCard({ citta }) {
  const { meteo, loading } = useMeteoAttuale(citta.lat, citta.lon);

  if (loading || !meteo) {
    return (
      <div className="citta-card" style={{ background: "var(--grad-cloudy)" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Link
      to={`/dettaglio/${citta.id}`}
      state={citta}
      className="citta-card"
      style={{ background: GRADIENTI[meteo.condizione] }}
    >
      <div>
        <div className="citta-card__nome">{citta.nome}</div>
        <div className="citta-card__condizione">
          {testoCondizione(meteo.condizione)}
        </div>
      </div>
      <div className="citta-card__destra">
        <WeatherIcon condizione={meteo.condizione} size={34} />
        <span className="citta-card__temp">{meteo.temp}°</span>
      </div>
    </Link>
  );
}

export default CittaCard;
