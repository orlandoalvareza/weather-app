import { useContext, useEffect, useState } from "react";

import LocationContext from "../context/location-context";
import { fetchCurrentWeather } from "../util/http";
import { WeatherData } from "../interfaces/current-weather";
import { LocationContextType } from "../interfaces/location-context";

const useCurrentWeather = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData>({});  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentWeather() {
      setIsLoading(true);
      const data = await fetchCurrentWeather(location);

      setCurrentWeatherData(data);
      setIsLoading(false);
    }

    getCurrentWeather();
  }, [location])

  return {
    weatherData: currentWeatherData,
    isLoading: isLoading
  };
}

export default useCurrentWeather;