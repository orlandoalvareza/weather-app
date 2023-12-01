import { useContext, useEffect, useState } from "react";

import SuggestionElement from "./SuggestionElement";
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

const Suggestions: React.FC = () => {
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
        <SuggestionElement icon={faPersonRunning} title={'Outdoors'} description={outdoorSuggestion}/>
        <SuggestionElement icon={faUmbrella} title={'Umbrella'} description={umbrellaNeedSuggestion}/>
        <SuggestionElement icon={faShirt} title={'Clothing'} description={clothingSuggestion}/>
        <SuggestionElement icon={faCarSide} title={'Driving Safety'} description={drivingSafetySuggestion}/>
        <SuggestionElement icon={faTemperatureEmpty} title={'Wind Chill'} description={windChillSuggestion}/>
        <SuggestionElement icon={faTemperatureFull} title={'Heat Stroke'} description={heatStrokeSuggestion}/>
      </div>
    </div>
  )
}

export default Suggestions;