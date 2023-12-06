import { useContext, useEffect } from "react";

import LocationContext from "./context/location-context";
import { getLocation } from "./util/http";
import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Suggestions from "./components/suggestions/Suggestions";
import Measurements from "./components/current-weather/Measurements";

import './App.css';

function App() {
  const { onChangeInitialLocation } = useContext(LocationContext);

  useEffect(() => {
    const handlePosition = async (position: any) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      const location = await getLocation(latitude, longitude);
      onChangeInitialLocation(location.name);
    }

    const handleError = (error: any) => {
      console.error(`Error getting location: ${error.message}`);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }, []);
  
  return (
    <div className="App">
      <Header/>
      <LocationsHistory/>
      <CurrentWeather/>
      <HourlyForecast/>
      <section className="App__section">
        <DailyForecast/>
        <section className="App__sub-section">
          <Suggestions/>
          <Measurements/>
        </section>
      </section>
    </div>
  );
}

export default App;
