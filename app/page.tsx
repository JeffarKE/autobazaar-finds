import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, ScanSearch } from "lucide-react";
import Hero from "./components/Hero";
import VehicleCard from "./cars/components/VehicleCard";
import { getPublicVehicles } from "./cars/services/getPublicVehicles";

export const dynamic = "force-dynamic";

const benefits = [
  { icon: ScanSearch, title: "Worth your scroll", copy: "Clear details, quality photos and vehicles selected to make browsing feel effortless." },
  { icon: MessageCircle, title: "Human, not complicated", copy: "Ask a question on WhatsApp and speak directly with someone who knows the listing." },
  { icon: BadgeCheck, title: "Support through the deal", copy: "Whether you are buying, selling or sourcing, we stay involved from interest to handover." },
];

export default async function Home() {
  const vehicles = await getPublicVehicles();
  const featured = vehicles.filter((vehicle) => vehicle.featured);
  const displayed = (featured.length ? featured : vehicles).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f4f7f5] dark:bg-[#07110c]">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Fresh on the market</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">Vehicles worth a closer look.</h2>
          </div>
          <Link href="/cars" className="hidden items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5 md:flex">See everything <ArrowRight size={17} /></Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayed.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
        </div>
        {displayed.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">Fresh vehicles are being prepared. Check back shortly.</div>}
        <Link href="/cars" className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold dark:border-white/10 dark:bg-white/5 md:hidden">Browse all cars <ArrowRight size={18} /></Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-10">
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl bg-slate-50 p-7 dark:bg-black/20">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><Icon /></div>
                <h3 className="mt-5 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 sm:pb-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-emerald-400 px-6 py-12 text-emerald-950 shadow-xl shadow-emerald-950/10 sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[50px] border-emerald-300/60" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em]">Your car could be next</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-6xl">We make selling feel lighter.</h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-emerald-950/75">Send the details once. We help present the vehicle, handle interest and support you through a successful sale.</p>
            <Link href="/sell" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-950 px-6 py-4 font-black text-white transition hover:-translate-y-0.5">Start your listing <ArrowRight size={19} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
