import imageCompression from "browser-image-compression";
import { supabase } from "./supabase";

const BUCKET = "vehicle-images";

const MAX_FILE_SIZE_MB = 20;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export async function uploadVehicleImage(file: File) {
  // Empty or cloud-only placeholder file
  if (file.size === 0) {
    throw new Error(
      "The selected image appears to be empty or hasn't been fully downloaded. If it's stored in Google Drive, OneDrive, Dropbox, or iCloud, please download it to your device first and then try again."
    );
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported image format. Please upload a JPG, PNG, WebP, or HEIC image."
    );
  }

  // Check file size before compression
  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

  if (file.size > maxBytes) {
    throw new Error(
      `Image is too large. Please choose an image smaller than ${MAX_FILE_SIZE_MB} MB.`
    );
  }

  let compressedFile: File;

  try {
    compressedFile = await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.9,
    });
  } catch {
    throw new Error(
      "We couldn't process this image. Please try another image or save it locally before uploading."
    );
  }

  const extension =
    compressedFile.name.split(".").pop()?.toLowerCase() || "jpg";

  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, compressedFile);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  return {
    publicUrl,
    storagePath: filename,
  };
}