import Header from "./components/header/Header";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import ForecastWeather from "./components/forecast/ForecastWeather";

function App() {
  return (
    <div className="App">
      <Header/>
      <CurrentWeather/>
      <ForecastWeather/>
    </div>
  );
}

export default App;
