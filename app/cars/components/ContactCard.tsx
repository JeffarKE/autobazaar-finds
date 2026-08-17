"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Star,
  Share2,
} from "lucide-react";

import type { Vehicle } from "../types";
import { trackListingEvent } from "../analytics";
import { getShortListingUrl, getWhatsAppListingMessage } from "../listingLinks";

interface ContactCardProps {
  vehicle: Vehicle;
  siteUrl: string;
}

export default function ContactCard({
  vehicle,
  siteUrl,
}: ContactCardProps) {
  const [shareStatus, setShareStatus] = useState("");
  const phone = vehicle.seller.phone.replace(/\D/g, "");
  const hasPhone = phone.length > 0;

  const whatsappMessage = encodeURIComponent(
    getWhatsAppListingMessage(vehicle, siteUrl)
  );

  const whatsappLink = `https://wa.me/${phone}?text=${whatsappMessage}`;

  async function shareVehicle() {
    const shortUrl = getShortListingUrl(vehicle.id, siteUrl);
    const shareData = {
      title: vehicle.title,
      text: `${vehicle.title} — KSh ${new Intl.NumberFormat("en-KE").format(vehicle.price)} on Auto Bazaar Finds.`,
      url: shortUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        void trackListingEvent(vehicle.id, "share");
      } catch {
        // Closing the native share sheet is not an error the user needs to see.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShareStatus("Listing link copied");
      void trackListingEvent(vehicle.id, "share");
    } catch {
      setShareStatus("Could not copy the link. Please copy it from the address bar.");
    }
  }

  return (
    <aside className="sticky top-24 space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
          <h2 className="text-2xl font-bold">
            Contact Auto Bazaar Finds
          </h2>

          <p className="mt-2 text-sm text-green-100">
            Ask us about this car or tell us to find a similar one.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Status */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-neutral-800">
            <span className="font-medium">
              Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                vehicle.featured
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              }`}
            >
              {vehicle.featured ? (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  Featured
                </span>
              ) : (
                "Available"
              )}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 dark:border-neutral-700">
            <MapPin className="h-5 w-5 text-green-600" />

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Location
              </p>

              <p className="font-semibold">
                {vehicle.location}
              </p>
            </div>
          </div>

          {hasPhone ? (
            <>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void trackListingEvent(vehicle.id, "whatsapp_click")}
                className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" />
                Arrange a viewing
              </Link>

              <button type="button" onClick={shareVehicle} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 px-6 py-4 font-semibold transition hover:bg-slate-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                <Share2 className="h-5 w-5" /> Share this car
              </button>
              <p aria-live="polite" className="-mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                {shareStatus}
              </p>

              <Link
                href="/source"
                className="flex items-center justify-center gap-3 rounded-2xl border border-green-600 px-6 py-4 font-semibold text-green-600 transition hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                Find me a similar car
              </Link>
            </>
          ) : (
            <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              Message us on WhatsApp to ask about this vehicle.
            </p>
          )}

          {/* Safety Tips */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />

              <h3 className="font-semibold">
                Safety Tips
              </h3>
            </div>

            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>✔ Meet in a safe public place.</li>
              <li>✔ Inspect the vehicle before payment.</li>
              <li>✔ Verify ownership documents.</li>
              <li>✔ Never send money before viewing.</li>
            </ul>
          </div>

          {/* Auto Bazaar Finds identity */}
          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {vehicle.seller.name}
                </p>

                <p className="text-sm text-slate-500">
                  Helping Kenyans buy and sell cars
                </p>
              </div>

              {vehicle.seller.verified && (
                <BadgeCheck className="h-6 w-6 text-green-600" />
              )}
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}
