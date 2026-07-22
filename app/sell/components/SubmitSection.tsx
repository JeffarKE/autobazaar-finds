"use client";

import { Loader2, Save, Send, ShieldCheck } from "lucide-react";

interface SubmitSectionProps {
  isSubmitting: boolean;
}

export default function SubmitSection({
  isSubmitting,
}: SubmitSectionProps) {
  return (
    <section className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-white p-8 shadow-sm">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <ShieldCheck className="h-8 w-8 text-green-700" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Publish?
            </h2>

            <p className="mt-1 text-gray-600">
              Review your information before saving or publishing this listing.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-green-200 bg-white p-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              disabled={isSubmitting}
              className="mt-1 h-5 w-5 accent-green-700 disabled:cursor-not-allowed"
            />

            <span className="text-sm leading-relaxed text-gray-700">
              I confirm that I own or have permission to advertise this vehicle
              and that all information provided is accurate.
            </span>
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            disabled={isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-500 disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Publish Vehicle
              </>
            )}
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-green-100 p-4 text-sm text-green-800">
          <strong>Tip:</strong> Drafts let you save incomplete listings and
          continue editing them later.
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Average review time after publishing:{" "}
          <strong>Within 24 hours</strong>
        </p>
      </div>
    </section>
  );
}