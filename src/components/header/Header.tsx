import CityInput from "./CityInput";
import modules from './Header.module.css';

const Header = () => {
  return (
    <header className={modules.header}>
      <CityInput/>
      <button>°F-°C</button>
    </header>
  )
}

export default Header;