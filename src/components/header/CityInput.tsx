import { useRef } from "react";

import { CityInputProps } from '../../interfaces/city-input';

const CityInput: React.FC<CityInputProps> = ({ onAddCity }) =>  {
  const locationRef = useRef<HTMLInputElement>(null);

  const submitLocationHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredCity = locationRef.current!.value;
    onAddCity(enteredCity);
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