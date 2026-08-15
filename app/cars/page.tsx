import type { Metadata } from "next";

import CarsBrowser from "./components/CarsBrowser";
import { getPublicVehicles } from "./services/getPublicVehicles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vehicles for Sale | Auto Bazaar Finds",
  description: "Browse cars for sale from private owners and showroom partners in Kenya.",
};

export default async function CarsPage() {
  const cars = await getPublicVehicles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-neutral-950 dark:to-black">
      <CarsBrowser cars={cars} />
    </main>
  );
}
