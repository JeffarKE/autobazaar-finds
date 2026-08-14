"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export default function CarsError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <section className="max-w-lg rounded-3xl border bg-white p-10 text-center shadow-sm dark:bg-neutral-900">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-5 text-2xl font-bold">Vehicles are temporarily unavailable</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          We could not load the latest inventory. Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </section>
    </main>
  );
}
