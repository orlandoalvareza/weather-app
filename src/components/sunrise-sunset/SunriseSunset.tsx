import modules from './SunriseSunset.module.css';

const SunriseSunset = () => {
  return (
    <div className={modules["sunrise-sunset-container"]}>
      <h2>Sunrise - Sunset</h2>
      <div>
        <div className={modules["sunrise-container"]}>
          <h2>Time to sunrise</h2>
          <span>12 hr 00 min</span>
        </div>
        <div className={modules["sunset-container"]}>
          <h2>Time to sunset</h2>
          <span>2 hr 22 min</span>
        </div>
      </div>
    </div>
  )
}

export default SunriseSunset;