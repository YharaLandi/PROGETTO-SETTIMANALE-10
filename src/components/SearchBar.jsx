// Input di ricerca riutilizzabile: la logica (cosa fare con il testo)
// resta nel componente genitore, passata tramite props.
function SearchBar({ valore, onChange, placeholder = "Cerca una città" }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icona"><i className="bi bi-search"></i></span>
      <input
        type="text"
        value={valore}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
