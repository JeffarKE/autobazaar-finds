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
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Saved Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No saved vehicles yet
          </h2>

          <p className="text-gray-500 mt-3">
            Tap the heart on any listing to save it.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {vehicles.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              image={car.image}
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