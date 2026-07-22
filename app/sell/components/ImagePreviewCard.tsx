"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { VehiclePhoto } from "../types";

interface ImagePreviewCardProps {
  photo: VehiclePhoto;
  onRemove: (id: string) => void;
}

export default function ImagePreviewCard({
  photo,
  onRemove,
}: ImagePreviewCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: photo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 ${
        isDragging
          ? "scale-105 rotate-1 shadow-2xl ring-2 ring-blue-500"
          : "hover:-translate-y-1 hover:shadow-lg"
      }`}
    >
      <img
        src={photo.preview}
        alt="Vehicle photo"
        draggable={false}
        loading="lazy"
        className="aspect-[4/3] w-full select-none object-cover"
      />

      {/* Upload Overlay */}
      {photo.isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white backdrop-blur-sm">
          <Loader2 className="mb-2 h-8 w-8 animate-spin" />

          <p className="text-sm font-medium">
            Uploading...
          </p>

          <p className="mt-1 text-xs opacity-90">
            {photo.uploadProgress}%
          </p>
        </div>
      )}

      {/* Upload Failed */}
      {!photo.isUploading && photo.uploadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-700/80 text-white backdrop-blur-sm">
          <AlertCircle className="mb-2 h-8 w-8" />

          <p className="px-3 text-center text-sm font-medium">
            Upload Failed
          </p>
        </div>
      )}

      {/* Upload Success */}
      {!photo.isUploading &&
        !photo.uploadError &&
        photo.url && (
          <div className="absolute bottom-3 right-3 rounded-full bg-green-600 p-2 text-white shadow-lg">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        )}

      {photo.isCover && (
        <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
          Cover
        </div>
      )}

      <div className="absolute right-3 top-3 flex gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag photo"
          title="Drag to reorder"
          className="cursor-grab rounded-lg bg-white/90 p-2 backdrop-blur transition hover:bg-white active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-gray-700" />
        </button>

        <button
          type="button"
          aria-label="Remove photo"
          title="Remove photo"
          onClick={() => onRemove(photo.id)}
          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}