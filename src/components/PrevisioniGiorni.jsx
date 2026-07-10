import GiornoRiga from "./GiornoRiga.jsx";

// Lista delle previsioni giornaliere (7-8 giorni).
function PrevisioniGiorni({ giornaliera }) {
  const minAssoluto = Math.min(...giornaliera.map((g) => g.min));
  const maxAssoluto = Math.max(...giornaliera.map((g) => g.max));

  return (
    <div>
      <div className="sezione-titolo">Previsioni 8 giorni</div>
      {giornaliera.map((g, i) => (
        <GiornoRiga
          key={i}
          giorno={g}
          minAssoluto={minAssoluto}
          maxAssoluto={maxAssoluto}
        />
      ))}
    </div>
  );
}

export default PrevisioniGiorni;
