export interface WeatherData {
  coord?: {};
  weather?: Weather[];
  base?: string;
  main?: MainWeatherData;
  visibility?: number;
  wind?: WindWeatherData;
  clouds?: {
    all: number
  };
  dt?: number;
  sys?: Sys;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number
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

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}