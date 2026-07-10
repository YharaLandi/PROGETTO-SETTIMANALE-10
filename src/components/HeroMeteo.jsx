import WeatherIcon from "./WeatherIcon.jsx";
import { testoCondizione } from "../data/weatherApi.js";

// Blocco centrale grande della pagina Dettaglio: icona + temperatura enorme.
function HeroMeteo({ dettaglio }) {
  return (
    <div className="hero">
      <WeatherIcon condizione={dettaglio.condizione} size={76} />
      <div className="hero__temp">{dettaglio.temp}°</div>
      <div className="hero__riga">
        {testoCondizione(dettaglio.condizione)} · Max {dettaglio.max}° Min{" "}
        {dettaglio.min}°
      </div>
    </div>
  );
}

export default HeroMeteo;
