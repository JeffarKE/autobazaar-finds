export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-6 py-10">
      <div className="mb-10 h-12 w-80 rounded-xl bg-slate-200 dark:bg-neutral-800" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="aspect-[4/3] bg-slate-200 dark:bg-neutral-800" />

            <div className="space-y-4 p-5">
              <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-neutral-800" />

              <div className="h-8 w-1/2 rounded bg-slate-200 dark:bg-neutral-800" />

              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 rounded bg-slate-200 dark:bg-neutral-800"
                  />
                ))}
              </div>

              <div className="h-12 rounded-xl bg-slate-200 dark:bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}