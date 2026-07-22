import { supabase } from "@/lib/supabase";

export interface VehicleImageInput {
  vehicleId: string;
  imageUrl: string;
  storagePath: string;
  displayOrder: number;
  isCover: boolean;
}

export async function createVehicleImages(
  images: VehicleImageInput[]
) {
  if (images.length === 0) return;

  const { error } = await supabase
    .from("vehicle_images")
    .insert(
      images.map((image) => ({
        vehicle_id: image.vehicleId,
        image_url: image.imageUrl,
        storage_path: image.storagePath,
        display_order: image.displayOrder,
        is_cover: image.isCover,
      }))
    );

  if (error) {
    throw error;
  }
}