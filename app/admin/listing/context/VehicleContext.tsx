"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Vehicle, emptyVehicle } from "@/lib/vehicle";

type VehicleContextType = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);

  return (
    <VehicleContext.Provider
      value={{
        vehicle,
        setVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error(
      "useVehicle must be used inside VehicleProvider"
    );
  }

  return context;
}