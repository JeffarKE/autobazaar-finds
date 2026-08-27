"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize2,
  Minus,
  Plus,
  X,
} from "lucide-react";

interface VehicleGalleryProps {
  images: string[];
  title: string;
  children?: ReactNode;
}

export default function VehicleGallery({
  images,
  title,
  children,
}: VehicleGalleryProps) {
  const gallery =
    images.length > 0
      ? images
      : ["/cars/forester.jpg"];

  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const previousImage = useCallback(() => {
    setZoom(1);
    setSelectedImage((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  }, [gallery.length]);

  const nextImage = useCallback(() => {
    setZoom(1);
    setSelectedImage((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  }, [gallery.length]);

  const selectImage = useCallback((index: number) => {
    setZoom(1);
    setSelectedImage(index);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    setZoom(1);
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "+" || event.key === "=") {
        setZoom((current) => Math.min(3, current + 0.5));
      }
      if (event.key === "-") {
        setZoom((current) => Math.max(1, current - 0.5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeViewer, isViewerOpen, nextImage, previousImage]);

  const viewer = isViewerOpen
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} full-screen photo viewer`}
          className="fixed inset-0 z-[100] bg-black text-white"
        >
          <div className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-3 bg-gradient-to-b from-black/90 to-transparent px-3 sm:h-20 sm:px-6">
            <div aria-live="polite" className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">
                {title}
              </p>
              <p className="text-xs text-white/70 sm:text-sm">
                Photo {selectedImage + 1} of {gallery.length}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center rounded-full bg-white/10 p-1 backdrop-blur">
                <button
                  type="button"
                  aria-label="Zoom out"
                  disabled={zoom === 1}
                  onClick={() =>
                    setZoom((current) => Math.max(1, current - 0.5))
                  }
                  className="rounded-full p-2 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Reset zoom"
                  onClick={() => setZoom(1)}
                  className="min-w-12 rounded-full px-2 py-2 text-xs font-bold transition hover:bg-white/15"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  aria-label="Zoom in"
                  disabled={zoom === 3}
                  onClick={() =>
                    setZoom((current) => Math.min(3, current + 0.5))
                  }
                  className="rounded-full p-2 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close full-screen photo viewer"
                onClick={closeViewer}
                className="rounded-full bg-white/10 p-3 backdrop-blur transition hover:bg-white/20"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-24 top-16 overflow-auto overscroll-contain sm:bottom-28 sm:top-20"
            onDoubleClick={() => setZoom((current) => (current === 1 ? 2 : 1))}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              touchStartX.current = null;
              if (zoom > 1 || startX === null) return;
              const endX = event.changedTouches[0]?.clientX;
              if (endX === undefined) return;

              const distance = endX - startX;
              if (distance > 55) previousImage();
              if (distance < -55) nextImage();
            }}
          >
            <div
              className="relative mx-auto min-h-full min-w-full cursor-zoom-in"
              style={{
                height: `${zoom * 100}%`,
                width: `${zoom * 100}%`,
              }}
            >
              <Image
                src={gallery[selectedImage]}
                alt={`${title} photo ${selectedImage + 1} of ${gallery.length}`}
                fill
                priority
                sizes="100vw"
                className="select-none object-contain"
                draggable={false}
              />
            </div>
          </div>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Show previous full-screen photo"
                onClick={previousImage}
                className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/55 p-3 shadow-xl backdrop-blur transition hover:bg-black/80 sm:left-5 sm:p-4"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              <button
                type="button"
                aria-label="Show next full-screen photo"
                onClick={nextImage}
                className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/55 p-3 shadow-xl backdrop-blur transition hover:bg-black/80 sm:right-5 sm:p-4"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent px-3 pb-3 pt-5 sm:px-6 sm:pb-5">
            <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1 sm:gap-3">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  aria-label={`Open full-screen photo ${index + 1} of ${gallery.length}`}
                  aria-current={selectedImage === index ? "true" : undefined}
                  onClick={() => selectImage(index)}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 sm:rounded-xl ${
                    selectedImage === index
                      ? "border-green-500 opacity-100"
                      : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="space-y-4">
      {/* Hero Image */}
      <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-neutral-900 sm:rounded-3xl">
        <div className="relative aspect-[16/10]">
          {gallery[selectedImage] ? (
            <button
              type="button"
              aria-label="Open full-screen photo viewer"
              onClick={() => setIsViewerOpen(true)}
              className="absolute inset-0 cursor-zoom-in"
            >
              <Image
                src={gallery[selectedImage]}
                alt={`${title} main vehicle photo`}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-xs font-semibold text-white opacity-100 backdrop-blur transition sm:opacity-0 sm:group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
                View full screen
              </span>
            </button>
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageOff className="h-16 w-16 text-slate-400" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Image Counter */}
          <div aria-live="polite" className="absolute bottom-5 right-5 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur lg:bottom-auto lg:top-5">
            {selectedImage + 1} / {gallery.length}
          </div>

          {/* Previous */}
          {gallery.length > 1 && (
            <button
              type="button"
              aria-label="Show previous vehicle photo"
              onClick={previousImage}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110 dark:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {gallery.length > 1 && (
            <button
              type="button"
              aria-label="Show next vehicle photo"
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110 dark:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {children}

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-4">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show photo ${index + 1} of ${gallery.length}`}
              onClick={() => selectImage(index)}
              className={`relative overflow-hidden rounded-xl border transition-all sm:rounded-2xl ${
                selectedImage === index
                  ? "border-green-600 ring-2 ring-green-500"
                  : "border-slate-200 hover:border-green-400 dark:border-neutral-700"
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 25vw, 140px"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
      {viewer}
    </div>
  );
}
