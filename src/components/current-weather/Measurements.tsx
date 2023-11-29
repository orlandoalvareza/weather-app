import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { LocationContextType } from "../../interfaces/location-context";
import { fetchCurrentWeather } from "../../util/http";
import { getFormattedTime } from "../../util/time";
import modules from './Measurements.module.css';

const Measurements = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [measurementsData, setMeasurementsData] = useState<WeatherData>({});  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(ctx.location);
      setMeasurementsData(data);
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

  return (
    <div className={modules["measurements-container"]}>
      <h2>Measurements</h2>
      <div className={modules["measurements"]}>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
        <p>Pressure: {pressure} hPa</p>
        <p>Humidity: {humidity} %</p>
        <p>Wind: {windSpeed} mph, {windDeg}</p>
        <p>Cloudiness: {cloudiness} %</p>
        <p>Visibility: {visibility} mi</p>
      </div>
    </div> 
  )
}

export default Measurements;