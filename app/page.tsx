import Hero from "./components/Hero";
import Link from "next/link";
import VehicleCard from "./cars/components/VehicleCard";
import { getPublicVehicles } from "./cars/services/getPublicVehicles";

export const dynamic = "force-dynamic";

const whatsappMessage = encodeURIComponent(`Hi Auto Bazaar Finds,

I'd like to sell my vehicle.

Name:
Phone:
Location:

Vehicle Make:
Model:
Year:
Mileage:
Engine:
Transmission:
Fuel Type:
Colour:
Asking Price:

I'll send the photos next.
`);

const whatsappUrl = `https://wa.me/254741056053?text=${whatsappMessage}`;

export default async function Home() {
  const vehicles = await getPublicVehicles();
  const featuredVehicles = vehicles.filter((vehicle) => vehicle.featured);
  const displayedVehicles = (featuredVehicles.length > 0
    ? featuredVehicles
    : vehicles
  ).slice(0, 4);
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />

      {/* Featured Vehicles */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-9 flex items-center justify-between sm:mb-12">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-600">
              Featured Listings
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              Hand Picked Vehicles
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Browse a selection of our featured vehicles. Explore our full
              inventory to discover even more options.
            </p>
          </div>

          <Link
            href="/cars"
            className="hidden rounded-lg border px-5 py-3 font-semibold transition hover:bg-slate-100 md:block"
          >
            Browse All →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {displayedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {displayedVehicles.length === 0 && (
          <div className="rounded-3xl border border-dashed bg-white px-6 py-12 text-center text-slate-600">
            New vehicles will appear here as soon as they are published.
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/cars"
            className="inline-flex rounded-lg border px-6 py-3 font-semibold transition hover:bg-slate-100"
          >
            Browse All Vehicles →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-green-600">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Auto Bazaar Finds
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border bg-slate-50 p-8">
              <div className="text-5xl">🚗</div>

              <h3 className="mt-6 text-2xl font-bold">
                Quality Listings
              </h3>

              <p className="mt-4 text-slate-600">
                Every vehicle is professionally presented with accurate
                information and quality images.
              </p>
            </div>

            <div className="rounded-3xl border bg-slate-50 p-8">
              <div className="text-5xl">💬</div>

              <h3 className="mt-6 text-2xl font-bold">
                Direct Communication
              </h3>

              <p className="mt-4 text-slate-600">
                Contact us instantly through WhatsApp for quick responses and
                personalized assistance.
              </p>
            </div>

            <div className="rounded-3xl border bg-slate-50 p-8">
              <div className="text-5xl">🤝</div>

              <h3 className="mt-6 text-2xl font-bold">
                Trusted Support
              </h3>

              <p className="mt-4 text-slate-600">
                Whether buying or selling, we&apos;re here to guide you throughout
                the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Banner */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl rounded-[32px] bg-green-600 px-5 py-12 text-center text-white shadow-xl sm:px-8 sm:py-16">
          <p className="font-semibold uppercase tracking-widest text-green-100">
            SELL YOUR CAR
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            Ready to Sell Your Vehicle?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base text-green-100 sm:text-xl">
            No upfront listing fee. We professionally market your vehicle and
            only earn a 3% commission after a successful sale.
          </p>

          <Link
            href={whatsappUrl}
            target="_blank"
            className="mt-10 inline-flex rounded-xl bg-white px-6 py-4 text-base font-bold text-green-700 transition hover:scale-105 sm:px-10 sm:text-lg"
          >
            🚗 Start Selling Your Car
          </Link>
        </div>
      </section>
    </main>
  );
}
