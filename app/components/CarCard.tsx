import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/cars/${id}`}>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">

        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-60 object-cover"
        />


        <div className="p-5">

          <h3 className="text-2xl font-bold">
            {title}
          </h3>


          <p className="text-gray-600 mt-2">
            {details}
          </p>


          <p className="text-2xl font-bold mt-4">
            {price}
          </p>


          <div className="mt-5 w-full bg-black text-white py-3 rounded-lg text-center">
            View Details
          </div>

        </div>

      </div>

    </Link>
  );
}