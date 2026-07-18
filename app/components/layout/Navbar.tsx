"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  CarFront,
  Heart,
  CircleDollarSign,
  Phone,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [savedCount, setSavedCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function updateSavedCount() {
      const savedCars: string[] = JSON.parse(
        localStorage.getItem("savedCars") || "[]"
      );

      setSavedCount(savedCars.length);
    }

    updateSavedCount();

    window.addEventListener("storage", updateSavedCount);
    window.addEventListener("savedCarsUpdated", updateSavedCount);

    return () => {
      window.removeEventListener("storage", updateSavedCount);
      window.removeEventListener(
        "savedCarsUpdated",
        updateSavedCount
      );
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/cars",
      label: "Cars",
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
      label: "Sell",
      icon: CircleDollarSign,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Phone,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight"
        >
          <span className="text-white">Auto</span>
          <span className="text-green-500"> Baazar</span>
          <span className="text-white"> Finds</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-green-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 md:hidden">
          <div className="flex flex-col p-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 ${
                    active
                      ? "bg-green-500 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}