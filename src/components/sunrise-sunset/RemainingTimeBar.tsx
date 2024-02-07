import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RemainingTimeBarProps } from "../../interfaces/remaining-time-bar";
import useTheme from "../../hooks/useTheme";
import 'react-circular-progressbar/dist/styles.css';

import modules from './RemainingTimeBar.module.css';

const RemainingTimeBar: React.FC<RemainingTimeBarProps> = ({ timeRemainingInSeconds, expectedTime }) => {
  const [progress, setProgress] = useState<number>(0);
  const theme = useTheme();

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

  const selectedTheme = theme.split('-')[0];
  
  let pathColor;
  let trailColor = 'var(--theme-neutral-fourth-color)';

  if (selectedTheme === 'dawn') {
    pathColor = 'var(--theme-dawn-first-color)';
  } else if (selectedTheme === 'morning') {
    pathColor = 'var(--theme-morning-first-color)';
    trailColor = 'var(--theme-morning-fifth-color)';
  } else if (selectedTheme === 'dayling') {
    pathColor = 'var(--theme-dayling-first-color)';
    trailColor = 'var(--theme-dayling-fourth-color)';
  } else if (selectedTheme === 'sunset') {
    pathColor = 'var(--theme-sunset-fifth-color)';
    trailColor = 'var(--theme-sunset-third-color)';
  } else {
    pathColor = 'var(--theme-evening-fifth-color)';
    trailColor = 'var(--theme-evening-first-color)';
  }

  return (
    <div className={modules["remaining-time-bar"]}>
      <CircularProgressbar 
        value={Math.round(progress)} 
        text={expectedTime} 
        strokeWidth={6} 
        styles={buildStyles({
          textSize: '18px',
          pathColor: pathColor,
          textColor: 'var(--theme-neutral-fourth-color)',
          trailColor: trailColor
        })}
      />
    </div>
  )
};

export default RemainingTimeBar;