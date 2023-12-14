import React, { useState } from "react";

import { ThemeContextProviderProps, ThemeContextType } from "../interfaces/theme-context";

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'morning',
  onChangeTheme: (newTheme: string) => {}
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState<string>('morning');

  const changeThemeHandler = (newTheme: string) => {
    setTheme(newTheme);
  }

  const contextValue: ThemeContextType = {
    theme,
    onChangeTheme: changeThemeHandler,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext;