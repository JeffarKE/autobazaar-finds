"use client";

import type { Dispatch, SetStateAction } from "react";
import { Calendar, Car, Gauge, Palette } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

const fields = [
  { key: "make", label: "Make", placeholder: "Toyota", icon: Car, type: "text" },
  { key: "model", label: "Model", placeholder: "Land Cruiser Prado", icon: Car, type: "text" },
  { key: "year", label: "Year", placeholder: "2020", icon: Calendar, type: "number" },
  { key: "mileage", label: "Mileage (optional)", placeholder: "45,000 km", icon: Gauge, type: "text" },
] as const;

const colourOptions = [
  "Black", "Blue", "Brown", "Gold", "Gray", "Green", "Orange", "Red",
  "Silver", "White", "Yellow", "Beige", "Other",
];

export default function VehicleInformation({ vehicle, setVehicle }: Props) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gray-100 p-3"><Car className="h-6 w-6" /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-950">What are you selling?</h2>
            <p className="text-sm text-gray-500">Start with what buyers need to recognise the vehicle. Leave anything unknown blank.</p>
          </div>
        </div>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-semibold text-gray-700">Listing title (optional)</span>
          <span className="relative block">
            <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Toyota Land Cruiser Prado TX" className="pl-10" value={vehicle.listingTitle} onChange={(event) => setVehicle((current) => ({ ...current, listingTitle: event.target.value }))} />
          </span>
          <span className="mt-2 block text-xs text-gray-500">This exact title will appear to buyers. Leave it blank to use year, make and model.</span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <label key={field.key} className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold text-gray-700">{field.label}</span>
                <span className="relative block">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type={field.type} placeholder={field.placeholder} className="pl-10" value={vehicle[field.key]} onChange={(event) => setVehicle((current) => ({ ...current, [field.key]: event.target.value }))} />
                </span>
              </label>
            );
          })}
          <ColourSelect label="Exterior colour (optional)" value={vehicle.exteriorColor} onChange={(exteriorColor) => setVehicle((current) => ({ ...current, exteriorColor }))} />
          <ColourSelect label="Interior colour (optional)" value={vehicle.interiorColor} onChange={(interiorColor) => setVehicle((current) => ({ ...current, interiorColor }))} />
        </div>
      </CardContent>
    </Card>
  );
}

function ColourSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const options = value && !colourOptions.includes(value) ? [value, ...colourOptions] : colourOptions;

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
      <span className="relative block">
        <Palette className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <select value={value} onChange={(event) => onChange(event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <option value="">Not specified</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </span>
    </label>
  );
}
