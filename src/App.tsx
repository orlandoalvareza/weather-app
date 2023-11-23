import { useState } from "react";

import Header from "./components/header/Header";
import CityInput from "./components/header/CityInput";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import ForecastWeather from "./components/forecast/ForecastWeather";

function App() {
  const [location, setLocation] = useState('miami');
  
  const addCityHandler = (enteredCity: string) => {
    setLocation(enteredCity);
  }
  
  return (
    <div className="App">
      <Header/>
      <CityInput onAddCity={addCityHandler}/>
      <CurrentWeather location={location}/>
      <ForecastWeather location={location}/>
    </div>
  );
}

export default App;
