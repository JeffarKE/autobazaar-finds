import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CarFront,
  MessageCircle,
  Search,
  Handshake,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/254741056053?text=Hi%20Auto%20Bazaar%20Finds%2C%20I%20saw%20your%20website%20and%20I%20need%20help%20with%20a%20car.";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Auto Bazaar Finds helps private owners and showrooms advertise vehicles and helps buyers source quality cars across Kenya.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Auto Bazaar Finds",
    description:
      "A Kenyan vehicle marketplace and sourcing service built to make buying and selling cars clearer and easier.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
          About Auto Bazaar Finds
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
          Helping Kenyans Buy and Sell Vehicles With Confidence.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Auto Bazaar Finds helps private owners and showrooms advertise their
          cars and reach serious buyers. We also help buyers find a car that
          suits their needs and budget.
        </p>
      </section>

      {/* How it works */}
      <section className="mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Whether you are buying or selling, we help you through each step.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Search className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Browse
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Explore available vehicles and find one that suits your needs.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <CarFront className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Choose
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Check the details and photos, then ask us about the car.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <MessageCircle className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Chat
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Talk to us on WhatsApp and get a clear, helpful response.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Handshake className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Purchase
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Arrange a viewing, inspect the vehicle and complete the deal.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-3xl bg-slate-900 px-8 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Find Your Next Car?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Browse the latest cars or tell us on WhatsApp what you are looking for.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            Browse Cars
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            Ask us on WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
