"use client";

import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function FormSection({
  title,
  description,
  icon,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-8 flex items-start gap-4">
        {icon && (
          <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {icon}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}