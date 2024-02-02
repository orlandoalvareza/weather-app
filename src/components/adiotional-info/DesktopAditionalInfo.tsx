import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import Suggestions from "../suggestions/Suggestions";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";

const DesktopAditionalInfo = () => {
  return (
    <>
      <DailyForecast/>
      <Measurements/>
      <SunriseSunset/>
      <Suggestions/>
    </>
  );
}

export default DesktopAditionalInfo;