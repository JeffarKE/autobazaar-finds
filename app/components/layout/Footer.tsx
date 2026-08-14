import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const browse = [
  { name: "Browse Cars", href: "/cars" },
  { name: "Sell Your Car", href: "/sell" },
  { name: "Vehicle Sourcing", href: "/source" },
];

const company = [
  { name: "About", href: "/about" },
];

const whatsappUrl =
  "https://wa.me/254741056053?text=Hi%20Auto%20Bazaar%20Finds%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Auto Bazaar Finds
            </h2>

            <p className="mt-5 leading-7 text-neutral-400">
              An independent vehicle brokerage and sourcing platform. We sell
              on behalf of owners and help buyers find the right vehicle.
            </p>

            <div className="mt-8 space-y-4 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Nairobi, Kenya
              </div>

              <Link
                href="tel:+254741056053"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={18} />
                +254 741 056 053
              </Link>

              <Link
                href="mailto:autobazaarfinds@gmail.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={18} />
                autobazaarfinds@gmail.com
              </Link>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Browse
            </h3>

            <div className="space-y-3">
              {browse.map((item) => (
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

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Get in Touch
            </h3>

            <p className="mt-4 text-neutral-400">
              Ask about a listing, sell through us, or let us source a vehicle
              for you. Auto Bazaar Finds is not a dealership.
            </p>

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              WhatsApp Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Auto Bazaar Finds. Built with ❤️ in Kenya.
        </div>
      </div>
    </footer>
  );
}
