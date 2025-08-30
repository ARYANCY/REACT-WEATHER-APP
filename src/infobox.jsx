import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

export default function InfoBox({ LocationData, favorites, toggleFavorite, setWeatherInfo }) {
  const [info, setInfo] = useState({
    temp: "", feels_like: "", pressure: "", humidity: "",
    visibility: "", wind_speed: "", wind_deg: "", weather_description: ""
  });

  const weatherImages = {
    clear_day: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    clear_night: "https://images.unsplash.com/photo-1505646482943-8ff7e2647f7b",
    clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
    rain: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    thunderstorm: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7",
    snow: "https://images.unsplash.com/photo-1608889175399-2f950c417cb3",
    mist: "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
  };

  useEffect(() => {
    if (LocationData) fetchWeatherInfo();
  }, [LocationData]);

  const fetchWeatherInfo = async () => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(`${url}?lat=${LocationData.lat}&lon=${LocationData.lon}&appid=${api_key}&units=metric`);
      const json = await response.json();
      const newInfo = {
        temp: json.main.temp,
        feels_like: json.main.feels_like,
        pressure: json.main.pressure,
        humidity: json.main.humidity,
        visibility: json.visibility,
        wind_speed: json.wind.speed,
        wind_deg: json.wind.deg,
        weather_description: json.weather[0].description
      };
      setInfo(newInfo);
      setWeatherInfo(newInfo);
    } catch (e) {
      alert("Error fetching weather data");
    }
  };

  const isFavorite = favorites.some(l => l.name === LocationData.name);

  const getImage = () => {
    const hour = new Date().getHours();
    const time = hour >= 6 && hour < 18 ? "day" : "night";
    const key = info.weather_description?.toLowerCase().split(" ")[0];
    if (key === "clear") return weatherImages[`clear_${time}`];
    return weatherImages[key] || weatherImages["clouds"];
  };

  return (
    <Card sx={{ width: 545, maxWidth: 545, marginTop: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={getImage()}
          alt={info.weather_description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            Weather Info for {LocationData.name}
          </Typography>

          <Button 
            variant="contained" 
            color={isFavorite ? "secondary" : "primary"} 
            onClick={() => toggleFavorite(LocationData)}
            sx={{ marginBottom: "1rem" }}
          >
            {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
          </Button>

          <Typography variant="body1">
            Temperature: {info.temp}°C | Feels Like: {info.feels_like}°C
          </Typography>
          <Typography variant="body2">
            Pressure: {info.pressure} hPa | Humidity: {info.humidity}%
          </Typography>
          <Typography variant="body2">
            Wind: {info.wind_speed} m/s, {info.wind_deg}° | Condition: {info.weather_description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
