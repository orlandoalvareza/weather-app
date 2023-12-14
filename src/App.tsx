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

function App() {
  useCurrentLocation();

  const time = new Date();
  console.log(time);
  
  return (
    <div className="App">
      <Header/>
      <LocationsHistory/>
      <CurrentWeather/>
      <HourlyForecast/>
      <section className="App__section">
        <DailyForecast/>
        <Measurements/>
        <SunriseSunset/>
        <Suggestions/>
      </section>
    </div>
  );
}

export default App;
