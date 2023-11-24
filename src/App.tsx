import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import DailyForecast from "./components/forecast/DailyForecast";
import Measurements from "./components/current-weather/Measurements";
import HourlyForecast from "./components/forecast/HourlyForecast";

function App() {
  return (
    <div className="App">
      <Header/>
      <CurrentWeather/>
      <HourlyForecast/>
      <div>
        <DailyForecast/>
        <Measurements/>
      </div>
    </div>
  );
}

export default App;
