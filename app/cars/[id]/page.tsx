import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import {
  ChevronRight,
  MapPin,
  Calendar,
  BadgeCheck,
  Star,
} from "lucide-react";

import VehicleGallery from "../components/VehicleGallery";
import VehicleSpecs from "../components/VehicleSpecs";
import ContactCard from "../components/ContactCard";
import DescriptionCard from "../components/DescriptionCard";
import RelatedCars from "../components/RelatedCars";
import ListingViewTracker from "../components/ListingViewTracker";
import {
  getPublicVehicleById,
  getPublicVehicles,
} from "../services/getPublicVehicles";
import {
  absoluteUrl,
  serializeJsonLd,
  siteName,
  siteUrl,
  vehicleImageUrl,
  vehicleMetaDescription,
} from "@/lib/seo";

export const revalidate = 60;

const getVehicle = cache(getPublicVehicleById);

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
      robots: { index: false, follow: false },
    };
  }

  const shareDescription = vehicleMetaDescription(vehicle);
  const canonicalPath = `/cars/${vehicle.id}`;
  const socialImage = vehicleImageUrl(vehicle.id);

  return {
    title: `${vehicle.title} for Sale in ${vehicle.location}`,
    description: shareDescription,
    keywords: [
      `${vehicle.title} for sale`,
      `${vehicle.make} ${vehicle.model} Kenya`,
      `cars for sale in ${vehicle.location}`,
      `${vehicle.bodyType} for sale in Kenya`,
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${vehicle.title} for Sale in ${vehicle.location}`,
      description: shareDescription,
      url: canonicalPath,
      siteName,
      type: "website",
      locale: "en_KE",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.title} for Sale`,
      description: shareDescription,
      images: [socialImage],
    },
  };
}

export default async function VehicleDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [vehicle, cars] = await Promise.all([
    getVehicle(id),
    getPublicVehicles(),
  ]);

  if (!vehicle) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-KE").format(
    vehicle.price
  );
  const canonicalUrl = absoluteUrl(`/cars/${vehicle.id}`);
  const structuredImages = vehicle.images.map((_, index) =>
    vehicleImageUrl(vehicle.id, index)
  );
  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "@id": `${canonicalUrl}#vehicle`,
    url: canonicalUrl,
    name: vehicle.title,
    description: vehicle.description,
    image: structuredImages,
    sku: vehicle.id,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuel,
    bodyType: vehicle.bodyType,
    color: vehicle.color,
    driveWheelConfiguration: vehicle.driveType,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    vehicleEngine: {
      "@type": "EngineSpecification",
      name: vehicle.engine,
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "KES",
      price: vehicle.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@id": `${absoluteUrl("/")}#organization` },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cars for Sale",
        item: absoluteUrl("/cars"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_55%)]" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([vehicleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <ListingViewTracker vehicleId={vehicle.id} />
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500 sm:mb-6">
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

      {/* Main Layout */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_380px]">
        <div className="space-y-10">
          <VehicleGallery
            images={vehicle.images}
            title={vehicle.title}
          >
            <header className="relative z-10 px-1 pt-1 lg:-mt-40 lg:px-7 lg:pb-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 lg:text-white/80">
                {vehicle.featured ? (
                  <span className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">
                    Available
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {vehicle.year}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {vehicle.location}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-900 dark:text-white sm:text-4xl lg:text-white">
                {vehicle.title}
              </h1>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <p className="text-3xl font-black tracking-tight text-green-600 sm:text-4xl">
                  KSh {formattedPrice}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 lg:text-white/80">
                  <BadgeCheck className="h-5 w-5 text-green-600" />
                  <span>Listed by <strong className="text-slate-800 dark:text-slate-200 lg:text-white">Auto Bazaar Finds</strong></span>
                </div>
              </div>
            </header>
          </VehicleGallery>

          <VehicleSpecs vehicle={vehicle} />

          <DescriptionCard
            description={vehicle.description}
          />
        </div>

        <div>
          <ContactCard vehicle={vehicle} siteUrl={siteUrl} />
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
