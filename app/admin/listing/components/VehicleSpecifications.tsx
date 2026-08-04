"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Fuel,
  Cog,
  CarFront,
  Users,
  DoorOpen,
  Zap,
} from "lucide-react";

import { Vehicle } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

export default function VehicleSpecifications({
  vehicle,
  setVehicle,
}: Props) {
  const selectFields = [
    {
      key: "transmission",
      label: "Transmission",
      icon: <Cog className="h-5 w-5" />,
      options: ["Automatic", "Manual", "CVT", "Semi-Automatic"],
    },
    {
      key: "fuelType",
      label: "Fuel Type",
      icon: <Fuel className="h-5 w-5" />,
      options: [
        "Petrol",
        "Diesel",
        "Hybrid",
        "Electric",
        "Plug-in Hybrid",
      ],
    },
    {
      key: "driveType",
      label: "Drive Type",
      icon: <CarFront className="h-5 w-5" />,
      options: ["2WD", "FWD", "RWD", "AWD", "4WD"],
    },
    {
      key: "bodyType",
      label: "Body Type",
      icon: <CarFront className="h-5 w-5" />,
      options: [
        "Sedan",
        "SUV",
        "Hatchback",
        "Pickup",
        "Station Wagon",
        "Coupe",
        "Convertible",
        "Van",
        "MPV",
      ],
    },
  ] as const;

  const inputFields = [
    {
      key: "seats",
      label: "Seats",
      placeholder: "5",
      icon: <Users className="h-5 w-5" />,
    },
    {
      key: "doors",
      label: "Doors",
      placeholder: "5",
      icon: <DoorOpen className="h-5 w-5" />,
    },
    {
      key: "horsepower",
      label: "Horsepower (Optional)",
      placeholder: "201 HP",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      key: "torque",
      label: "Torque (Optional)",
      placeholder: "500 Nm",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      key: "groundClearance",
      label: "Ground Clearance",
      placeholder: "220 mm",
      icon: <CarFront className="h-5 w-5" />,
    },
  ] as const;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <Cog className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Vehicle Specifications
          </h2>

          <p className="text-gray-500">
            Technical details and drivetrain information.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {selectFields.map((field) => (
          <SelectField
            key={field.key}
            label={field.label}
            icon={field.icon}
            options={field.options}
            value={vehicle[field.key]}
            onChange={(value) =>
              setVehicle((prev) => ({
                ...prev,
                [field.key]: value,
              }))
            }
          />
        ))}

        {inputFields.map((field) => (
          <InputField
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            icon={field.icon}
            value={vehicle[field.key]}
            onChange={(value) =>
              setVehicle((prev) => ({
                ...prev,
                [field.key]: value,
              }))
            }
          />
        ))}
      </div>
    </section>
  );
}

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
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
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