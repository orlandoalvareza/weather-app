import React, { useState } from "react";

import { LocationContextType, LocationContextProviderProps } from "../interfaces/location-context";

const LocationContext = React.createContext<LocationContextType>({
  location: 'miami',
  onChangeLocation: (city: string) => {}
})

export const LocationContextProvider: React.FC<LocationContextProviderProps> = (props) => {
  const [location, setLocation] = useState<string>('miami');

  const changeLocationHandler = (city: string) => {
    setLocation(city);
  };

  const contextValue: LocationContextType = {
    location: location,
    onChangeLocation: changeLocationHandler,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;