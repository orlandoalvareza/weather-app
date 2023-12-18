import { useContext } from 'react';

import TemperatureUnitsContext from '../../context/temperature-units-context';
import useTheme from '../../hooks/useTheme';

import modules from './UnitsController.module.css';

const UnitsController: React.FC = () => {
  const ctx = useContext(TemperatureUnitsContext);
  const theme = useTheme();

  const TemperatureUnitHandler = () => {
    ctx.onChangeTempUnit();
  }

  const unitStyle = (
    ctx.isCelsius ? "units-indicator__celsius" : "units-indicator__fahrenheit"
  )

  return (
    <div className={`${modules["units-controller"]} ${modules[theme]}`}>
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