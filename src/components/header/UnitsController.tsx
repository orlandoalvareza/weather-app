import { useContext } from 'react';

import TemperatureUnitsContext from '../../context/temperature-units-context';
import useScreenSizeListener from '../../hooks/useScreenSizeListener';
import useTheme from '../../hooks/useTheme';

import modules from './UnitsController.module.css';

const UnitsController: React.FC = () => {
  const ctx = useContext(TemperatureUnitsContext);
  const isPhone = useScreenSizeListener({ minWidth: 0, maxWidth: 480 });
  const theme = useTheme();

  const TemperatureUnitHandler = () => {
    ctx.onChangeTempUnit();
  }

  const unitStyle = (
    ctx.isCelsius ? "units-indicator__celsius" : "units-indicator__fahrenheit"
  )

  return (
    <div className={`${modules["units-controller"]} ${modules[theme]}`}>
      {!isPhone && <span>°F</span>}
      <div className={modules["units-indicator"]}>
        <button 
          onClick={TemperatureUnitHandler}
          className={modules[unitStyle]}
        ></button>
        {isPhone && ctx.isCelsius && <span>°C</span>}
        {isPhone && !ctx.isCelsius && <span>°F</span>}
      </div>
      {!isPhone && <span>°C</span>}
    </div>
  )
}

export default UnitsController;