import React, { useState } from "react";

import { 
  LocationContextType, 
  LocationContextProviderProps, 
  LocationHistory 
} from "../interfaces/location-context";

const initialLocation = {
  id: "0.123456789",
  city: "miami"
}

const LocationContext = React.createContext<LocationContextType>({
  location: initialLocation.city,
  locationsHistory: [] as LocationHistory[],
  onChangeLocation: () => {}
})

export const LocationContextProvider: React.FC<LocationContextProviderProps> = (props) => {
  const [location, setLocation] = useState<string>(initialLocation.city);
  const [locationsHistory, setLocationsHistory] = useState<LocationHistory[]>([initialLocation]);

  const changeLocationHandler = (city: string) => {
    setLocation(city);

    const isExisting = checkExistingCities(city);
    if (isExisting) {
      return;
    }
   
    setLocationsHistory(prevLocations => {
      const id = Math.random().toString();
      return [
        { id, city },
        ...prevLocations,
      ];
    });
  };

  const checkExistingCities = (city: string) => {
    for (const location of locationsHistory) {
      if (location.city === city) {
        return true;
      }
    }
    return false;
  }

  const contextValue: LocationContextType = {
    location: location,
    locationsHistory: locationsHistory,
    onChangeLocation: changeLocationHandler,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;