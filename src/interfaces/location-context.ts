import { ReactNode } from "react";

export interface LocationContextType {
  location: string;
  locationsHistory: LocationHistory[];
  onChangeLocation: (newLocation: string) => void;
}

export interface LocationHistory {
  id: string;
  city: string
}

export interface LocationContextProviderProps {
  children: ReactNode;
}