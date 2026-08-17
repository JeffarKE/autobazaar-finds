import type { MetadataRoute } from "next";

import { absoluteUrl, vehicleImageUrl } from "@/lib/seo";
import { getPublicVehicles } from "./cars/services/getPublicVehicles";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/cars"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/sell"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/source"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/partners"), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Keep the core sitemap available if the inventory service has a brief outage.
  // Search engines can retry vehicle URLs on their next crawl.
  let vehicles: Awaited<ReturnType<typeof getPublicVehicles>> = [];
  try {
    vehicles = await getPublicVehicles();
  } catch (error) {
    console.error("Unable to add inventory to the sitemap", error);
  }

  return [
    ...staticPages,
    ...vehicles.map((vehicle) => ({
      url: absoluteUrl(`/cars/${vehicle.id}`),
      lastModified: new Date(vehicle.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: vehicle.images.map((_, index) =>
        vehicleImageUrl(vehicle.id, index)
      ),
    })),
  ];
}
