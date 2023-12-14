import { useContext, useEffect, useState } from 'react';

import LocationContext from '../../context/location-context';
import { fetchCurrentWeather } from '../../util/http';
import { getCurrentTimeInMin } from '../../util/time';
import { LocationContextType } from '../../interfaces/location-context';
import { WeatherData } from '../../interfaces/current-weather';

import modules from './SunriseSunset.module.css';

const SunriseSunset = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [measurementsData, setMeasurementsData] = useState<WeatherData>({});  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentWeather() {
      setIsLoading(true);
      const data = await fetchCurrentWeather(ctx.location);

      setMeasurementsData(data);
      setIsLoading(false);
    }

    getCurrentWeather();
  }, [ctx])

  const currentTime = getCurrentTimeInMin();
  const sunrise = getCurrentTimeInMin(measurementsData.sys?.sunrise!);
  const sunset = getCurrentTimeInMin(measurementsData.sys?.sunset!);
  
  // console.log('currentTime', currentTime);
  // console.log('sunrise', sunrise);
  // console.log('sunset', sunset);

  return (
    <div className={modules["sunrise-sunset-container"]}>
      <h2>Sunrise - Sunset</h2>
      <div>
        <div className={modules["sunrise-container"]}>
          <h2>Time to sunrise</h2>
          <span>12 hr 00 min</span>
        </div>
        <div className={modules["sunset-container"]}>
          <h2>Time to sunset</h2>
          <span>2 hr 22 min</span>
        </div>
      </div>
    </div>
  )
}

export default SunriseSunset;