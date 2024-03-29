import { useContext } from 'react';

import useCurrentWeather from '../../hooks/useCurrentWeather';
import useTheme from '../../hooks/useTheme';
import LocationContext from '../../context/location-context';
import Skeleton from '@mui/material/Skeleton';
import RemainingTimeBar from './RemainingTimeBar';
import { getCurrentTimeInSeconds, getExpectedTime } from '../../util/time';
import { LocationContextType } from '../../interfaces/location-context';

import modules from './SunriseSunset.module.css';

const SunriseSunset: React.FC = () => {
  const { weatherData, isLoading } = useCurrentWeather();
  const { timezone } = useContext<LocationContextType>(LocationContext);
  const theme = useTheme();

  const currentTimezone = weatherData?.timezone!;
  const timezoneDifference = currentTimezone - timezone;

  const currentTime = getCurrentTimeInSeconds();
  const sunrise = getCurrentTimeInSeconds(weatherData.sys?.sunrise! + timezoneDifference);
  const sunset = getCurrentTimeInSeconds(weatherData.sys?.sunset! + timezoneDifference);

  let expectedTimeToSunrise;
  let expectedTimeToSunset;

  let expectedNewDayTimeToSunrise;
  let totalOfSecondsToSunrise;

  if (sunrise - currentTime > 0) {
    expectedTimeToSunrise = getExpectedTime(sunrise - currentTime);
  }

  if (sunset - currentTime > 0) {
    expectedTimeToSunset = getExpectedTime(sunset - currentTime);
  }

  if (!expectedTimeToSunrise && !expectedTimeToSunset) {
    const totalCurrentSecondsOfDay = getCurrentTimeInSeconds();
    const remainingSecondsOfDay = 86400 - totalCurrentSecondsOfDay;
    totalOfSecondsToSunrise = remainingSecondsOfDay + sunrise;
    expectedNewDayTimeToSunrise = getExpectedTime(totalOfSecondsToSunrise);
  }

  return (
    <div className={`${modules["sunrise-sunset-container"]} ${modules[theme]}`}>
      <h2>Sunrise - Sunset</h2>
      <div>
        <div className={modules["sunrise-container"]}>
          <h2>Time to sunrise</h2>
          {isLoading && (
            <Skeleton variant="circular" width={100} height={100}/>
          )}
          {!isLoading && (
            <>
              {expectedTimeToSunrise && (
                <RemainingTimeBar 
                  timeRemainingInSeconds={sunrise - currentTime} 
                  expectedTime={expectedTimeToSunrise}
                />
              )}
              {expectedNewDayTimeToSunrise && totalOfSecondsToSunrise && (
                <RemainingTimeBar 
                  timeRemainingInSeconds={totalOfSecondsToSunrise} 
                  expectedTime={expectedNewDayTimeToSunrise}
                />
              )}
              {!expectedTimeToSunrise && expectedTimeToSunset && (
                <RemainingTimeBar 
                  timeRemainingInSeconds={0} 
                  expectedTime={'-- --'}
                />
              )}
            </>
          )}
        </div>
        <div className={modules["sunset-container"]}>
          <h2>Time to sunset</h2>
          {isLoading && (
            <Skeleton variant="circular" width={100} height={100}/>
          )}
          {!isLoading && (
            <>
              {expectedTimeToSunset 
                ? <RemainingTimeBar timeRemainingInSeconds={sunset} expectedTime={expectedTimeToSunset}/> 
                : <RemainingTimeBar timeRemainingInSeconds={0} expectedTime={'-- --'}/> 
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SunriseSunset;