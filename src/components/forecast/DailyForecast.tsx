import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { DailyForecastData } from "../../interfaces/daily-forecast";
import { fetchForecastWeather } from "../../util/http";

const DailyForecast = () => {
  const ctx = useContext(LocationContext);
  const [forecastWeatherData, setForecastWeatherData] = useState<DailyForecastData>({});

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchForecastWeather(ctx.location);
      setForecastWeatherData(data);
    }
    getCurrentWeather();
  }, [ctx.location])

  const filteredItems = forecastWeatherData.list?.filter((item, index) => (index + 1) % 8 === 0);
 
  return (
    <div className="daily-forecast">
      <h2>Daily forecast</h2>
      <ul>
        {filteredItems?.map((dailyForecast: any) => (
          <li key={dailyForecast.dt}>
            <p>{new Date(dailyForecast.dt * 1000).toUTCString()}</p>
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