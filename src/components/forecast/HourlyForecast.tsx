import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import TemperatureUnitsContext from "../../context/temperature-units-context";
import useTheme from "../../hooks/useTheme";
import Skeleton from '@mui/material/Skeleton';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    async function getForecastWeather() {
      setIsLoading(true);
      const forecastData = await fetchForecastWeather(location);

      if (forecastData.error) {
        return;
      }
      
      setHourlyForecastData(forecastData.data.list.slice(0,8));
      setIsLoading(false);
    }
    getForecastWeather();
  }, [location])

  const getIcon = (icon: string) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  return (
    <div className={`${modules[theme]}`}>
      <h2 className={modules["forecast-title"]}>Hourly forecast</h2>
      <ul className={modules["forecast-list"]}>
        {hourlyForecastData.map((hourlyForecast: HourlyForecastData, index: number) => (
          <li key={hourlyForecast.dt} className={modules.forecast}>
            {isLoading 
              ? (
                <>
                  <Skeleton variant="text" sx={{ width: '60px', height: '22px' }} /> 
                  <Skeleton variant="rounded" width={50} height={40}/>
                  <Skeleton variant="text" sx={{ width: '50px', height: '30px' }} /> 
                  <Skeleton variant="text" sx={{ width: '90px', height: '20px' }} /> 
                </>
              )
              : (
                <>
                  <p className={modules["forecast-time"]}>
                    {getFormattedTime(hourlyForecast.dt)}
                  </p>
                  <img 
                    src={getIcon(hourlyForecastData[index].weather[0].icon)} 
                    alt="forecast-icon"
                  />
                  <p className={modules["forecast-temp"]}>
                    {convertTemperature(hourlyForecast.main.temp, isCelsius)} 
                    {isCelsius ? '°C' : '°F'}
                  </p>
                  <p>{hourlyForecast.weather[0].description}</p>
                </>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HourlyForecast;