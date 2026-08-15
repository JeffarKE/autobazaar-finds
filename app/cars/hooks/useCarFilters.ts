"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "../types";

export type SortOption = "newest" | "oldest" | "price-low" | "price-high";

const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort();

export function useCarFilters(cars: Vehicle[], initialSearch = "") {
  const [search, setSearch] = useState(initialSearch);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const makeOptions = useMemo(() => unique(cars.map((car) => car.make)), [cars]);
  const modelOptions = useMemo(
    () => unique(cars.filter((car) => !make || car.make === make).map((car) => car.model)),
    [cars, make]
  );
  const fuelOptions = useMemo(() => unique(cars.map((car) => car.fuel)), [cars]);
  const transmissionOptions = useMemo(() => unique(cars.map((car) => car.transmission)), [cars]);
  const bodyTypeOptions = useMemo(() => unique(cars.map((car) => car.bodyType)), [cars]);
  const locationOptions = useMemo(() => unique(cars.map((car) => car.location)), [cars]);
  const yearOptions = useMemo(
    () => [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a),
    [cars]
  );

  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();
    const lowPrice = Number(minPrice) || 0;
    const highPrice = Number(maxPrice) || Number.POSITIVE_INFINITY;
    const lowYear = Number(minYear) || 0;
    const highYear = Number(maxYear) || Number.POSITIVE_INFINITY;

    const results = cars.filter((car) => {
      const matchesSearch = !query || [car.title, car.make, car.model, car.engine, car.location]
        .join(" ").toLowerCase().includes(query);

      return matchesSearch
        && (!make || car.make === make)
        && (!model || car.model === model)
        && car.price >= lowPrice
        && car.price <= highPrice
        && car.year >= lowYear
        && car.year <= highYear
        && (!fuel || car.fuel === fuel)
        && (!transmission || car.transmission === transmission)
        && (!bodyType || car.bodyType === bodyType)
        && (!location || car.location === location);
    });

    return results.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [cars, search, make, model, minPrice, maxPrice, minYear, maxYear, fuel, transmission, bodyType, location, sortBy]);

  const activeFilterCount = [make, model, minPrice, maxPrice, minYear, maxYear, fuel, transmission, bodyType, location]
    .filter(Boolean).length;

  function changeMake(value: string) {
    setMake(value);
    setModel("");
  }

  function clearFilters() {
    setSearch("");
    setMake("");
    setModel("");
    setMinPrice("");
    setMaxPrice("");
    setMinYear("");
    setMaxYear("");
    setFuel("");
    setTransmission("");
    setBodyType("");
    setLocation("");
    setSortBy("newest");
  }

  return {
    filteredCars, activeFilterCount, makeOptions, modelOptions, fuelOptions,
    transmissionOptions, bodyTypeOptions, locationOptions, yearOptions,
    search, setSearch, make, setMake: changeMake, model, setModel,
    minPrice, setMinPrice, maxPrice, setMaxPrice, minYear, setMinYear,
    maxYear, setMaxYear, fuel, setFuel, transmission, setTransmission,
    bodyType, setBodyType, location, setLocation, sortBy, setSortBy, clearFilters,
  };
}
