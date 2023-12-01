import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SuggestionProps } from "../../interfaces/suggestion";

import modules from './SuggestionElement.module.css';

const SuggestionElement: React.FC<SuggestionProps> = (props) => {
  return (
    <div className={modules["suggestion"]}>
      <FontAwesomeIcon 
        icon={props.icon} 
        className={modules["suggestion-icon"]}
      />
      <div className={modules["suggestion__info"]}>
        <p>{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default SuggestionElement;