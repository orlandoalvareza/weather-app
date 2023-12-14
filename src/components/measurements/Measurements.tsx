import useCurrentWeather from "../../hooks/useCurrentWeather";
import Skeleton from '@mui/material/Skeleton';
import { getFormattedTime } from "../../util/time";

import modules from './Measurements.module.css';

const Measurements: React.FC = () => {
  const { weatherData, isLoading } = useCurrentWeather();

  const getWindDirection = (deg: number) => {
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

    const degrees = (deg % 360 + 360) % 360;
    const index = Math.floor((degrees + 22.5) / 45);

    return cardinalDirections[index];
  }

  const sunrise = getFormattedTime(weatherData.sys?.sunrise!);
  const sunset = getFormattedTime(weatherData.sys?.sunset!);

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
    <div className={modules["measurements-container"]}>
      <h2>Measurements</h2>
      <div className={modules["measurements"]}>
        {isLoading ? skeleton : <p>Sunrise: {sunrise}</p>}
        {isLoading ? skeleton : <p>Sunset: {sunset}</p>}
        {isLoading ? skeleton : <p>Pressure: {pressure} hPa</p>}
        {isLoading ? skeleton : <p>Humidity: {humidity} %</p>}
        {isLoading ? skeleton : <p>Wind: {windSpeed} mph, {windDeg}</p>}
        {isLoading ? skeleton : <p>Cloudiness: {cloudiness} %</p>}
        {isLoading ? skeleton : <p>Visibility: {visibility} mi</p>}
      </div>
    </div> 
  )
}

export default Measurements;