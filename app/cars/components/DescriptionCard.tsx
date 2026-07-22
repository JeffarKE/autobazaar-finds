import { FileText } from "lucide-react";

interface DescriptionCardProps {
  description: string;
}

export default function DescriptionCard({
  description,
}: DescriptionCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Vehicle Description
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Details provided by the seller.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="leading-8 text-slate-700 dark:text-slate-300">
          {description}
        </p>
      </div>
    </section>
  );
}