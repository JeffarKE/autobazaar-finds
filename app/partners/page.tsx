import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Banknote, Radio, Share2, UserRoundCheck } from "lucide-react";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description: "Earn KSh 10,000 when a buyer or seller you refer completes a successful vehicle deal with Auto Bazaar Finds.",
};

const referralMessage = encodeURIComponent(
  "Hi Auto Bazaar Finds, I know someone who wants to buy or sell a car. How can I make the introduction?"
);

const steps = [
  { icon: UserRoundCheck, title: "Make the introduction", copy: "Connect us with someone who genuinely wants to buy or sell a car." },
  { icon: BadgeCheck, title: "We take it from there", copy: "We follow up, advertise or find the car, and help complete the deal." },
  { icon: Banknote, title: "Earn KSh 10,000", copy: "We pay you after the person you referred completes the deal with us." },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f5] px-4 py-14 dark:bg-[#07110c] sm:px-6 sm:py-20">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[#08150e] text-white shadow-2xl shadow-emerald-950/15">
        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-300"><Share2 size={16} /> Auto Bazaar Network</span>
            <h1 className="mt-7 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Know someone buying or selling?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Make the introduction. If their vehicle deal is completed through Auto Bazaar Finds, you earn <strong className="text-white">KSh 10,000</strong>.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`https://wa.me/254741056053?text=${referralMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 font-black text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-300">Send referral on WhatsApp <ArrowRight size={19} /></Link>
              <Link href={contact.whatsappChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"><Radio size={19} /> Daily drops</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><Icon /></div>
            <h2 className="mt-5 text-xl font-black">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500 dark:text-slate-400">The KSh 10,000 is paid once a referred deal is completed. The lead must be new, genuine and introduced to us before the deal starts.</p>
    </main>
  );
}
