import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export default function CategoryCard({
  title,
  description,
  href,
  icon,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-muted p-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {icon}
            </div>

            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}