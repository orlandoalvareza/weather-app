import { useEffect, useState } from "react";

import { RemainingTimeBarProps } from "../../interfaces/remaining-time-bar";

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

  return <progress value={progress} max="100"></progress>;
};

export default RemainingTimeBar;