"use client";

import { ImagePlus, Upload, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadPhotos() {
  const images = [
    "/cars/prado.jpg",
    "/cars/cx5.jpg",
    "/cars/forester.jpg",
  ];

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
              Upload high-quality photos of the vehicle.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition hover:border-black hover:bg-gray-50">
          <Upload className="mb-4 h-12 w-12 text-gray-400" />

          <h3 className="text-xl font-semibold">
            Drag & Drop Images
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            or click here to browse
          </p>

          <div className="mt-5">
            <Button type="button">
              Choose Photos
            </Button>
          </div>

          <input
            type="file"
            multiple
            className="hidden"
          />
        </label>

        {/* Uploaded Photos */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Uploaded Photos
            </h3>

            <span className="text-sm text-gray-500">
              {images.length} Images
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-white"
              >
                <div className="relative">
                  <img
                    src={image}
                    alt="Vehicle"
                    className="h-52 w-full object-cover"
                  />

                  {index === 0 && (
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold">
                      <Star className="h-3 w-3 fill-black" />
                      Cover Photo
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Set as Cover
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}