"use client";

import type { ReactNode } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Fuel,
  Gauge,
  ImageOff,
  MapPin,
  Settings2,
  ShieldCheck,
  Star,
  UserRound,
  Wind,
} from "lucide-react";

import type { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
};

const numberFormatter = new Intl.NumberFormat("en-KE");

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

function formatPrice(value: string) {
  if (!hasValue(value)) return "Price on request";

  const amount = Number(value.replace(/[^0-9.-]/g, ""));

  return Number.isFinite(amount)
    ? `KSh ${numberFormatter.format(amount)}`
    : `KSh ${value}`;
}

function formatMileage(value: string) {
  if (!hasValue(value)) return "Not set";

  const amount = Number(value.replace(/[^0-9.-]/g, ""));

  return Number.isFinite(amount)
    ? `${numberFormatter.format(amount)} km`
    : value;
}

export default function LivePreview({ vehicle }: Props) {
  const automaticTitle = [vehicle.year, vehicle.make, vehicle.model]
    .filter(hasValue)
    .join(" ");
  const title = vehicle.listingTitle.trim() || automaticTitle || "New Vehicle Listing";
  const coverImage =
    vehicle.images.find((image) => image.isCover)?.publicUrl ||
    vehicle.images[0]?.publicUrl;
  const completionFields = [
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.price,
    vehicle.location,
    vehicle.description,
    coverImage,
  ];
  const completedFields = completionFields.filter((field) => Boolean(field?.trim())).length;
  const completion = Math.round((completedFields / completionFields.length) * 100);

  return (
    <div className="sticky top-6 space-y-6">
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-950 via-gray-800 to-gray-700">
          {coverImage ? (
            // Blob URLs from newly selected files are not compatible with
            // Next.js image optimization before the listing is saved.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-gray-300">
              <div className="rounded-full bg-white/10 p-4"><ImageOff className="h-7 w-7" /></div>
              <div>
                <p className="font-semibold text-white">Cover photo preview</p>
                <p className="mt-1 text-sm text-gray-300">Upload a vehicle image to see it here.</p>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <span className="rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">Live preview</span>
            <div className="flex flex-wrap justify-end gap-2">
              {vehicle.featured && <StatusBadge icon={<Star className="h-3.5 w-3.5 fill-current" />} label="Featured" tone="amber" />}
              {vehicle.verified && <StatusBadge icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Verified" tone="emerald" />}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Vehicle listing</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">{title}</h2>
            </div>
            {vehicle.verified && <BadgeCheck className="h-6 w-6 shrink-0 text-emerald-600" aria-label="Verified listing" />}
          </div>

          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-950">{formatPrice(vehicle.price)}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Spec icon={<CalendarDays className="h-4 w-4" />} label="Year" value={vehicle.year || "Not set"} />
            {vehicle.mileage && <Spec icon={<Gauge className="h-4 w-4" />} label="Mileage" value={formatMileage(vehicle.mileage)} />}
            <Spec icon={<Fuel className="h-4 w-4" />} label="Fuel" value={vehicle.fuelType || "Not set"} />
            <Spec icon={<Settings2 className="h-4 w-4" />} label="Transmission" value={vehicle.transmission || "Not set"} />
            {vehicle.turbo && <Spec icon={<Wind className="h-4 w-4" />} label="Turbo" value="Turbocharged" />}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{vehicle.location || "Location to be added"}</span>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-950">About this vehicle</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
              {vehicle.description || "Add a short description to help buyers understand this vehicle."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white"><UserRound className="h-5 w-5" /></div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Listed by</p>
              <p className="truncate font-semibold text-gray-950">{vehicle.sellerName || "Seller details pending"}</p>
              {(vehicle.phone || vehicle.email) && <p className="truncate text-xs text-gray-500">{vehicle.phone || vehicle.email}</p>}
            </div>
            <CarFront className="ml-auto h-5 w-5 shrink-0 text-gray-300" />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-950">Listing progress</h3>
            <p className="mt-1 text-sm text-gray-500">Add the essentials before publishing.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-800"><CheckCircle2 className="h-4 w-4" />{completion}%</span>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100" aria-label={`${completion}% complete`}>
          <div className="h-full rounded-full bg-gradient-to-r from-gray-950 to-gray-600 transition-all duration-300" style={{ width: `${completion}%` }} />
        </div>
        <p className="mt-3 text-sm text-gray-500">{completedFields} of {completionFields.length} listing details completed</p>
      </section>
    </div>
  );
}

type StatusBadgeProps = { icon: ReactNode; label: string; tone: "amber" | "emerald" };

function StatusBadge({ icon, label, tone }: StatusBadgeProps) {
  const colors = tone === "amber" ? "bg-amber-400 text-amber-950" : "bg-emerald-500 text-white";

  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${colors}`}>{icon}{label}</span>;
}

type SpecProps = { icon: ReactNode; label: string; value: string };

function Spec({ icon, label, value }: SpecProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">{icon}{label}</div>
      <p className="mt-2 truncate text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
