import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Fuel, Gauge, MapPin, Settings2, Star } from "lucide-react";

import type { Vehicle } from "../types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-KE").format(vehicle.price);
  const formattedMileage = new Intl.NumberFormat("en-KE").format(vehicle.mileage);

  return (
    <Link
      href={`/cars/${vehicle.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={vehicle.images[0] ?? "/cars/forester.jpg"}
          alt={vehicle.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
          loading="lazy"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {vehicle.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <Star className="h-3 w-3 fill-current" /> Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex min-w-0 items-center gap-1.5">
          <h2 className="line-clamp-1 text-base font-bold text-gray-900 dark:text-white">
            {vehicle.title}
          </h2>
          {vehicle.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-blue-600" />}
        </div>

        <p className="mt-1 text-2xl font-black tracking-tight text-green-600">
          KSh {formattedPrice}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex min-w-0 items-center gap-1.5">
            <Gauge className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{formattedMileage} km</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <Fuel className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{vehicle.fuel}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <Settings2 className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{vehicle.transmission}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{vehicle.location}</span>
          </div>
          <span className="shrink-0 text-xs font-bold text-green-700 dark:text-green-300">
            View car →
          </span>
        </div>
      </div>
    </Link>
  );
}
