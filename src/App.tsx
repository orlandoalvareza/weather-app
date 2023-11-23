import { useState } from "react";

import Header from "./components/Header";
import CityInput from "./components/CityInput";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";

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
