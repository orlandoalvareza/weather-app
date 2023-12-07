import { useContext, useEffect, useState } from "react";

import Skeleton from '@mui/material/Skeleton';
import LocationContext from "../../context/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { LocationContextType } from "../../interfaces/location-context";
import { fetchCurrentWeather } from "../../util/http";
import { getFormattedTime } from "../../util/time";

import modules from './Measurements.module.css';

const Measurements: React.FC = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [measurementsData, setMeasurementsData] = useState<WeatherData>({});  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCurrentWeather() {
      setIsLoading(true);
      const data = await fetchCurrentWeather(ctx.location);

      setMeasurementsData(data);
      setIsLoading(false);
    }

    getCurrentWeather();
  }, [ctx])

  const getWindDirection = (deg: number) => {
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

    const degrees = (deg % 360 + 360) % 360;
    const index = Math.floor((degrees + 22.5) / 45);

    return cardinalDirections[index];
  }

  const sunrise = getFormattedTime(measurementsData.sys?.sunrise!);
  const sunset = getFormattedTime(measurementsData.sys?.sunset!);

  const pressure = measurementsData.main?.pressure;
  const humidity = measurementsData.main?.humidity;
  const windSpeed = measurementsData.wind && (
    Number(measurementsData.wind.speed * 2.237).toFixed(2)
  );
  const windDeg = measurementsData.wind && (
    getWindDirection(measurementsData.wind.deg)
  );  
  const cloudiness = measurementsData.clouds?.all;
  const visibility = measurementsData?.visibility && (
    Number(measurementsData.visibility * 0.000621371).toFixed(2)
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