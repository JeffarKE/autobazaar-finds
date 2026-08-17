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
  const images = vehicle.images.length ? vehicle.images : ["/cars/forester.jpg"];
  const photo = (index: number) => images[index % images.length];
  const showPhotoMosaic = vehicle.featured && images.length > 1;

  return (
    <Link
      href={`/cars/${vehicle.id}`}
      className="group relative block"
    >
      {showPhotoMosaic && (
        <div className="grid aspect-[7/6] grid-cols-[1.7fr_0.9fr] grid-rows-[1.45fr_1fr] gap-1 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <div className="relative col-span-2 overflow-hidden">
            <Image src={photo(0)} alt={vehicle.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw" loading="lazy" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
          </div>
          <div className="relative overflow-hidden"><Image src={photo(1)} alt="" fill sizes="(max-width:640px) 66vw, (max-width:1024px) 33vw, 20vw" loading="lazy" className="object-cover" /></div>
          <div className="grid grid-rows-2 gap-0.5">
            {[2, 3].map((index) => <div key={index} className="relative overflow-hidden"><Image src={photo(index)} alt="" fill sizes="(max-width:640px) 34vw, (max-width:1024px) 17vw, 10vw" loading="lazy" className="object-cover" /></div>)}
          </div>
        </div>
      )}

      {!showPhotoMosaic && <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={photo(0)}
          alt={vehicle.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
          loading="lazy"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>}

      {vehicle.featured && (
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
          <Star className="h-3 w-3 fill-current" /> Featured
        </span>
      )}

      <div className="pt-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <h2 className="line-clamp-1 text-[17px] font-bold leading-6 text-gray-900 transition group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
            {vehicle.title}
          </h2>
          {vehicle.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-blue-600" />}
        </div>

        <p className="mt-0.5 text-[22px] font-black tracking-tight text-green-600">
          KSh {formattedPrice}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
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

        <div className="mt-3 flex items-center justify-between gap-3">
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
