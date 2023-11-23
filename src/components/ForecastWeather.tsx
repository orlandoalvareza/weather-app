import { useEffect, useState } from "react";

import { WeatherProps } from "../interfaces/weather";
import { ForecastData } from "../interfaces/forecast-data";
import { fetchForecastWeather } from "../util/http";

const initialForecastData = {
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
    {
      "dt": 1661882400,
      "main": {
        "temp": 295.45,
        "feels_like": 295.59,
        "temp_min": 292.84,
        "temp_max": 295.45,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 71,
        "temp_kf": 2.61
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 96
      },
      "wind": {
        "speed": 1.97,
        "deg": 157,
        "gust": 3.39
      },
      "visibility": 10000,
      "pop": 0.33,
      "rain": {
        "3h": 0.57
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 18:00:00"
    },
    {
      "dt": 1661893200,
      "main": {
        "temp": 292.46,
        "feels_like": 292.54,
        "temp_min": 290.31,
        "temp_max": 292.46,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 80,
        "temp_kf": 2.15
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.66,
        "deg": 210,
        "gust": 3.58
      },
      "visibility": 10000,
      "pop": 0.7,
      "rain": {
        "3h": 0.49
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 21:00:00"
    },
    {
      "dt": 1662292800,
      "main": {
        "temp": 294.93,
        "feels_like": 294.83,
        "temp_min": 294.93,
        "temp_max": 294.93,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 935,
        "humidity": 64,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 1.14,
        "deg": 17,
        "gust": 1.57
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-09-04 12:00:00"
    }
  ],
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lat": 44.34,
      "lon": 10.99
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200,
    "sunrise": 1661834187,
    "sunset": 1661882248
  }
}

const ForecastWeather: React.FC<WeatherProps> = ({ location }) => {
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastData>(initialForecastData);
  const [hourlyData, setHourlyData] = useState<any>([]);

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchForecastWeather(location);
      setForecastWeatherData(data);
      setHourlyData(data.list.slice(0,5))
    }
    getCurrentWeather();
  }, [location])

  // const date = new Date(forecastWeatherData.list[39].dt * 1000).toUTCString();

  const filteredItems = forecastWeatherData.list.filter((item, index) => (index + 1) % 8 === 0);
 
  return (
    <div className="forecast-container">
      <div className="Hourly">
        <h2>Hourly forecast</h2>
        <ul>
          {hourlyData.map((hourlyForecast: any) => (
            <li key={hourlyForecast.dt}>
              <p>{new Date(hourlyForecast.dt * 1000).toUTCString()}</p>
              <p>icon</p>
              <p>{Math.round(hourlyForecast.main.temp - 273)} °C</p>
              <p>{hourlyForecast.weather[0].description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="Daily">
      <h2>Daily forecast</h2>
        <ul>
          {filteredItems.map((dailyForecast: any) => (
            <li key={dailyForecast.dt}>
              <p>{new Date(dailyForecast.dt * 1000).toUTCString()}</p>
              <p>icon</p>
              <p>{Math.round(dailyForecast.main.temp - 273)} °C</p>
              <p>{dailyForecast.weather[0].description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ForecastWeather;