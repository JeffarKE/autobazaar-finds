"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "../types";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high";

export function useCarFilters(cars: Vehicle[]) {
  const [search, setSearch] = useState("");

  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [location, setLocation] = useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("newest");

  const filteredCars = useMemo(() => {
    let results = [...cars];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      results = results.filter((car) =>
        [
          car.make,
          car.model,
          car.engine,
          car.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (fuel) {
      results = results.filter((car) => car.fuel === fuel);
    }

    if (transmission) {
      results = results.filter(
        (car) => car.transmission === transmission
      );
    }

    if (bodyType) {
      results = results.filter(
        (car) => car.bodyType === bodyType
      );
    }

    if (location) {
      results = results.filter(
        (car) => car.location === location
      );
    }

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;

      case "oldest":
        results.sort((a, b) => a.year - b.year);
        break;

      case "newest":
      default:
        results.sort((a, b) => b.year - a.year);
        break;
    }

    return results;
  }, [
    cars,
    search,
    fuel,
    transmission,
    bodyType,
    location,
    sortBy,
  ]);

  const fuelOptions = useMemo(
    () => [...new Set(cars.map((car) => car.fuel))].sort(),
    [cars]
  );

  const transmissionOptions = useMemo(
    () => [...new Set(cars.map((car) => car.transmission))].sort(),
    [cars]
  );

  const bodyTypeOptions = useMemo(
    () => [...new Set(cars.map((car) => car.bodyType))].sort(),
    [cars]
  );

  const locationOptions = useMemo(
    () => [...new Set(cars.map((car) => car.location))].sort(),
    [cars]
  );

  function clearFilters() {
    setSearch("");
    setFuel("");
    setTransmission("");
    setBodyType("");
    setLocation("");
    setSortBy("newest");
  }

  return {
    filteredCars,

    fuelOptions,
    transmissionOptions,
    bodyTypeOptions,
    locationOptions,

    search,
    setSearch,

    fuel,
    setFuel,

    transmission,
    setTransmission,

    bodyType,
    setBodyType,

    location,
    setLocation,

    sortBy,
    setSortBy,

    clearFilters,
  };
}