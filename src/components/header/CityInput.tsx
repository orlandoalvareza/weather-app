import { useContext, useRef } from "react";

import LocationContext from "../../context/location-context";

const CityInput = () =>  {
  const ctx = useContext(LocationContext);
  const locationRef = useRef<HTMLInputElement>(null);

  const submitLocationHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredCity = locationRef.current!.value;
    ctx.onChangeLocation(enteredCity);
  }

  return (
    <form onSubmit={submitLocationHandler}>
      <div className="form-control">
        <label htmlFor="city">Search for a city</label>
        <input type="text" id="city" ref={locationRef}/>
      </div>
      <button type="submit">Search</button>
    </form>
  )
}

export default CityInput;