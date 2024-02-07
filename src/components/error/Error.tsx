import useTheme from "../../hooks/useTheme";
import CityInput from "../header/CityInput";

import modules from './Error.module.css';

const Error = () => {
  const theme = useTheme();

  return (
    <div className={`${modules["error-container"]} ${modules[theme]}`}>
      <div className={modules["error-box"]}>
        <div className={modules["error-information"]}>
          <h1>An error has occurred</h1>
          <h3>The city entered has not been found</h3>
          <p>Please try again or enter a new city</p>
        </div>
        <CityInput/>
      </div>
    </div>
  )
}

export default Error;