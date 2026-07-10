import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import HeroMeteo from "../components/HeroMeteo.jsx";
import OrarioScroll from "../components/OrarioScroll.jsx";
import PrevisioniGiorni from "../components/PrevisioniGiorni.jsx";
import IndicatoriGrid from "../components/IndicatoriGrid.jsx";
import Loader from "../components/Loader.jsx";
import { useMeteoDettaglio } from "../hooks/useMeteo.js";

const GRADIENTI = {
  sunny: "var(--grad-sunny)",
  "clear-night": "var(--grad-clear-night)",
  cloudy: "var(--grad-cloudy)",
  rain: "var(--grad-rain)",
  storm: "var(--grad-storm)",
  snow: "var(--grad-snow)",
};

// Pagina Dettaglio: mostra le previsioni complete di una città.
// "id" arriva dall'URL (es. /dettaglio/roma -> id = "roma"), grazie a useParams.
function Dettaglio({ citta }) {
  const { id } = useParams();
  const location = useLocation(); // ci serve per leggere i dati passati col "state"

  // Se la città arriva da una ricerca, i suoi dati sono già dentro
  // location.state (li abbiamo passati noi con <Link state={...}>).
  // Altrimenti (viene dalla Home) la cerchiamo nella lista "citta" per id.
  const cittaSelezionata = location.state || citta.find((c) => c.id === id);

  // Chiediamo all'API tutti i dati di dettaglio per questa città
  const { dettaglio, loading } = useMeteoDettaglio(
    cittaSelezionata?.lat,
    cittaSelezionata?.lon
  );

  // se per qualche motivo la città non esiste, mostriamo un messaggio
  if (!cittaSelezionata) {
    return <div className="page">Città non trovata.</div>;
  }

  // finché aspettiamo i dati, mostriamo solo l'header e il loader
  if (loading || !dettaglio) {
    return (
      <div className="dettaglio">
        <Header
          titolo={`${cittaSelezionata.nome}, ${cittaSelezionata.paese}`}
          backTo="/"
        />
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="dettaglio"
      style={{ background: GRADIENTI[dettaglio.condizione] }}
    >
      <Header
        titolo={`${cittaSelezionata.nome}, ${cittaSelezionata.paese}`}
        backTo="/"
      />

      <div className="dettaglio__contenuto">
        <div className="dettaglio__colonna-sinistra">
          <HeroMeteo dettaglio={dettaglio} />
          <IndicatoriGrid indicatori={dettaglio.indicatori} />
        </div>

        <div className="dettaglio__colonna-destra">
          <OrarioScroll oraria={dettaglio.oraria} />
          <div className="pannello">
            <PrevisioniGiorni giornaliera={dettaglio.giornaliera} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dettaglio;
