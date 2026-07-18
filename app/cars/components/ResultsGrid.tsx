"use client";

import VehicleCard from "./VehicleCard";
import { Vehicle } from "../types";

interface ResultsGridProps {
  vehicles: Vehicle[];
}

export default function ResultsGrid({
  vehicles,
}: ResultsGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          No vehicles found
        </h2>

        <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters to find more vehicles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
        />
      ))}
    </div>
  );
}