"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { DollarSign, HandCoins, MapPin } from "lucide-react";

import type { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicleAction: Dispatch<SetStateAction<Vehicle>>;
};

export default function Pricing({ vehicle, setVehicleAction }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3"><DollarSign className="h-6 w-6" /></div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Price &amp; location</h2>
          <p className="text-gray-500">The two details buyers look for first.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:gap-6">
        <InputField label="Selling Price" placeholder="4850000" icon={<DollarSign className="h-5 w-5" />} value={vehicle.price} onChange={(price) => setVehicleAction((current) => ({ ...current, price }))} />
        <InputField label="Vehicle Location" placeholder="Karen, Nairobi" icon={<MapPin className="h-5 w-5" />} value={vehicle.location} onChange={(location) => setVehicleAction((current) => ({ ...current, location }))} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ToggleCard icon={<HandCoins className="h-5 w-5" />} title="Negotiable Price" description="Allow buyers to negotiate." checked={vehicle.negotiable} onChange={(negotiable) => setVehicleAction((current) => ({ ...current, negotiable }))} />
        <SelectField label="Condition (optional)" value={vehicle.condition} options={["Used", "New", "Local", "Import", "Accident free", "Salvage title"]} onChange={(condition) => setVehicleAction((current) => ({ ...current, condition }))} />
      </div>
    </section>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none focus:border-black focus:bg-white"><option value="">Not specified</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

type InputFieldProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
};

function InputField({ label, placeholder, icon, value, onChange }: InputFieldProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
      <span className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <span className="shrink-0 text-gray-400">{icon}</span>
        <input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 w-full bg-transparent outline-none" placeholder={placeholder} />
      </span>
    </label>
  );
}

type ToggleCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleCard({ icon, title, description, checked, onChange }: ToggleCardProps) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-4 transition hover:border-black sm:p-5">
      <div className="rounded-xl bg-gray-100 p-3 text-gray-800">{icon}</div>
      <div className="min-w-0">
        <h3 className="font-semibold leading-5 text-gray-950">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" aria-label={title} />
        <span className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-black" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </label>
    </div>
  );
}
