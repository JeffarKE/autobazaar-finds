import { uploadVehicleImage } from "@/lib/imageUpload";

export interface UploadedPhoto {
  publicUrl: string;
  storagePath: string;
}

export async function uploadPhoto(
  file: File
): Promise<UploadedPhoto> {
  return uploadVehicleImage(file);
}