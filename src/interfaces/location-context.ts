import { ReactNode } from "react";

export interface LocationContextType {
  location: string;
  onChangeLocation: (newLocation: string) => void;
}

export interface LocationContextProviderProps {
  children: ReactNode;
}