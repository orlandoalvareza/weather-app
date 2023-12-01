import { CurrentTemperatures } from "../interfaces/current-weather";

const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
}

const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
}

export const convertTemperature = (temperature: number, isCelsius: boolean): number => {
  if (isCelsius) {
    return kelvinToCelsius(temperature);
  }
  return kelvinToFahrenheit(temperature);
}

export const convertAllTemperatures = (
  temperaturesData: CurrentTemperatures, isCelsius: boolean
): CurrentTemperatures => {
  const { temperature, feelsLikeWeather, maxTemp, minTemp } = temperaturesData;

  const newTemperature = convertTemperature(temperature, isCelsius);
  const newFeelsLikeWeather = convertTemperature(feelsLikeWeather, isCelsius);
  const newMaxTemp = convertTemperature(maxTemp, isCelsius);
  const newMinTemp = convertTemperature(minTemp, isCelsius);

  return {
    temperature: newTemperature, 
    feelsLikeWeather: newFeelsLikeWeather, 
    maxTemp: newMaxTemp, 
    minTemp: newMinTemp
  };
}