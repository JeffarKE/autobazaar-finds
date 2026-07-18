"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { arrayMove } from "@dnd-kit/sortable";

import { SellFormData, VehiclePhoto } from "../types";

const MAX_FILES = 20;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function useImageUpload() {
  const { watch, setValue } = useFormContext<SellFormData>();

  const files = watch("photos");

  const [photos, setPhotos] = useState<VehiclePhoto[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Stable counter for unique IDs
  const idCounter = useRef(0);

  /**
   * Keep UI photos in sync with RHF File[]
   */
  useEffect(() => {
    setPhotos((previous) => {
      const existing = new Map(
        previous.map((photo) => [photo.file, photo])
      );

      const next: VehiclePhoto[] = files.map((file, index) => {
        const cached = existing.get(file);

        if (cached) {
          return {
            ...cached,
            isCover: index === 0,
          };
        }

        return {
          id: `photo-${idCounter.current++}`,
          file,
          preview: URL.createObjectURL(file),
          isCover: index === 0,
        };
      });

      // Cleanup removed previews
      previous.forEach((photo) => {
        if (!files.includes(photo.file)) {
          URL.revokeObjectURL(photo.preview);
        }
      });

      return next;
    });
  }, [files]);

  /**
   * Cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      photos.forEach((photo) =>
        URL.revokeObjectURL(photo.preview)
      );
    };
  }, [photos]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);

      const selected = Array.from(incoming);

      if (files.length + selected.length > MAX_FILES) {
        setError(`Maximum ${MAX_FILES} photos allowed.`);
        return;
      }

      const valid: File[] = [];

      for (const file of selected) {
        if (!file.type.startsWith("image/")) {
          setError(`${file.name} is not an image.`);
          continue;
        }

        if (file.size > MAX_SIZE) {
          setError(`${file.name} exceeds 10MB.`);
          continue;
        }

        valid.push(file);
      }

      setValue("photos", [...files, ...valid], {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [files, setValue]
  );

  const removePhoto = useCallback(
    (id: string) => {
      const remaining = photos
        .filter((photo) => photo.id !== id)
        .map((photo) => photo.file);

      setValue("photos", remaining, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [photos, setValue]
  );

  const reorderPhotos = useCallback(
    (activeId: string, overId: string) => {
      if (activeId === overId) return;

      const oldIndex = photos.findIndex((p) => p.id === activeId);
      const newIndex = photos.findIndex((p) => p.id === overId);

      if (oldIndex < 0 || newIndex < 0) return;

      const reordered = arrayMove(files, oldIndex, newIndex);

      setValue("photos", reordered, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [files, photos, setValue]
  );

  const clearPhotos = useCallback(() => {
    setValue("photos", [], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue]);

  return {
    photos,
    error,
    addFiles,
    removePhoto,
    reorderPhotos,
    clearPhotos,
    maxFiles: MAX_FILES,
  };
}