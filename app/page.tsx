import Hero from "./components/Hero";
import CarCard from "./components/CarCard";
import { cars } from "./data/cars";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Hero />

      {/* Featured Vehicles */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Featured Vehicles
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              image={car.image}
              title={`${car.make} ${car.model}`}
              details={`${car.year} • ${car.fuel} • ${car.transmission}`}
              price={`KSh ${car.price.toLocaleString()}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}