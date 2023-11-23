import { useEffect, useState } from "react";

import DateTime from "./DateTime";
import { fetchCurrentWeather } from "../util/http";
import { WeatherData } from "../interfaces/weather-data";
import { CurrentWeatherProps } from "../interfaces/current-weather";

const initialWeatherData: WeatherData = {
  coord: {},
  weather: [
    {
      id: 0,
      main: "Clouds",
      description: "broken clouds",
      icon: "04n"
    }
  ],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0
  },
  clouds: {
    all: 0
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: 'US',
    sunrise: 0,
    sunset: 0
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(location);
      setWeatherData(data);
    }

    getCurrentWeather();
  }, [location])

  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  const currentWeather = Math.round(weatherData.main.temp - 273);
  const feelsLikeWeather = Math.round(weatherData.main.feels_like - 273);

  const weatherDescription = weatherData.weather[0].description.toUpperCase();
  const pressure = weatherData.main.pressure;
  const humidity = weatherData.main.humidity;
  const wind = weatherData.wind.speed;
  const cloudiness = weatherData.clouds.all;

  return (
    <div className="current-weather-container">
      <div className="location-container">
        <h2>{cityName}, {country}</h2>
        <DateTime currentDate={weatherData.dt}/>
      </div>
      <div className="temp-container">
        <span>{currentWeather} °C</span>
        <span>Feels like {feelsLikeWeather} °C</span>
      </div>
      <div className="extra-measurements-container">
        <div>
          <span>{weatherDescription}</span>
        </div>
        <div>
          <p>Pressure: {pressure} hPa</p>
          <p>Humidity: {humidity} %</p>
          <p>Wind: {wind} m/s</p>
          <p>Cloudiness: {cloudiness} %</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;