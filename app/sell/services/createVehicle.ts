import { supabase } from "@/lib/supabase";
import { SellFormData } from "../types";

export async function createVehicle(data: SellFormData) {
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .insert({
      make: data.make,
      model: data.model,
      year: Number(data.year),

      price: Number(data.price),
      mileage: Number(data.mileage),

      fuelType: data.fuelType,
      transmission: data.transmission,
      driveType: data.driveType,
      engineSize: data.engineSize,

      bodyType: data.bodyType,

      description: data.description,

      sellerName: data.sellerName,
      phone: data.phone,
      email: data.email,

      location: data.location,
      preferredContact: data.preferredContact,
      bestTime: data.bestTime,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return vehicle;
}