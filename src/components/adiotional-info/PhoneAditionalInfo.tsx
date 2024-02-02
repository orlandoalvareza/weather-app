import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import Suggestions from "../suggestions/Suggestions";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";

import modules from './PhoneAditionalInfo.module.css';

const PhoneAditionalInfo = () => {
  return (
    <div className={modules["adiotional-info-container"]}>
      <DailyForecast/>
      <Measurements/>
      <SunriseSunset/>
      <Suggestions/>
    </div>
  );
}

export default PhoneAditionalInfo;