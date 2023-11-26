import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import Measurements from "./components/current-weather/Measurements";
import HourlyForecast from "./components/forecast/HourlyForecast";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <CurrentWeather/>
      <HourlyForecast/>
      <section className="App__section">
        <DailyForecast/>
        <Measurements/>
      </section>
    </div>
  );
}

export default App;
