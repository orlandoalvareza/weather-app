import { useContext, useEffect } from "react";

import ThemeContext from "../context/theme-context";
import { ThemeContextType } from "../interfaces/theme-context";
import { getCurrentTimeInSeconds } from "../util/time";

const useTheme = () => {
  const { theme, onChangeTheme } = useContext<ThemeContextType>(ThemeContext);
  
  useEffect(() => {
    // const time = getCurrentTimeInSeconds();
    const time = 68500;

    if (time >= 0 && time < 21600) {
      onChangeTheme('dawn-theme');
    } else if (time >= 21600 && time < 39600) {
      onChangeTheme('morning-theme');
    } else if (time >= 39600 && time < 50400) {
      onChangeTheme('dayling-theme');
    } else if (time >= 50400 && time < 68400) {
      onChangeTheme('sunset-theme');
    } else {
      onChangeTheme('evening-theme');
    }
  }, [onChangeTheme])

  return theme;
}

export default useTheme;