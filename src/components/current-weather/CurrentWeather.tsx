import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import TemperatureUnitsContext from "../../context/temperature-units-context";
import { TempUnitsContextType } from "../../interfaces/temperature-units-context";
import { LocationContextType } from "../../interfaces/location-context";
import { WeatherData } from "../../interfaces/current-weather";
import { fetchCurrentWeather } from "../../util/http";
import { getCurrentDate } from "../../util/time";
import { convertAllTemperatures } from "../../util/temperature";

import modules from './CurrentWeather.module.css';

const CurrentWeather: React.FC = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const { isCelsius } = useContext<TempUnitsContextType>(TemperatureUnitsContext);
  const [weatherData, setWeatherData] = useState<WeatherData>({});  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(location);
      setWeatherData(data);
    }

    getCurrentWeather();
  }, [location])

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

  return (
    <div className={modules["current-weather-container"]}>
      <div className={modules["location-container"]}>
        <h2>
          <span>{cityName}</span>, {country}
        </h2>
        <h3>{date}</h3>
      </div>
      <div className={modules["weather-container"]}>
        <img src={iconSrc} alt="weather-icon"/>
        <p>{weatherDescription}</p>
      </div>
      <div className={modules["temp-container"]}>
        <h1 className={modules["temp-container__temp"]}>
          {temperaturesData.temperature}
          <span>{isCelsius ? "°C" : "°F"}</span>
        </h1>
        <div className={modules["temp-container__aside"]}>
          <p>Feels like {temperaturesData.feelsLikeWeather} °C</p>
          <section className={modules["temp-container__aside-section"]}>
            <span>H: {temperaturesData.maxTemp} °</span>
            <span>L: {temperaturesData.minTemp} °</span>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;