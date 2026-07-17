"use client";

import {
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";

import SaveButton from "./SaveButton";

type ActionBarProps = {
  whatsappLink: string;
  phone: string;
  carId: string;
};

export default function ActionBar({
  whatsappLink,
  phone,
  carId,
}: ActionBarProps) {

  console.log("ActionBar rendered", carId);

  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white"
      >
        <MessageCircle size={22} />
        WhatsApp
      </a>

      <a
        href={`tel:+${phone}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white"
      >
        <Phone size={22} />
        Call Seller
      </a>

      <SaveButton carId={carId} />

      <button
        onClick={() => alert("Share button works")}
        className="flex items-center justify-center gap-2 rounded-xl border px-6 py-4"
      >
        <Share2 size={22} />
        Share Listing
      </button>

    </section>
  );
}