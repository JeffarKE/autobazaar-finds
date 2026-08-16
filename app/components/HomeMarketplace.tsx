"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, MessageCircle, Search } from "lucide-react";
import FilterBar from "../cars/components/FilterBar";
import VehicleCard from "../cars/components/VehicleCard";
import { useCarFilters } from "../cars/hooks/useCarFilters";
import type { Vehicle } from "../cars/types";
import { trackListingEvent } from "../cars/analytics";
import { getWhatsAppListingMessage } from "../cars/listingLinks";

type Props = { vehicles: Vehicle[] };

const WA_NUMBER = "254741056053";

export default function HomeMarketplace({ vehicles }: Props) {
  const featured = useMemo(() => {
    const selected = vehicles.filter((vehicle) => vehicle.featured);
    return selected.length ? selected : vehicles.slice(0, 6);
  }, [vehicles]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % featured.length), 6500);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const {
    filteredCars, search, setSearch, activeFilterCount, make, setMake, makeOptions,
    model, setModel, modelOptions, minPrice, setMinPrice, maxPrice, setMaxPrice,
    minYear, setMinYear, maxYear, setMaxYear, yearOptions, fuel, setFuel, fuelOptions,
    transmission, setTransmission, transmissionOptions, bodyType, setBodyType,
    bodyTypeOptions, location, setLocation, locationOptions, sortBy, setSortBy, clearFilters,
  } = useCarFilters(vehicles);

  const vehicle = featured[active];
  const images = vehicle?.images.length ? vehicle.images : ["/cars/forester.jpg"];
  const photo = (index: number) => images[index % images.length];
  const move = (direction: number) => setActive((current) => (current + direction + featured.length) % featured.length);

  if (!vehicle) {
    return <div className="mx-auto max-w-[1360px] px-4 py-16 text-center sm:px-6">Fresh listings are being prepared.</div>;
  }

  const whatsapp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(getWhatsAppListingMessage(vehicle))}`;

  return (
    <>
      <section className="bg-[#111311] text-white">
        <div className="mx-auto max-w-[1360px] pb-5 pt-4 sm:pb-7 sm:pt-6">
          <label className="relative mx-4 mb-4 block lg:hidden">
            <span className="sr-only">Search listings</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Toyota, Subaru, SUV..." className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-base text-white outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
          </label>
          <div className="scrollbar-none mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:px-6">
            {["Available now", "Newly listed", "Featured", "Toyota", "Subaru", "SUVs", "Under KSh 2M", "Showroom cars", "Private sellers"].map((item, index) => (
              <Link key={item} href={index < 3 ? "#listings" : "/cars"} className="min-w-max rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white">
                {item}
              </Link>
            ))}
          </div>

          <div className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:hidden">
            {featured.map((item, itemIndex) => {
              const itemImages = item.images.length ? item.images : ["/cars/forester.jpg"];
              const itemPhoto = (photoIndex: number) => itemImages[photoIndex % itemImages.length];

              return (
                <Link key={item.id} href={`/cars/${item.id}`} className="relative grid h-[28rem] w-[88vw] max-w-md shrink-0 snap-center grid-cols-[1.7fr_0.9fr] grid-rows-[1.45fr_1fr] gap-0.5 overflow-hidden rounded-2xl bg-black shadow-xl">
                  <div className="relative col-span-2 overflow-hidden">
                    <Image src={itemPhoto(0)} alt={item.title} fill loading={itemIndex === 0 ? "eager" : "lazy"} sizes="88vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/25" />
                  </div>
                  <div className="relative overflow-hidden"><Image src={itemPhoto(1)} alt={`${item.title} interior`} fill sizes="58vw" className="object-cover" /></div>
                  <div className="grid grid-rows-2 gap-0.5">
                    {[2, 3].map((photoIndex) => <div key={photoIndex} className="relative overflow-hidden"><Image src={itemPhoto(photoIndex)} alt={`${item.title} photo ${photoIndex + 1}`} fill sizes="30vw" className="object-cover" /></div>)}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                    <span className="rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-950">Featured</span>
                    <h1 className="max-w-[70%] text-right text-lg font-black leading-6 text-white drop-shadow-md">{item.title}</h1>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 pt-14">
                    <div>
                      <strong className="block text-xl font-black text-emerald-400">KSh {new Intl.NumberFormat("en-KE").format(item.price)}</strong>
                      <span className="mt-1 flex items-center gap-1 text-xs text-slate-200"><MapPin size={13} /> {item.location} · {new Intl.NumberFormat("en-KE").format(item.mileage)} km</span>
                    </div>
                    {item.verified && <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur"><BadgeCheck size={14} /> Verified</span>}
                  </div>
                </Link>
              );
            })}
          </div>

          <article className="relative mx-4 hidden overflow-hidden rounded-2xl bg-black shadow-2xl lg:block">
            <Link href={`/cars/${vehicle.id}`} className="grid h-[25rem] grid-cols-[minmax(0,1.55fr)_minmax(6.5rem,0.72fr)] grid-rows-2 gap-0.5 sm:h-[34rem] sm:grid-cols-[minmax(0,1.75fr)_minmax(10rem,0.72fr)] lg:h-[21rem] lg:grid-cols-[1.7fr_0.8fr_0.65fr]">
              <div className="relative row-span-2 min-h-0 overflow-hidden">
                <Image src={photo(0)} alt={vehicle.title} fill loading="eager" sizes="(max-width:640px) 70vw, (max-width:1024px) 72vw, 55vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              </div>
              <div className="row-span-2 grid grid-rows-2 gap-0.5">
                {[1, 2].map((index) => <div key={index} className="relative overflow-hidden"><Image src={photo(index)} alt={`${vehicle.title} photo ${index + 1}`} fill sizes="(max-width:1024px) 30vw, 25vw" className="object-cover" /></div>)}
              </div>
              <div className="row-span-2 hidden grid-rows-2 gap-0.5 lg:grid">
                {[3, 4].map((index) => <div key={index} className="relative overflow-hidden"><Image src={photo(index)} alt={`${vehicle.title} photo ${index + 1}`} fill sizes="20vw" className="object-cover" /></div>)}
              </div>
            </Link>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="w-[68%] max-w-3xl sm:w-auto">
                <span className="inline-flex rounded-full bg-emerald-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-950">Featured listing</span>
                <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">{vehicle.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-200">
                  <strong className="text-xl text-emerald-400 sm:text-2xl">KSh {new Intl.NumberFormat("en-KE").format(vehicle.price)}</strong>
                  <span>{new Intl.NumberFormat("en-KE").format(vehicle.mileage)} km</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={14} /> {vehicle.location}</span>
                  {vehicle.verified && <span className="inline-flex items-center gap-1"><BadgeCheck size={15} /> Verified</span>}
                </div>
              </div>
              <Link href={whatsapp} target="_blank" onClick={() => void trackListingEvent(vehicle.id, "whatsapp_click")} className="pointer-events-auto hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-black text-emerald-950 transition hover:bg-emerald-400 sm:flex"><MessageCircle size={18} /> Arrange viewing</Link>
            </div>

            {featured.length > 1 && <div className="absolute bottom-5 right-5 flex gap-1 sm:bottom-auto sm:top-5">
              <button onClick={() => move(-1)} aria-label="Previous featured car" className="rounded-full bg-black/70 p-2.5 text-white backdrop-blur hover:bg-emerald-500 hover:text-black"><ArrowLeft size={18} /></button>
              <button onClick={() => move(1)} aria-label="Next featured car" className="rounded-full bg-black/70 p-2.5 text-white backdrop-blur hover:bg-emerald-500 hover:text-black"><ArrowRight size={18} /></button>
            </div>}
          </article>

          {featured.length > 1 && <div className="mt-3 hidden justify-center gap-1.5 lg:flex">{featured.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-label={`Show ${item.title}`} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-emerald-400" : "w-3 bg-white/25"}`} />)}</div>}
        </div>
      </section>

      <section id="listings" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-8 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">The full marketplace</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Available listings</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"} ready to browse</p>
        </div>

        <FilterBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} activeFilterCount={activeFilterCount} make={make} setMake={setMake} makeOptions={makeOptions} model={model} setModel={setModel} modelOptions={modelOptions} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} minYear={minYear} setMinYear={setMinYear} maxYear={maxYear} setMaxYear={setMaxYear} yearOptions={yearOptions} fuel={fuel} setFuel={setFuel} fuelOptions={fuelOptions} transmission={transmission} setTransmission={setTransmission} transmissionOptions={transmissionOptions} bodyType={bodyType} setBodyType={setBodyType} bodyTypeOptions={bodyTypeOptions} location={location} setLocation={setLocation} locationOptions={locationOptions} clearFilters={clearFilters} />

        {filteredCars.length ? <div className="mt-7 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredCars.map((car) => <VehicleCard key={car.id} vehicle={car} />)}</div> : <div className="mt-7 rounded-3xl border border-dashed p-14 text-center"><p className="text-xl font-black">No matching cars</p><button onClick={clearFilters} className="mt-4 font-bold text-emerald-600">Clear filters</button></div>}
      </section>
    </>
  );
}
