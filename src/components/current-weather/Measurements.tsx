import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { fetchCurrentWeather } from "../../util/http";

const Measurements = () => {
  const ctx = useContext(LocationContext);
  const [measurementsData, setMeasurementsData] = useState<WeatherData>({});  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(ctx.location);
      setMeasurementsData(data);
    }

    getCurrentWeather();
  }, [ctx])

  const getTime = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const meridiemIndicator = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;

    return `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiemIndicator}`;
  }

  const sunrise = getTime(measurementsData.sys?.sunrise!);
  const sunset = getTime(measurementsData.sys?.sunset!);

  const pressure = measurementsData.main?.pressure;
  const humidity = measurementsData.main?.humidity;
  const wind = measurementsData.wind?.speed;
  const cloudiness = measurementsData.clouds?.all;

  return (
    <div className="measurements-container">
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity} %</p>
      <p>Wind: {wind} m/s</p>
      <p>Cloudiness: {cloudiness} %</p>
    </div> 
  )
}

export default Measurements;