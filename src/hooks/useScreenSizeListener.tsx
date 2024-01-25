import { useEffect, useState } from 'react';

const useScreenSizeListener = () => {
  const [isScreenSizeToLaptop, setIsScreenSizeToLaptop] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
    const handleScreenSizeChange = (mq: any) => setIsScreenSizeToLaptop(mq.matches);

    handleScreenSizeChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleScreenSizeChange(event);

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return isScreenSizeToLaptop;
};

export default useScreenSizeListener;
