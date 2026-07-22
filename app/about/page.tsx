import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  MessageCircle,
  Search,
  Handshake,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/254741056053?text=Hi%20Auto%20Bazaar%20Finds%2C%20I'm%20interested%20in%20one%20of%20your%20vehicles.";

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
          Auto Bazaar Finds is an independent Kenyan vehicle brokerage
          built from a genuine passion for cars. Combining vehicle sales
          experience with technical knowledge, our goal is simple:
          connect genuine buyers with quality vehicles while helping
          sellers reach the right audience.
        </p>
      </section>

      {/* How it works */}
      <section className="mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Buying a vehicle shouldn't be complicated.
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
              View detailed information and photos before making an enquiry.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <MessageCircle className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Chat
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Reach out directly on WhatsApp for quick responses.
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
          Browse our latest listings or get in touch on WhatsApp if you're
          looking for something specific.
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
            Chat on WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}