import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Suggestions from "./components/current-weather/Suggestions";
import Measurements from "./components/current-weather/Measurements";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
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
