"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  vehicleSchema,
  VehicleFormData,
  VehicleFormInput,
} from "@/lib/vehicleSchema";

export function useVehicleForm() {
  return useForm<
    VehicleFormInput,
    unknown,
    VehicleFormData
  >({
    resolver: zodResolver(vehicleSchema),

    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),

      price: 0,
      mileage: 0,

      fuelType: "",
      transmission: "",
      driveType: "",

      engineSize: "",

      exterior_color: "",
      interior_color: "",

      condition: "",

      description: "",

      sellerName: "",
      phone: "",
      email: "",

      bodyType: "",
      location: "",

      preferredContact: "",
      bestTime: "",

      featured: false,

      status: "draft",
    },
  });
}