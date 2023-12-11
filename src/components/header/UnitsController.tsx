import { useContext } from 'react';

import TemperatureUnitsContext from '../../context/temperature-units-context';

import modules from './UnitsController.module.css';

const UnitsController: React.FC = () => {
  const ctx = useContext(TemperatureUnitsContext);

  const TemperatureUnitHandler = () => {
    ctx.onChangeTempUnit();
  }

  const unitStyle = (
    ctx.isCelsius ? "units-indicator__celsius" : "units-indicator__fahrenheit"
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