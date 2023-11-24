import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import ForecastWeather from "./components/forecast/ForecastWeather";
import Measurements from "./components/current-weather/Measurements";

function App() {
  return (
    <div className="App">
      <Header/>
      <CurrentWeather/>
      <div>
        <ForecastWeather/>
        <Measurements/>
      </div>
    </div>
  );
}

export default App;
