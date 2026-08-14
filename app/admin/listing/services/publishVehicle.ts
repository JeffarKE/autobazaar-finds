import { createVehicleImages } from "@/app/sell/services/createVehicleImages";
import { uploadVehicleImage } from "@/lib/imageUpload";
import { supabase } from "@/lib/supabase";
import type { Vehicle, VehicleImage } from "@/lib/vehicle";

type UploadedImage = {
  publicUrl: string;
  storagePath: string;
};

const requiredFields: Array<[keyof Vehicle, string]> = [
  ["make", "Make"],
  ["model", "Model"],
  ["year", "Year"],
  ["price", "Price"],
  ["mileage", "Mileage"],
  ["bodyType", "Body type"],
  ["fuelType", "Fuel type"],
  ["transmission", "Transmission"],
  ["driveType", "Drive type"],
  ["engineSize", "Engine size"],
  ["location", "Location"],
  ["description", "Description"],
  ["sellerName", "Seller name"],
  ["phone", "Phone number"],
];

function validateVehicle(vehicle: Vehicle) {
  const missing = requiredFields
    .filter(([field]) => !String(vehicle[field]).trim())
    .map(([, label]) => label);

  if (vehicle.images.length === 0) missing.push("at least one vehicle photo");

  if (missing.length > 0) {
    throw new Error(`Complete the following before publishing: ${missing.join(", ")}.`);
  }

  if (!Number.isFinite(Number(vehicle.year)) || !Number.isFinite(Number(vehicle.price)) || !Number.isFinite(Number(vehicle.mileage))) {
    throw new Error("Year, price, and mileage must be valid numbers.");
  }
}

async function uploadImage(image: VehicleImage): Promise<UploadedImage> {
  // A storage image can be reused without uploading it a second time.
  if (image.storagePath && image.publicUrl && !image.file) {
    return { publicUrl: image.publicUrl, storagePath: image.storagePath };
  }

  if (!image.file) {
    throw new Error("One of the selected photos is no longer available. Remove it and add it again.");
  }

  return uploadVehicleImage(image.file);
}

/**
 * Uploads local images, creates a vehicle record, then attaches the images to it.
 * This follows the same database column conventions already used by app/sell.
 */
export async function publishVehicle(vehicle: Vehicle) {
  validateVehicle(vehicle);

  const uploadedImages = await Promise.all(vehicle.images.map(uploadImage));
  const { data: createdVehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      make: vehicle.make,
      model: vehicle.model,
      year: Number(vehicle.year),
      registrationNumber: vehicle.registrationNumber || null,
      vin: vehicle.vin || null,
      price: Number(vehicle.price),
      mileage: Number(vehicle.mileage),
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      driveType: vehicle.driveType,
      engineSize: vehicle.engineSize,
      bodyType: vehicle.bodyType,
      exteriorColor: vehicle.exteriorColor || null,
      interiorColor: vehicle.interiorColor || null,
      condition: vehicle.condition || null,
      seats: vehicle.seats || null,
      doors: vehicle.doors || null,
      horsepower: vehicle.horsepower || null,
      torque: vehicle.torque || null,
      groundClearance: vehicle.groundClearance || null,
      description: vehicle.description,
      sellerName: vehicle.sellerName,
      phone: vehicle.phone,
      email: vehicle.email || null,
      location: vehicle.location,
      preferredContact: vehicle.preferredContact || null,
      bestTime: vehicle.bestTime || null,
      status: vehicle.publishImmediately ? "Live" : vehicle.status,
      negotiable: vehicle.negotiable,
      featured: vehicle.featured,
      verified: vehicle.verified,
      publishImmediately: vehicle.publishImmediately,
    })
    .select()
    .single();

  if (vehicleError) throw new Error(vehicleError.message);
  if (!createdVehicle?.id) throw new Error("The vehicle was created without an identifier.");

  await createVehicleImages(
    uploadedImages.map((image, index) => ({
      vehicleId: createdVehicle.id,
      imageUrl: image.publicUrl,
      storagePath: image.storagePath,
      displayOrder: index,
      isCover: vehicle.images[index]?.isCover ?? index === 0,
    })),
  );

  return createdVehicle;
}
