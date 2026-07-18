"use client";

import ResultsGrid from "./components/ResultsGrid";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import { useVehicleFilters } from "./hooks/useVehicleFilters";
import { vehicles } from "../data/vehicles";

export default function CarsPage() {
  const {
    filteredVehicles,
    search,
    setSearch,
    sortBy,
    setSortBy,
  } = useVehicleFilters(vehicles);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Hero */}
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
            Auto Baazar Finds
          </span>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Find Your Perfect Vehicle
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Browse verified listings from trusted sellers across Kenya.
            Find SUVs, hatchbacks, sedans, pickups and luxury vehicles
            all in one place.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_240px]">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        {/* Results Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Featured Vehicles
          </h2>

          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow dark:bg-gray-900 dark:text-white">
            {filteredVehicles.length} Vehicle
            {filteredVehicles.length !== 1 && "s"}
          </span>
        </div>

        {/* Vehicle Grid */}
        <ResultsGrid vehicles={filteredVehicles} />
      </section>
    </main>
  );
}