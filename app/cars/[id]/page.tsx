import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Calendar,
  BadgeCheck,
  Star,
} from "lucide-react";

import { cars } from "@/app/data/cars";

import VehicleGallery from "../components/VehicleGallery";
import VehicleSpecs from "../components/VehicleSpecs";
import ContactCard from "../components/ContactCard";
import DescriptionCard from "../components/DescriptionCard";
import RelatedCars from "../components/RelatedCars";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;

  const vehicle = cars.find((v) => v.id === id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Auto Bazaar Finds",
    };
  }

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Auto Bazaar Finds`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const vehicle = cars.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-KE").format(
    vehicle.price
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>

        <ChevronRight className="h-4 w-4" />

        <Link href="/cars" className="hover:text-green-600">
          Cars
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-slate-900 dark:text-white">
          {vehicle.make} {vehicle.model}
        </span>
      </nav>

      {/* Header */}
      <section className="mb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {vehicle.featured ? (
                <span className="flex items-center gap-1 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                  <Star className="h-4 w-4 fill-current" />
                  Featured
                </span>
              ) : (
                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  Available
                </span>
              )}

              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="h-4 w-4" />
                {vehicle.year}
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4" />
                {vehicle.location}
              </div>
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              {vehicle.title}
            </h1>

            <p className="mt-4 text-4xl font-black text-green-600">
              KSh {formattedPrice}
            </p>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 px-6 py-5 dark:border-green-900 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-8 w-8 text-green-600" />

              <div>
                <p className="font-semibold">
                  Auto Bazaar Finds
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Premium Vehicle Listing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <VehicleGallery
            images={vehicle.images}
            title={vehicle.title}
          />

          <VehicleSpecs vehicle={vehicle} />

          <DescriptionCard
            description={vehicle.description}
          />
        </div>

        <div>
          <ContactCard vehicle={vehicle} />
        </div>
      </section>

      {/* Related Vehicles */}
      <section className="mt-20">
        <RelatedCars
          currentCar={vehicle}
          cars={cars}
        />
      </section>
    </main>
  );
}