"use client";

import { useState } from "react";

import VehicleCard from "./VehicleCard";
import FilterBar from "./FilterBar";

import { useCarFilters } from "../hooks/useCarFilters";
import type { Vehicle } from "../types";

type CarsBrowserProps = {
  cars: Vehicle[];
  initialSearch?: string;
};

export default function CarsBrowser({ cars, initialSearch = "" }: CarsBrowserProps) {
  const [visibleCount, setVisibleCount] = useState(24);
  const {
    filteredCars,

    search,
    setSearch,

    activeFilterCount,
    make,
    setMake,
    makeOptions,
    model,
    setModel,
    modelOptions,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    yearOptions,

    fuel,
    setFuel,
    fuelOptions,

    transmission,
    setTransmission,
    transmissionOptions,

    bodyType,
    setBodyType,
    bodyTypeOptions,

    location,
    setLocation,
    locationOptions,

    sortBy,
    setSortBy,

    clearFilters,
  } = useCarFilters(cars, initialSearch);

  const visibleCars = filteredCars.slice(0, visibleCount);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border/40 bg-background/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-semibold text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
              Cars Available in Kenya
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Browse Quality
              <span className="block text-green-600">Vehicles</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Browse cars from private owners and showroom partners. If you do
              not see what you need, tell us and we&apos;ll help you find it.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm dark:bg-neutral-900">
                <p className="text-3xl font-black text-green-600">
                  {filteredCars.length}
                </p>

                <p className="text-sm text-muted-foreground">
                  Matching Vehicles
                </p>
              </div>

              <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm dark:bg-neutral-900">
                <p className="text-3xl font-black text-green-600">
                  {cars.length}
                </p>

                <p className="text-sm text-muted-foreground">
                  Total Listings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE LISTINGS */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <FilterBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeFilterCount={activeFilterCount}
          make={make}
          setMake={setMake}
          makeOptions={makeOptions}
          model={model}
          setModel={setModel}
          modelOptions={modelOptions}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minYear={minYear}
          setMinYear={setMinYear}
          maxYear={maxYear}
          setMaxYear={setMaxYear}
          yearOptions={yearOptions}
          fuel={fuel}
          setFuel={setFuel}
          fuelOptions={fuelOptions}
          transmission={transmission}
          setTransmission={setTransmission}
          transmissionOptions={transmissionOptions}
          bodyType={bodyType}
          setBodyType={setBodyType}
          bodyTypeOptions={bodyTypeOptions}
          location={location}
          setLocation={setLocation}
          locationOptions={locationOptions}
          clearFilters={clearFilters}
        />

        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
              Browse Cars
            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Available Vehicles
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold">
                {filteredCars.length}
              </span>{" "}
              of{" "}
              <span className="font-bold">
                {cars.length}
              </span>{" "}
              available vehicles.
            </p>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleCars.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </section>
        ) : (
          <div className="rounded-3xl border border-dashed bg-white py-20 text-center shadow-sm dark:bg-neutral-900">
            <h3 className="text-2xl font-bold">
              No vehicles found
            </h3>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Try changing your search or filter options.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {visibleCount < filteredCars.length && (
          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {visibleCars.length} of {filteredCars.length} vehicles
            </p>
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 24)}
              className="rounded-xl border border-green-200 bg-white px-8 py-3 text-sm font-bold text-green-700 shadow-sm transition hover:border-green-600 hover:bg-green-50 dark:border-green-900 dark:bg-neutral-900 dark:text-green-300 dark:hover:bg-green-950"
            >
              Load 24 more
            </button>
          </div>
        )}
      </section>
    </>
  );
}
