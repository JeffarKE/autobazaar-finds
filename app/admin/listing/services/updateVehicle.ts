import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/vehicle";
import { serializeVehicleCondition } from "@/lib/vehicleCondition";

function optionalNumber(value: string, label: string) {
  if (!value.trim()) return null;

  const number = Number(value.replace(/[^0-9.-]/g, ""));

  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a valid number when provided.`);
  }

  return number;
}

type ExistingImage = {
  id: string;
  image_url: string;
  storage_path: string;
  display_order: number;
  is_cover: boolean;
};

export async function updateVehicle(
  vehicleId: string,
  vehicle: Vehicle
) {
  if (!vehicleId) {
    throw new Error("A vehicle ID is required to save changes.");
  }

  /*
   * ------------------------------------------------------------
   * 1. NORMALIZE IMAGE STATE
   * ------------------------------------------------------------
   *
   * There must only ever be ONE cover photo.
   */
  const images = [...vehicle.images];

  let coverIndex = images.findIndex(
    (image) => image.isCover === true
  );

  if (coverIndex === -1 && images.length > 0) {
    coverIndex = 0;
  }

  const normalizedImages = images.map((image, index) => ({
    ...image,
    isCover: index === coverIndex,
  }));

  /*
   * ------------------------------------------------------------
   * 2. UPDATE VEHICLE
   * ------------------------------------------------------------
   */
  const { data: updatedVehicle, error: vehicleError } =
    await supabase
      .from("vehicles")
      .update({
        listingTitle: vehicle.listingTitle || null,
        make: vehicle.make,
        model: vehicle.model,
        year: optionalNumber(vehicle.year, "Year"),
        registrationNumber:
          vehicle.registrationNumber || null,
        vin: vehicle.vin || null,
        price: optionalNumber(vehicle.price, "Price"),
        mileage: optionalNumber(vehicle.mileage, "Mileage"),

        fuelType: vehicle.fuelType || null,
        transmission: vehicle.transmission || null,
        driveType: vehicle.driveType || null,
        engineSize: vehicle.engineSize || null,
        bodyType: vehicle.bodyType || null,
        exteriorColor:
          vehicle.exteriorColor || null,
        interiorColor:
          vehicle.interiorColor || null,
        condition: serializeVehicleCondition(vehicle.condition, vehicle.origin, vehicle.history),
        seats: vehicle.seats || null,
        doors: vehicle.doors || null,
        horsepower: vehicle.horsepower || null,
        torque: vehicle.torque || null,
        groundClearance:
          vehicle.groundClearance || null,

        description: vehicle.description || null,

        sellerName: vehicle.sellerName || null,
        phone: vehicle.phone || null,
        email: vehicle.email || null,

        location: vehicle.location || null,
        preferredContact:
          vehicle.preferredContact || null,
        bestTime: vehicle.bestTime || null,
        status: vehicle.publishImmediately
          ? "Live"
          : vehicle.status,
        negotiable: vehicle.negotiable,
        featured: vehicle.featured,
        verified: vehicle.verified,
        turbo: vehicle.turbo,
        publishImmediately:
          vehicle.publishImmediately,
      })
      .eq("id", vehicleId)
      .select()
      .single();

  if (vehicleError) {
    throw new Error(
      `Vehicle update failed: ${vehicleError.message}`
    );
  }

  if (!updatedVehicle?.id) {
    throw new Error(
      "The vehicle could not be updated. Please check that it still exists."
    );
  }

  /*
   * ------------------------------------------------------------
   * 3. LOAD CURRENT DATABASE IMAGES
   * ------------------------------------------------------------
   */
  const {
    data: existingRows,
    error: existingError,
  } = await supabase
    .from("vehicle_images")
    .select(
      "id, image_url, storage_path, display_order, is_cover"
    )
    .eq("vehicle_id", vehicleId)
    .order("display_order", {
      ascending: true,
    });

  if (existingError) {
    throw new Error(
      `Unable to load existing vehicle photos: ${existingError.message}`
    );
  }

  const existingImages =
    (existingRows as ExistingImage[] | null) ?? [];

  /*
   * ------------------------------------------------------------
   * 4. FIND IMAGES THAT WERE REMOVED IN THE EDITOR
   * ------------------------------------------------------------
   *
   * Existing database image:
   *
   *     storage_path = vehicles/abc.jpg
   *
   * Current editor:
   *
   *     vehicles/abc.jpg  -> still exists
   *
   * If the path isn't present anymore, the user deleted it.
   */
  const currentStoragePaths = new Set(
    normalizedImages
      .map((image) => image.storagePath)
      .filter(Boolean)
  );

  const removedImages = existingImages.filter(
    (existingImage) =>
      !currentStoragePaths.has(
        existingImage.storage_path
      )
  );

  /*
   * ------------------------------------------------------------
   * 5. DELETE REMOVED DATABASE RECORDS
   * ------------------------------------------------------------
   *
   * We explicitly SELECT the deleted rows back.
   *
   * This lets us detect the exact situation where Supabase
   * silently deletes ZERO rows because of an RLS policy.
   */
  if (removedImages.length > 0) {
    const removedIds = removedImages.map(
      (image) => image.id
    );

    const {
      data: deletedRows,
      error: deleteError,
    } = await supabase
      .from("vehicle_images")
      .delete()
      .in("id", removedIds)
      .select("id");

    if (deleteError) {
      throw new Error(
        `Unable to delete vehicle photo records: ${deleteError.message}`
      );
    }

    const deletedCount = deletedRows?.length ?? 0;

    if (deletedCount !== removedIds.length) {
      throw new Error(
        `Photo deletion was blocked. Expected to delete ${removedIds.length} photo record(s), but Supabase deleted ${deletedCount}. Check the vehicle_images DELETE policy.`
      );
    }
  }

  /*
   * ------------------------------------------------------------
   * 6. SYNCHRONIZE REMAINING + NEW IMAGES
   * ------------------------------------------------------------
   */
  for (
    let index = 0;
    index < normalizedImages.length;
    index++
  ) {
    const image = normalizedImages[index];

    const existingImage = existingImages.find(
      (item) =>
        item.storage_path === image.storagePath
    );

    /*
     * EXISTING IMAGE
     */
    if (existingImage) {
      const {
        error: imageUpdateError,
      } = await supabase
        .from("vehicle_images")
        .update({
          image_url: image.publicUrl,
          display_order: index,
          is_cover: image.isCover,
        })
        .eq("id", existingImage.id);

      if (imageUpdateError) {
        throw new Error(
          `Unable to update vehicle photo: ${imageUpdateError.message}`
        );
      }
    }

    /*
     * NEW IMAGE
     */
    else {
      const {
        error: imageInsertError,
      } = await supabase
        .from("vehicle_images")
        .insert({
          vehicle_id: vehicleId,
          image_url: image.publicUrl,
          storage_path: image.storagePath,
          display_order: index,
          is_cover: image.isCover,
        });

      if (imageInsertError) {
        throw new Error(
          `Unable to save new vehicle photo: ${imageInsertError.message}`
        );
      }
    }
  }

  /*
   * ------------------------------------------------------------
   * 7. DELETE REMOVED FILES FROM SUPABASE STORAGE
   * ------------------------------------------------------------
   */
  const removedStoragePaths = removedImages
    .map((image) => image.storage_path)
    .filter(Boolean);

  if (removedStoragePaths.length > 0) {
    const {
      data: removedStorageFiles,
      error: storageError,
    } = await supabase.storage
      .from("vehicle-images")
      .remove(removedStoragePaths);

    if (storageError) {
      throw new Error(
        `Vehicle was saved, but the removed photo could not be deleted from Storage: ${storageError.message}`
      );
    }

    /*
     * Supabase Storage normally returns the removed objects.
     * We don't treat an empty response as a hard failure because
     * Storage behavior can vary depending on the policy/API
     * response, but the database record has already been removed.
     */
    void removedStorageFiles;
  }

  /*
   * ------------------------------------------------------------
   * 8. FINAL VERIFICATION
   * ------------------------------------------------------------
   *
   * Read the image records again and make sure:
   *
   * - deleted images are actually gone
   * - exactly one cover exists
   */
  const {
    data: finalImages,
    error: verificationError,
  } = await supabase
    .from("vehicle_images")
    .select(
      "id, storage_path, display_order, is_cover"
    )
    .eq("vehicle_id", vehicleId)
    .order("display_order", {
      ascending: true,
    });

  if (verificationError) {
    throw new Error(
      `Vehicle was saved, but image verification failed: ${verificationError.message}`
    );
  }

  const finalImageRows =
    (finalImages as Array<{
      id: string;
      storage_path: string;
      display_order: number;
      is_cover: boolean;
    }> | null) ?? [];

  /*
   * Make sure every editor image exists in the DB.
   */
  const finalStoragePaths = new Set(
    finalImageRows.map(
      (image) => image.storage_path
    )
  );

  const missingPersistedImages =
    normalizedImages.filter(
      (image) =>
        !finalStoragePaths.has(image.storagePath)
    );

  if (missingPersistedImages.length > 0) {
    throw new Error(
      "Vehicle was saved, but one or more photos were not persisted correctly."
    );
  }

  /*
   * Make sure exactly one cover exists.
   */
  const finalCoverCount = finalImageRows.filter(
    (image) => image.is_cover === true
  ).length;

  if (
    normalizedImages.length > 0 &&
    finalCoverCount !== 1
  ) {
    throw new Error(
      `Vehicle was saved, but the image records contain ${finalCoverCount} cover photos instead of exactly one.`
    );
  }

  return updatedVehicle;
}
