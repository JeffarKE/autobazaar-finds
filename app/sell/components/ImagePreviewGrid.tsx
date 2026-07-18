"use client";

import ImagePreviewCard from "./ImagePreviewCard";
import { VehiclePhoto } from "../types";

interface ImagePreviewGridProps {
  photos: VehiclePhoto[];
  onRemove: (id: string) => void;
  onSetCover?: (id: string) => void;
}

export default function ImagePreviewGrid({
  photos,
  onRemove,
  onSetCover,
}: ImagePreviewGridProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Uploaded Photos ({photos.length})
      </h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <ImagePreviewCard
            key={photo.id}
            photo={photo}
            onRemove={onRemove}
            onSetCover={onSetCover}
          />
        ))}
      </div>
    </div>
  );
}