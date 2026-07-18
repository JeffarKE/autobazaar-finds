"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Star, Trash2, GripVertical } from "lucide-react";

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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-900 ${
        isDragging
          ? "scale-105 rotate-1 shadow-2xl"
          : "hover:shadow-lg"
      }`}
    >
      <img
        src={photo.preview}
        alt="Vehicle"
        className="aspect-[4/3] w-full object-cover"
      />

      {photo.isCover && (
        <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Cover
        </div>
      )}

      <div className="absolute right-3 top-3 flex gap-2">

        <button
          type="button"
          {...attributes}
          {...listeners}
          className="rounded-lg bg-white/90 p-2 transition hover:bg-white"
          title="Drag to reorder"
        >
          <GripVertical className="h-5 w-5 text-gray-700" />
        </button>

        <button
          type="button"
          onClick={() => onRemove(photo.id)}
          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
}