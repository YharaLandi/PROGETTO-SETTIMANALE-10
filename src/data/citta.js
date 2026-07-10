// Ho scelto di tenere questi dati in un file .js con un array esportato, invece che in un .json, perché mi serve solo un import diretto e sincrono (niente fetch, niente stato di caricamento): sono dati fissi, scritti a mano da me, che non cambiano mai durante l'uso dell'app. Con import citta from "./citta.json" avrei ottenuto lo stesso risultato a runtime, ma nel file .js posso anche lasciare commenti (in JSON no) e in futuro, volendo, potrei calcolare l'array con un po' di logica invece di scriverlo solo a mano.

//Come dicevamo questo file contiene solo un elenco di dati (un array di oggetti).
// Ogni oggetto rappresenta una città: serve per riempire la Home
// senza dover cercare le città una per una.
// "id" è usato nell'URL (es. /dettaglio/roma), "lat" e "lon" sono le coordinate geografiche che servono per chiedere il meteo all'API.
export const CAPITALI = [
  { id: "roma", nome: "Roma", paese: "Italia", lat: 41.9, lon: 12.5 },
  { id: "parigi", nome: "Parigi", paese: "Francia", lat: 48.85, lon: 2.35 },
  { id: "londra", nome: "Londra", paese: "Regno Unito", lat: 51.51, lon: -0.13 },
  { id: "madrid", nome: "Madrid", paese: "Spagna", lat: 40.42, lon: -3.7 },
  { id: "berlino", nome: "Berlino", paese: "Germania", lat: 52.52, lon: 13.4 },
  { id: "lisbona", nome: "Lisbona", paese: "Portogallo", lat: 38.72, lon: -9.14 },
];
