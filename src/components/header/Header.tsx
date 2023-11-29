import CityInput from "./CityInput";
import UnitsController from "./UnitsController";
import modules from './Header.module.css';

const Header = () => {
  return (
    <header className={modules.header}>
      <CityInput/>
      <UnitsController />
    </header>
  )
}

export default Header;