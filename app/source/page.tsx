import type { Metadata } from "next";
import { BadgeCheck, Search, ShieldCheck } from "lucide-react";

import SourceVehicleForm from "./SourceVehicleForm";

export const metadata: Metadata = {
  title: "Vehicle Sourcing | Auto Bazaar Finds",
  description: "Tell Auto Bazaar Finds what vehicle you need and let our independent brokerage help source suitable options in Kenya.",
};

export default function SourceVehiclePage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              Personal Vehicle Sourcing
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Tell us what you need. We&apos;ll help you find it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your preferences and budget. Auto Bazaar Finds will help identify suitable vehicles and coordinate the next steps with you.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Benefit icon={<Search />} text="Focused search" />
              <Benefit icon={<BadgeCheck />} text="Suitable options" />
              <Benefit icon={<ShieldCheck />} text="Guided process" />
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
