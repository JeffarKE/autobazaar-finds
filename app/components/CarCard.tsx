type CarCardProps = {
  image: string;
  title: string;
  details: string;
  price: string;
};

export default function CarCard({
  image,
  title,
  details,
  price,
}: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full"
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

        <button className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          View Details
        </button>
      </div>
    </div>
  );
}