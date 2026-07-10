import { useState, useEffect } from "react";
import { fetchMeteoAttuale, fetchMeteoDettaglio } from "../data/weatherApi.js";
// Ho usato questo approccio per un motivo molto semplice, simile a quello
// che ho usato per la fetch nel progetto scorso, ovvero dividere per poter
// richiamare ovunque. Ho creato un file js (tanto non serve html) e posso
// chiamarlo quando mi serve senza riscriverlo.
//
// In più questo file usa gli hook di React (useState e useEffect) per
// gestire da solo il caricamento dei dati: quando il componente che lo
// richiama appare per la prima volta, useEffect fa partire la fetch
// (come il "didMount" di React), e se cambiano lat/lon la rifà da capo
// (come il "didUpdate"). Così ogni componente che ha bisogno del meteo
// (CittaCard, RisultatoRiga, Dettaglio) chiama semplicemente l'hook e
// riceve già pronti i dati, il loading e l'eventuale errore, senza dover
// riscrivere la stessa logica ogni volta.

// Hook per il meteo "attuale" di una città (usato nelle card della Home).
// L'useEffect con [lat, lon] come dipendenze funziona sia da didMount
// (primo render) sia da didUpdate (se lat/lon cambiano).
export function useMeteoAttuale(lat, lon) {
  const [meteo, setMeteo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    let attivo = true;
    setLoading(true);
    fetchMeteoAttuale(lat, lon)
      .then((dati) => {
        if (attivo) setMeteo(dati);
      })
      .catch((err) => {
        if (attivo) setErrore(err.message);
      })
      .finally(() => {
        if (attivo) setLoading(false);
      });

    return () => {
      attivo = false;
    };
  }, [lat, lon]);

  return { meteo, loading, errore };
}

// Hook per i dati completi della pagina Dettaglio (hero + orario + giornaliero).
export function useMeteoDettaglio(lat, lon) {
  const [dettaglio, setDettaglio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    let attivo = true;
    setLoading(true);
    fetchMeteoDettaglio(lat, lon)
      .then((dati) => {
        if (attivo) setDettaglio(dati);
      })
      .catch((err) => {
        if (attivo) setErrore(err.message);
      })
      .finally(() => {
        if (attivo) setLoading(false);
      });

    return () => {
      attivo = false;
    };
  }, [lat, lon]);

  return { dettaglio, loading, errore };
}
