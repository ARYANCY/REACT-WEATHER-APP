import { useState } from "react";

export default function Search({ setLocationData, recentSearches = [], favoriteLocations = [] }) {
  const [query, setQuery] = useState("");

  const searchLocation = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const location = {
          name: data[0].name,
          lat: data[0].lat,
          lon: data[0].lon
        };
        setLocationData(location);
        setQuery(""); 
      } else {
        alert("Location not found");
      }
    } catch (err) {
      alert("Error searching location");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") searchLocation(query.trim());
  };

  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.75em 1em", borderRadius: "12px", width: "250px", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.75em 1.5em", borderRadius: "12px", cursor: "pointer" }}>
          Search
        </button>
      </form>

      {favoriteLocations.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <strong>⭐ Favorites:</strong>
          {favoriteLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => setLocationData(loc)}
              style={{
                margin: "0.25rem",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                cursor: "pointer",
                background: "#ffe066"
              }}
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}

      {recentSearches.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <strong>🕑 Recent Searches:</strong>
          {recentSearches.map((loc) => (
            <button
              key={loc.name}
              onClick={() => setLocationData(loc)}
              style={{
                margin: "0.25rem",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                cursor: "pointer",
                background: "#a3cef1"
              }}
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
