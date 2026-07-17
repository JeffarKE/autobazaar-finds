"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type SaveButtonProps = {
  carId: string;
};

export default function SaveButton({ carId }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCars: string[] = JSON.parse(
      localStorage.getItem("savedCars") || "[]"
    );

    setSaved(savedCars.includes(carId));
  }, [carId]);

  function toggleSave() {
    let savedCars: string[] = JSON.parse(
      localStorage.getItem("savedCars") || "[]"
    );

    if (saved) {
      savedCars = savedCars.filter((id) => id !== carId);
    } else {
      if (!savedCars.includes(carId)) {
        savedCars.push(carId);
      }
    }

    localStorage.setItem(
      "savedCars",
      JSON.stringify(savedCars)
    );

    // Notify the Navbar that the saved list has changed
    window.dispatchEvent(
      new Event("savedCarsUpdated")
    );

    setSaved(!saved);
  }

  return (
    <button
      type="button"
      onClick={toggleSave}
      className={`flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold shadow-sm transition-all duration-200 border ${
        saved
          ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
          : "bg-white border-gray-300 hover:border-red-500 hover:text-red-600"
      }`}
    >
      <Heart
        size={22}
        fill={saved ? "currentColor" : "none"}
      />

      {saved ? "Saved" : "Save Vehicle"}
    </button>
  );
}