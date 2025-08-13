import Search from "./searchbox";
import InfoBox from "./infobox";
import { useState } from "react";
import '../src/App.css';
export default function App (){
  const [LocationData, setLocationData] = useState(null);

  return(
    <>
      <Search setLocationData={setLocationData}/>
      {LocationData && <InfoBox LocationData={LocationData} />}
    </>
  )
}