import useCurrentWeather from "./hooks/useCurrentWeather";
import useTheme from "./hooks/useTheme";
import useCurrentLocation from "./hooks/useCurrentLocation";

import Header from "./components/header/Header";
import LocationsHistory from "./components/history/LocationsHistory";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import HourlyForecast from "./components/forecast/HourlyForecast";
import AditionalInfoSection from "./components/adiotional-info/AditionalInfoSection";
import Error from "./components/error/Error";

import './App.css';

function App() {
  const { isError, wrongLocation } = useCurrentWeather();
  const theme = useTheme();
  useCurrentLocation();
  
  const appClass = `App ${theme}`;
  
  return (
    <div className={appClass}>
      {!isError && (
        <>
          <Header/>
          <LocationsHistory/>
          <CurrentWeather/>
          <HourlyForecast/>
          <AditionalInfoSection/>
        </>
      )}
      {isError && <Error wrongLocation={wrongLocation}/>}
    </div>
  );
}

export default App;
