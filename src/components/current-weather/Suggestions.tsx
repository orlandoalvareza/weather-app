import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
  faPersonRunning,
  faTemperatureFull, 
  faTemperatureEmpty,
  faShirt
} from '@fortawesome/free-solid-svg-icons';
import modules from './Suggestions.module.css';

const Suggestions = () => {
  return (
    <div className={modules["suggestions-container"]}>
      <h2>Suggestions for your day</h2>
      <div className={modules["suggestions"]}>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faPersonRunning} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Outdoors</p>
            <p>Great</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faShirt} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Clothing</p>
            <p>Jacket</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faTemperatureEmpty} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Wind Chill</p>
            <p>Safe</p>
          </div>
        </div>
        <div className={modules["suggestion"]}>
          <FontAwesomeIcon 
            icon={faTemperatureFull} 
            className={modules["suggestion-icon"]}
          />
          <div className={modules["suggestion__info"]}>
            <p>Heat Stroke</p>
            <p>Safe</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestions;