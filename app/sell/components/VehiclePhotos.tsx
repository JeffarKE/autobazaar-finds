"use client";

import { Camera } from "lucide-react";

import FormSection from "@/app/components/ui/FormSection";

import { useImageUpload } from "../hooks/useImageUpload";

import ImageDropzone from "./ImageDropzone";
import ImagePreviewGrid from "./ImagePreviewGrid";

export default function VehiclePhotos() {
  const {
    photos,
    error,
    addFiles,
    removePhoto,
    reorderPhotos,
    maxFiles,
  } = useImageUpload();

  return (
    <FormSection
      title="Vehicle Photos"
      description="Upload clear, high-quality photos of your vehicle. Drag photos to reorder them. The first image automatically becomes the cover photo."
      icon={<Camera className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <ImageDropzone
          onFilesSelected={addFiles}
          maxFiles={maxFiles}
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <ImagePreviewGrid
          photos={photos}
          onRemove={removePhoto}
          onReorder={reorderPhotos}
        />
      </div>
    </FormSection>
  );
}