import type { MetadataRoute } from "next";

import { getPublicVehicles } from "./cars/services/getPublicVehicles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getPublicVehicles();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/cars`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/sell`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/source`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...staticPages,
    ...vehicles.map((vehicle) => ({
      url: `${siteUrl}/cars/${vehicle.id}`,
      lastModified: new Date(vehicle.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: vehicle.images,
    })),
  ];
}
