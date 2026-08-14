import Link from "next/link";

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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_42%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-semibold text-green-400">
          VEHICLE BROKERAGE &amp; SOURCING · KENYA
        </span>

        <h1 className="mt-8 max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
          Find Your Next Car.
          <br />
          Sell Yours With Confidence.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          Curated vehicles. Professional selling. Personal sourcing.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/cars"
            className="rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-green-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-green-400"
          >
            Browse Vehicles
          </Link>

          <Link
            href={whatsappUrl}
            target="_blank"
            className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Sell Your Car
          </Link>

          <Link
            href="/source"
            className="rounded-xl border border-green-400/40 px-8 py-4 text-lg font-semibold text-green-300 transition duration-200 hover:-translate-y-0.5 hover:bg-green-400/10"
          >
            Source a Car
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h3 className="text-3xl font-black text-green-400">✓</h3>

            <p className="mt-3 text-lg font-semibold">
              Professionally Presented Listings
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h3 className="text-3xl font-black text-green-400">3%</h3>

            <p className="mt-3 text-lg font-semibold">
              Commission Only After a Successful Sale
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h3 className="text-3xl font-black text-green-400">Direct</h3>

            <p className="mt-3 text-lg font-semibold">
              Personal WhatsApp Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
