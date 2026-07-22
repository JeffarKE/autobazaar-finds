"use client";

import { useEffect, useState } from "react";
import { cars } from "../data/cars";
import CarCard from "../components/CarCard";

export default function SavedPage() {
  const [savedCars, setSavedCars] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("savedCars") || "[]"
    );

    setSavedCars(saved);
  }, []);

  const vehicles = cars.filter((car) =>
    savedCars.includes(car.id)
  );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Saved Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No saved vehicles yet
          </h2>

          <p className="mt-3 text-gray-500">
            Tap the heart on any listing to save it.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {vehicles.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              image={car.images[0]}
              title={`${car.make} ${car.model}`}
              details={`${car.year} • ${car.fuel} • ${car.transmission}`}
              price={`KSh ${car.price.toLocaleString()}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}