import modules from './UnitsController.module.css';

const UnitsController = () => {
  return (
    <div className={modules["units-controller"]}>
      <span>°F</span>
      <div className={modules["units-controller__indicator"]}>
        <button>Click</button>
      </div>
      <span>°C</span>
    </div>
  )
}

export default UnitsController;