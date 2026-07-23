"use client";

import {
  Save,
  Eye,
  Send,
  Trash2,
} from "lucide-react";

export default function PublishBar() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Publish Listing
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Save your progress or publish the vehicle when you're ready.
      </p>

      <div className="mt-8 space-y-3">

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
          <Save className="h-5 w-5" />
          Save Draft
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
          <Eye className="h-5 w-5" />
          Preview Listing
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-800">
          <Send className="h-5 w-5" />
          Publish Vehicle
        </button>

      </div>

      <div className="mt-8 border-t pt-6">

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-red-600 transition hover:bg-red-50">
          <Trash2 className="h-5 w-5" />
          Delete Listing
        </button>

      </div>

    </section>
  );
}