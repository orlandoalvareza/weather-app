export interface WeatherData {
  coord: {};
  weather: [];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindWeatherData;
  clouds: {};
  dt: number;
  sys: {};
  timezone: number;
  id: number;
  name: string;
  cod: number
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WindWeatherData {
  speed: number;
  deg: number
}