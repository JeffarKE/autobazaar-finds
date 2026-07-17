import { Camera, Upload, ImagePlus, CheckCircle2 } from "lucide-react";

export default function VehiclePhotos() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <Camera className="mt-1 h-7 w-7 text-green-700" />

        <div>
          <h2 className="text-2xl font-bold">Vehicle Photos</h2>

          <p className="mt-1 text-sm text-gray-500">
            High-quality photos help your vehicle sell faster and attract more
            serious buyers.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50/40 p-10 text-center transition hover:border-green-500 hover:bg-green-50">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Upload className="h-8 w-8 text-green-700" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Drag & drop your vehicle photos here
        </h3>

        <p className="mt-2 text-gray-600">
          or click below to browse your device.
        </p>

        <button
          type="button"
          className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
        >
          <span className="inline-flex items-center gap-2">
            <ImagePlus className="h-5 w-5" />
            Choose Photos
          </span>
        </button>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
        />

        <p className="mt-5 text-sm text-gray-500">
          Upload up to <strong>20 images</strong> (JPEG, PNG or WEBP).
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h4 className="mb-4 font-semibold text-gray-900">
            Recommended Photos
          </h4>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Front ¾ View
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Rear ¾ View
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Interior
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Dashboard & Infotainment
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Engine Bay
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Wheels & Tyres
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h4 className="font-semibold text-green-800">
            Pro Tip
          </h4>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Listings with 10 or more clear photos usually receive significantly
            more enquiries than listings with only a few images. Photograph the
            car in daylight, keep it clean, and avoid heavy filters.
          </p>
        </div>
      </div>
    </section>
  );
}