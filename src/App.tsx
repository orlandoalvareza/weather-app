import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Suggestions from "./components/suggestions/Suggestions";
import Measurements from "./components/current-weather/Measurements";

import './App.css';

function App() {
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
