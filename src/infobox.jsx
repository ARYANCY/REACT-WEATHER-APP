import { useState,useEffect } from "react"



import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function InfoBox({LocationData}){
  let [info,setinfo] = useState({
    temp : "",
    feels_like :"",
    pressure :"",
    humidity : "",
    visibility:"",
    wind_speed:"",
    wind_deg: "",
    weather_description : ""
  });

  const weatherImages = {
      clear: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
      rain: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
      thunderstorm: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7",
      drizzle: "https://images.unsplash.com/photo-1559599101-4160fbf3f962",
      snow: "https://images.unsplash.com/photo-1608889175399-2f950c417cb3",
      mist: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      haze: "https://images.unsplash.com/photo-1606580114359-4aa1f2fa84fc",
      fog: "https://images.unsplash.com/photo-1612531384974-4772eb4a6b6e",
      smoke: "https://images.unsplash.com/photo-1615843035396-167abb6f2b8f",
      dust: "https://images.unsplash.com/photo-1572687410080-009fdf4d65be",
      sand: "https://images.unsplash.com/photo-1606788075765-9fe90a6d597d",
      tornado: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147"
  }



  useEffect(() => {
    if (LocationData) WeatherInfo();
  }, [LocationData]);  

  let WeatherInfo = async() => {
    let url = "https://api.openweathermap.org/data/2.5/weather";
    let api_key = import.meta.env.VITE_API_KEY;
    
    try{
      let response = await fetch(`${url}?lat=${LocationData.lat}&lon=${LocationData.lon}&appid=${api_key}&units=metric`);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      setinfo({
        temp: jsonResponse.main.temp,
        feels_like: jsonResponse.main.feels_like,
        pressure: jsonResponse.main.pressure,
        humidity: jsonResponse.main.humidity,
        visibility: jsonResponse.visibility,
        wind_speed: jsonResponse.wind.speed,
        wind_deg : jsonResponse.wind.deg,
        weather_description : jsonResponse.weather[0].description
      })
    }
    catch(e){
      alert("ERROR in fetching data");
    }
  }
  return(
    <>
        <div><Card sx={{ width:545,maxWidth: 545 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                weatherImages[
                  info.weather_description?.toLowerCase()?.split(" ")[0]
                ] || "https://images.unsplash.com/photo-1499346030926-9a72daac6c63"
              }
              alt={info.weather_description}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Weather Info for {LocationData.name}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <p>Temperature: {info.temp}°C</p>
                <p>Feels Like: {info.feels_like}°C</p>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <p>Pressure: {info.pressure} hPa</p>
                <p>Humidity: {info.humidity}%</p>
                <p>Dew Point: {info.dew_point}°C</p>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <p>Wind Speed: {info.wind_speed} m/s</p>
                <p>Wind Direction: {info.wind_deg}°</p>
                <p>Condition: {info.weather_description}</p>
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>      
      </div>
    </>
  )
}