import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { fetchForecastWeather } from "../../util/http";
import { LocationContextType } from "../../interfaces/location-context";
import { HourlyForecastData } from "../../interfaces/hourly-forecast";
import { getFormattedTime } from "../../util/time";
import modules from './HourlyForecast.module.css';

const HourlyForecast = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecastData[]>([]);

  useEffect(() => {
    async function getCurrentWeather() {
      const forecastData = await fetchForecastWeather(ctx.location);
      setHourlyForecastData(forecastData.list.slice(0,8))
    }
    getCurrentWeather();
  }, [ctx.location])

  const getIcon = (icon: string) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  return (
    <div className={modules["hourly-forecast"]}>
      <h2>Hourly forecast</h2>
      <ul className={modules["forecast-list"]}>
        {hourlyForecastData.map((hourlyForecast: HourlyForecastData, index: number) => (
          <li key={hourlyForecast.dt} className={modules.forecast}>
            <p className={modules["forecast-time"]}>
              {getFormattedTime(hourlyForecast.dt)}
            </p>
            <img src={getIcon(hourlyForecastData[index].weather[0].icon)} alt="forecast-icon"/>
            <p className={modules["forecast-temp"]}>
              {Math.round(hourlyForecast.main.temp - 273)} °C
            </p>
            <p>{hourlyForecast.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HourlyForecast;