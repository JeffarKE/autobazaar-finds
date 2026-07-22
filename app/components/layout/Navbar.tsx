"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  CarFront,
  CircleDollarSign,
  Info,
  MessageCircle,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/254741056053?text=Hi%20Auto%20Bazaar%20Finds%2C%20I'm%20interested%20in%20one%20of%20your%20vehicles.";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      label: "Browse Cars",
      icon: CarFront,
    },
    {
      href: "/sell",
      label: "Sell Your Car",
      icon: CircleDollarSign,
    },
    {
      href: "/about",
      label: "About",
      icon: Info,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-extrabold tracking-tight"
        >
          <span className="text-white">Auto</span>
          <span className="text-green-500">Bazaar</span>
          <span className="text-white">Finds</span>

          <span className="rounded-md bg-green-500 px-2 py-0.5 text-xs font-bold text-black">
            KE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

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

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 lg:flex"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col p-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active
                      ? "bg-green-500 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              );
            })}

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}