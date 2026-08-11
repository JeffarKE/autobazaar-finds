import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/vehicle";

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

  if (vehicle.images.length === 0) {
    missing.push("at least one vehicle photo");
  }

  if (missing.length > 0) {
    throw new Error(
      `Complete the following before saving: ${missing.join(", ")}.`
    );
  }

  if (
    !Number.isFinite(Number(vehicle.year)) ||
    !Number.isFinite(Number(vehicle.price)) ||
    !Number.isFinite(Number(vehicle.mileage))
  ) {
    throw new Error("Year, price, and mileage must be valid numbers.");
  }
}

type ExistingImage = {
  id: string;
  image_url: string;
  storage_path: string;
  display_order: number;
  is_cover: boolean;
};

/**
 * Updates the vehicle and synchronizes its images.
 *
 * Existing images that remain on the listing are kept.
 * New images are added.
 * Removed images are removed from vehicle_images and Storage.
 * Cover/order values are synchronized.
 */
export async function updateVehicle(
  vehicleId: string,
  vehicle: Vehicle
) {
  if (!vehicleId) {
    throw new Error("A vehicle ID is required to save changes.");
  }

  validateVehicle(vehicle);

  const { data: updatedVehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .update({
      make: vehicle.make,
      model: vehicle.model,
      year: Number(vehicle.year),
      price: Number(vehicle.price),
      mileage: Number(vehicle.mileage),
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      driveType: vehicle.driveType,
      engineSize: vehicle.engineSize,
      bodyType: vehicle.bodyType,
      description: vehicle.description,
      sellerName: vehicle.sellerName,
      phone: vehicle.phone,
      email: vehicle.email || null,
      location: vehicle.location,
      preferredContact: vehicle.preferredContact || null,
      bestTime: vehicle.bestTime || null,
    })
    .eq("id", vehicleId)
    .select()
    .single();

  if (vehicleError) {
    throw new Error(vehicleError.message);
  }

  if (!updatedVehicle?.id) {
    throw new Error(
      "The vehicle could not be updated. Please check that it still exists."
    );
  }

  const { data: existingRows, error: existingError } = await supabase
    .from("vehicle_images")
    .select("id, image_url, storage_path, display_order, is_cover")
    .eq("vehicle_id", vehicleId)
    .order("display_order", { ascending: true });

  if (existingError) {
    throw new Error(existingError.message);
  }

  const existingImages = (existingRows as ExistingImage[] | null) ?? [];

  const currentStoragePaths = new Set(
    vehicle.images
      .map((image) => image.storagePath)
      .filter(Boolean)
  );

  const removedImages = existingImages.filter(
    (image) => !currentStoragePaths.has(image.storage_path)
  );

  // Remove database records for images that were removed in the editor.
  if (removedImages.length > 0) {
    const removedIds = removedImages.map((image) => image.id);

    const { error: deleteError } = await supabase
      .from("vehicle_images")
      .delete()
      .in("id", removedIds);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  // Synchronize each image's order and cover state.
  for (let index = 0; index < vehicle.images.length; index++) {
    const image = vehicle.images[index];

    const existingImage = existingImages.find(
      (item) => item.storage_path === image.storagePath
    );

    if (existingImage) {
      const { error: imageUpdateError } = await supabase
        .from("vehicle_images")
        .update({
          image_url: image.publicUrl,
          display_order: index,
          is_cover: image.isCover ?? index === 0,
        })
        .eq("id", existingImage.id);

      if (imageUpdateError) {
        throw new Error(imageUpdateError.message);
      }
    } else {
      const { error: imageInsertError } = await supabase
        .from("vehicle_images")
        .insert({
          vehicle_id: vehicleId,
          image_url: image.publicUrl,
          storage_path: image.storagePath,
          display_order: index,
          is_cover: image.isCover ?? index === 0,
        });

      if (imageInsertError) {
        throw new Error(imageInsertError.message);
      }
    }
  }

  // Storage cleanup is deliberately last. If this fails, the listing/database
  // remain usable and only an orphaned storage file needs cleanup.
  const removedStoragePaths = removedImages
    .map((image) => image.storage_path)
    .filter(Boolean);

  if (removedStoragePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("vehicle-images")
      .remove(removedStoragePaths);

    if (storageError) {
      throw new Error(
        `Vehicle was saved, but one or more removed photos could not be deleted from Storage: ${storageError.message}`
      );
    }
  }

  return updatedVehicle;
}