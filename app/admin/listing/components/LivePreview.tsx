"use client";

import {
  MapPin,
  Gauge,
 Fuel,
  Settings,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function LivePreview() {
  return (
    <div className="sticky top-6 space-y-6">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">
            Vehicle Preview Image
          </span>
        </div>

        <div className="p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              2020 Toyota Land Cruiser Prado
            </h2>

            <ShieldCheck className="h-5 w-5 text-green-600" />
          </div>

          <p className="mt-2 text-3xl font-bold">
            KSh 4,850,000
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

            <Spec
              icon={<Calendar className="h-4 w-4" />}
              label="Year"
              value="2020"
            />

            <Spec
              icon={<Gauge className="h-4 w-4" />}
              label="Mileage"
              value="45,000 km"
            />

            <Spec
              icon={<Fuel className="h-4 w-4" />}
              label="Fuel"
              value="Diesel"
            />

            <Spec
              icon={<Settings className="h-4 w-4" />}
              label="Transmission"
              value="Automatic"
            />

          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            Karen, Nairobi
          </div>

        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold">
          Listing Progress
        </h3>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-2/3 rounded-full bg-black" />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          68% Complete
        </p>
      </section>
    </div>
  );
}

type SpecProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function Spec({
  icon,
  label,
  value,
}: SpecProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}