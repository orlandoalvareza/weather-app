import { useEffect, useState } from "react";

import { WeatherProps } from "../interfaces/weather";
import { fetchForecastWeather } from "../util/http";

const ForecastWeather: React.FC<WeatherProps> = ({ location }) => {
  


  return (
    <div className="forecast-container">
    </div>
  )
}

export default ForecastWeather;