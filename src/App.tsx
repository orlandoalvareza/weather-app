import useCurrentWeather from "./hooks/useCurrentWeather";
import useTheme from "./hooks/useTheme";
import useCurrentLocation from "./hooks/useCurrentLocation";

import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import HourlyForecast from "./components/forecast/HourlyForecast";
import AditionalInfoSection from "./components/adiotional-info/AditionalInfoSection";

import './App.css';

function App() {
  const { isError } = useCurrentWeather();
  const theme = useTheme();
  useCurrentLocation();
  
  const appClass = `App ${theme}`;
  
  return (
    <div className={appClass}>
      {isError && <h1>Error</h1>}
      {!isError && (
        <>
          <Header/>
          <LocationsHistory/>
          <CurrentWeather/>
          <HourlyForecast/>
          <AditionalInfoSection/>
        </>
      )}
    </div>
  );
}

export default App;
