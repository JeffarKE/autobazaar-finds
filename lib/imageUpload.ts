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
  // --------------------------------------------------
  // 1. Validate the selected file
  // --------------------------------------------------

  if (file.size === 0) {
    throw new Error(
      "The selected image appears to be empty or hasn't been fully downloaded. If it's stored in Google Drive, OneDrive, Dropbox, or iCloud, please download it to your device first and then try again."
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported image format. Please upload a JPG, PNG, WebP, or HEIC image."
    );
  }

  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

  if (file.size > maxBytes) {
    throw new Error(
      `Image is too large. Please choose an image smaller than ${MAX_FILE_SIZE_MB} MB.`
    );
  }

  // --------------------------------------------------
  // 2. Compress the image in the browser
  // --------------------------------------------------

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

  // --------------------------------------------------
  // 3. Create a safe unique storage path
  // --------------------------------------------------

  const extension =
    compressedFile.name.split(".").pop()?.toLowerCase() || "jpg";

  const filename = `${crypto.randomUUID()}.${extension}`;

  const storagePath = `vehicles/${filename}`;

  // --------------------------------------------------
  // 4. Upload to Supabase Storage
  // --------------------------------------------------

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, compressedFile, {
      cacheControl: "31536000",
      upsert: false,
      contentType: compressedFile.type || "image/jpeg",
    });

  if (uploadError) {
    throw new Error(
      `Image upload failed: ${uploadError.message}`
    );
  }

  // --------------------------------------------------
  // 5. Generate a temporary preview URL for the private bucket
  // --------------------------------------------------

  const { data: signedData, error: signedUrlError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, 3600);

  if (signedUrlError || !signedData?.signedUrl) {
    throw new Error(
      "The image uploaded successfully, but a secure preview could not be created."
    );
  }

  // --------------------------------------------------
  // 6. Return information needed by the vehicle record
  // --------------------------------------------------

  return {
    publicUrl: signedData.signedUrl,
    storagePath,
  };
}
