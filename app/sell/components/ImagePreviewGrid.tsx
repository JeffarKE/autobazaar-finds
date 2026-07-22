"use client";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import ImagePreviewCard from "./ImagePreviewCard";
import { VehiclePhoto } from "../types";

interface ImagePreviewGridProps {
  photos: VehiclePhoto[];
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export default function ImagePreviewGrid({
  photos,
  onRemove,
  onReorder,
}: ImagePreviewGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (photos.length === 0) {
    return null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    onReorder(String(active.id), String(over.id));
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Uploaded Photos ({photos.length})
      </h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={photos.map((photo) => photo.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <ImagePreviewCard
                key={photo.id}
                photo={photo}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}