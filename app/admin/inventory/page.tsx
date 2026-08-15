"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  Eye,
  LayoutGrid,
  List,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type VehicleStatus =
  | "Draft"
  | "Live"
  | "Reserved"
  | "Sold"
  | "Archived";

type InventoryVehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  status: VehicleStatus;
  views: number;
  leads: number;
  featured: boolean;
};

type VehicleRow = {
  id: string | number;
  make: string | null;
  model: string | null;
  year: number | string | null;
  price: number | string | null;
  mileage: number | string | null;
  location: string | null;
  status: string | null;
  featured?: boolean | null;
};

type VehicleImageRow = {
  vehicle_id: string | number;
  image_url: string | null;
  display_order: number | null;
  is_cover: boolean | null;
  storage_path?: string | null;
};

const filters = [
  "All",
  "Live",
  "Draft",
  "Reserved",
  "Sold",
  "Archived",
] as const;

type Filter = (typeof filters)[number];

function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) {
    return "Price unavailable";
  }

  return `KSh ${price.toLocaleString("en-KE")}`;
}

function formatMileage(mileage: number) {
  if (!Number.isFinite(mileage)) {
    return "—";
  }

  return `${mileage.toLocaleString("en-KE")} km`;
}

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

function getStatusAction(status: VehicleStatus) {
  switch (status) {
    case "Draft":
      return {
        label: "Publish",
        nextStatus: "Live" as VehicleStatus,
      };

    case "Live":
      return {
        label: "Reserve",
        nextStatus: "Reserved" as VehicleStatus,
      };

    case "Reserved":
      return {
        label: "Release",
        nextStatus: "Live" as VehicleStatus,
      };

    case "Sold":
      return {
        label: "Re-list",
        nextStatus: "Draft" as VehicleStatus,
      };

    case "Archived":
      return {
        label: "Re-list",
        nextStatus: "Live" as VehicleStatus,
      };

    default:
      return null;
  }
}

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<InventoryVehicle[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"list" | "grid">("list");

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>(
    {}
  );

  const loadInventory = useCallback(async () => {
    setErrorMessage("");

    try {
      const [vehiclesResult, imagesResult] = await Promise.all([
        supabase
          .from("vehicles")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("vehicle_images")
          .select(
            "vehicle_id, image_url, display_order, is_cover, storage_path"
          )
          .order("display_order", { ascending: true }),
      ]);

      if (vehiclesResult.error) {
        throw new Error(vehiclesResult.error.message);
      }

      if (imagesResult.error) {
        throw new Error(imagesResult.error.message);
      }

      const vehicleRows =
        (vehiclesResult.data as VehicleRow[] | null) ?? [];

      const imageRows =
        (imagesResult.data as VehicleImageRow[] | null) ?? [];

      const imageMap = new Map<string, string>();

      for (const image of imageRows) {
        if (!image.image_url) {
          continue;
        }

        const vehicleId = String(image.vehicle_id);

        if (!imageMap.has(vehicleId)) {
          imageMap.set(vehicleId, image.image_url);
        }

        if (image.is_cover) {
          imageMap.set(vehicleId, image.image_url);
        }
      }

      const mappedVehicles: InventoryVehicle[] = vehicleRows.map(
        (vehicle) => {
          const id = String(vehicle.id);

          return {
            id,
            make: vehicle.make ?? "",
            model: vehicle.model ?? "",
            year: Number(vehicle.year) || 0,
            price: Number(vehicle.price) || 0,
            mileage: Number(vehicle.mileage) || 0,
            location: vehicle.location ?? "",
            image: imageMap.get(id) ?? "",
            status: normalizeStatus(vehicle.status),
            views: 0,
            leads: 0,
            featured: Boolean(vehicle.featured),
          };
        }
      );

      setVehicles(mappedVehicles);
      setImageErrors({});
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load inventory."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadInventory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadInventory]);

  function refreshInventory() {
    setIsRefreshing(true);
    void loadInventory();
  }

  async function updateVehicleStatus(
    vehicle: InventoryVehicle,
    nextStatus: VehicleStatus
  ) {
    setUpdatingId(vehicle.id);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("vehicles")
        .update({
          status: nextStatus,
        })
        .eq("id", vehicle.id);

      if (error) {
        throw new Error(error.message);
      }

      setVehicles((current) =>
        current.map((item) =>
          item.id === vehicle.id
            ? {
                ...item,
                status: nextStatus,
              }
            : item
        )
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update vehicle status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleStatusAction(vehicle: InventoryVehicle) {
    const action = getStatusAction(vehicle.status);

    if (!action) {
      return;
    }

    let message = "";

    switch (vehicle.status) {
      case "Draft":
        message = `Publish ${vehicle.year} ${vehicle.make} ${vehicle.model}?`;
        break;

      case "Live":
        message = `Reserve ${vehicle.year} ${vehicle.make} ${vehicle.model}?`;
        break;

      case "Reserved":
        message = `Release the reservation for ${vehicle.year} ${vehicle.make} ${vehicle.model}?`;
        break;

      case "Sold":
        message = `Re-list ${vehicle.year} ${vehicle.make} ${vehicle.model} as a draft?`;
        break;

      case "Archived":
        message = `Re-list ${vehicle.year} ${vehicle.make} ${vehicle.model} now?`;
        break;
    }

    if (!window.confirm(message)) {
      return;
    }

    await updateVehicleStatus(vehicle, action.nextStatus);
  }

  async function markSold(vehicle: InventoryVehicle) {
    const confirmed = window.confirm(
      `Mark ${vehicle.year} ${vehicle.make} ${vehicle.model} as sold?`
    );

    if (!confirmed) {
      return;
    }

    await updateVehicleStatus(vehicle, "Sold");
  }

  async function archiveVehicle(vehicle: InventoryVehicle) {
    const confirmed = window.confirm(
      `Delist ${vehicle.year} ${vehicle.make} ${vehicle.model}?\n\nIt will disappear from the public site but remain ready to re-list later.`
    );

    if (!confirmed) {
      return;
    }

    await updateVehicleStatus(vehicle, "Archived");
  }

  async function deleteVehicle(vehicle: InventoryVehicle) {
    const confirmed = window.confirm(
      `Delete ${vehicle.year} ${vehicle.make} ${vehicle.model}?\n\nThis will permanently remove the vehicle listing and its uploaded photos. This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(vehicle.id);
    setErrorMessage("");

    try {
      const { data: imageRows, error: imageFetchError } =
        await supabase
          .from("vehicle_images")
          .select("storage_path")
          .eq("vehicle_id", vehicle.id);

      if (imageFetchError) {
        throw new Error(imageFetchError.message);
      }

      const storagePaths =
        (
          imageRows as Array<{
            storage_path: string | null;
          }> | null
        )
          ?.map((image) => image.storage_path)
          .filter(
            (path): path is string =>
              typeof path === "string" && path.length > 0
          ) ?? [];

      const { error: imageDeleteError } = await supabase
        .from("vehicle_images")
        .delete()
        .eq("vehicle_id", vehicle.id);

      if (imageDeleteError) {
        throw new Error(imageDeleteError.message);
      }

      const { error: vehicleDeleteError } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicle.id);

      if (vehicleDeleteError) {
        throw new Error(vehicleDeleteError.message);
      }

      if (storagePaths.length > 0) {
        const { error: storageDeleteError } = await supabase.storage
          .from("vehicle-images")
          .remove(storagePaths);

        if (storageDeleteError) {
          console.warn(
            "Vehicle deleted but some Storage files could not be removed:",
            storageDeleteError.message
          );
        }
      }

      setVehicles((current) =>
        current.filter((item) => item.id !== vehicle.id)
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete vehicle."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        `${vehicle.make} ${vehicle.model} ${vehicle.year} ${vehicle.location}`
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All" || vehicle.status === filter;

      return matchesSearch && matchesFilter;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price-high":
          return b.price - a.price;

        case "price-low":
          return a.price - b.price;

        case "mileage-low":
          return a.mileage - b.mileage;

        case "year-new":
          return b.year - a.year;

        default:
          return 0;
      }
    });

    return result;
  }, [vehicles, search, filter, sort]);

  const totalVehicles = vehicles.length;

  const liveVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Live"
  ).length;

  const draftVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Draft"
  ).length;

  const soldVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Sold"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Admin / Inventory
              </p>

              <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
                Inventory
              </h1>

              <p className="mt-2 text-gray-500">
                Manage, edit and monitor your vehicle listings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={refreshInventory}
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

              <Link
                href="/admin/listing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                <Plus className="h-5 w-5" />
                New Listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Vehicles"
            value={totalVehicles}
          />

          <StatCard
            label="Live Listings"
            value={liveVehicles}
            valueClassName="text-green-600"
          />

          <StatCard
            label="Draft Listings"
            value={draftVehicles}
            valueClassName="text-yellow-600"
          />

          <StatCard
            label="Sold Vehicles"
            value={soldVehicles}
            valueClassName="text-red-600"
          />
        </div>

        {/* Error */}
        {errorMessage && (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-red-800">
                  Inventory action failed
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  {errorMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={refreshInventory}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* Toolbar */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                type="search"
                placeholder="Search make, model, year or location..."
                className="w-full rounded-xl border bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  className="appearance-none rounded-xl border bg-white py-3 pl-4 pr-10 text-sm font-medium outline-none focus:border-black"
                >
                  <option value="newest">Newest</option>
                  <option value="year-new">Newest Year</option>
                  <option value="price-high">
                    Highest Price
                  </option>
                  <option value="price-low">
                    Lowest Price
                  </option>
                  <option value="mileage-low">
                    Lowest Mileage
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="flex rounded-xl border bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2 transition ${
                    view === "list"
                      ? "bg-white shadow-sm"
                      : "text-gray-500"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 transition ${
                    view === "grid"
                      ? "bg-white shadow-sm"
                      : "text-gray-500"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Result count */}
        {!isLoading && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredVehicles.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {totalVehicles}
              </span>{" "}
              vehicles
            </p>

            {(search || filter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Listings */}
        {isLoading ? (
          <LoadingState />
        ) : filteredVehicles.length > 0 ? (
          <div
            className={
              view === "grid"
                ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                : "space-y-5"
            }
          >
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                view={view}
                isDeleting={deletingId === vehicle.id}
                isUpdating={updatingId === vehicle.id}
                imageError={Boolean(imageErrors[vehicle.id])}
                onDelete={deleteVehicle}
                onStatusAction={handleStatusAction}
                onMarkSold={markSold}
                onArchive={archiveVehicle}
                onImageError={() =>
                  setImageErrors((current) => ({
                    ...current,
                    [vehicle.id]: true,
                  }))
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </main>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  valueClassName?: string;
};

function StatCard({
  label,
  value,
  valueClassName = "text-gray-900",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>

      <p
        className={`mt-2 text-3xl font-bold ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}

type VehicleCardProps = {
  vehicle: InventoryVehicle;
  view: "list" | "grid";
  isDeleting: boolean;
  isUpdating: boolean;
  imageError: boolean;
  onDelete: (vehicle: InventoryVehicle) => void;
  onStatusAction: (vehicle: InventoryVehicle) => void;
  onMarkSold: (vehicle: InventoryVehicle) => void;
  onArchive: (vehicle: InventoryVehicle) => void;
  onImageError: () => void;
};

function VehicleCard({
  vehicle,
  view,
  isDeleting,
  isUpdating,
  imageError,
  onDelete,
  onStatusAction,
  onMarkSold,
  onArchive,
  onImageError,
}: VehicleCardProps) {
  if (view === "grid") {
    return (
      <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
        <div className="relative bg-gray-100">
          {!imageError && vehicle.image ? (
            // This admin preview accepts arbitrary uploaded URLs and keeps a
            // fixed layout, so native image loading is intentional here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="h-52 w-full object-cover"
              onError={onImageError}
            />
          ) : (
            <div className="flex h-52 items-center justify-center text-sm text-gray-400">
              No vehicle image
            </div>
          )}

          <StatusBadge status={vehicle.status} />

          {vehicle.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
              <Star className="mr-1 inline h-3 w-3 fill-yellow-400 text-yellow-400" />
              Featured
            </span>
          )}
        </div>

        <div className="p-5">
          <VehicleTitle vehicle={vehicle} />

          <p className="mt-2 text-2xl font-bold">
            {formatPrice(vehicle.price)}
          </p>

          <VehicleMeta vehicle={vehicle} />

          <VehicleActions
            vehicle={vehicle}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            onDelete={onDelete}
            onStatusAction={onStatusAction}
            onMarkSold={onMarkSold}
            onArchive={onArchive}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="relative shrink-0">
          {!imageError && vehicle.image ? (
            // This admin preview accepts arbitrary uploaded URLs and keeps a
            // fixed layout, so native image loading is intentional here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="h-32 w-full rounded-xl object-cover sm:w-52"
              onError={onImageError}
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400 sm:w-52">
              No image
            </div>
          )}

          <StatusBadge status={vehicle.status} />
        </div>

        <div className="min-w-0 flex-1">
          <VehicleTitle vehicle={vehicle} />

          <p className="mt-2 text-2xl font-bold">
            {formatPrice(vehicle.price)}
          </p>

          <VehicleMeta vehicle={vehicle} />
        </div>

        <VehicleActions
          vehicle={vehicle}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
          onDelete={onDelete}
          onStatusAction={onStatusAction}
          onMarkSold={onMarkSold}
          onArchive={onArchive}
        />
      </div>
    </article>
  );
}

function VehicleTitle({
  vehicle,
}: {
  vehicle: InventoryVehicle;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h2 className="text-xl font-bold text-gray-900">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h2>

      {vehicle.featured && (
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
    </div>
  );
}

function VehicleMeta({
  vehicle,
}: {
  vehicle: InventoryVehicle;
}) {
  return (
    <>
      <p className="mt-1 text-sm text-gray-500">
        {vehicle.location || "Location not specified"}
      </p>

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
        <span>{formatMileage(vehicle.mileage)}</span>

        <span className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          {vehicle.views} Views
        </span>

        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {vehicle.leads} Leads
        </span>
      </div>
    </>
  );
}

function StatusBadge({
  status,
}: {
  status: VehicleStatus;
}) {
  return (
    <span
      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}

type VehicleActionsProps = {
  vehicle: InventoryVehicle;
  isDeleting: boolean;
  isUpdating: boolean;
  onDelete: (vehicle: InventoryVehicle) => void;
  onStatusAction: (vehicle: InventoryVehicle) => void;
  onMarkSold: (vehicle: InventoryVehicle) => void;
  onArchive: (vehicle: InventoryVehicle) => void;
};

function VehicleActions({
  vehicle,
  isDeleting,
  isUpdating,
  onDelete,
  onStatusAction,
  onMarkSold,
  onArchive,
}: VehicleActionsProps) {
  const statusAction = getStatusAction(vehicle.status);

  return (
    <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-5 sm:grid-cols-3 lg:mt-0 lg:w-[430px] lg:border-0 lg:pt-0">
      <Link
        href={`/cars/${encodeURIComponent(vehicle.id)}`}
        className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition hover:bg-gray-100"
      >
        <Eye className="h-4 w-4" />
        View
      </Link>

      <Link
        href={`/admin/listing?edit=${encodeURIComponent(vehicle.id)}`}
        className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition hover:bg-gray-100"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Link>

      {statusAction && (
        <button
          type="button"
          onClick={() => onStatusAction(vehicle)}
          disabled={isUpdating || isDeleting}
          className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}

          {isUpdating ? "Updating..." : statusAction.label}
        </button>
      )}

      {vehicle.status === "Live" && (
        <button
          type="button"
          onClick={() => onMarkSold(vehicle)}
          disabled={isUpdating || isDeleting}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sold
        </button>
      )}

      {vehicle.status === "Reserved" && (
        <button
          type="button"
          onClick={() => onMarkSold(vehicle)}
          disabled={isUpdating || isDeleting}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sold
        </button>
      )}

      {(vehicle.status === "Live" ||
        vehicle.status === "Reserved" ||
        vehicle.status === "Sold" ||
        vehicle.status === "Draft") && (
        <button
          type="button"
          onClick={() => onArchive(vehicle)}
          disabled={isUpdating || isDeleting}
          className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Archive className="h-4 w-4" />
          Delist
        </button>
      )}

      <button
        type="button"
        onClick={() => onDelete(vehicle)}
        disabled={isDeleting || isUpdating}
        className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-3"
      >
        <Trash2 className="h-4 w-4" />
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border bg-white p-5"
        >
          <div className="flex gap-5">
            <div className="h-32 w-52 rounded-xl bg-gray-200" />

            <div className="flex-1 space-y-4">
              <div className="h-6 w-2/3 rounded bg-gray-200" />
              <div className="h-8 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-1/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <Search className="h-6 w-6 text-gray-400" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900">
        No vehicles found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        Try changing your search or filter, or create a new vehicle
        listing.
      </p>

      <Link
        href="/admin/listing"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <Plus className="h-4 w-4" />
        New Listing
      </Link>
    </div>
  );
}
