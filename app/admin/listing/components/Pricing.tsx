"use client";

import { Dispatch, SetStateAction } from "react";
import {
  DollarSign,
  MapPin,
  BadgeCheck,
  Star,
  HandCoins,
  Globe,
} from "lucide-react";

import { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

export default function Pricing({
  vehicle,
  setVehicle,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <DollarSign className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Pricing & Listing
          </h2>

          <p className="text-gray-500">
            Configure the selling price and listing options.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <InputField
          label="Selling Price"
          placeholder="4850000"
          icon={<DollarSign className="h-5 w-5" />}
          value={vehicle.price}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              price: value,
            }))
          }
        />

        <InputField
          label="Vehicle Location"
          placeholder="Karen, Nairobi"
          icon={<MapPin className="h-5 w-5" />}
          value={vehicle.location}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              location: value,
            }))
          }
        />

        <SelectField
          label="Listing Status"
          icon={<Globe className="h-5 w-5" />}
          options={[
            "Draft",
            "Live",
            "Reserved",
            "Sold",
            "Archived",
          ]}
          value={vehicle.status}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              status: value as Vehicle["status"],
            }))
          }
        />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <ToggleCard
          icon={<HandCoins className="h-5 w-5" />}
          title="Negotiable Price"
          description="Allow buyers to negotiate."
          checked={vehicle.negotiable}
          onChange={(checked) =>
            setVehicle((prev) => ({
              ...prev,
              negotiable: checked,
            }))
          }
        />

        <ToggleCard
          icon={<Star className="h-5 w-5" />}
          title="Featured Listing"
          description="Display this vehicle prominently."
          checked={vehicle.featured}
          onChange={(checked) =>
            setVehicle((prev) => ({
              ...prev,
              featured: checked,
            }))
          }
        />

        <ToggleCard
          icon={<BadgeCheck className="h-5 w-5" />}
          title="Verified Listing"
          description="Show a verified badge."
          checked={vehicle.verified}
          onChange={(checked) =>
            setVehicle((prev) => ({
              ...prev,
              verified: checked,
            }))
          }
        />

        <ToggleCard
          icon={<Globe className="h-5 w-5" />}
          title="Publish Immediately"
          description="Make this listing visible after saving."
          checked={vehicle.publishImmediately}
          onChange={(checked) =>
            setVehicle((prev) => ({
              ...prev,
              publishImmediately: checked,
            }))
          }
        />
      </div>
    </section>
  );
}

/* ---------------- Input ---------------- */

type InputFieldProps = {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
};

function InputField({
  label,
  placeholder,
  icon,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <div className="text-gray-400">{icon}</div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

/* ---------------- Select ---------------- */

type SelectFieldProps = {
  label: string;
  icon: React.ReactNode;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

function SelectField({
  label,
  icon,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <div className="text-gray-400">{icon}</div>

        <select
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ---------------- Toggle ---------------- */

type ToggleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleCard({
  icon,
  title,
  description,
  checked,
  onChange,
}: ToggleCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-5 transition hover:border-black">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-gray-100 p-3">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-black"></div>

        <div className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}