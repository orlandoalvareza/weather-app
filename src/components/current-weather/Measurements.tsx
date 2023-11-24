import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { WeatherData } from "../../interfaces/weather-data";
import { fetchCurrentWeather } from "../../util/http";

const Measurements = () => {
  const ctx = useContext(LocationContext);
  const [measurementsData, setMeasurementsData] = useState<WeatherData | null>(null);  

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

  const sunrise = measurementsData && getTime(measurementsData.sys.sunrise);
  const sunset = measurementsData && getTime(measurementsData.sys.sunset);

  const pressure = measurementsData && measurementsData.main.pressure;
  const humidity = measurementsData && measurementsData.main.humidity;
  const wind = measurementsData && measurementsData.wind.speed;
  const cloudiness = measurementsData && measurementsData.clouds.all;

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