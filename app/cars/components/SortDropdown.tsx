"use client";

import { SortOption } from "../hooks/useCarFilters";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: {
  label: string;
  value: SortOption;
}[] = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Price: Low → High",
    value: "price-low",
  },
  {
    label: "Price: High → Low",
    value: "price-high",
  },
];

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm font-medium shadow-sm outline-none transition-all duration-300 hover:border-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-green-900/30"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}