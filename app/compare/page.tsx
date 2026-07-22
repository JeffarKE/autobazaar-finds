"use client";

export default function ComparePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
          Compare Vehicles
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Vehicle Comparison
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          Compare up to three vehicles side-by-side to help you make the right
          buying decision.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <h2 className="text-2xl font-bold">
          No vehicles selected
        </h2>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Start browsing and add vehicles to compare.
        </p>
      </div>
    </main>
  );
}