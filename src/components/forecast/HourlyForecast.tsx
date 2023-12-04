import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import TemperatureUnitsContext from "../../context/temperature-units-context";
import { TempUnitsContextType } from "../../interfaces/temperature-units-context";
import { LocationContextType } from "../../interfaces/location-context";
import { HourlyForecastData } from "../../interfaces/hourly-forecast";
import { fetchForecastWeather } from "../../util/http";
import { convertTemperature } from "../../util/temperature";
import { getFormattedTime } from "../../util/time";

import modules from './HourlyForecast.module.css';

const HourlyForecast: React.FC = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const { isCelsius } = useContext<TempUnitsContextType>(TemperatureUnitsContext);
  const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecastData[]>([]);

  useEffect(() => {
    async function getCurrentWeather() {
      const forecastData = await fetchForecastWeather(location);
      setHourlyForecastData(forecastData.list.slice(0,8));
    }
    getCurrentWeather();
  }, [location])

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
              {convertTemperature(hourlyForecast.main.temp, isCelsius)} {isCelsius ? '°C' : '°F'}
            </p>
            <p>{hourlyForecast.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HourlyForecast;