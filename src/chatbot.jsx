import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Chatbot({ defaultWeatherInfo, defaultLocation }) {
  const [messages, setMessages] = useState([
    { type: "bot", text: `Hi! I'm your Weather Buddy. Ask me about the weather anywhere!` }
  ]);
  const [input, setInput] = useState("");

  const fetchWeatherForLocation = async (location) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) return null;

      return {
        name: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        weather_description: data.weather[0].description
      };
    } catch (err) {
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    let weather = defaultWeatherInfo;
    let responseText = "";

    // Check if user mentions a location
    const locationMatch = input.match(/in ([a-zA-Z\s]+)/i);
    if (locationMatch) {
      const locationName = locationMatch[1].trim();
      const fetchedWeather = await fetchWeatherForLocation(locationName);
      if (fetchedWeather) weather = fetchedWeather;
      else {
        responseText = `Sorry, I couldn't find weather for "${locationName}".`;
      }
    }

    if (!responseText) {
      const msg = input.toLowerCase();
      if (msg.includes("temperature")) responseText = `Temperature in ${weather.name}: ${weather.temp}°C, feels like ${weather.feels_like}°C.`;
      else if (msg.includes("humidity")) responseText = `Humidity in ${weather.name}: ${weather.humidity}%.`;
      else if (msg.includes("wind")) responseText = `Wind in ${weather.name}: ${weather.wind_speed} m/s, ${weather.wind_deg}°.`;
      else if (msg.includes("condition") || msg.includes("weather")) responseText = `Weather in ${weather.name}: ${weather.weather_description}.`;
      else if (msg.includes("hello") || msg.includes("hi")) responseText = "Hello! How's your day? 🌤️";
      else responseText = "Try asking about temperature, humidity, wind, or weather in any city!";
    }

    const botMsg = { type: "bot", text: responseText };
    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <Card sx={{ width: 545, maxWidth: 545, marginTop: "1rem", padding: "1rem" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Weather Chatbot</Typography>
        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.type === "bot" ? "left" : "right", margin: "0.3rem 0" }}>
              <span style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "12px",
                backgroundColor: msg.type === "bot" ? "#e0e0e0" : "#5a75f3",
                color: msg.type === "bot" ? "#000" : "#fff",
                maxWidth: "80%"
              }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="contained" onClick={handleSend}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
