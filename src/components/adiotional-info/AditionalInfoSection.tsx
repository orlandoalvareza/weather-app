import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useScreenSizeListener from "../../hooks/useScreenSizeListener";
import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";
import Suggestions from "../suggestions/Suggestions";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const AditionalInfoSection = () => {
  const isTablet = useScreenSizeListener({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useScreenSizeListener({ minWidth: 1024, maxWidth: 1279 });
  const [isFirstSection, SetIsFirstSection] = useState<boolean>(true);

  const displayFirstSectionHandler = () => {
    SetIsFirstSection(true);
  }

  const displaySecondSectionHandler = () => {
    SetIsFirstSection(false);
  }

  const screenSizetoTabletContent = (
    <>
      {!isFirstSection && (
        <button 
          onClick={displayFirstSectionHandler}
          className="App__back-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretLeft}/>
        </button>
      )}
      {isFirstSection && (
        <>
          <DailyForecast/>
          <Measurements/>
        </>
      )}
      {!isFirstSection && (
        <>
          <SunriseSunset/>
          <Suggestions/>
        </>
      )}
      {isFirstSection && (
        <button 
          onClick={displaySecondSectionHandler}
          className="App__next-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretRight}/>
        </button>
      )}
    </>
  );

  const screenSizeToLaptopContent = (
    <>
      {!isFirstSection && (
        <button 
          onClick={displayFirstSectionHandler}
          className="App__back-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretLeft}/>
        </button>
      )}
      {isFirstSection && (
        <>
          <DailyForecast/>
          <Measurements/>
          <SunriseSunset/>
        </>
      )}
      {!isFirstSection && (
        <>
          <Measurements/>
          <SunriseSunset/>
          <Suggestions/>
        </>
      )}        
      {isFirstSection && (
        <button 
          onClick={displaySecondSectionHandler}
          className="App__next-button"
        >
          <FontAwesomeIcon className="App__icon-button" icon={faCaretRight}/>
        </button>
      )}
    </>
  );

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
      {isTablet && screenSizetoTabletContent}
      {isLaptop && screenSizeToLaptopContent}
      {/* {!isLaptop && screenSizeToDesktopContent} */}
    </section>
  )
}

export default AditionalInfoSection;