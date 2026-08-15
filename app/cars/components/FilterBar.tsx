"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal, X } from "lucide-react";

type Props = {
  activeFilterCount: number;
  make: string; setMake: (value: string) => void; makeOptions: string[];
  model: string; setModel: (value: string) => void; modelOptions: string[];
  minPrice: string; setMinPrice: (value: string) => void;
  maxPrice: string; setMaxPrice: (value: string) => void;
  minYear: string; setMinYear: (value: string) => void;
  maxYear: string; setMaxYear: (value: string) => void; yearOptions: number[];
  fuel: string; setFuel: (value: string) => void; fuelOptions: string[];
  transmission: string; setTransmission: (value: string) => void; transmissionOptions: string[];
  bodyType: string; setBodyType: (value: string) => void; bodyTypeOptions: string[];
  location: string; setLocation: (value: string) => void; locationOptions: string[];
  clearFilters: () => void;
};

const priceOptions: Array<[string, string]> = [
  ["500000", "KSh 500K"], ["1000000", "KSh 1M"], ["1500000", "KSh 1.5M"],
  ["2000000", "KSh 2M"], ["3000000", "KSh 3M"], ["5000000", "KSh 5M"],
  ["10000000", "KSh 10M"],
];

const optionPairs = (values: string[]): Array<[string, string]> =>
  values.map((value) => [value, value]);

export default function FilterBar(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const selectClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-neutral-950 dark:text-white";

  const select = (label: string, value: string, onChange: (value: string) => void, options: Array<[string, string]>, disabled = false) => (
    <label className="space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <span className="relative block">
        <select aria-label={label} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className={`${selectClass} appearance-none pr-9 disabled:cursor-not-allowed disabled:opacity-50`}>
          <option value="">Any</option>
          {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </span>
    </label>
  );

  const fields = (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {select("Make", props.make, props.setMake, optionPairs(props.makeOptions))}
        {select("Model", props.model, props.setModel, optionPairs(props.modelOptions), !props.make)}
        {select("Minimum price", props.minPrice, props.setMinPrice, priceOptions)}
        {select("Maximum price", props.maxPrice, props.setMaxPrice, priceOptions)}
        {select("From year", props.minYear, props.setMinYear, optionPairs(props.yearOptions.map(String)))}
        {select("To year", props.maxYear, props.setMaxYear, optionPairs(props.yearOptions.map(String)))}
        {select("Transmission", props.transmission, props.setTransmission, optionPairs(props.transmissionOptions))}
        {select("Fuel", props.fuel, props.setFuel, optionPairs(props.fuelOptions))}
        {select("Body style", props.bodyType, props.setBodyType, optionPairs(props.bodyTypeOptions))}
        {select("Location", props.location, props.setLocation, optionPairs(props.locationOptions))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
        <p className="text-sm text-slate-500 dark:text-slate-400">Choose only what matters to you.</p>
        <button type="button" onClick={props.clearFilters} disabled={!props.activeFilterCount} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-white/10">
          <RotateCcw className="h-4 w-4" /> Clear all
        </button>
      </div>
    </>
  );

  return (
    <div>
      <button type="button" onClick={() => setMobileOpen(true)} className="flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 font-bold shadow-sm lg:hidden dark:border-white/10 dark:bg-neutral-900">
        <span className="inline-flex items-center gap-2"><SlidersHorizontal className="h-5 w-5" /> Filter cars</span>
        {props.activeFilterCount > 0 && <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-xs text-emerald-950">{props.activeFilterCount}</span>}
      </button>

      <div className="hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:block dark:border-white/10 dark:bg-neutral-900">{fields}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950 lg:hidden">
          <div className="flex items-center justify-between border-b px-4 py-4 dark:border-white/10">
            <div><p className="text-lg font-black">Filter cars</p><p className="text-xs text-slate-500">Narrow down the listings</p></div>
            <button type="button" aria-label="Close filters" onClick={() => setMobileOpen(false)} className="rounded-full border p-2 dark:border-white/10"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{fields}</div>
          <div className="border-t bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
            <button type="button" onClick={() => setMobileOpen(false)} className="h-12 w-full rounded-xl bg-emerald-500 font-black text-emerald-950">Show matching cars</button>
          </div>
        </div>
      )}
    </div>
  );
}
