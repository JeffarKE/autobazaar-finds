"use client";

import type {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
} from "react";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Star, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { uploadVehicleImage } from "@/lib/imageUpload";
import type { Vehicle, VehicleImage } from "@/lib/vehicle";

type Props = {
  vehicle: Vehicle;
  setVehicleAction: Dispatch<SetStateAction<Vehicle>>;
};

const MAX_IMAGES = 12;

export default function UploadPhotos({
  vehicle,
  setVehicleAction,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      setMessage(
        "Choose image files in JPG, PNG, WebP, HEIC, or HEIF format."
      );
      return;
    }

    const availableSlots = MAX_IMAGES - vehicle.images.length;

    const selectedFiles = files.slice(
      0,
      Math.max(availableSlots, 0)
    );

    if (selectedFiles.length === 0) {
      setMessage(`You can upload up to ${MAX_IMAGES} photos.`);
      return;
    }

    setIsUploading(true);
    setMessage("");

    const uploadedImages: VehicleImage[] = [];

    try {
      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];

        setMessage(
          `Uploading photo ${index + 1} of ${selectedFiles.length}...`
        );

        const localPreviewUrl = URL.createObjectURL(file);

        try {
          const uploaded = await uploadVehicleImage(file);

          uploadedImages.push({
            publicUrl: uploaded.publicUrl,
            storagePath: uploaded.storagePath,
            isCover:
              vehicle.images.length === 0 &&
              uploadedImages.length === 0,
          });

          URL.revokeObjectURL(localPreviewUrl);
        } catch (error) {
          URL.revokeObjectURL(localPreviewUrl);

          throw new Error(
            error instanceof Error
              ? error.message
              : "Photo upload failed."
          );
        }
      }

      setVehicleAction((current) => ({
        ...current,
        images: [...current.images, ...uploadedImages],
      }));

      setMessage(
        files.length > selectedFiles.length
          ? `Uploaded ${uploadedImages.length} photo(s). The maximum is ${MAX_IMAGES}.`
          : `${uploadedImages.length} photo(s) uploaded successfully.`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload the selected photos."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      void addFiles(event.target.files);
    }

    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    void addFiles(event.dataTransfer.files);
  }

  function setCover(index: number) {
    setVehicleAction((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) => ({
        ...image,
        isCover: imageIndex === index,
      })),
    }));
  }

  function removeImage(index: number) {
    setVehicleAction((current) => {
      const removedImage = current.images[index];

      if (
        removedImage?.file &&
        removedImage.publicUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(removedImage.publicUrl);
      }

      const remaining = current.images.filter(
        (_, imageIndex) => imageIndex !== index
      );

      return {
        ...current,
        images: remaining.map((item, imageIndex) => ({
          ...item,
          isCover:
            item.isCover ||
            (imageIndex === 0 &&
              !remaining.some((entry) => entry.isCover)),
        })),
      };
    });

    setMessage(
      "Photo removed from this listing. Save Changes to apply the removal."
    );
  }

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="space-y-8 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gray-100 p-3">
            <ImagePlus className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Vehicle Photos
            </h2>

            <p className="text-gray-500">
              Add up to {MAX_IMAGES} clear photos. The cover photo
              appears first. Save Changes after editing photos.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={(event) => {
            event.preventDefault();

            if (!isUploading) {
              setIsDragging(true);
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            isDragging
              ? "border-black bg-gray-50"
              : "border-gray-300 hover:border-black hover:bg-gray-50"
          } ${
            isUploading
              ? "cursor-not-allowed opacity-70"
              : ""
          }`}
        >
          {isUploading ? (
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-gray-400" />
          ) : (
            <Upload className="mb-4 h-12 w-12 text-gray-400" />
          )}

          <h3 className="text-xl font-semibold">
            {isUploading
              ? "Uploading photos..."
              : "Drag and drop vehicle photos"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {isUploading
              ? "Please wait while the photos are uploaded."
              : "or select them from your device"}
          </p>

          <Button
            type="button"
            className="mt-5"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? "Uploading..." : "Choose photos"}
          </Button>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            className="hidden"
            onChange={handleInputChange}
            disabled={isUploading}
          />
        </div>

        {/* Upload Message */}
        {message && (
          <p
            className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600"
            role="status"
          >
            {message}
          </p>
        )}

        {/* Uploaded Photos */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Uploaded Photos
            </h3>

            <span className="text-sm text-gray-500">
              {vehicle.images.length} / {MAX_IMAGES}
            </span>
          </div>

          {vehicle.images.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-500">
              Your uploaded photos will appear here.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vehicle.images.map((image, index) => (
                <article
                  key={`${image.storagePath}-${index}`}
                  className="overflow-hidden rounded-2xl border bg-white"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <img
                      src={image.publicUrl}
                      alt={`Vehicle photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {image.isCover && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950">
                        <Star className="h-3 w-3 fill-current" />
                        Cover photo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 p-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={image.isCover}
                      onClick={() => setCover(index)}
                    >
                      {image.isCover
                        ? "Cover photo"
                        : "Set as cover"}
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      aria-label={`Remove vehicle photo ${
                        index + 1
                      }`}
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}