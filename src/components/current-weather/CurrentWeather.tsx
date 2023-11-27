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

  const icon = weatherData.weather && weatherData.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/w/${icon}.png`;

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
      <div className={modules["weather-container"]}>
        <img src={iconSrc} alt="weather-icon"/>
        <p>{weatherDescription}</p>
      </div>
      <div className={modules["temp-container"]}>
        <h1 className={modules["temp-container__temp"]}>
          {temp}
          <span>°C</span>
        </h1>
        <div className={modules["temp-container__aside"]}>
          <p>Feels like {feelsLikeWeather} °C</p>
          <section className={modules["temp-container__aside-section"]}>
            <span>H: {maxTemp} °</span>
            <span>L: {minTemp} °</span>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;