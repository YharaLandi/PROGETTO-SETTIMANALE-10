// Chip orizzontali con le ultime ricerche effettuate.
function RicercheRecenti({ ricerche, onSeleziona }) {
  if (ricerche.length === 0) return null;

  return (
    <div className="ricerche-recenti">
      {ricerche.map((r) => (
        <button key={r} className="chip" onClick={() => onSeleziona(r)}>
          {r}
        </button>
      ))}
    </div>
  );
}

export default RicercheRecenti;
