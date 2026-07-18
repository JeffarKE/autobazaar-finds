"use client";

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

const marketplace = [
  { name: "Cars", href: "/cars" },
  { name: "Motorcycles", href: "/marketplace" },
  { name: "Trucks", href: "/marketplace" },
  { name: "Boats", href: "/marketplace" },
  { name: "Aircraft", href: "/marketplace" },
  { name: "Machinery", href: "/marketplace" },
];

const company = [
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-black tracking-tight">
              Auto Baazar Finds
            </h2>

            <p className="mt-5 leading-7 text-neutral-400">
              Kenya's modern vehicle marketplace built to connect buyers and
              sellers through trust, transparency and premium listings.
            </p>

            <div className="mt-8 space-y-4 text-sm text-neutral-400">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Nairobi, Kenya
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +254 XXX XXX XXX
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                hello@autobazaarfinds.co.ke
              </div>

            </div>

          </div>

          {/* Marketplace */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Marketplace
            </h3>

            <div className="space-y-3">

              {marketplace.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between text-neutral-400 transition hover:text-white"
                >
                  {item.name}

                  <ArrowRight size={16} />

                </Link>
              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Company
            </h3>

            <div className="space-y-3">

              {company.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-neutral-400 transition hover:text-white"
                >
                  {item.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-lg font-semibold">
              Stay Updated
            </h3>

            <p className="mt-4 text-neutral-400">
              Subscribe for newly listed vehicles and marketplace updates.
            </p>

            <div className="mt-6 flex">

              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-l-xl border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none"
              />

              <button className="rounded-r-xl bg-white px-5 text-black transition hover:bg-neutral-200">
                Join
              </button>

            </div>

            <div className="mt-8 flex gap-5 text-xl">

              <a href="#" className="transition hover:text-blue-500">
                <FaFacebookF />
              </a>

              <a href="#" className="transition hover:text-pink-500">
                <FaInstagram />
              </a>

              <a href="#" className="transition hover:text-white">
                <FaXTwitter />
              </a>

              <a href="#" className="transition hover:text-sky-500">
                <FaLinkedinIn />
              </a>

              <a href="#" className="transition hover:text-white">
                <FaTiktok />
              </a>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">

          © {new Date().getFullYear()} Auto Baazar Finds.
          Built with ❤️ in Kenya.

        </div>

      </div>
    </footer>
  );
}