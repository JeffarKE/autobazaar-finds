import HomeMarketplace from "./components/HomeMarketplace";
import { getPublicVehicles } from "./cars/services/getPublicVehicles";
import { mockVehicles } from "./cars/mockVehicles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const isLocalPreview = process.env.NODE_ENV === "development";
  const vehicles = isLocalPreview ? [] : await getPublicVehicles();
  const marketplaceVehicles = isLocalPreview ? mockVehicles : vehicles;
  return (
    <main className="min-h-screen bg-[#f4f7f5] dark:bg-[#07110c]">
      <HomeMarketplace vehicles={marketplaceVehicles} />
    </main>
  );
}
