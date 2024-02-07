import React, { useState } from "react";

import { 
  LocationContextType, 
  LocationContextProviderProps, 
  LocationHistory 
} from "../interfaces/location-context";

const initialLocation = {
  id: "0.123456789",
  city: "miami",
  timezone: -18000
}

const LocationContext = React.createContext<LocationContextType>({
  location: initialLocation.city,
  locationsHistory: [] as LocationHistory[],
  timezone: initialLocation.timezone,
  onChangeInitialLocation: () => {},
  onChangeLocation: () => {},
  onDeleteLocation: () => {},
  onDeleteWrongLocation: () => {}
})

export const LocationContextProvider: React.FC<LocationContextProviderProps> = (props) => {
  const [location, setLocation] = useState<string>(initialLocation.city);
  const [locationsHistory, setLocationsHistory] = useState<LocationHistory[]>([initialLocation]);
  const [timezone, setTimezone] = useState<number>(initialLocation.timezone);

  const changeInitialLocationHandler = (city: string, timezone: number) => {
    initialLocation.city = city;
    initialLocation.timezone = timezone;

    setLocation(initialLocation.city);
    setTimezone(initialLocation.timezone);
  }

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

  const deleteLocationHandler = (id: string) => {
    const filteredLocations = locationsHistory.filter(location => location.id !== id);
    if (filteredLocations.length === 0) {
      return;
    } 

    if (filteredLocations[0] !== locationsHistory[0]) {
      setLocation(filteredLocations[0].city);
    }

    setLocationsHistory(filteredLocations);
  }

  const deleteWrongLocationHandler = () => {
    locationsHistory.shift();
  }

  const contextValue: LocationContextType = {
    location,
    locationsHistory,
    timezone,
    onChangeInitialLocation: changeInitialLocationHandler,
    onChangeLocation: changeLocationHandler,
    onDeleteLocation: deleteLocationHandler,
    onDeleteWrongLocation: deleteWrongLocationHandler
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;