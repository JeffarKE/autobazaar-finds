import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarCard from "./components/CarCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <Hero />

      {/* Featured Vehicles */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <CarCard
            image="https://placehold.co/400x250"
            title="Toyota Land Cruiser Prado"
            details="2018 • Diesel • Automatic"
            price="KSh 4,850,000"
          />

          <CarCard
            image="https://placehold.co/400x250"
            title="BMW X5 M Sport"
            details="2019 • Diesel • Automatic"
            price="KSh 8,999,999"
          />

          <CarCard
            image="https://placehold.co/400x250"
            title="Subaru Forester SG5"
            details="Manual • Turbo • AWD"
            price="KSh 1,600,000"
          />

        </div>
      </section>
    </main>
  );
}