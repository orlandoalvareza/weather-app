import { useContext } from "react";

import useCurrentWeather from "../../hooks/useCurrentWeather";
import useTheme from "../../hooks/useTheme";
import LocationContext from "../../context/location-context";
import Skeleton from '@mui/material/Skeleton';
import { getFormattedTime } from "../../util/time";
import { LocationContextType } from "../../interfaces/location-context";

import modules from './Measurements.module.css';

const Measurements: React.FC = () => {
  const { weatherData, isLoading } = useCurrentWeather();
  const { timezone } = useContext<LocationContextType>(LocationContext);
  const theme = useTheme();

  const getWindDirection = (deg: number) => {
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

    const degrees = (deg % 360 + 360) % 360;
    const index = Math.floor((degrees + 22.5) / 45);

    return cardinalDirections[index];
  }

  const currentTimezone = weatherData?.timezone!;
  const timezoneDifference = currentTimezone - timezone;

  const sunrise = getFormattedTime(weatherData.sys?.sunrise! + timezoneDifference);
  const sunset = getFormattedTime(weatherData.sys?.sunset! + timezoneDifference);

  const pressure = weatherData.main?.pressure;
  const humidity = weatherData.main?.humidity;
  const windSpeed = weatherData.wind && (
    Number(weatherData.wind.speed * 2.237).toFixed(2)
  );
  const windDeg = weatherData.wind && (
    getWindDirection(weatherData.wind.deg)
  );  
  const cloudiness = weatherData.clouds?.all;
  const visibility = weatherData?.visibility && (
    Number(weatherData.visibility * 0.000621371).toFixed(2)
  );

  const skeleton = <Skeleton variant="text" sx={{ fontSize: '18px' }}/>;

  return (
    <div className={`${modules["measurements-container"]} ${modules[theme]}`}>
      <h2>Measurements</h2>
      <div className={modules["measurements"]}>
        {isLoading ? skeleton : <p>Sunrise: <span>{sunrise}</span></p>}
        {isLoading ? skeleton : <p>Sunset: <span>{sunset}</span></p>}
        {isLoading ? skeleton : <p>Pressure: <span>{pressure} hPa</span></p>}
        {isLoading ? skeleton : <p>Humidity: <span>{humidity} %</span></p>}
        {isLoading ? skeleton : <p>Wind: <span>{windSpeed} mph</span>, <span>{windDeg}</span></p>}
        {isLoading ? skeleton : <p>Cloudiness: <span>{cloudiness} %</span></p>}
        {isLoading ? skeleton : <p>Visibility: <span>{visibility} mi</span></p>}
      </div>
    </div> 
  )
}

export default Measurements;