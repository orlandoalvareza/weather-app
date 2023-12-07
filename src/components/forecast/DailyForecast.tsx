import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import TemperatureUnitsContext from "../../context/temperature-units-context";
import Skeleton from '@mui/material/Skeleton';
import { DailyForecastData, WeatherListForecast } from "../../interfaces/daily-forecast";
import { LocationContextType } from "../../interfaces/location-context";
import { TempUnitsContextType } from "../../interfaces/temperature-units-context";
import { fetchForecastWeather } from "../../util/http";
import { convertTemperature } from "../../util/temperature";
import { getWeekDay } from "../../util/time";

import modules from './DailyForecast.module.css';

const DailyForecast: React.FC = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const { isCelsius } = useContext<TempUnitsContextType>(TemperatureUnitsContext);
  const [dailyForecastData, setDailyForecastData] = useState<DailyForecastData>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentWeather() {
      setIsLoading(true);
      const forecastData = await fetchForecastWeather(location);

      setDailyForecastData(forecastData);
      setIsLoading(false);
    }
    getCurrentWeather();
  }, [location])

  const getIcon = (icon: string) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  const filteredDailyForecast = (
    dailyForecastData.list?.filter((forecast, index) => (index + 1) % 8 === 0)
  );

  return (
    <div className={modules["daily-forecast"]}>
      <h2>Daily forecast</h2>
      <ul className={modules["forecast-list"]}>
        {filteredDailyForecast?.map((dailyForecast: WeatherListForecast, index: number) => (
          <li key={dailyForecast.dt} className={modules.forecast}>
            {isLoading 
              ? (
                <>
                  <Skeleton variant="text" sx={{ width: '90px', height: '26px' }} /> 
                  <Skeleton variant="rounded" width={35} height={30}/>
                  <Skeleton variant="rounded" width={30} height={25}/>
                </>
              )
              : (
                <>
                  <p>{getWeekDay(dailyForecast.dt)}</p>
                  <img 
                    src={getIcon(dailyForecastData.list![index].weather[0].icon)} 
                    alt="forecast-icon" 
                  />
                  <span>
                    {convertTemperature(dailyForecast.main.temp, isCelsius)} {isCelsius ? '°C' : '°F'}
                  </span>
                </>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DailyForecast;