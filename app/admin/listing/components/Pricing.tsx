"use client";

import {
  DollarSign,
  MapPin,
  BadgeCheck,
  Star,
  HandCoins,
  Globe,
} from "lucide-react";

export default function Pricing() {
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

        {/* Selling Price */}
        <InputField
          label="Selling Price"
          placeholder="4850000"
          icon={<DollarSign className="h-5 w-5" />}
        />

        {/* Location */}
        <InputField
          label="Vehicle Location"
          placeholder="Karen, Nairobi"
          icon={<MapPin className="h-5 w-5" />}
        />

        {/* Status */}
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
        />
      </div>

      {/* Listing Options */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">

        <ToggleCard
          icon={<HandCoins className="h-5 w-5" />}
          title="Negotiable Price"
          description="Allow buyers to negotiate."
        />

        <ToggleCard
          icon={<Star className="h-5 w-5" />}
          title="Featured Listing"
          description="Display this vehicle prominently."
        />

        <ToggleCard
          icon={<BadgeCheck className="h-5 w-5" />}
          title="Verified Listing"
          description="Show a verified badge."
        />

        <ToggleCard
          icon={<Globe className="h-5 w-5" />}
          title="Publish Immediately"
          description="Make this listing visible after saving."
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
};

function InputField({
  label,
  placeholder,
  icon,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <div className="text-gray-400">{icon}</div>

        <input
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
  options: string[];
};

function SelectField({
  label,
  icon,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <div className="text-gray-400">{icon}</div>

        <select className="w-full bg-transparent outline-none">
          <option>Select {label}</option>

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
};

function ToggleCard({
  icon,
  title,
  description,
}: ToggleCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-5 transition hover:border-black">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-gray-100 p-3">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-black"></div>

        <div className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}