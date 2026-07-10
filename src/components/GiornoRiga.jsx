import WeatherIcon from "./WeatherIcon.jsx";

const GIORNI = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

// Singola riga della lista "Previsioni 8 giorni": giorno | icona | barra min-max | max.
function GiornoRiga({ giorno, minAssoluto, maxAssoluto }) {
  const nomeGiorno = GIORNI[new Date(giorno.data).getDay()];
  const range = maxAssoluto - minAssoluto || 1;
  const sinistra = ((giorno.min - minAssoluto) / range) * 100;
  const larghezza = ((giorno.max - giorno.min) / range) * 100;

  return (
    <div className="giorno-riga">
      <span>{nomeGiorno}</span>
      <WeatherIcon condizione={giorno.condizione} size={22} />
      <div className="giorno-riga__barra">
        <div
          className="giorno-riga__barra-fill"
          style={{ left: `${sinistra}%`, width: `${larghezza}%` }}
        />
      </div>
      <span>{giorno.max}°</span>
    </div>
  );
}

export default GiornoRiga;
