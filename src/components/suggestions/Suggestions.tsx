import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

import LocationContext from "../../context/location-context";
import { fetchCurrentWeather } from "../../util/http";
import { 
  suggestClothing, 
  suggestDrivingSafety, 
  suggestHeatStroke, 
  suggestOutdoors, 
  suggestUmbrellaNeed, 
  suggestWindChill 
} from "../../util/suggestions";
import { WeatherData } from "../../interfaces/current-weather";
import { 
  faPersonRunning,
  faUmbrella,
  faTemperatureFull, 
  faTemperatureEmpty,
  faCarSide,
  faShirt
} from '@fortawesome/free-solid-svg-icons';
import { LocationContextType } from "../../interfaces/location-context";

import modules from './Suggestions.module.css';

const Suggestions = () => {
  const { location } = useContext<LocationContextType>(LocationContext);
  const [measurements, setMeasurements] = useState<WeatherData>({});  

  useEffect(() => {
    async function getCurrentWeather() {
      const data = await fetchCurrentWeather(location);
      setMeasurements(data);
    }

    getCurrentWeather();
  }, [location])

  const temperature = measurements.main?.temp!;
  const weatherDescription = measurements.weather?.[0].description!;
  const visibility = measurements?.visibility!;

  const outdoorSuggestion = suggestOutdoors(weatherDescription);
  const umbrellaNeedSuggestion = suggestUmbrellaNeed(weatherDescription);
  const clothingSuggestion = suggestClothing(temperature);
  const drivingSafetySuggestion = suggestDrivingSafety(visibility);
  const windChillSuggestion = suggestWindChill(temperature);
  const heatStrokeSuggestion = suggestHeatStroke(temperature);

  return (
    <div className={modules["suggestions-container"]}>
      <h2>Suggestions for your day</h2>
      <div className={modules["suggestions"]}>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faPersonRunning} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Outdoors</p>
            <p>{outdoorSuggestion}</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faUmbrella} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Umbrella</p>
            <p>{umbrellaNeedSuggestion}</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faShirt} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Clothing</p>
            <p>{clothingSuggestion}</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faCarSide} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Driving Safety</p>
            <p>{drivingSafetySuggestion}</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faTemperatureEmpty} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Wind Chill</p>
            <p>{windChillSuggestion}</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faTemperatureFull} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Heat Stroke</p>
            <p>{heatStrokeSuggestion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestions;