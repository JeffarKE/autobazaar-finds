import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description: "Let Auto Bazaar Finds advertise your car and connect you with serious buyers in Kenya.",
};

const whatsappMessage = encodeURIComponent(
  "Hi Auto Bazaar Finds, I'd like your help selling my car. I'll send the car details and photos here."
);

const whatsappUrl = `https://wa.me/254741056053?text=${whatsappMessage}`;

export default function SellPage() {
  return (
    <main className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
              SELL YOUR CAR
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Sell Your Car Faster.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Whether it is your own car or showroom stock, we advertise it on
              our website and social pages, speak to interested buyers and help
              you through the sale.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle className="mr-2 inline h-5 w-5" /> Sell with us on WhatsApp
              </Link>

              <Link
                href="/cars"
                className="rounded-xl border border-gray-300 px-8 py-4 text-lg font-semibold hover:bg-gray-100"
              >
                Browse Cars
              </Link>
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
            <div className="rounded-3xl bg-gray-100 p-10 shadow-lg dark:bg-gray-900">
              <h2 className="text-2xl font-bold">
                No Upfront Listing Fee
              </h2>

              <p className="mt-4 text-gray-600">
                You only pay when we successfully sell your vehicle.
              </p>

              <div className="mt-8 rounded-2xl bg-white p-8 shadow dark:bg-gray-950">
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Commission
                </p>

                <h3 className="mt-2 text-5xl font-black text-green-600">
                  3%
                </h3>

                <p className="mt-2 text-gray-600">
                  Payable only after a successful sale through Auto Bazaar Finds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-4xl font-bold text-center">
          Why Sell With Auto Bazaar Finds?
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border p-8">
            <h3 className="text-xl font-bold">
              Better advertising
            </h3>

            <p className="mt-4 text-gray-600">
              We present your car clearly on our website and social pages.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="text-xl font-bold">
              Serious Buyers
            </h3>

            <p className="mt-4 text-gray-600">
              We speak to interested buyers and help cut down time-wasters.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="text-xl font-bold">
              No Risk
            </h3>

            <p className="mt-4 text-gray-600">
              No upfront listing fee. We only earn when your vehicle sells.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl font-bold">
            How It Works
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Contact us on WhatsApp",
              "Send vehicle details",
              "Send vehicle photos",
              "We publish your listing",
              "Receive buyer enquiries",
              "Pay only 3% after sale",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-950"
              >
                <div className="text-3xl font-black text-green-600">
                  0{index + 1}
                </div>

                <p className="mt-4 text-lg font-semibold">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-600 px-5 py-12 text-center text-white sm:px-8 sm:py-16">
          <h2 className="text-4xl font-bold">
            Ready to Sell Your Car?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-green-50">
            Send us the details and photos. We&apos;ll help you take it from there.
          </p>

          <Link
            href={whatsappUrl}
            target="_blank"
            className="mt-10 inline-flex rounded-xl bg-white px-10 py-4 text-lg font-bold text-green-700 transition hover:scale-105"
          >
            <MessageCircle className="mr-2 inline h-5 w-5" /> Sell with us on WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
