import useScreenSizeListener from "../../hooks/useScreenSizeListener";
import MiniTabletAditionalInfo from "./MiniTabletAditionalInfo";
import TabletAditionalInfo from "./TabletAditionalInfo";
import LaptopAditionalInfo from "./LaptopAditionalInfo";
import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";
import Suggestions from "../suggestions/Suggestions";

const AditionalInfoSection = () => {
  const isMiniTablet = useScreenSizeListener({ minWidth: 481, maxWidth: 767 });
  const isTablet = useScreenSizeListener({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useScreenSizeListener({ minWidth: 1024, maxWidth: 1279 });
  const isDesktop = useScreenSizeListener({ minWidth: 1280, maxWidth: undefined });

  const screenSizeToDesktopContent = (
    <>
      <DailyForecast/>
      <Measurements/>
      <SunriseSunset/>
      <Suggestions/>
    </>
  );

  return (
    <section className="App__section">
      {isMiniTablet && <MiniTabletAditionalInfo/>}
      {isTablet && <TabletAditionalInfo/>}
      {isLaptop && <LaptopAditionalInfo/>}
      {isDesktop && screenSizeToDesktopContent}
    </section>
  )
}

export default AditionalInfoSection;