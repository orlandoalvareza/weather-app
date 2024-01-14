import { useContext, useEffect, useState } from "react";

import LocationContext from "../context/location-context";
import { fetchCurrentWeather } from "../util/http";
import { WeatherData } from "../interfaces/current-weather";
import { LocationContextType } from "../interfaces/location-context";

const useCurrentWeather = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData>({});  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentWeather() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchCurrentWeather(location);
        
        setCurrentWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }

    getCurrentWeather();
  }, [location])

  return {
    weatherData: currentWeatherData,
    isLoading: isLoading,
    isError: isError
  };
}

export default useCurrentWeather;