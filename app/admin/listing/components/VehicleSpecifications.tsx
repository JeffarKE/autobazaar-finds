"use client";

import type { Dispatch, SetStateAction } from "react";
import { CarFront, Cog, Fuel, Hash, Settings } from "lucide-react";
import type { Vehicle } from "@/lib/vehicle";

type Props = { vehicle: Vehicle; setVehicle: Dispatch<SetStateAction<Vehicle>> };

const selectFields = [
  { key: "bodyType", label: "Body type", icon: CarFront, options: ["SUV", "Sedan", "Hatchback", "Pickup", "Station Wagon", "Van", "Coupe", "Other"] },
  { key: "transmission", label: "Transmission", icon: Cog, options: ["Automatic", "Manual", "CVT", "Semi-automatic"] },
  { key: "fuelType", label: "Fuel type", icon: Fuel, options: ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"] },
  { key: "driveType", label: "Drive type", icon: CarFront, options: ["2WD", "FWD", "RWD", "AWD", "4WD"] },
] as const;

export default function VehicleSpecifications({ vehicle, setVehicle }: Props) {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {selectFields.map(({ key, label, icon: Icon, options }) => (
          <label key={key} className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
            <span className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-black focus-within:bg-white">
              <Icon className="h-5 w-5 shrink-0 text-gray-400" />
              <select value={vehicle[key]} onChange={(event) => setVehicle((current) => ({ ...current, [key]: event.target.value }))} className="w-full bg-transparent outline-none">
                <option value="">Not specified</option>
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </span>
          </label>
        ))}
        <Field label="Engine capacity (optional)" value={vehicle.engineSize} icon={Settings} placeholder="e.g. 2800 cc" onChange={(engineSize) => setVehicle((current) => ({ ...current, engineSize }))} />
        <Field label="Registration number (optional)" value={vehicle.registrationNumber} icon={Hash} placeholder="e.g. KDK 123A" onChange={(registrationNumber) => setVehicle((current) => ({ ...current, registrationNumber }))} />
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, placeholder, onChange }: { label: string; value: string; icon: typeof Hash; placeholder: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span><span className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-black focus-within:bg-white"><Icon className="h-5 w-5 shrink-0 text-gray-400" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent outline-none" /></span></label>;
}
