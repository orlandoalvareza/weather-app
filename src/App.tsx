import useTheme from "./hooks/useTheme";
import useCurrentLocation from "./hooks/useCurrentLocation";
import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Suggestions from "./components/suggestions/Suggestions";
import Measurements from "./components/measurements/Measurements";
import SunriseSunset from "./components/sunrise-sunset/SunriseSunset";

import './App.css';
import { useState } from "react";

function App() {
  const theme = useTheme();
  useCurrentLocation();
  const [isFirstSection, SetIsFirstSection] = useState<boolean>(true);

  const appClass = `App ${theme}`;

  const displayFirstSectionHandler = () => {
    SetIsFirstSection(true);
  }

  const displaySecondSectionHandler = () => {
    SetIsFirstSection(false);
  }
  
  return (
    <div className={appClass}>
      <Header/>
      <LocationsHistory/>
      <CurrentWeather/>
      <HourlyForecast/>
      <section className="App__section">
        <button onClick={displayFirstSectionHandler}>Back</button>
        {isFirstSection && (
          <>
            <DailyForecast/>
            <Measurements/>
          </>
        )}
        {!isFirstSection && (
          <>
            <SunriseSunset/>
            <Suggestions/>
          </>
        )}        
        <button onClick={displaySecondSectionHandler}>Next</button>
      </section>
    </div>
  );
}

export default App;
