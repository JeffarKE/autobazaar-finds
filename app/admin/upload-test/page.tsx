"use client";

import { useState } from "react";
import { uploadVehicleImage } from "@/lib/imageUpload";

export default function UploadTestPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [storagePath, setStoragePath] = useState("");

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("Selected file:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    setUploading(true);

    try {
      const uploaded = await uploadVehicleImage(file);

      console.log("Upload successful:", uploaded);

      setImageUrl(uploaded.publicUrl);
      setStoragePath(uploaded.storagePath);
    } catch (error: unknown) {
      console.error("========== UPLOAD ERROR ==========");
      console.error(error);

      if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        alert(error.message);
      } else {
        console.error("Unknown error:", error);
        alert("Unknown upload error. Check the browser console.");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Upload Test
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {uploading && (
        <p className="mt-6 font-medium text-blue-600">
          Uploading...
        </p>
      )}

      {imageUrl && (
        <div className="mt-8 space-y-4">
          <p className="font-medium text-green-700">
            ✅ Upload successful!
          </p>

          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-md rounded-xl border shadow"
          />

          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold">Public URL</p>
              <p className="break-all text-sm text-gray-600">
                {imageUrl}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Storage Path</p>
              <p className="break-all text-sm text-gray-600">
                {storagePath}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}