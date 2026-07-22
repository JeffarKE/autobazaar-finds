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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_40%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-semibold text-green-400">
          PREMIUM VEHICLE BROKERAGE • KENYA
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          Find Your Next Car.
          <br />
          Sell Yours With Confidence.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
          Auto Bazaar Finds connects serious buyers with quality vehicles while
          helping sellers market their cars professionally. We only earn when
          your vehicle is successfully sold.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/cars"
            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold transition hover:bg-green-700"
          >
            Browse Vehicles
          </Link>

          <Link
            href={whatsappUrl}
            target="_blank"
            className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur transition hover:bg-white/20"
          >
            Sell Your Car
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-3xl font-black text-green-400">✓</h3>

            <p className="mt-3 text-lg font-semibold">
              Professionally Presented Listings
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-3xl font-black text-green-400">3%</h3>

            <p className="mt-3 text-lg font-semibold">
              Commission Only After a Successful Sale
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-3xl font-black text-green-400">24/7</h3>

            <p className="mt-3 text-lg font-semibold">
              Dedicated WhatsApp Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}