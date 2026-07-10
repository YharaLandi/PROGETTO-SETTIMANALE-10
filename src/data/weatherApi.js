

// Questo file si occupa SOLO di parlare con il sito Open-Meteo
// (un servizio gratuito che ci dà i dati meteo veri, senza bisogno
// di registrarsi o avere una chiave/API key).
// Le pagine e i componenti non chiamano mai "fetch" direttamente:
// chiamano le funzioni qui sotto, così se un giorno cambiamo API
// dobbiamo modificare solo questo file.

// Open-Meteo restituisce un numero (weather code) per indicare il tempo.
// Questa funzione traduce quel numero in una parola semplice che usiamo
// noi in tutta l'app (es. per scegliere l'icona e il colore di sfondo).
export function condizioneDaCodice(codice, eNotte) {
  if (codice === 0 || codice === 1) return eNotte ? "clear-night" : "sunny";
  if (codice === 2 || codice === 3) return "cloudy";
  if (codice >= 51 && codice <= 67) return "rain";
  if (codice >= 71 && codice <= 77) return "snow";
  if (codice >= 80 && codice <= 82) return "rain";
  if (codice >= 95) return "storm";
  return "cloudy";
}

// Trasforma la condizione (es. "sunny") nel testo italiano da mostrare
// a schermo (es. "Soleggiato").
export function testoCondizione(condizione) {
  const testi = {
    sunny: "Soleggiato",
    "clear-night": "Sereno",
    cloudy: "Nuvoloso",
    rain: "Pioggia",
    storm: "Temporale",
    snow: "Neve",
  };
  return testi[condizione] || "";
}

// Chiede all'API il meteo ATTUALE di una città (usato nelle card della Home
// e nei risultati di ricerca). "async" vuol dire che questa funzione
// aspetta una risposta da internet prima di continuare.
export async function fetchMeteoAttuale(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await fetch(url); // "await" aspetta che internet risponda
  if (!res.ok) throw new Error("Errore nel recupero del meteo");

  const dati = await res.json(); // trasforma la risposta in un oggetto JS

  const condizione = condizioneDaCodice(
    dati.current.weather_code,
    dati.current.is_day === 0
  );

  // restituiamo solo i dati che ci servono, già "puliti" e arrotondati
  return {
    temp: Math.round(dati.current.temperature_2m),
    condizione,
    max: Math.round(dati.daily.temperature_2m_max[0]),
    min: Math.round(dati.daily.temperature_2m_min[0]),
    umidita: dati.current.relative_humidity_2m,
    vento: Math.round(dati.current.wind_speed_10m),
  };
}

// Chiede all'API TUTTI i dati per la pagina Dettaglio: meteo attuale,
// previsioni ora per ora, previsioni dei prossimi giorni e indicatori extra.
export async function fetchMeteoDettaglio(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m,surface_pressure` +
    `&hourly=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max` +
    `&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Errore nel recupero del meteo");
  const dati = await res.json();

  const condizione = condizioneDaCodice(
    dati.current.weather_code,
    dati.current.is_day === 0
  );

  // Prendiamo solo le ore da adesso in poi (non quelle già passate oggi),
  // e teniamo solo le prime 8.
  const oraria = dati.hourly.time
    .map((iso, i) => ({
      ora: new Date(iso).getHours(),
      temp: Math.round(dati.hourly.temperature_2m[i]),
      condizione: condizioneDaCodice(dati.hourly.weather_code[i]),
    }))
    .filter((_, i) => dati.hourly.time[i].slice(0, 13) >= new Date().toISOString().slice(0, 13))
    .slice(0, 8);

  // Previsioni per gli 8 giorni successivi
  const giornaliera = dati.daily.time.slice(0, 8).map((iso, i) => ({
    data: iso,
    condizione: condizioneDaCodice(dati.daily.weather_code[i]),
    max: Math.round(dati.daily.temperature_2m_max[i]),
    min: Math.round(dati.daily.temperature_2m_min[i]),
  }));

  return {
    temp: Math.round(dati.current.temperature_2m),
    condizione,
    max: Math.round(dati.daily.temperature_2m_max[0]),
    min: Math.round(dati.daily.temperature_2m_min[0]),
    oraria,
    giornaliera,
    // i 4 indicatori extra mostrati in fondo alla pagina Dettaglio
    indicatori: {
      umidita: dati.current.relative_humidity_2m,
      vento: Math.round(dati.current.wind_speed_10m),
      uv: Math.round(dati.daily.uv_index_max[0]),
      pressione: Math.round(dati.current.surface_pressure),
    },
  };
}

// Cerca città per nome (usato nella pagina Ricerca). Se non scrivo niente
// restituisco subito un array vuoto, senza chiamare l'API inutilmente.
export async function fetchRicercaCitta(query) {
  if (!query.trim()) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=8&language=it`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Errore nella ricerca");

  const dati = await res.json();
  if (!dati.results) return []; // se non trova niente, l'API non manda "results"

  // trasformiamo i dati grezzi dell'API nel formato che usiamo noi in giro
  return dati.results.map((r) => ({
    id: `${r.id}`,
    nome: r.name,
    paese: r.country,
    lat: r.latitude,
    lon: r.longitude,
  }));
}
