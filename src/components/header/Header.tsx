import useTheme from "../../hooks/useTheme";
import CityInput from "./CityInput";
import UnitsController from "./UnitsController";

import modules from './Header.module.css';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <header className={`${modules.header} ${modules[theme]}`}>
      <CityInput errorAlert={false}/>
      <UnitsController />
    </header>
  )
}

export default Header;