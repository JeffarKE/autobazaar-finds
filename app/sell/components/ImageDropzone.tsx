"use client";

import { DragEvent, KeyboardEvent, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

interface ImageDropzoneProps {
  onFilesSelected: (files: FileList | File[]) => void;
  maxFiles?: number;
}

export default function ImageDropzone({
  onFilesSelected,
  maxFiles = 20,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Prevent drag flickering when dragging over child elements
  const dragCounter = useRef(0);

  const [dragging, setDragging] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    onFilesSelected(files);

    // Allows selecting the same image again after deleting it
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current += 1;
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    dragCounter.current -= 1;

    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    dragCounter.current = 0;
    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFilePicker();
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          dragging
            ? "scale-[1.02] border-green-600 bg-green-50 shadow-lg dark:bg-green-950/30"
            : "border-gray-300 hover:border-green-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
        }`}
      >
        <ImagePlus
          className={`mx-auto mb-4 h-14 w-14 transition-transform duration-300 ${
            dragging ? "scale-110 text-green-600" : "text-green-600"
          }`}
        />

        <h3 className="text-xl font-semibold">
          Drag &amp; Drop Vehicle Photos
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          or click anywhere in this area to browse your computer
        </p>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          JPG • PNG • WEBP • Up to {maxFiles} photos • Max 10MB each
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );
}