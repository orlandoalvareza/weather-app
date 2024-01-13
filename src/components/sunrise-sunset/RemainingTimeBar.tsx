import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RemainingTimeBarProps } from "../../interfaces/remaining-time-bar";
import 'react-circular-progressbar/dist/styles.css';

import modules from './RemainingTimeBar.module.css';

const RemainingTimeBar: React.FC<RemainingTimeBarProps> = ({ timeRemainingInSeconds, expectedTime }) => {
  const [progress, setProgress] = useState<number>(0);

  const totalDayTimeInSeconds = 86400;

  useEffect(() => {
    const calculateProgress = () => {
      const remainingPercentage = (timeRemainingInSeconds / totalDayTimeInSeconds) * 100;
      setProgress(100 - remainingPercentage);
    };

    calculateProgress();
    const intervalId = setInterval(calculateProgress, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemainingInSeconds]);

  return (
    <div className={modules["remaining-time-bar"]}>
      <CircularProgressbar 
        value={Math.round(progress)} 
        text={expectedTime} 
        strokeWidth={6} 
        className={modules["circular-progress-bar"]}
        styles={buildStyles({
          textSize: '18px',
          pathColor: `var(--theme-dawn-first-color)`,
          textColor: 'var(--theme-neutral-fourth-color)',
          trailColor: 'var(--theme-neutral-fourth-color)'
        })}
      />
    </div>
  )
};

export default RemainingTimeBar;