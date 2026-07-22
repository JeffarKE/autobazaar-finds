"use client";

import { useState } from "react";
import CarCard from "../components/CarCard";
import SearchFilters from "../components/SearchFilters";
import { cars } from "../data/cars";

export default function BrowseCars() {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  const makes = [...new Set(cars.map((car) => car.make))].sort();

  const filteredCars = cars.filter((car) => {
    const query = search.toLowerCase();

    const matchesSearch =
      car.make.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query);

    const matchesMake = make === "" || car.make === make;

    const matchesFuel = fuel === "" || car.fuel === fuel;

    const matchesTransmission =
      transmission === "" ||
      car.transmission === transmission;

    return (
      matchesSearch &&
      matchesMake &&
      matchesFuel &&
      matchesTransmission
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <section className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-center text-4xl font-bold">
          Browse Cars
        </h1>

        <SearchFilters
          search={search}
          setSearch={setSearch}
          make={make}
          setMake={setMake}
          fuel={fuel}
          setFuel={setFuel}
          transmission={transmission}
          setTransmission={setTransmission}
          makes={makes}
        />

        <p className="mb-6 text-gray-600">
          Showing <strong>{filteredCars.length}</strong>{" "}
          {filteredCars.length === 1 ? "vehicle" : "vehicles"}
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                image={car.images[0]}
                title={`${car.make} ${car.model}`}
                details={`${car.year} • ${car.fuel} • ${car.transmission}`}
                price={`KSh ${car.price.toLocaleString()}`}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No vehicles found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}