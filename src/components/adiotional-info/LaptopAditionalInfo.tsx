import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DailyForecast from "../forecast/DailyForecast";
import Measurements from "../measurements/Measurements";
import SunriseSunset from "../sunrise-sunset/SunriseSunset";
import Suggestions from "../suggestions/Suggestions";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const LaptopAditionalInfo = () => {
  const [isFirstSection, SetIsFirstSection] = useState<boolean>(true);

  const displayFirstSectionHandler = () => {
    SetIsFirstSection(true);
  }

  const displaySecondSectionHandler = () => {
    SetIsFirstSection(false);
  }

  return (
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
}

export default LaptopAditionalInfo;