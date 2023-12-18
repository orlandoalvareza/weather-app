import useCurrentWeather from "../../hooks/useCurrentWeather";
import useTheme from "../../hooks/useTheme";
import SuggestionElement from "./SuggestionElement";
import { 
  suggestClothing, 
  suggestDrivingSafety, 
  suggestHeatStroke, 
  suggestOutdoors, 
  suggestUmbrellaNeed, 
  suggestWindChill 
} from "../../util/suggestions";
import { 
  faPersonRunning,
  faUmbrella,
  faTemperatureFull, 
  faTemperatureEmpty,
  faCarSide,
  faShirt
} from '@fortawesome/free-solid-svg-icons';

import modules from './Suggestions.module.css';

const Suggestions: React.FC = () => {
  const { weatherData, isLoading } = useCurrentWeather();
  const theme = useTheme();

  const temperature = weatherData.main?.temp!;
  const weatherDescription = weatherData.weather?.[0].description!;
  const visibility = weatherData?.visibility!;

  const outdoorSuggestion = suggestOutdoors(weatherDescription);
  const umbrellaNeedSuggestion = suggestUmbrellaNeed(weatherDescription);
  const clothingSuggestion = suggestClothing(temperature);
  const drivingSafetySuggestion = suggestDrivingSafety(visibility);
  const windChillSuggestion = suggestWindChill(temperature);
  const heatStrokeSuggestion = suggestHeatStroke(temperature);

  return (
    <div className={`${modules["suggestions-container"]} ${modules[theme]}`}>
      <h2>Suggestions for your day</h2>
      <div className={modules["suggestions"]}>
        <SuggestionElement 
          icon={faPersonRunning} 
          title={'Outdoors'} 
          description={outdoorSuggestion} 
          isLoading={isLoading}
        />
        <SuggestionElement 
          icon={faUmbrella} 
          title={'Umbrella'} 
          description={umbrellaNeedSuggestion} 
          isLoading={isLoading}
        />
        <SuggestionElement 
          icon={faShirt} 
          title={'Clothing'} 
          description={clothingSuggestion} 
          isLoading={isLoading}
        />
        <SuggestionElement 
          icon={faCarSide} 
          title={'Driving Safety'} 
          description={drivingSafetySuggestion} 
          isLoading={isLoading}
        />
        <SuggestionElement 
          icon={faTemperatureEmpty} 
          title={'Wind Chill'} 
          description={windChillSuggestion} 
          isLoading={isLoading}
        />
        <SuggestionElement 
          icon={faTemperatureFull} 
          title={'Heat Stroke'} 
          description={heatStrokeSuggestion} 
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Suggestions;