"use client";

import { useMemo, useState } from "react";
import { Vehicle } from "../types";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "mileage-low"
  | "mileage-high";

export function useVehicleFilters(vehicles: Vehicle[]) {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredVehicles = useMemo(() => {
    let results = [...vehicles];

    if (search.trim()) {
      const query = search.toLowerCase();

      results = results.filter(
        (vehicle) =>
          vehicle.title.toLowerCase().includes(query) ||
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query)
      );
    }

    if (fuel) {
      results = results.filter((vehicle) => vehicle.fuel === fuel);
    }

    if (transmission) {
      results = results.filter(
        (vehicle) => vehicle.transmission === transmission
      );
    }

    if (location) {
      results = results.filter(
        (vehicle) => vehicle.location === location
      );
    }

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;

      case "mileage-low":
        results.sort((a, b) => a.mileage - b.mileage);
        break;

      case "mileage-high":
        results.sort((a, b) => b.mileage - a.mileage);
        break;

      case "oldest":
        results.sort((a, b) => a.year - b.year);
        break;

      case "newest":
      default:
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return results;
  }, [
    vehicles,
    search,
    fuel,
    transmission,
    location,
    sortBy,
  ]);

  return {
    filteredVehicles,

    search,
    setSearch,

    fuel,
    setFuel,

    transmission,
    setTransmission,

    location,
    setLocation,

    sortBy,
    setSortBy,
  };
}