"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Archive,
  BarChart3,
  Car,
  CheckCircle,
  Clock3,
  Eye,
  FileEdit,
  ListPlus,
  Plus,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type VehicleStatus =
  | "Draft"
  | "Live"
  | "Reserved"
  | "Sold"
  | "Archived";

type VehicleRow = {
  id: string | number;
  listingTitle: string | null;
  make: string | null;
  model: string | null;
  year: number | string | null;
  price: number | string | null;
  location: string | null;
  status: string | null;
  created_at: string | null;
};

type VehicleImageRow = {
  vehicle_id: string | number;
  image_url: string | null;
  storage_path: string | null;
  is_cover: boolean | null;
  display_order: number | null;
};

type DashboardVehicle = {
  id: string;
  listingTitle: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  status: VehicleStatus;
  createdAt: string;
  image: string;
};

type DashboardStats = {
  total: number;
  live: number;
  draft: number;
  reserved: number;
  sold: number;
  archived: number;
};

const emptyStats: DashboardStats = {
  total: 0,
  live: 0,
  draft: 0,
  reserved: 0,
  sold: 0,
  archived: 0,
};

function normalizeStatus(status: string | null): VehicleStatus {
  switch (status?.toLowerCase()) {
    case "live":
      return "Live";

    case "draft":
      return "Draft";

    case "reserved":
      return "Reserved";

    case "sold":
      return "Sold";

    case "archived":
      return "Archived";

    default:
      return "Draft";
  }
}

function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) {
    return "Price unavailable";
  }

  return `KSh ${price.toLocaleString("en-KE")}`;
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function vehicleName(vehicle: DashboardVehicle) {
  return (
    vehicle.listingTitle.trim() ||
    [vehicle.year > 0 ? vehicle.year : "", vehicle.make, vehicle.model]
      .filter(Boolean)
      .join(" ") ||
    "Untitled vehicle"
  );
}

