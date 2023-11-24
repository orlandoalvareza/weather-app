import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { DailyForecastData, WeatherListForecast } from "../../interfaces/daily-forecast";
import { LocationContextType } from "../../interfaces/location-context";
import { fetchForecastWeather } from "../../util/http";
import { getWeekDay } from "../../util/time";

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

  const filteredDailyForecast = dailyForecastData.list?.filter((forecast, index) => (index + 1) % 8 === 0);
 
  return (
    <div className="daily-forecast">
      <h2>Daily forecast</h2>
      <ul>
        {filteredDailyForecast?.map((dailyForecast: WeatherListForecast) => (
          <li key={dailyForecast.dt}>
            <p>{getWeekDay(dailyForecast.dt)}</p>
            <p>icon</p>
            <p>{Math.round(dailyForecast.main.temp - 273)} °C</p>
            <p>{dailyForecast.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DailyForecast;