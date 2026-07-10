import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RisultatoRiga from "../components/RisultatoRiga.jsx";
import RicercheRecenti from "../components/RicercheRecenti.jsx";
import Loader from "../components/Loader.jsx";
import { fetchRicercaCitta } from "../data/weatherApi.js";

// Pagina di ricerca: campo di ricerca + lista risultati + cronologia.
// "ricercheRecenti" e "aggiungiRicercaRecente" arrivano da App.jsx.
function Ricerca({ ricercheRecenti, aggiungiRicercaRecente }) {
  const [query, setQuery] = useState(""); // testo scritto dall'utente
  const [risultati, setRisultati] = useState([]); // città trovate
  const [loading, setLoading] = useState(false);

  // Questo useEffect si riattiva ogni volta che "query" cambia
  // (equivale a componentDidUpdate quando cambia il testo cercato).
  useEffect(() => {
    // se il campo è vuoto, svuotiamo i risultati e non chiamiamo l'API
    if (!query.trim()) {
      setRisultati([]);
      return;
    }

    let attivo = true;
    setLoading(true);

    // aspettiamo 400 millisecondi dopo l'ultimo carattere digitato prima
    // di chiamare l'API: così non facciamo una richiesta ad ogni singola
    // lettera scritta (questa tecnica si chiama "debounce")
    const timer = setTimeout(() => {
      fetchRicercaCitta(query)
        .then((res) => {
          if (attivo) setRisultati(res);
        })
        .finally(() => {
          if (attivo) setLoading(false);
        });
    }, 400);

    // "cleanup": se l'utente scrive un'altra lettera prima che scattino
    // i 400ms, annulliamo il timer precedente
    return () => {
      attivo = false;
      clearTimeout(timer);
    };
  }, [query]);

  // quando clicco su una chip delle ricerche recenti, la rimetto nel campo
  function selezionaRicercaRecente(nome) {
    setQuery(nome);
  }

  // quando clicco su un risultato, lo salvo nella cronologia
  function onRisultatoCliccato(nomeCitta) {
    aggiungiRicercaRecente(nomeCitta);
  }

  return (
    <div className="page">
      <h1>Cerca città</h1>
      <SearchBar valore={query} onChange={setQuery} />

      {loading && <Loader />}

      {!loading && risultati.length > 0 && (
        <div>
          <div className="sezione-titolo">Risultati</div>
          {risultati.map((r) => (
            <RisultatoRiga
              key={r.id}
              citta={r}
              onClick={() => onRisultatoCliccato(r.nome)}
            />
          ))}
        </div>
      )}

      {!loading && ricercheRecenti.length > 0 && (
        <div>
          <div className="sezione-titolo">Ricerche recenti</div>
          <RicercheRecenti
            ricerche={ricercheRecenti}
            onSeleziona={selezionaRicercaRecente}
          />
        </div>
      )}
    </div>
  );
}

export default Ricerca;
