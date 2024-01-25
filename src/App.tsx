import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useTheme from "./hooks/useTheme";
import useCurrentLocation from "./hooks/useCurrentLocation";
import useScreenSizeListener from "./hooks/useScreenSizeListener";
import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Suggestions from "./components/suggestions/Suggestions";
import Measurements from "./components/measurements/Measurements";
import SunriseSunset from "./components/sunrise-sunset/SunriseSunset";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const theme = useTheme();
  useCurrentLocation();
  const isScreenSizeToLaptop = useScreenSizeListener();
  const [isFirstSection, SetIsFirstSection] = useState<boolean>(true);

  const appClass = `App ${theme}`;

  const displayFirstSectionHandler = () => {
    SetIsFirstSection(true);
  }

  const displaySecondSectionHandler = () => {
    SetIsFirstSection(false);
  }

  const screenSizeToLaptopContent = (
    <>
      {!isFirstSection && (
        <button 
          onClick={displayFirstSectionHandler}
          className="App__back-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretLeft}/>
        </button>
      )}
      {isFirstSection && (
        <>
          <DailyForecast/>
          <Measurements/>
          <SunriseSunset/>
        </>
      )}
      {!isFirstSection && (
        <>
          <Measurements/>
          <SunriseSunset/>
          <Suggestions/>
        </>
      )}        
      {isFirstSection && (
        <button 
          onClick={displaySecondSectionHandler}
          className="App__next-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretRight}/>
        </button>
      )}
    </>
  );

  const screenSizeToDesktopContent = (
    <>
      <DailyForecast/>
      <Measurements/>
      <SunriseSunset/>
      <Suggestions/>
    </>
  );
  
  return (
    <div className={appClass}>
      <Header/>
      <LocationsHistory/>
      <CurrentWeather/>
      <HourlyForecast/>
      <section className="App__section">
        {isScreenSizeToLaptop && screenSizeToLaptopContent}
        {!isScreenSizeToLaptop && screenSizeToDesktopContent}
      </section>
    </div>
  );
}

export default App;
