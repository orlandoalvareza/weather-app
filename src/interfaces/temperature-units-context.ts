import { ReactNode } from "react";

export interface TempUnitsContextType {
  isCelsius: boolean;
  onChangeTempUnit: () => void;
}

export interface TempUnitsContextProviderProps {
  children: ReactNode;
}