function statusClasses(status: VehicleStatus) {
  switch (status) {
    case "Live":
      return "bg-green-100 text-green-700";

    case "Sold":
      return "bg-red-100 text-red-700";

    case "Draft":
      return "bg-yellow-100 text-yellow-700";

    case "Reserved":
      return "bg-blue-100 text-blue-700";

    case "Archived":
      return "bg-gray-100 text-gray-600";
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);

  const [recentVehicles, setRecentVehicles] = useState<
    DashboardVehicle[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    setErrorMessage("");

    try {
      const [vehiclesResult, imagesResult] = await Promise.all([
        supabase.from("vehicles").select("id, listingTitle, make, model, year, price, location, status, created_at").order("created_at", { ascending: false }),
        supabase.from("vehicle_images").select("vehicle_id, image_url, storage_path, is_cover, display_order").order("display_order", { ascending: true }),
      ]);
      if (vehiclesResult.error) throw new Error(vehiclesResult.error.message);
      if (imagesResult.error) throw new Error(imagesResult.error.message);

      const rows = (vehiclesResult.data as VehicleRow[] | null) ?? [];
      const images = (imagesResult.data as VehicleImageRow[] | null) ?? [];
      const paths = images.map((image) => image.storage_path).filter((path): path is string => Boolean(path));
      const { data: signedImages, error: signedImagesError } = paths.length
        ? await supabase.storage.from("vehicle-images").createSignedUrls(paths, 3600)
        : { data: [], error: null };
      if (signedImagesError) throw new Error(signedImagesError.message);
      const signedByPath = new Map((signedImages ?? []).flatMap((image) => image.path && image.signedUrl ? [[image.path, image.signedUrl] as const] : []));
      const imageByVehicle = new Map<string, string>();
      for (const image of images) {
        const url = image.storage_path ? signedByPath.get(image.storage_path) ?? image.image_url : image.image_url;
        if (!url) continue;
        const id = String(image.vehicle_id);
        if (!imageByVehicle.has(id) || image.is_cover) imageByVehicle.set(id, url);
      }

      const calculatedStats: DashboardStats = {
        total: rows.length,

        live: rows.filter(
          (vehicle) => vehicle.status?.toLowerCase() === "live"
        ).length,

        draft: rows.filter(
          (vehicle) => vehicle.status?.toLowerCase() === "draft"
        ).length,

        reserved: rows.filter(
          (vehicle) => vehicle.status?.toLowerCase() === "reserved"
        ).length,

        sold: rows.filter(
          (vehicle) => vehicle.status?.toLowerCase() === "sold"
        ).length,

        archived: rows.filter(
          (vehicle) => vehicle.status?.toLowerCase() === "archived"
        ).length,
      };

      const mappedVehicles: DashboardVehicle[] = rows
        .slice(0, 5)
        .map((vehicle) => ({
          id: String(vehicle.id),
          listingTitle: vehicle.listingTitle ?? "",
          make: vehicle.make ?? "",
          model: vehicle.model ?? "",
          year: Number(vehicle.year) || 0,
          price: Number(vehicle.price) || 0,
          location: vehicle.location ?? "",
          status: normalizeStatus(vehicle.status),
          createdAt: vehicle.created_at ?? "",
          image: imageByVehicle.get(String(vehicle.id)) ?? "",
        }));

      setStats(calculatedStats);
      setRecentVehicles(mappedVehicles);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  function refreshDashboard() {
    setIsRefreshing(true);
    void loadDashboard();
  }

  return (
    <main className="space-y-8">
      {/* Marketplace-style command centre */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
        <div className="bg-slate-950 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                Marketplace management
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Your selling dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Create a vehicle post, see what is live, and keep every listing moving from one simple place.
              </p>
            </div>
            <Link
              href="/admin/listing"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-300"
            >
              <Plus className="h-5 w-5" />
              Create listing
            </Link>
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
          <Link href="/admin/listing" className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-white/10 dark:hover:bg-emerald-400/10">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"><ListPlus className="h-5 w-5" /></span>
            <span><span className="block font-bold">Sell something</span><span className="text-sm text-gray-500">Post a vehicle in minutes</span></span>
          </Link>
          <Link href="/admin/inventory" className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-400 hover:bg-sky-50 dark:border-white/10 dark:hover:bg-sky-400/10">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"><Car className="h-5 w-5" /></span>
            <span><span className="block font-bold">Your listings</span><span className="text-sm text-gray-500">Edit, sell or delist vehicles</span></span>
          </Link>
          <Link href="/cars" className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-violet-400 hover:bg-violet-50 dark:border-white/10 dark:hover:bg-violet-400/10">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300"><BarChart3 className="h-5 w-5" /></span>
            <span><span className="block font-bold">See marketplace</span><span className="text-sm text-gray-500">View the public experience</span></span>
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Listing overview</h2>
          <p className="mt-1 text-sm text-gray-500">A clear view of what buyers can see right now.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={refreshDashboard}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>
        </div>
      </section>

      {/* Error */}
      {errorMessage && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-red-800">
                Dashboard could not load
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {errorMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={refreshDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Main Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Vehicles"
          value={stats.total}
          icon={<Car className="h-5 w-5" />}
          isLoading={isLoading}
        />

        <StatCard
          label="Live Listings"
          value={stats.live}
          icon={<Eye className="h-5 w-5" />}
          valueClassName="text-green-600"
          isLoading={isLoading}
        />

        <StatCard
          label="Draft Listings"
          value={stats.draft}
          icon={<FileEdit className="h-5 w-5" />}
          valueClassName="text-yellow-600"
          isLoading={isLoading}
        />

        <StatCard
          label="Sold Vehicles"
          value={stats.sold}
          icon={<CheckCircle className="h-5 w-5" />}
          valueClassName="text-red-600"
          isLoading={isLoading}
        />
      </section>

      {/* Secondary Statistics */}
      <section className="grid gap-4 sm:grid-cols-2">
        <MiniStat
          label="Reserved"
          value={stats.reserved}
          icon={<Clock3 className="h-5 w-5" />}
          isLoading={isLoading}
        />

        <MiniStat
          label="Archived"
          value={stats.archived}
          icon={<Archive className="h-5 w-5" />}
          isLoading={isLoading}
        />
      </section>

      {/* Content */}
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Recent Listings */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Listings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest vehicles added to the inventory.
              </p>
            </div>

            <Link
              href="/admin/inventory"
              className="text-sm font-semibold text-gray-700 transition hover:text-black"
            >
              View Inventory →
            </Link>
          </div>

          <div className="divide-y">
            {isLoading ? (
              <RecentListingsLoading />
            ) : recentVehicles.length > 0 ? (
              recentVehicles.map((vehicle) => (
                <RecentVehicleRow
                  key={vehicle.id}
                  vehicle={vehicle}
                />
              ))
            ) : (
              <EmptyRecentListings />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Frequently used inventory tools.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <QuickAction
              href="/admin/listing"
              icon={<Plus className="h-5 w-5" />}
              title="Add New Vehicle"
              description="Create a new listing"
            />

            <QuickAction
              href="/admin/inventory"
              icon={<Car className="h-5 w-5" />}
              title="Manage Inventory"
              description="View all vehicles"
            />

            <QuickAction
              href="/cars"
              icon={<TrendingUp className="h-5 w-5" />}
              title="View Live Website"
              description="Review the public inventory"
            />
          </div>
        </div>
      </section>

      {/* Inventory Status */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Inventory Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current distribution of your vehicle listings.
            </p>
          </div>

          <Link
            href="/admin/inventory"
            className="text-sm font-semibold text-gray-700 hover:text-black"
          >
            Manage Inventory →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatusSummary
            label="Live"
            value={stats.live}
            className="bg-green-50 text-green-700"
            isLoading={isLoading}
          />

          <StatusSummary
            label="Draft"
            value={stats.draft}
            className="bg-yellow-50 text-yellow-700"
            isLoading={isLoading}
          />

          <StatusSummary
            label="Reserved"
            value={stats.reserved}
            className="bg-blue-50 text-blue-700"
            isLoading={isLoading}
          />

          <StatusSummary
            label="Sold"
            value={stats.sold}
            className="bg-red-50 text-red-700"
            isLoading={isLoading}
          />

          <StatusSummary
            label="Archived"
            value={stats.archived}
            className="bg-gray-100 text-gray-700"
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  valueClassName?: string;
  isLoading: boolean;
};

function StatCard({
  label,
  value,
  icon,
  valueClassName = "text-gray-900",
  isLoading,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
          {icon}
        </div>

        <TrendingUp className="h-5 w-5 text-gray-300" />
      </div>

      {isLoading ? (
        <div className="mt-6 h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <p className={`mt-6 text-3xl font-bold ${valueClassName}`}>
          {value}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mini Stat                                                                  */
/* -------------------------------------------------------------------------- */

type MiniStatProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  isLoading: boolean;
};

function MiniStat({
  label,
  value,
  icon,
  isLoading,
}: MiniStatProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
        {icon}
      </div>

      <div>
        {isLoading ? (
          <div className="h-7 w-10 animate-pulse rounded bg-gray-200" />
        ) : (
          <p className="text-2xl font-bold text-gray-900">
            {value}
          </p>
        )}

        <p className="mt-1 text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Recent Vehicle                                                             */
/* -------------------------------------------------------------------------- */

function RecentVehicleRow({
  vehicle,
}: {
  vehicle: DashboardVehicle;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="h-16 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-24">
        {vehicle.image ? (
          // Signed storage URLs are already sized on upload and expire, so use native loading here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vehicle.image} alt="" className="h-full w-full object-cover" />
        ) : <div className="grid h-full place-items-center text-xs text-gray-400">No photo</div>}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900">
          {vehicleName(vehicle)}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>
            {vehicle.location || "Location not specified"}
          </span>

          <span>{formatPrice(vehicle.price)}</span>

          {vehicle.createdAt && (
            <span>{formatDate(vehicle.createdAt)}</span>
          )}
        </div>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
          vehicle.status
        )}`}
      >
        {vehicle.status}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick Action                                                               */
/* -------------------------------------------------------------------------- */

type QuickActionProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function QuickAction({
  href,
  icon,
  title,
  description,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border p-4 transition hover:border-black hover:bg-gray-50"
    >
      <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Summary                                                             */
/* -------------------------------------------------------------------------- */

type StatusSummaryProps = {
  label: string;
  value: number;
  className: string;
  isLoading: boolean;
};

function StatusSummary({
  label,
  value,
  className,
  isLoading,
}: StatusSummaryProps) {
  return (
    <div className={`rounded-xl p-5 ${className}`}>
      <p className="text-sm font-medium">{label}</p>

      {isLoading ? (
        <div className="mt-2 h-8 w-10 animate-pulse rounded bg-black/10" />
      ) : (
        <p className="mt-2 text-2xl font-bold">{value}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading State                                                              */
/* -------------------------------------------------------------------------- */

function RecentListingsLoading() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-6"
        >
          <div className="space-y-3">
            <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyRecentListings() {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <Car className="h-6 w-6 text-gray-400" />
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">
        No vehicles yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        Your recent vehicle listings will appear here once you add
        your first vehicle.
      </p>

      <Link
        href="/admin/listing"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <Plus className="h-4 w-4" />
        Add First Vehicle
      </Link>
    </div>
  );
}
