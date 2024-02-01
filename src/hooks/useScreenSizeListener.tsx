import { useEffect, useState } from 'react';

import { ScreenSize } from '../interfaces/screen-size';

const useScreenSizeListener = (screenSize: ScreenSize) => {
  const [isScreenSizeInRange, setIsScreenSizeInRange] = useState<boolean>(false);

  useEffect(() => {
    const { minWidth, maxWidth } = screenSize;
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`);

    const handleScreenSizeChange = (mq: any) => setIsScreenSizeInRange(mq.matches);

    handleScreenSizeChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleScreenSizeChange(event);

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [screenSize]);

  return isScreenSizeInRange;
};

export default useScreenSizeListener;
