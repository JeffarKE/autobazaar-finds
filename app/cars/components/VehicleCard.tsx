"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Gauge,
  Fuel,
  MapPin,
  Calendar,
  BadgeCheck,
  Star,
} from "lucide-react";

import { Vehicle } from "../types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-KE").format(vehicle.price);
  const formattedMileage = new Intl.NumberFormat("en-KE").format(
    vehicle.mileage
  );

  return (
    <Link
      href={`/cars/${vehicle.id}`}
      className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.images[0]}
          alt={vehicle.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
          priority={false}
        />

        {/* Featured Badge */}
        {vehicle.featured && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Star className="h-3.5 w-3.5 fill-current" />
            Featured
          </div>
        )}

        {/* Favourite */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 backdrop-blur transition hover:scale-110 dark:bg-gray-900/90"
        >
          <Heart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
              {vehicle.title}
            </h2>

            {vehicle.verified && (
              <BadgeCheck className="h-5 w-5 text-blue-600" />
            )}
          </div>

          <p className="text-3xl font-extrabold text-green-600">
            KSh {formattedPrice}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {vehicle.year}
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-gray-500" />
            {formattedMileage} km
          </div>

          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-gray-500" />
            {vehicle.fuel}
          </div>

          <div className="flex items-center gap-2">
            ⚙️ {vehicle.transmission}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          {vehicle.location}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={vehicle.seller.avatar}
                alt={vehicle.seller.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">{vehicle.seller.name}</p>

              <p className="text-xs text-gray-500">
                {vehicle.seller.verified
                  ? "Verified Seller"
                  : "Seller"}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}