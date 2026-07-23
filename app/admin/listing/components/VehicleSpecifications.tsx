"use client";

import {
  Fuel,
  Cog,
  CarFront,
  Users,
  DoorOpen,
  Zap,
} from "lucide-react";

export default function VehicleSpecifications() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
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

        <SelectField
          label="Transmission"
          icon={<Cog className="h-5 w-5" />}
          options={[
            "Automatic",
            "Manual",
            "CVT",
            "Semi-Automatic",
          ]}
        />

        <SelectField
          label="Fuel Type"
          icon={<Fuel className="h-5 w-5" />}
          options={[
            "Petrol",
            "Diesel",
            "Hybrid",
            "Electric",
            "Plug-in Hybrid",
          ]}
        />

        <SelectField
          label="Drive Type"
          icon={<CarFront className="h-5 w-5" />}
          options={[
            "2WD",
            "FWD",
            "RWD",
            "AWD",
            "4WD",
          ]}
        />

        <SelectField
          label="Body Type"
          icon={<CarFront className="h-5 w-5" />}
          options={[
            "Sedan",
            "SUV",
            "Hatchback",
            "Pickup",
            "Station Wagon",
            "Coupe",
            "Convertible",
            "Van",
            "MPV",
          ]}
        />

        <InputField
          label="Seats"
          placeholder="5"
          icon={<Users className="h-5 w-5" />}
        />

        <InputField
          label="Doors"
          placeholder="5"
          icon={<DoorOpen className="h-5 w-5" />}
        />

        <InputField
          label="Horsepower (Optional)"
          placeholder="201 HP"
          icon={<Zap className="h-5 w-5" />}
        />

        <InputField
          label="Torque (Optional)"
          placeholder="500 Nm"
          icon={<Zap className="h-5 w-5" />}
        />

        <InputField
          label="Ground Clearance"
          placeholder="220 mm"
          icon={<CarFront className="h-5 w-5" />}
        />

      </div>
    </section>
  );
}

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
        <div className="text-gray-400">
          {icon}
        </div>

        <select className="w-full bg-transparent outline-none">
          <option value="">Select {label}</option>

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
        <div className="text-gray-400">
          {icon}
        </div>

        <input
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}