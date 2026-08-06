"use client";

import { Dispatch, SetStateAction } from "react";
import {
  User,
  Phone,
  Mail,
  Globe,
  Building2,
} from "lucide-react";

import { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

export default function SellerInformation({
  vehicle,
  setVehicle,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <User className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Seller Information
          </h2>

          <p className="text-gray-500">
            Contact information displayed to interested buyers.
          </p>
        </div>
      </div>

      {/* Dealer Card */}
      <div className="mt-8 rounded-2xl border bg-gradient-to-r from-black to-gray-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">
              Default Seller
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              Auto Baazar Finds
            </h3>

            <p className="mt-2 text-gray-300">
              Your dealership information will automatically appear unless
              changed below.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-2 text-sm">
            Default Profile
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <InputField
          label="Seller Name"
          placeholder="Auto Baazar Finds"
          icon={<Building2 className="h-5 w-5" />}
          value={vehicle.sellerName}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              sellerName: value,
            }))
          }
        />

        <InputField
          label="Contact Number"
          placeholder="+254 700 000 000"
          icon={<Phone className="h-5 w-5" />}
          value={vehicle.phone}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              phone: value,
            }))
          }
        />

        <InputField
          label="Email Address"
          placeholder="sales@autobaazarfinds.co.ke"
          icon={<Mail className="h-5 w-5" />}
          value={vehicle.email}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              email: value,
            }))
          }
        />

        <SelectField
          label="Preferred Contact"
          icon={<Globe className="h-5 w-5" />}
          value={vehicle.preferredContact}
          options={[
            "Phone",
            "WhatsApp",
            "Email",
          ]}
          onChange={(value) =>
            setVehicle((prev) => ({
              ...prev,
              preferredContact: value,
            }))
          }
        />

        <div className="md:col-span-2">
          <InputField
            label="Best Time to Contact"
            placeholder="9AM - 5PM"
            icon={<Phone className="h-5 w-5" />}
            value={vehicle.bestTime}
            onChange={(value) =>
              setVehicle((prev) => ({
                ...prev,
                bestTime: value,
              }))
            }
          />
        </div>
      </div>
    </section>
  );
}

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
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  label,
  icon,
  value,
  options,
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
        >
          <option value="">Select</option>

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