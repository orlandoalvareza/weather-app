import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { fetchCurrentWeather } from "../../util/http";
import { WeatherData } from "../../interfaces/weather-data";

const CurrentWeather = () => {
  const ctx = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(ctx.location);
      setWeatherData(data);
    }

    getCurrentWeather();
  }, [ctx])

  const getCurrentDate = (currentDate: number) => {
    const date = new Date(currentDate * 1000);

    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'short' });;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  
    return `${dayOfWeek}, ${month} ${day} ${year}`;
  }

  const cityName = weatherData && weatherData.name;
  const country = weatherData && weatherData.sys.country;

  const date = weatherData && getCurrentDate(weatherData.dt);

  const currentWeather = weatherData && Math.round(weatherData.main.temp - 273);
  const feelsLikeWeather = weatherData && Math.round(weatherData.main.feels_like - 273);
  const weatherDescription = weatherData && weatherData.weather[0].description.toUpperCase();
  const maxTemp = weatherData && Math.round(weatherData.main["temp_max"] - 273);
  const minTemp = weatherData && Math.round(weatherData.main["temp_min"] - 273);

  return (
    <div className="current-weather-container">
      <div className="location-container">
        <h2>{cityName}, {country}</h2>
        <h2>{date}</h2>
      </div>
      <div className="temp-container">
        <span>{currentWeather} °C</span>
        <span>Feels like {feelsLikeWeather} °C</span>
        <span>{weatherDescription}</span>
        <span>H: {maxTemp} °</span>
        <span>L: {minTemp} °</span>
      </div>
    </div>
  )
}

export default CurrentWeather;