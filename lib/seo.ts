import "server-only";

import type { Vehicle } from "@/app/cars/types";

export const siteName = "Auto Bazaar Finds";
export const defaultDescription =
  "Browse quality cars for sale in Kenya, advertise your vehicle, or let Auto Bazaar Finds help you source the right car.";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return process.env.NODE_ENV === "production"
      ? "https://autobazaarfinds.co.ke"
      : "http://localhost:3000";
  }

  const withProtocol = /^https?:\/\//i.test(value)
    ? value
    : `https://${value}`;

  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL
);

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function vehicleImagePath(vehicleId: string, index = 0) {
  return `/cars/${encodeURIComponent(vehicleId)}/image/${index}`;
}

export function vehicleImageUrl(vehicleId: string, index = 0) {
  return absoluteUrl(vehicleImagePath(vehicleId, index));
}

export function vehicleMetaDescription(vehicle: Vehicle) {
  const price = new Intl.NumberFormat("en-KE").format(vehicle.price);
  const mileage = new Intl.NumberFormat("en-KE").format(vehicle.mileage);

  return `${vehicle.title} for sale in ${vehicle.location}, Kenya. KSh ${price}, ${mileage} km, ${vehicle.fuel}, ${vehicle.transmission}. View photos and arrange a viewing with Auto Bazaar Finds.`;
}

export function vehicleListJsonLd(
  vehicles: Vehicle[],
  name = "Cars for sale in Kenya"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: vehicles.length,
    itemListElement: vehicles.slice(0, 50).map((vehicle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/cars/${vehicle.id}`),
      name: vehicle.title,
      image: vehicleImageUrl(vehicle.id),
    })),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
