"use client";

type SearchFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  make: string;
  setMake: (value: string) => void;

  fuel: string;
  setFuel: (value: string) => void;

  transmission: string;
  setTransmission: (value: string) => void;

  makes: string[];
};

export default function SearchFilters({
  search,
  setSearch,
  make,
  setMake,
  fuel,
  setFuel,
  transmission,
  setTransmission,
  makes,
}: SearchFiltersProps) {
  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search make or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        />

        {/* Make */}
        <select
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Makes</option>

          {makes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Fuel */}
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        {/* Transmission */}
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

      </div>
    </section>
  );
}