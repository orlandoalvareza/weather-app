import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LocationContext from "../../context/location-context";
import { LocationContextType } from "../../interfaces/location-context";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import modules from './CityInput.module.css';

const CityInput = () =>  {
  const ctx = useContext<LocationContextType>(LocationContext);
  const locationRef = useRef<HTMLInputElement>(null);

  const submitLocationHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredCity = locationRef.current!.value;
    ctx.onChangeLocation(enteredCity);
  }

  return (
    <form onSubmit={submitLocationHandler}>
      <input 
        ref={locationRef} 
        className={modules["city-input"]}
        type="text" 
        placeholder="Search for a city"
      />
      <button type="submit" className={modules["search-button"]}>
        <FontAwesomeIcon 
          className={modules["search-icon"]}
          icon={faMagnifyingGlass} 
        />
      </button>
    </form>
  )
}

export default CityInput;