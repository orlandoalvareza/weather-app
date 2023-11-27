import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { DailyForecastData, WeatherListForecast } from "../../interfaces/daily-forecast";
import { LocationContextType } from "../../interfaces/location-context";
import { fetchForecastWeather } from "../../util/http";
import { getWeekDay } from "../../util/time";
import modules from './DailyForecast.module.css';

const DailyForecast = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [dailyForecastData, setDailyForecastData] = useState<DailyForecastData>({});

  useEffect(() => {
    async function getCurrentWeather() {
      const forecastData = await fetchForecastWeather(ctx.location);
      setDailyForecastData(forecastData);
    }
    getCurrentWeather();
  }, [ctx.location])

  const getIcon = (icon: string) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  const filteredDailyForecast = dailyForecastData.list?.filter((forecast, index) => (index + 1) % 8 === 0);

  return (
    <div className={modules["daily-forecast"]}>
      <h2>Daily forecast</h2>
      <ul className={modules["forecast-list"]}>
        {filteredDailyForecast?.map((dailyForecast: WeatherListForecast, index: number) => (
          <li key={dailyForecast.dt} className={modules.forecast}>
            <p>{getWeekDay(dailyForecast.dt)}</p>
            <img src={getIcon(dailyForecastData.list![index].weather[0].icon)} alt="forecast-icon" />
            <span>{Math.round(dailyForecast.main.temp - 273)} °C</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DailyForecast;