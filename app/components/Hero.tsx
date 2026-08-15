import Link from "next/link";
import { ArrowRight, Bike, CarFront, Plane, Sailboat, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#06110b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(52,211,153,0.22),transparent_38%),radial-gradient(circle_at_15%_90%,rgba(16,185,129,0.1),transparent_34%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-[0.14em] text-emerald-300">
          <Sparkles size={14} /> CARS FOR KENYAN ROADS
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-8xl">
          Your next ride,
          <br />
          <span className="text-emerald-400">found differently.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          Browse good cars, sell yours with less hassle, or let us find what you need.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href="/cars" className="rounded-2xl bg-emerald-400 px-7 py-4 text-lg font-black text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
            Explore cars <ArrowRight className="ml-2 inline" size={20} />
          </Link>
          <Link href="/sell" className="rounded-2xl border border-white/15 bg-white/[0.06] px-7 py-4 text-lg font-bold transition hover:-translate-y-0.5 hover:bg-white/10">Sell your car</Link>
          <Link href="/source" className="rounded-2xl border border-white/15 px-7 py-4 text-lg font-bold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/5">Find one for me</Link>
        </div>

        <div className="mt-14 flex w-full max-w-4xl items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.045] p-2 text-left backdrop-blur sm:justify-center">
          <Link href="/cars" className="flex min-w-max items-center gap-3 rounded-xl bg-white px-4 py-3 font-bold text-slate-950"><CarFront size={20} className="text-emerald-600" /> Cars</Link>
          {[{ icon: Bike, label: "Bikes" }, { icon: Sailboat, label: "Boats" }, { icon: Plane, label: "Planes" }].map(({ icon: Icon, label }) => (
            <span key={label} className="flex min-w-max items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-400"><Icon size={19} /> {label} <small className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider">Soon</small></span>
          ))}
        </div>
      </div>
    </section>
  );
}
