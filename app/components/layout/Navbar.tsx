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
  SearchCheck,
  MessageCircle,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/254741056053?text=Hi%20Auto%20Bazaar%20Finds%2C%20I%20saw%20your%20website%20and%20I%20need%20help%20with%20a%20car.";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

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
      href: "/source",
      label: "Find Me a Car",
      icon: SearchCheck,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-6 lg:h-16">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Auto Bazaar Finds home"
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
        <nav aria-label="Primary navigation" className="hidden items-center gap-2 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
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
            Chat on WhatsApp
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col p-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
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
              Chat on WhatsApp
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
