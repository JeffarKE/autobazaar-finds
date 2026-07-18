"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by make, model or vehicle name..."
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          pl-14
          pr-4
          text-base
          shadow-sm
          outline-none
          transition-all
          duration-300

          placeholder:text-gray-400

          hover:border-green-400

          focus:border-green-600
          focus:ring-4
          focus:ring-green-100

          dark:border-gray-700
          dark:bg-gray-900
          dark:text-white
          dark:focus:ring-green-900/30
        "
      />
    </div>
  );
}