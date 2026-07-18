"use client";

import { Car } from "lucide-react";

import FormInput from "@/app/components/ui/FormInput";
import FormSelect from "@/app/components/ui/FormSelect";

import { SellFormData } from "../types";

export default function VehicleDetails() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <Car className="mt-1 h-7 w-7 text-green-700" />

        <div>
          <h2 className="text-2xl font-bold">
            Vehicle Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Tell us everything buyers should know about your vehicle.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <FormInput<SellFormData>
          name="make"
          label="Make"
          placeholder="e.g. Toyota"
          required
        />

        <FormInput<SellFormData>
          name="model"
          label="Model"
          placeholder="e.g. Land Cruiser Prado TX"
          required
        />

        <FormInput<SellFormData>
          name="year"
          label="Year"
          type="number"
          placeholder="e.g. 2020"
          required
        />

        <FormInput<SellFormData>
          name="engineSize"
          label="Engine Size (cc)"
          placeholder="e.g. 1998"
        />

        <FormInput<SellFormData>
          name="mileage"
          label="Mileage (km)"
          placeholder="e.g. 85,000"
        />

        <FormInput<SellFormData>
          name="price"
          label="Asking Price (KSh)"
          placeholder="e.g. 2,350,000"
          required
        />

        <FormSelect<SellFormData>
          name="transmission"
          label="Transmission"
          required
          options={[
            {
              label: "Automatic",
              value: "Automatic",
            },
            {
              label: "Manual",
              value: "Manual",
            },
          ]}
        />

        <FormSelect<SellFormData>
          name="fuelType"
          label="Fuel Type"
          required
          options={[
            {
              label: "Petrol",
              value: "Petrol",
            },
            {
              label: "Diesel",
              value: "Diesel",
            },
            {
              label: "Hybrid",
              value: "Hybrid",
            },
            {
              label: "Electric",
              value: "Electric",
            },
          ]}
        />

        <FormSelect<SellFormData>
          name="bodyType"
          label="Body Type"
          required
          options={[
            {
              label: "Sedan",
              value: "Sedan",
            },
            {
              label: "Hatchback",
              value: "Hatchback",
            },
            {
              label: "SUV",
              value: "SUV",
            },
            {
              label: "Pickup",
              value: "Pickup",
            },
            {
              label: "Van",
              value: "Van",
            },
            {
              label: "Coupe",
              value: "Coupe",
            },
            {
              label: "Convertible",
              value: "Convertible",
            },
            {
              label: "Wagon",
              value: "Wagon",
            },
          ]}
        />

        <FormSelect<SellFormData>
          name="driveType"
          label="Drive Type"
          required
          options={[
            {
              label: "2WD",
              value: "2WD",
            },
            {
              label: "FWD",
              value: "FWD",
            },
            {
              label: "RWD",
              value: "RWD",
            },
            {
              label: "AWD",
              value: "AWD",
            },
            {
              label: "4WD",
              value: "4WD",
            },
          ]}
        />

      </div>
    </section>
  );
}