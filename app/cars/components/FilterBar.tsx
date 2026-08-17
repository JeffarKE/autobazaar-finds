"use client";

import { useEffect, useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import type { SortOption } from "../hooks/useCarFilters";

type Props = {
  search: string; setSearch: (value: string) => void;
  sortBy: SortOption; setSortBy: (value: SortOption) => void;
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
  const [open, setOpen] = useState(false);
  const selectClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-neutral-950 dark:text-white";

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const shouldLockScroll = window.matchMedia("(max-width: 1023px)").matches;
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      if (shouldLockScroll) document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

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
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-neutral-900 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem_auto]">
        <SearchBar value={props.search} onChange={props.setSearch} />
        <SortDropdown value={props.sortBy} onChange={props.setSortBy} />
        <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="desktop-filter-panel mobile-filter-panel" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {props.activeFilterCount > 0 && <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-xs text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300">{props.activeFilterCount}</span>}
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && <div id="desktop-filter-panel" className="mt-4 hidden border-t border-slate-200 pt-5 lg:block dark:border-white/10">{fields}</div>}

      {open && (
        <div id="mobile-filter-panel" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950 lg:hidden">
          <div className="flex items-center justify-between border-b px-4 py-4 dark:border-white/10">
            <div><p id="mobile-filter-title" className="text-lg font-black">Filter cars</p><p className="text-xs text-slate-500">Narrow down the listings</p></div>
            <button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="rounded-full border p-2 dark:border-white/10"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{fields}</div>
          <div className="border-t bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
            <button type="button" onClick={() => setOpen(false)} className="h-12 w-full rounded-xl bg-emerald-500 font-black text-emerald-950">Show matching cars</button>
          </div>
        </div>
      )}
    </div>
  );
}
