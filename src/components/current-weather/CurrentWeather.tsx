import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { LocationContextType } from "../../interfaces/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { fetchCurrentWeather } from "../../util/http";
import { getCurrentDate } from "../../util/time";

const CurrentWeather = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [weatherData, setWeatherData] = useState<WeatherData>({});  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(ctx.location);
      setWeatherData(data);
    }

    getCurrentWeather();
  }, [ctx])

  const cityName = weatherData.name;
  const country = weatherData.sys?.country;

  const date = weatherData.dt && getCurrentDate(weatherData.dt);

  const currentWeather = Math.round(weatherData.main?.temp! - 273);
  const feelsLikeWeather = Math.round(weatherData.main?.feels_like! - 273);
  const weatherDescription = weatherData.weather && weatherData.weather[0].description.toUpperCase();
  const maxTemp = weatherData.main && Math.round(weatherData.main["temp_max"] - 273);
  const minTemp = weatherData.main &&  Math.round(weatherData.main["temp_min"] - 273);

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