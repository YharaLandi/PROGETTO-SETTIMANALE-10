import CittaCard from "./CittaCard.jsx";

// Mappa l'array di città in una lista di CittaCard.
function ListaCitta({ citta }) {
  return (
    <div className="lista-citta">
      {citta.map((c) => (
        <CittaCard key={c.id} citta={c} />
      ))}
    </div>
  );
}

export default ListaCitta;
