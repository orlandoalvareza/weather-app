import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CityInputFn } from "../../interfaces/city-input";
import useTheme from "../../hooks/useTheme";
import LocationContext from "../../context/location-context";
import { LocationContextType } from "../../interfaces/location-context";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import modules from './CityInput.module.css';

const CityInput: React.FC<CityInputFn> = ({ errorAlert }) =>  {
  const ctx = useContext<LocationContextType>(LocationContext);
  const locationRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const submitLocationHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (locationRef.current!.value.trim() === "") {
      return;
    }

    if (errorAlert) {
      ctx.onDeleteWrongLocation();
    }

    const enteredCity = locationRef.current!.value;
    ctx.onChangeLocation(enteredCity);
    locationRef.current!.value = "";
  }

  return (
    <form onSubmit={submitLocationHandler} className={modules[theme]}>
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