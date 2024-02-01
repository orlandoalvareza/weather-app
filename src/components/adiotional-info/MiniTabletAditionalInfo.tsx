import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";
import Suggestions from "../suggestions/Suggestions";

import modules from './MiniTabletAditionalInfo.module.css';

const MiniTabletAditionalInfo = () => {
  return (
    <div className={modules["adiotional-info-container"]}>
      <DailyForecast/>
      <div className={modules["adiotional-info-container__section"]}>
        <Measurements/>
        <SunriseSunset/>
      </div>
      <Suggestions/>
    </div>
  )
}

export default MiniTabletAditionalInfo;