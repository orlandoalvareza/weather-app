import { ReactNode } from "react";

export interface ThemeContextType {
  theme: string;
  onChangeTheme: (newTheme: string) => void;
}

export interface ThemeContextProviderProps {
  children: ReactNode;
}