import type { Metadata } from "next";

import CarsBrowser from "./components/CarsBrowser";
import { getPublicVehicles } from "./services/getPublicVehicles";
import { mockVehicles } from "./mockVehicles";
import { serializeJsonLd, vehicleListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cars for Sale in Kenya",
  description:
    "Browse used cars for sale in Kenya by make, model, price, year, fuel type and location. View verified vehicle details and arrange a viewing.",
  alternates: { canonical: "/cars" },
  openGraph: {
    title: "Cars for Sale in Kenya | Auto Bazaar Finds",
    description:
      "Search available vehicles from private owners and showroom partners across Kenya.",
    url: "/cars",
  },
};

export default async function CarsPage({ searchParams }: PageProps<"/cars">) {
  const cars = process.env.NODE_ENV === "development"
    ? mockVehicles
    : await getPublicVehicles();
  const params = await searchParams;
  const initialSearch = typeof params.q === "string" ? params.q : "";
  const browserCars = cars.map((vehicle) => ({
    ...vehicle,
    images: vehicle.images.slice(0, vehicle.featured ? 4 : 1),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-neutral-950 dark:to-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(vehicleListJsonLd(cars)),
        }}
      />
      <CarsBrowser cars={browserCars} initialSearch={initialSearch} />
    </main>
  );
}
