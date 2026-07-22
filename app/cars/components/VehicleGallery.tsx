"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

export default function VehicleGallery({
  images,
  title,
}: VehicleGalleryProps) {
  const gallery =
    images.length > 0
      ? images
      : ["/images/placeholder-car.jpg"];

  const [selectedImage, setSelectedImage] = useState(0);

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-5">
      {/* Hero Image */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="relative aspect-[16/10]">
          {gallery[selectedImage] ? (
            <Image
              src={gallery[selectedImage]}
              alt={title}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageOff className="h-16 w-16 text-slate-400" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* Image Counter */}
          <div className="absolute bottom-5 right-5 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            {selectedImage + 1} / {gallery.length}
          </div>

          {/* Previous */}
          {gallery.length > 1 && (
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110 dark:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {gallery.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110 dark:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-2xl border transition-all ${
                selectedImage === index
                  ? "border-green-600 ring-2 ring-green-500"
                  : "border-slate-200 hover:border-green-400 dark:border-neutral-700"
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}