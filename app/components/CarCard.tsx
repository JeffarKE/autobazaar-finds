import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CarCardProps = {
  id: string;
  image: string;
  title: string;
  details: string;
  price: string;
};

export default function CarCard({
  id,
  image,
  title,
  details,
  price,
}: CarCardProps) {
  return (
    <Link href={`/cars/${id}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {details}
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-2xl font-extrabold text-green-600">
              {price}
            </span>

            <span className="flex items-center gap-2 font-semibold text-gray-900 transition group-hover:text-green-600">
              View Details
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}