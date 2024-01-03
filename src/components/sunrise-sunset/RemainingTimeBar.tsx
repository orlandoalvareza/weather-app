import { useEffect, useState } from "react";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { RemainingTimeBarProps } from "../../interfaces/remaining-time-bar";

import modules from './RemainingTimeBar.module.css';

const RemainingTimeBar: React.FC<RemainingTimeBarProps> = ({ timeRemainingInSeconds }) => {
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

  console.log(progress);

  // return <progress className={modules.progress} value={progress} max="100"></progress>;
  return (
    <div style={{ width: 80, height: 100 }}>
      <CircularProgressbar value={Math.round(progress)} text={`${Math.round(progress)}`} />
    </div>
  )
};

export default RemainingTimeBar;