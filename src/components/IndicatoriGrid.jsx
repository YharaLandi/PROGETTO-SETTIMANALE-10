// Griglia dei 4 indicatori extra: umidità, vento, UV, pressione.
function IndicatoriGrid({ indicatori }) {
  const voci = [
    { label: "Umidità", valore: `${indicatori.umidita}%` },
    { label: "Vento", valore: `${indicatori.vento} km/h` },
    { label: "UV", valore: indicatori.uv },
    { label: "Pressione", valore: `${indicatori.pressione} hPa` },
  ];

  return (
    <div className="indicatori-grid">
      {voci.map((v) => (
        <div className="indicatore" key={v.label}>
          <div className="indicatore__label">{v.label}</div>
          <div className="indicatore__valore">{v.valore}</div>
        </div>
      ))}
    </div>
  );
}

export default IndicatoriGrid;
