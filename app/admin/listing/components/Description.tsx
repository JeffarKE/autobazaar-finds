"use client";

import { FileText, Sparkles, RotateCcw } from "lucide-react";

const templates = [
  "Accident Free",
  "Buy & Drive",
  "Full Service History",
  "Original Paint",
  "Low Mileage",
  "Very Clean Interior",
  "Well Maintained",
  "One Owner",
];

export default function Description() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Vehicle Description
          </h2>

          <p className="text-gray-500">
            Describe the vehicle and highlight its best features.
          </p>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Quick Templates
          </h3>

          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-gray-100">
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {templates.map((template) => (
            <button
              key={template}
              className="rounded-full border px-4 py-2 text-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              + {template}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <label className="mb-3 block text-sm font-semibold text-gray-700">
          Listing Description
        </label>

        <textarea
          rows={12}
          placeholder="Describe the vehicle, its condition, service history, ownership, features and any additional information buyers should know..."
          className="w-full resize-none rounded-2xl border bg-gray-50 p-5 outline-none transition focus:border-black focus:bg-white"
        />

        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span>0 / 2,000 characters</span>

          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-gray-100">
            <Sparkles className="h-4 w-4" />
            AI Writer (Coming Soon)
          </button>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-8 rounded-2xl bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900">
          Tips for Better Listings
        </h3>

        <ul className="mt-4 space-y-3 text-sm text-gray-600">
          <li>• Mention service history.</li>
          <li>• Highlight accident-free status.</li>
          <li>• Include any upgrades or accessories.</li>
          <li>• Mention ownership history if known.</li>
          <li>• State if financing or trade-ins are available.</li>
        </ul>
      </div>
    </section>
  );
}