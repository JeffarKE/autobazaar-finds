"use client";

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

export default function VehicleInformation() {
  const fields = [
    {
      label: "Make",
      placeholder: "Toyota",
      icon: Car,
      type: "text",
    },
    {
      label: "Model",
      placeholder: "Land Cruiser Prado",
      icon: Car,
      type: "text",
    },
    {
      label: "Year",
      placeholder: "2020",
      icon: Calendar,
      type: "number",
    },
    {
      label: "Registration Number",
      placeholder: "KDK 123A",
      icon: Hash,
      type: "text",
    },
    {
      label: "VIN (Optional)",
      placeholder: "JTDBR32E...",
      icon: Hash,
      type: "text",
    },
    {
      label: "Mileage (KM)",
      placeholder: "45000",
      icon: Gauge,
      type: "number",
    },
    {
      label: "Engine Capacity",
      placeholder: "2800cc",
      icon: Settings,
      type: "text",
    },
    {
      label: "Exterior Color",
      placeholder: "Pearl White",
      icon: Palette,
      type: "text",
    },
    {
      label: "Interior Color",
      placeholder: "Black Leather",
      icon: Palette,
      type: "text",
    },
  ];

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="space-y-8 p-8">
        {/* Header */}
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

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div key={field.label} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>

                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="pl-10"
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