import React, { useState } from "react";

import { TempUnitsContextProviderProps, TempUnitsContextType } from "../interfaces/temperature-units-context";

const TemperatureUnitsContext = React.createContext<TempUnitsContextType>({
  isCelsius: false,
  onChangeTempUnit: () => {}
})

export const TemperatureUnitsContextProvider: React.FC<TempUnitsContextProviderProps> = (props) => {
  const [isCelsius, setIsCelsius] = useState(false);

  const TemperatureUnitHandler = () => {
    setIsCelsius(prevTemperature => !prevTemperature)
  }
  
  const contextValue: TempUnitsContextType = {
    isCelsius,
    onChangeTempUnit: TemperatureUnitHandler
  }
  
  return (
    <TemperatureUnitsContext.Provider value={contextValue}>
      {props.children}
    </TemperatureUnitsContext.Provider>
  )
}

export default TemperatureUnitsContext;