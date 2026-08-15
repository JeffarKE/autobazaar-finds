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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" value={name} onChange={setName} placeholder="Your name" />
        <Field label="Vehicle" value={vehicle} onChange={setVehicle} placeholder="e.g. Mazda CX-5" />
        <Field label="Budget" value={budget} onChange={setBudget} placeholder="e.g. KSh 2,000,000" />
        <Field label="Preferred year" value={year} onChange={setYear} placeholder="e.g. 2018 or newer" />
        <div className="sm:col-span-2">
          <Field label="Your location" value={location} onChange={setLocation} placeholder="e.g. Nairobi" />
        </div>
      </div>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
      >
        <MessageCircle className="h-5 w-5" />
        Ask us to find it
      </Link>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        You can edit the message before sending it on WhatsApp.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
      />
    </label>
  );
}
