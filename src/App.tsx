import { useEffect, useState } from "react";

import { WeatherData } from './interfaces/weather-data';
import Header from "./components/Header";

const initialWeatherData: WeatherData = {
  coord: {},
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0
  },
  clouds: {},
  dt: 0,
  sys: {},
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
};

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);

  useEffect(() => {
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [])
    
  const apiKey = process.env.REACT_APP_API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=${apiKey}`;

  const date = new Date(weatherData.dt * 1000).toLocaleString();
  
  return (
    <div className="App">
      <Header/>
      <form>
        <label htmlFor="city">Search for a city</label>
        <input type="text" id="city" name="city"/>
        <button type="submit">Search</button>
      </form>
      <div className="main-container">
        <div className="location-container">
          <h2>{weatherData.name}</h2>
          <span>{date}</span>
        </div>
        <div className="temp-container">
          <span>{Math.round(weatherData.main.temp - 273)} °C</span>
          <span>   Feels like {Math.round(weatherData.main.feels_like - 273)} °C</span>
        </div>
        <div className="extra-measurements-container">
          <span>Pressure: {weatherData.main.pressure} hPa</span>
          <span>Humidity: {weatherData.main.humidity} %</span>
          <span>Wind: {weatherData.wind.speed} m/s</span>
        </div>
      </div>
      <div className="forecast-container"></div>
    </div>
  );
}

export default App;
