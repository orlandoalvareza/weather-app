import { ReactNode } from "react";

export interface LocationContextType {
  location: string;
  locationsHistory: LocationHistory[];
  timezone: number;
  onChangeInitialLocation: (newLocation: string, newTimezone: number) => void;
  onChangeLocation: (newLocation: string) => void;
  onDeleteLocation: (id: string) => void;
  onDeleteWrongLocation: () => void;
}

export interface LocationHistory {
  id: string;
  city: string
}

export interface LocationContextProviderProps {
  children: ReactNode;
}