import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { fetchForecastWeather } from "../../util/http";
import { HourlyForecastData } from "../../interfaces/hourly-forecast";

const HourlyForecast = () => {
  const ctx = useContext(LocationContext);
  const [hourlyData, setHourlyData] = useState<HourlyForecastData[]>([]);

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchForecastWeather(ctx.location);
      setHourlyData(data.list.slice(0,8))
    }
    getCurrentWeather();
  }, [ctx.location])

  return (
    <div className="hourly-forecast">
      <h2>Hourly forecast</h2>
      <ul>
        {hourlyData.map((hourlyForecast: any) => (
          <li key={hourlyForecast.dt}>
            <p>{new Date(hourlyForecast.dt * 1000).toUTCString()}</p>
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