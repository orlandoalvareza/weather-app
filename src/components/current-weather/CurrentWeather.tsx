import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { LocationContextType } from "../../interfaces/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { fetchCurrentWeather } from "../../util/http";
import { getCurrentDate } from "../../util/time";
import modules from './CurrentWeather.module.css';

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

  const temp = Math.round(weatherData.main?.temp! - 273);
  const feelsLikeWeather = Math.round(weatherData.main?.feels_like! - 273);
  const weatherDescription = weatherData.weather && weatherData.weather[0].description.toUpperCase();
  const maxTemp = weatherData.main && Math.round(weatherData.main["temp_max"] - 273);
  const minTemp = weatherData.main &&  Math.round(weatherData.main["temp_min"] - 273);

  return (
    <div className={modules["current-weather-container"]}>
      <div className={modules["location-container"]}>
        <h2>
          <span>{cityName}</span>, {country}
        </h2>
        <h3>{date}</h3>
      </div>
      <div className={modules["temp-container"]}>
        <h1>{temp} °C</h1>
        <div>
          <p>Feels like {feelsLikeWeather} °C</p>
          <p>{weatherDescription}</p>
          <div>
            <span>H: {maxTemp} °</span>
            <span>L: {minTemp} °</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;