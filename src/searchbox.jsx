import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useState } from "react";
export default function Search({setLocationData,LocationData}){
  let [city,setcity] = useState("");
  
  let handlesubmit = async(event) =>{
    event.preventDefault();
    if (city.trim() !== "") {
      await geoLOCATION(city);
      setcity("");
    }
  }
  let handleChange = (event) => {
    setcity(event.target.value);
  }
 
  let geoLOCATION = async(city) =>{
    let url = "http://api.openweathermap.org/geo/1.0/direct";
    let api_key = "7a93953678ab250321d5263d8096b245";
    try {
        const response = await fetch(`${url}?q=${city}&limit=1&appid=${api_key}`);
        const jsonResponse = await response.json();

        if (jsonResponse.length > 0) {
          const { name, lat, lon } = jsonResponse[0];
          setLocationData({ name, lat, lon });
        } else {
          alert("Location not found.");
        }
    } catch (e) {
        alert("Error in searching location.");
    }
  };

  
  return(
    <>
      <div>
        <Box sx={{ minWidth: 275,padding:10}}>
          <Card variant="outlined">
              <CardContent>
                <form onSubmit={handlesubmit}>
                  <h3 style={{color:'black'}}>SEARCH FOR CITY</h3>
                  <TextField id="outlined-basic" style={{marginBottom:'10px',width:345}} value={city} onChange={handleChange} label="CITY NAME?" variant="outlined" />
                  <br></br>
                  <Button style={{color:'black'}} variant="outlined"type="submit"  >SEARCH</Button>
                  <br/>
                </form> 
              </CardContent>
          </Card>
        </Box>
      </div>
      
      
      
    </>
  )
}