"use client";

interface FilterBarProps {
  fuel: string;
  setFuel: (value: string) => void;
  fuelOptions: string[];

  transmission: string;
  setTransmission: (value: string) => void;
  transmissionOptions: string[];

  bodyType: string;
  setBodyType: (value: string) => void;
  bodyTypeOptions: string[];

  location: string;
  setLocation: (value: string) => void;
  locationOptions: string[];

  clearFilters: () => void;
}

export default function FilterBar({
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

  clearFilters,
}: FilterBarProps) {
  const selectClasses =
    "h-12 rounded-xl border bg-background px-4 text-sm transition-colors focus:border-green-600 focus:outline-none";

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-neutral-900">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* Fuel */}
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className={selectClasses}
        >
          <option value="">All Fuel Types</option>

          {fuelOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Transmission */}
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className={selectClasses}
        >
          <option value="">Transmission</option>

          {transmissionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Body Type */}
        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          className={selectClasses}
        >
          <option value="">Body Type</option>

          {bodyTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={selectClasses}
        >
          <option value="">Location</option>

          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={clearFilters}
          className="h-12 rounded-xl bg-green-600 px-4 font-semibold text-white transition hover:bg-green-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}