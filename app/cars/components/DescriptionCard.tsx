import { FileText } from "lucide-react";

interface DescriptionCardProps {
  description: string;
}

export default function DescriptionCard({
  description,
}: DescriptionCardProps) {
  const hasBullets = description.includes("•");
  const bulletParts = hasBullets
    ? description.split("•").map((part) => part.trim()).filter(Boolean)
    : [];
  const hasIntro = hasBullets && !description.trimStart().startsWith("•");
  const firstPart = hasIntro ? bulletParts[0] : "";
  const headingHasOpenParenthesis =
    (firstPart.match(/\(/g)?.length ?? 0) > (firstPart.match(/\)/g)?.length ?? 0);
  const intro = headingHasOpenParenthesis && bulletParts[1]
    ? `${firstPart} • ${bulletParts[1]}`
    : firstPart;
  const bulletItems = hasIntro
    ? bulletParts.slice(headingHasOpenParenthesis ? 2 : 1)
    : bulletParts;
  const paragraphs = hasBullets
    ? []
    : description.split(/\n+/).map((part) => part.trim()).filter(Boolean);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Vehicle Description
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Listing information supplied by the owner and presented by Auto Bazaar Finds.
          </p>
        </div>
      </div>

      <div className="text-base leading-7 text-slate-700 dark:text-slate-300 sm:leading-8">
        {intro && <p className="mb-5 whitespace-pre-line">{intro}</p>}

        {bulletItems.length > 0 && (
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {bulletItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {paragraphs.map((paragraph, index) => (
          <p key={`${paragraph}-${index}`} className={index > 0 ? "mt-4" : undefined}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
