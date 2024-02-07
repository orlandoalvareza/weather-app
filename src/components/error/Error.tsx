import useTheme from "../../hooks/useTheme";
import { ErrorFn } from "../../interfaces/error";
import CityInput from "../header/CityInput";

import modules from './Error.module.css';

const Error: React.FC<ErrorFn> = ({ wrongLocation }) => {
  const theme = useTheme();

  return (
    <div className={`${modules["error-container"]} ${modules[theme]}`}>
      <div className={modules["error-box"]}>
        <div className={modules["error-information"]}>
          <h1>An error has occurred</h1>
          <h3>The city '{wrongLocation}' has not been found</h3>
          <p>Please try again or enter a new city</p>
        </div>
        <CityInput errorAlert={true}/>
      </div>
    </div>
  )
}

export default Error;