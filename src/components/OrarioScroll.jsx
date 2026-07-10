import WeatherIcon from "./WeatherIcon.jsx";

// Riga scrollabile orizzontalmente con le previsioni ora per ora.
function OrarioScroll({ oraria }) {
  return (
    <div className="orario-scroll">
      {oraria.map((ora, i) => (
        <div className="orario-scroll__colonna" key={i}>
          <span className="orario-scroll__ora">{ora.ora}:00</span>
          <WeatherIcon condizione={ora.condizione} size={26} />
          <span className="orario-scroll__temp">{ora.temp}°</span>
        </div>
      ))}
    </div>
  );
}

export default OrarioScroll;
