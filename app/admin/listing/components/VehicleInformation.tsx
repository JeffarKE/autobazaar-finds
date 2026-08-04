"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Calendar,
  Car,
  Gauge,
  Hash,
  Palette,
  Settings,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

export default function VehicleInformation({
  vehicle,
  setVehicle,
}: Props) {
  const fields = [
    {
      key: "make",
      label: "Make",
      placeholder: "Toyota",
      icon: Car,
      type: "text",
    },
    {
      key: "model",
      label: "Model",
      placeholder: "Land Cruiser Prado",
      icon: Car,
      type: "text",
    },
    {
      key: "year",
      label: "Year",
      placeholder: "2020",
      icon: Calendar,
      type: "number",
    },
    {
      key: "registrationNumber",
      label: "Registration Number",
      placeholder: "KDK 123A",
      icon: Hash,
      type: "text",
    },
    {
      key: "vin",
      label: "VIN (Optional)",
      placeholder: "JTDBR32E...",
      icon: Hash,
      type: "text",
    },
    {
      key: "mileage",
      label: "Mileage (KM)",
      placeholder: "45000",
      icon: Gauge,
      type: "number",
    },
    {
      key: "engineSize",
      label: "Engine Capacity",
      placeholder: "2800cc",
      icon: Settings,
      type: "text",
    },
    {
      key: "exteriorColor",
      label: "Exterior Color",
      placeholder: "Pearl White",
      icon: Palette,
      type: "text",
    },
    {
      key: "interiorColor",
      label: "Interior Color",
      placeholder: "Black Leather",
      icon: Palette,
      type: "text",
    },
  ] as const;

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="space-y-8 p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gray-100 p-3">
            <Car className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Vehicle Information
            </h2>

            <p className="text-gray-500">
              Basic information about the vehicle.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>

                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="pl-10"
                    value={vehicle[field.key]}
                    onChange={(e) =>
                      setVehicle((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}