import Image from "next/image";
import ActionBar from "../../components/ActionBar";
import { cars } from "../../data/cars";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetails({ params }: PageProps) {
  const { id } = await params;

  const car = cars.find((car) => car.id === id);

  if (!car) {
    return <h1 className="text-center mt-20">Car not found.</h1>;
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed on Auto Baazar Finds. Is it still available?`
  );

  const whatsappLink = `https://wa.me/${car.phone}?text=${whatsappMessage}`;

  return (
    <main className="max-w-5xl mx-auto p-8">

      {/* Main Vehicle Image */}
      <Image
        src={car.image}
        alt={`${car.make} ${car.model}`}
        width={1000}
        height={600}
        className="w-full rounded-xl object-cover"
        priority
      />


      {/* Image Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

        {car.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${car.make} ${car.model} image ${index + 1}`}
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
        ))}

      </section>


      <h1 className="text-4xl font-bold mt-8">
        {car.make} {car.model}
      </h1>


      <p className="text-gray-600 mt-2">
        {car.year} • {car.fuel} • {car.transmission}
      </p>


      <p className="text-3xl font-bold mt-6">
        KSh {car.price.toLocaleString()}
      </p>


      {/* Professional Action Bar */}
      <ActionBar
        whatsappLink={whatsappLink}
        phone={car.phone}
        carId={car.id}
      />


      {/* Vehicle Specifications */}
      <section className="mt-10 bg-white rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-5">
          Vehicle Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <p>
            <strong>Engine:</strong> {car.engine}
          </p>

          <p>
            <strong>Mileage:</strong> {car.mileage}
          </p>

          <p>
            <strong>Body Type:</strong> {car.bodyType}
          </p>

          <p>
            <strong>Drive Type:</strong> {car.driveType}
          </p>

          <p>
            <strong>Condition:</strong> {car.condition}
          </p>

          <p>
            <strong>Location:</strong> {car.location}
          </p>

        </div>

      </section>


      {/* Description */}
      <section className="mt-8 bg-white rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-3">
          Description
        </h2>

        <p className="text-gray-700">
          {car.description}
        </p>

      </section>


    </main>
  );
}