import type { Metadata } from "next";
import { BadgeCheck, Search, ShieldCheck } from "lucide-react";

import SourceVehicleForm from "./SourceVehicleForm";

export const metadata: Metadata = {
  title: "Find Me a Car",
  description: "Tell us the car and budget you have in mind. We will help you find a good option in Kenya.",
};

export default function SourceVehiclePage() {
  return (
    <main className="bg-slate-50 dark:bg-gray-950">
      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              Find Me a Car
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Tell us what you need. We&apos;ll help you find it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Tell us the car and budget you have in mind. We&apos;ll look for good options and guide you through the next steps.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Benefit icon={<Search />} text="We do the search" />
              <Benefit icon={<BadgeCheck />} text="Good options" />
              <Benefit icon={<ShieldCheck />} text="Help all the way" />
            </div>
          </div>

          <SourceVehicleForm />
        </div>
      </section>
    </main>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold">
      <span className="text-green-400">{icon}</span>
      {text}
    </div>
  );
}
