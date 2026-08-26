import { unstable_cache } from "next/cache";

import { createPublicSupabaseClient } from "@/lib/supabase-public";
import { parseVehicleCondition } from "@/lib/vehicleCondition";
import type { FuelType, Transmission, Vehicle } from "../types";
import { mockVehicles } from "../mockVehicles";

type VehicleRow = {
  id: string | number;
  listingTitle?: string | null;
  make: string | null;
  model: string | null;
  year: number | string | null;
  price: number | string | null;
  mileage: number | string | null;
  fuelType: string | null;
  transmission: string | null;
  driveType: string | null;
  engineSize: string | null;
  bodyType: string | null;
  exteriorColor?: string | null;
  interiorColor?: string | null;
  condition?: string | null;
  description: string | null;
  sellerName: string | null;
  phone: string | null;
  location: string | null;
  featured?: boolean | null;
  verified?: boolean | null;
  turbo?: boolean | null;
  created_at?: string | null;
};

type VehicleImageRow = {
  vehicle_id: string | number;
  image_url: string | null;
  display_order: number | null;
  is_cover: boolean | null;
  storage_path: string | null;
};

const FALLBACK_IMAGE = "/cars/forester.jpg";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function displayWords(value: string | null): string {
  return (value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => {
      if (/\d/.test(word)) return word.toUpperCase();
      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

function normalizeFuel(value: string | null): FuelType {
  if (value === "Diesel" || value === "Hybrid" || value === "Electric") {
    return value;
  }

  return value === "Petrol" ? "Petrol" : "";
}

function normalizeTransmission(value: string | null): Transmission {
  if (value === "Manual" || value === "Automatic") return value;
  return "";
}

function mapVehicle(vehicle: VehicleRow, images: string[]): Vehicle {
  const id = String(vehicle.id);
  const year = Number(vehicle.year) || 0;
  const conditionDetails = parseVehicleCondition(vehicle.condition);

  return {
    id,
    title: vehicle.listingTitle?.trim() || `${year || ""} ${displayWords(vehicle.make)} ${displayWords(vehicle.model)}`.trim(),
    make: displayWords(vehicle.make),
    model: displayWords(vehicle.model),
    year,
    price: Number(vehicle.price) || 0,
    mileage: Number(vehicle.mileage) || 0,
    engine: vehicle.engineSize ?? "",
    transmission: normalizeTransmission(vehicle.transmission),
    fuel: normalizeFuel(vehicle.fuelType),
    bodyType: vehicle.bodyType ?? "",
    driveType: vehicle.driveType ?? "",
    color: vehicle.exteriorColor ?? "",
    interiorColor: vehicle.interiorColor ?? "",
    condition: conditionDetails.condition,
    origin: conditionDetails.origin,
    history: conditionDetails.history,
    location: displayWords(vehicle.location) || "Kenya",
    featured: Boolean(vehicle.featured),
    verified: Boolean(vehicle.verified),
    turbo: Boolean(vehicle.turbo),
    images: images.length > 0 ? images : [FALLBACK_IMAGE],
    description: vehicle.description ?? "Contact us for more information about this vehicle.",
    seller: {
      id,
      name: "Auto Bazaar Finds",
      phone: "+254741056053",
      avatar: "/avatars/avatar-placeholder.png.png",
      verified: true,
    },
    createdAt: vehicle.created_at ?? new Date(0).toISOString(),
  };
}

function groupImages(
  rows: VehicleImageRow[],
  signedUrls: Map<string, string>
): Map<string, string[]> {
  const imageMap = new Map<string, string[]>();
  const sortedRows = [...rows].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return (a.display_order ?? 0) - (b.display_order ?? 0);
  });

  for (const image of sortedRows) {
    const imageUrl = image.storage_path
      ? signedUrls.get(image.storage_path)
      : image.image_url;
    if (!imageUrl) continue;
    const vehicleId = String(image.vehicle_id);
    imageMap.set(vehicleId, [...(imageMap.get(vehicleId) ?? []), imageUrl]);
  }

  return imageMap;
}

async function signImageUrls(
  supabase: ReturnType<typeof createPublicSupabaseClient>,
  rows: VehicleImageRow[]
) {
  const paths = rows
    .map((image) => image.storage_path)
    .filter((path): path is string => Boolean(path));

  if (paths.length === 0) return new Map<string, string>();

  const { data, error } = await supabase.storage
    .from("vehicle-images")
    .createSignedUrls(paths, 3600);

  if (error) throw new Error(`Unable to load vehicle photos: ${error.message}`);

  return new Map(
    (data ?? [])
      .filter(
        (item): item is typeof item & { path: string; signedUrl: string } =>
          Boolean(item.path && item.signedUrl)
      )
      .map((item) => [item.path, item.signedUrl] as const)
  );
}

async function fetchPublicVehicles(): Promise<Vehicle[]> {
  const supabase = createPublicSupabaseClient();
  let [vehiclesResult, imagesResult] = await Promise.all([
    supabase
      .from("public_vehicles")
      .select("id, listingTitle, make, model, year, price, mileage, fuelType, transmission, driveType, engineSize, bodyType, exteriorColor, interiorColor, condition, description, location, featured, verified, turbo, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("public_vehicle_images")
      .select("vehicle_id, image_url, storage_path, display_order, is_cover"),
  ]);

  // Keep the site available while an existing project is being upgraded.
  // The restricted views become mandatory as soon as the hardening migration runs.
  if (vehiclesResult.error?.code === "PGRST205") {
    [vehiclesResult, imagesResult] = await Promise.all([
      supabase
        .from("vehicles")
        .select("*")
        .eq("status", "Live")
        .order("created_at", { ascending: false }),
      supabase
        .from("vehicle_images")
        .select("vehicle_id, image_url, storage_path, display_order, is_cover"),
    ]);
  }

  if (vehiclesResult.error) {
    throw new Error(`Unable to load vehicles: ${vehiclesResult.error.message}`);
  }

  if (imagesResult.error) {
    throw new Error(`Unable to load vehicle images: ${imagesResult.error.message}`);
  }

  const vehicles = (vehiclesResult.data as VehicleRow[] | null) ?? [];
  const imageRows = (imagesResult.data as VehicleImageRow[] | null) ?? [];
  const signedUrls = await signImageUrls(supabase, imageRows);
  const imageMap = groupImages(imageRows, signedUrls);

  return vehicles.map((vehicle) => mapVehicle(vehicle, imageMap.get(String(vehicle.id)) ?? []));
}

const getCachedPublicVehicles = unstable_cache(
  fetchPublicVehicles,
  ["public-vehicles"],
  { revalidate: 60, tags: ["public-vehicles"] }
);

export async function getPublicVehicles(): Promise<Vehicle[]> {
  if (process.env.NODE_ENV === "development") {
    return mockVehicles;
  }

  try {
    return await getCachedPublicVehicles();
  } catch (error) {
    console.error("Unable to refresh public inventory", error);
    return [];
  }
}

async function fetchPublicVehicleById(id: string): Promise<Vehicle | null> {
  if (!UUID_PATTERN.test(id)) return null;

  if (process.env.NODE_ENV === "development") {
    const previewVehicle = mockVehicles.find((vehicle) => vehicle.id === id);
    if (previewVehicle) return previewVehicle;
  }

  const supabase = createPublicSupabaseClient();
  let [vehicleResult, imagesResult] = await Promise.all([
    supabase
      .from("public_vehicles")
      .select("id, listingTitle, make, model, year, price, mileage, fuelType, transmission, driveType, engineSize, bodyType, exteriorColor, interiorColor, condition, description, location, featured, verified, turbo, created_at")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("public_vehicle_images")
      .select("vehicle_id, image_url, storage_path, display_order, is_cover")
      .eq("vehicle_id", id),
  ]);

  if (vehicleResult.error?.code === "PGRST205") {
    [vehicleResult, imagesResult] = await Promise.all([
      supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .eq("status", "Live")
        .maybeSingle(),
      supabase
        .from("vehicle_images")
        .select("vehicle_id, image_url, storage_path, display_order, is_cover")
        .eq("vehicle_id", id),
    ]);
  }

  if (vehicleResult.error) {
    throw new Error(`Unable to load vehicle: ${vehicleResult.error.message}`);
  }

  if (imagesResult.error) {
    throw new Error(`Unable to load vehicle images: ${imagesResult.error.message}`);
  }

  if (!vehicleResult.data) return null;

  const imageRows = (imagesResult.data as VehicleImageRow[] | null) ?? [];
  const signedUrls = await signImageUrls(supabase, imageRows);
  const imageMap = groupImages(imageRows, signedUrls);
  const vehicle = vehicleResult.data as VehicleRow;
  return mapVehicle(vehicle, imageMap.get(String(vehicle.id)) ?? []);
}

export const getPublicVehicleById = unstable_cache(
  fetchPublicVehicleById,
  ["public-vehicle"],
  { revalidate: 60, tags: ["public-vehicles"] }
);
