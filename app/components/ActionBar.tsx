import {
  MessageCircle,
  Phone,
  Heart,
  Share2,
} from "lucide-react";

type ActionBarProps = {
  whatsappLink: string;
  phone: string;
};

export default function ActionBar({
  whatsappLink,
  phone,
}: ActionBarProps) {
  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg"
      >
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>

      {/* Call */}
      <a
        href={`tel:+${phone}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
      >
        <Phone size={22} />
        <span>Call Seller</span>
      </a>

      {/* Save */}
      <button
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold shadow-sm transition-all duration-200 hover:border-red-500 hover:text-red-600 hover:shadow-md"
      >
        <Heart size={22} />
        <span>Save Vehicle</span>
      </button>

      {/* Share */}
      <button
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold shadow-sm transition-all duration-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
      >
        <Share2 size={22} />
        <span>Share Listing</span>
      </button>

    </section>
  );
}