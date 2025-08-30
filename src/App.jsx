import { useState, useEffect } from "react";
import Search from "./searchbox";
import InfoBox from "./infobox";
import Chatbot from "./chatbot";
import './App.css';

export default function App() {
  const [LocationData, setLocationData] = useState(() => JSON.parse(localStorage.getItem("lastLocation")) || null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [recents, setRecents] = useState(() => JSON.parse(localStorage.getItem("recents")) || []);

  useEffect(() => {
    if (LocationData) {
      localStorage.setItem("lastLocation", JSON.stringify(LocationData));

      let updatedRecents = recents.filter(l => l.name !== LocationData.name);
      updatedRecents.unshift(LocationData);
      if (updatedRecents.length > 5) updatedRecents.pop();
      setRecents(updatedRecents);
      localStorage.setItem("recents", JSON.stringify(updatedRecents));
    }
  }, [LocationData]);

  const toggleFavorite = (location) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex(l => l.name === location.name);
    if (index >= 0) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(location); 
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Search setLocationData={setLocationData} recentSearches={recents} favoriteLocations={favorites} />
      {LocationData && 
        <InfoBox 
          LocationData={LocationData} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
          setWeatherInfo={setWeatherInfo}
        />
      }
      {LocationData && weatherInfo &&
        <Chatbot weatherInfo={weatherInfo} locationName={LocationData.name} />
      }
    </>
  );
}
