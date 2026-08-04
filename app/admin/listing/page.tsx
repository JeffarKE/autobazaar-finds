"use client";

import { useState } from "react";

import UploadPhotos from "./components/UploadPhotos";
import VehicleInformation from "./components/VehicleInformation";
import VehicleSpecifications from "./components/VehicleSpecifications";
import Pricing from "./components/Pricing";
import Description from "./components/Description";
import SellerInformation from "./components/SellerInformation";
import LivePreview from "./components/LivePreview";
import PublishBar from "./components/PublishBar";

import { Vehicle, emptyVehicle } from "@/lib/vehicle";

export default function ListingPage() {
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Create Vehicle Listing
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new vehicle to your inventory. Complete the information below
            and publish when you're ready.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <form className="space-y-8">
            <UploadPhotos />

            <VehicleInformation
              vehicle={vehicle}
              setVehicle={setVehicle}
            />

            <VehicleSpecifications
              vehicle={vehicle}
              setVehicle={setVehicle}
            />

            <Pricing />

            <Description />

            <SellerInformation />
          </form>

          <aside className="space-y-6">
            <LivePreview />

            <PublishBar />
          </aside>
        </div>
      </section>
    </main>
  );
}