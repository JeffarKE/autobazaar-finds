import { createVehicleImages } from "@/app/sell/services/createVehicleImages";
import { uploadVehicleImage } from "@/lib/imageUpload";
import { supabase } from "@/lib/supabase";
import type { Vehicle, VehicleImage } from "@/lib/vehicle";
import { serializeVehicleCondition } from "@/lib/vehicleCondition";

type UploadedImage = {
  publicUrl: string;
  storagePath: string;
};

function optionalNumber(value: string, label: string) {
  if (!value.trim()) return null;

  const number = Number(value.replace(/[^0-9.-]/g, ""));

  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a valid number when provided.`);
  }

  return number;
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
  const uploadedImages = await Promise.all(vehicle.images.map(uploadImage));
  const { data: createdVehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      make: vehicle.make,
      model: vehicle.model,
      year: optionalNumber(vehicle.year, "Year"),
      registrationNumber: vehicle.registrationNumber || null,
      vin: vehicle.vin || null,
      price: optionalNumber(vehicle.price, "Price"),
      mileage: optionalNumber(vehicle.mileage, "Mileage"),
      fuelType: vehicle.fuelType || null,
      transmission: vehicle.transmission || null,
      driveType: vehicle.driveType || null,
      engineSize: vehicle.engineSize || null,
      bodyType: vehicle.bodyType || null,
      exteriorColor: vehicle.exteriorColor || null,
      interiorColor: vehicle.interiorColor || null,
      condition: serializeVehicleCondition(vehicle.condition, vehicle.origin, vehicle.history),
      seats: vehicle.seats || null,
      doors: vehicle.doors || null,
      horsepower: vehicle.horsepower || null,
      torque: vehicle.torque || null,
      groundClearance: vehicle.groundClearance || null,
      description: vehicle.description || null,
      sellerName: vehicle.sellerName || null,
      phone: vehicle.phone || null,
      email: vehicle.email || null,
      location: vehicle.location || null,
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
