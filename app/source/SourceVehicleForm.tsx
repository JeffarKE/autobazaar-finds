"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function SourceVehicleForm() {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [budget, setBudget] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");

  const whatsappUrl = useMemo(() => {
    const details = [
      vehicle && `I'm looking for a ${vehicle}`,
      budget && `My budget is ${budget}`,
      year && `I'd prefer ${year}`,
      location && `I'm in ${location}`,
    ].filter(Boolean).join(". ");

    const introduction = name ? `I'm ${name}` : "I'm looking to buy a car";
    const message = `Hi Auto Bazaar Finds, ${introduction}. ${details || "Please help me find a good vehicle"}. Kindly let me know what you have.`;

    return `https://wa.me/254741056053?text=${encodeURIComponent(message)}`;
  }, [budget, location, name, vehicle, year]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:shadow-black/20 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" value={name} onChange={setName} placeholder="Your name" />
        <Field label="Vehicle" name="vehicle" value={vehicle} onChange={setVehicle} placeholder="e.g. Mazda CX-5" />
        <Field label="Budget" name="budget" inputMode="numeric" value={budget} onChange={setBudget} placeholder="e.g. KSh 2,000,000" />
        <Field label="Preferred year" name="year" inputMode="numeric" value={year} onChange={setYear} placeholder="e.g. 2018 or newer" />
        <div className="sm:col-span-2">
          <Field label="Your location" name="location" autoComplete="address-level2" value={location} onChange={setLocation} placeholder="e.g. Nairobi" />
        </div>
      </div>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
      >
        <MessageCircle className="h-5 w-5" />
        Ask us on WhatsApp
      </Link>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
        You can edit the message before sending it on WhatsApp.
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</span>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={80}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 caret-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:caret-white dark:placeholder:text-slate-500 dark:focus:border-emerald-400 dark:focus:bg-neutral-950 dark:focus:ring-emerald-900/40"
      />
    </label>
  );
}
