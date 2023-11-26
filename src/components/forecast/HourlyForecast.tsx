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

  return (
    <div className={modules["hourly-forecast"]}>
      <h2>Hourly forecast</h2>
      <ul className={modules["forecast-list"]}>
        {hourlyForecastData.map((hourlyForecast: HourlyForecastData) => (
          <li key={hourlyForecast.dt} className={modules.forecast}>
            <p>{getFormattedTime(hourlyForecast.dt)}</p>
            <p>icon</p>
            <p>{Math.round(hourlyForecast.main.temp - 273)} °C</p>
            <p>{hourlyForecast.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HourlyForecast;