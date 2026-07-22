import { SellFormData } from "../types";
import { uploadPhoto } from "./uploadPhoto";
import { createVehicle } from "./createVehicle";
import { createVehicleImages } from "./createVehicleImages";

export async function submitListing(
  data: SellFormData
): Promise<void> {
  // 1. Upload all photos
  const uploadedPhotos = [];

  for (const photo of data.photos) {
    const uploaded = await uploadPhoto(photo);

    uploadedPhotos.push(uploaded);
  }

  // 2. Create the vehicle
  const vehicle = await createVehicle(data);

  // 3. Create image records
  await createVehicleImages(
    uploadedPhotos.map((photo, index) => ({
      vehicleId: vehicle.id,
      imageUrl: photo.publicUrl,
      storagePath: photo.storagePath,
      displayOrder: index,
      isCover: index === 0,
    }))
  );
}