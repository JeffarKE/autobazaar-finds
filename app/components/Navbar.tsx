"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CarFront,
  Heart,
  CircleDollarSign,
  Phone,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateSavedCount() {
      const savedCars: string[] = JSON.parse(
        localStorage.getItem("savedCars") || "[]"
      );

      setSavedCount(savedCars.length);
    }

    // Load when navbar mounts
    updateSavedCount();

    // Update whenever localStorage changes
    window.addEventListener("storage", updateSavedCount);

    // Update when another component tells us saved cars changed
    window.addEventListener("savedCarsUpdated", updateSavedCount);

    return () => {
      window.removeEventListener("storage", updateSavedCount);
      window.removeEventListener(
        "savedCarsUpdated",
        updateSavedCount
      );
    };
  }, []);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/browse",
      label: "Browse Cars",
      icon: CarFront,
    },
    {
      href: "/saved",
      label:
        savedCount > 0
          ? `Saved (${savedCount})`
          : "Saved",
      icon: Heart,
    },
    {
      href: "/sell",
      label: "Sell Your Car",
      icon: CircleDollarSign,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Phone,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-gray-300 transition"
        >
          Auto Baazar Finds
        </Link>

        <div className="hidden md:flex items-center gap-8">

          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 transition ${
                pathname === href
                  ? "text-green-400 font-semibold"
                  : "hover:text-gray-300"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}

        </div>

      </div>

    </nav>
  );
}