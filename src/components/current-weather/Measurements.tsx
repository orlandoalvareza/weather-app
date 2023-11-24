import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { LocationContextType } from "../../interfaces/location-context";
import { fetchCurrentWeather } from "../../util/http";
import { getFormattedTime } from "../../util/time";

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

  const sunrise = getFormattedTime(measurementsData.sys?.sunrise!);
  const sunset = getFormattedTime(measurementsData.sys?.sunset!);

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