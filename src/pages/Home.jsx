import ListaCitta from "../components/ListaCitta.jsx";

// Pagina Home: mostra il titolo, la data di oggi e la lista delle capitali.
// "citta" arriva da App.jsx (lift state up), non viene creata qui.
function Home({ citta }) {
  // formattiamo la data di oggi in italiano, es. "venerdì 10 luglio"
  const dataOggi = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="page">
      <h1>Capitali</h1>
      <p style={{ color: "rgba(255,255,255,0.6)" }}>{dataOggi}</p>
      <ListaCitta citta={citta} />
    </div>
  );
}

export default Home;
