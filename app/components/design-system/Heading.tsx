import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function Heading({
  title,
  subtitle,
  centered = false,
}: HeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}