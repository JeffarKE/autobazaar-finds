import {
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  CarFront,
  Cog,
  Calendar,
} from "lucide-react";

import type { Vehicle } from "../types";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

const specs = (vehicle: Vehicle) => [
  {
    icon: Calendar,
    label: "Year",
    value: vehicle.year,
  },
  {
    icon: Fuel,
    label: "Fuel",
    value: vehicle.fuel,
  },
  {
    icon: Settings2,
    label: "Transmission",
    value: vehicle.transmission,
  },
  {
    icon: Gauge,
    label: "Mileage",
    value: `${new Intl.NumberFormat("en-KE").format(vehicle.mileage)} km`,
  },
  {
    icon: Cog,
    label: "Engine",
    value: vehicle.engine,
  },
  {
    icon: CarFront,
    label: "Body Type",
    value: vehicle.bodyType,
  },
  {
    icon: Settings2,
    label: "Drive Type",
    value: vehicle.driveType,
  },
  {
    icon: MapPin,
    label: "Location",
    value: vehicle.location,
  },
];

export default function VehicleSpecs({
  vehicle,
}: VehicleSpecsProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Vehicle Specifications
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Everything you need to know about this vehicle.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {specs(vehicle).map((spec) => {
          const Icon = spec.icon;

          return (
            <div
              key={spec.label}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition group-hover:scale-110 dark:bg-green-900/30">
                <Icon className="h-6 w-6" />
              </div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {spec.label}
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {spec.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}