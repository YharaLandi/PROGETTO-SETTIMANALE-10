# App Meteo

Progetto React (Vite) — app meteo con Homepage, Ricerca e Dettaglio città.

## Avvio

```
npm install
npm run dev
```

## Tecnologie usate
- **react-router-dom**: routing tra Home (`/`), Ricerca (`/ricerca`), Dettaglio (`/dettaglio/:id`)
- **Lift state up**: lista città e cronologia ricerche vivono in `App.jsx` e vengono passate come props
- **useEffect (mount/update)**: negli hook `useMeteoAttuale` / `useMeteoDettaglio` (src/hooks/useMeteo.js) per il fetch dati al primo render e quando cambiano lat/lon; in `Ricerca.jsx` per la ricerca live con debounce
- **Custom hooks**: `useMeteoAttuale`, `useMeteoDettaglio`
- Dati meteo reali da **Open-Meteo** (nessuna API key richiesta)

## Struttura
- `src/pages` — le 3 schermate
- `src/components` — componenti riutilizzabili (Navbar, Footer, SearchBar, WeatherIcon, ecc.)
- `src/hooks` — custom hook per il fetch meteo
- `src/data` — lista capitali + funzioni di chiamata API
