import type { Metadata } from "next";

import HomeMarketplace from "./components/HomeMarketplace";
import { getPublicVehicles } from "./cars/services/getPublicVehicles";
import { mockVehicles } from "./cars/mockVehicles";
import { serializeJsonLd, siteUrl, vehicleListJsonLd } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cars for Sale in Kenya | Buy, Sell or Source a Car",
  description:
    "Browse quality used cars for sale in Kenya from private owners and showroom partners. Sell your car or ask Auto Bazaar Finds to source one for you.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cars for Sale in Kenya | Auto Bazaar Finds",
    description:
      "Browse quality cars, advertise yours, or let us help you source the right vehicle in Kenya.",
    url: "/",
  },
};

export default async function Home() {
  const isLocalPreview = process.env.NODE_ENV === "development";
  const vehicles = isLocalPreview ? [] : await getPublicVehicles();
  const marketplaceVehicles = isLocalPreview ? mockVehicles : vehicles;
  const cardVehicles = marketplaceVehicles.map((vehicle) => ({
    ...vehicle,
    images: vehicle.images.slice(0, 4),
  }));

  return (
    <main className="min-h-screen bg-[#f4f7f5] dark:bg-[#07110c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            vehicleListJsonLd(marketplaceVehicles, "Featured cars for sale in Kenya")
          ),
        }}
      />
      <HomeMarketplace vehicles={cardVehicles} siteUrl={siteUrl} />
    </main>
  );
}
