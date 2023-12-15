import { useContext } from "react";

import Skeleton from '@mui/material/Skeleton';
import TemperatureUnitsContext from "../../context/temperature-units-context";
import useCurrentWeather from "../../hooks/useCurrentWeather";
import { TempUnitsContextType } from "../../interfaces/temperature-units-context";
import { getCurrentDate } from "../../util/time";
import { convertAllTemperatures } from "../../util/temperature";

import modules from './CurrentWeather.module.css';
import useTheme from "../../hooks/useTheme";

const CurrentWeather: React.FC = () => {
  const { weatherData, isLoading } = useCurrentWeather();
  const { isCelsius } = useContext<TempUnitsContextType>(TemperatureUnitsContext);
  const theme = useTheme();

  const cityName = weatherData.name;
  const country = weatherData.sys?.country;
  const date = weatherData.dt && getCurrentDate(weatherData.dt);

  const icon = weatherData.weather && weatherData.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/w/${icon}.png`;
  const weatherDescription = weatherData.weather && weatherData.weather[0].description.toUpperCase();

  const temperature = weatherData.main?.temp!;
  const feelsLikeWeather = weatherData.main?.feels_like!;
  const maxTemp = weatherData.main?.temp_max!;
  const minTemp = weatherData.main?.temp_min!;

  const temperaturesData = convertAllTemperatures({
    temperature, feelsLikeWeather, maxTemp, minTemp
  }, isCelsius);

  const tempSpanSkeleton = <Skeleton variant="text" sx={{ fontSize: '20px', width: '45px' }}/>;

  return (
    <div className={`${modules["current-weather-container"]} ${modules[theme]}`}>
      {isLoading && (
        <div className={modules["location-container"]}>
          <Skeleton variant="rounded" width={200} height={40}/>
          <Skeleton variant="rounded" width={200} height={20}/>
        </div>
      )}
      {!isLoading && (
        <div className={modules["location-container"]}>
          <h2>
            <span>{cityName}</span>, {country}
          </h2>
          <h3>{date}</h3>
        </div>
      )}
      <div className={modules["weather-container"]}>
        {isLoading 
          ? <Skeleton variant="rounded" width={70} height={70}/> 
          : <img src={iconSrc} alt="weather-icon"/>
        }
        {isLoading 
          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '110px' }}/> 
          : <p>{weatherDescription}</p>
        }
      </div>
      <div className={modules["temp-container"]}>
        {isLoading && <Skeleton variant="rounded" width={80} height={70}/>}
        {!isLoading && (
          <h1 className={modules["temp-container__temp"]}>
            {temperaturesData.temperature}
            <span>{isCelsius ? "°C" : "°F"}</span>
          </h1>
        )}
        <div className={modules["temp-container__aside"]}>
          {isLoading && <Skeleton variant="text" sx={{ fontSize: '20px', width: '110px' }}/>}
          {!isLoading && <p>Feels like {temperaturesData.feelsLikeWeather} °C</p>}
          <section className={modules["temp-container__aside-section"]}>
            {isLoading ? tempSpanSkeleton : <span>H: {temperaturesData.maxTemp} °</span>}
            {isLoading ? tempSpanSkeleton : <span>L: {temperaturesData.minTemp} °</span>}
          </section>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;