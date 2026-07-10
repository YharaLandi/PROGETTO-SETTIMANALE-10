// Icona meteo geometrica minimale (niente emoji/SVG complesse),
// costruita solo con div e CSS, come indicato nel design.
function WeatherIcon({ condizione, size = 32 }) {
  const stile = { width: size, height: size };

  if (condizione === "sunny") {
    return (
      <div style={stile} className="icona icona--sole">
        <div className="icona__cerchio" style={{ background: "#ffb648" }} />
      </div>
    );
  }

  if (condizione === "clear-night") {
    return (
      <div style={stile} className="icona icona--luna">
        <div className="icona__cerchio" style={{ background: "#c9d3ea" }} />
      </div>
    );
  }

  if (condizione === "cloudy") {
    return (
      <div style={stile} className="icona icona--nuvola">
        <div className="icona__ellisse" style={{ background: "#aab6ce" }} />
      </div>
    );
  }

  if (condizione === "rain") {
    return (
      <div style={stile} className="icona icona--pioggia">
        <div className="icona__ellisse" style={{ background: "#aab6ce" }} />
        <div className="icona__goccia" style={{ background: "#7fb8ff" }} />
      </div>
    );
  }

  if (condizione === "storm") {
    return (
      <div style={stile} className="icona icona--storm">
        <div className="icona__ellisse" style={{ background: "#aab6ce" }} />
        <div className="icona__fulmine" style={{ background: "#ffd23f" }} />
      </div>
    );
  }

  if (condizione === "snow") {
    return (
      <div style={stile} className="icona icona--neve">
        <div className="icona__ellisse" style={{ background: "#aab6ce" }} />
        <div className="icona__fiocco" />
      </div>
    );
  }

  return null;
}

export default WeatherIcon;
