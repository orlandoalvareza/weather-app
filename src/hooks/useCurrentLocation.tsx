import { useContext, useEffect } from "react";

import LocationContext from "../context/location-context";
import { getLocation } from "../util/http";

const useCurrentLocation = () => {
  const { onChangeInitialLocation } = useContext(LocationContext);

  useEffect(() => {
    const handlePosition = async (position: any) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      const location = await getLocation(latitude, longitude);
      onChangeInitialLocation(location.data.name, location.data.timezone);
    }

    const handleError = (error: any) => {
      console.error(`Error getting location: ${error.message}`);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }, [onChangeInitialLocation]);
}

export default useCurrentLocation;