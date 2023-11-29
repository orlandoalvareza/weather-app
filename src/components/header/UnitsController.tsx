import { useState } from 'react';

import modules from './UnitsController.module.css';

const UnitsController = () => {
  const [isCelsius, setIsCelsius] = useState(false);

  const TemperatureUnitHandler = () => {
    setIsCelsius(isCelsius => !isCelsius)
  }

  const unitStyle = (
    isCelsius ? "units-indicator__celsius" : "units-indicator__fahrenheit"
  )

  return (
    <div className={modules["units-controller"]}>
      <span>°F</span>
      <div className={modules["units-indicator"]}>
        <button 
          onClick={TemperatureUnitHandler}
          className={modules[unitStyle]}
          ></button>
      </div>
      <span>°C</span>
    </div>
  )
}

export default UnitsController;