import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Radio } from "lucide-react";
import { FaFacebookF, FaInstagram, FaThreads, FaTiktok } from "react-icons/fa6";
import { contact, socialLinks } from "@/lib/site";
import ThemeToggle from "../theme/ThemeToggle";

const browse = [
  { name: "Browse Cars", href: "/cars" },
  { name: "Sell Your Car", href: "/sell" },
  { name: "Find Me a Car", href: "/source" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "Work with us", href: "/partners" },
];

const socials = [
  { href: socialLinks.facebook, label: "Facebook", icon: FaFacebookF },
  { href: socialLinks.instagram, label: "Instagram", icon: FaInstagram },
  { href: socialLinks.threads, label: "Threads", icon: FaThreads },
  { href: socialLinks.tiktok, label: "TikTok", icon: FaTiktok },
];

const whatsappUrl = `${contact.whatsapp}?text=Hi%20Auto%20Bazaar%20Finds%2C%20I%20saw%20your%20website%20and%20I%20need%20some%20help.`;

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#050b07] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em]">Auto Bazaar <span className="text-emerald-400">Finds</span></h2>
            <p className="mt-5 leading-7 text-neutral-400">Cars from private owners and showroom partners, plus help finding the right car for you.</p>
            <div className="mt-7 flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400 hover:text-emerald-950"><Icon size={17} /></Link>
              ))}
            </div>
            <div className="mt-8 space-y-4 text-sm text-neutral-400">
              <div className="flex items-center gap-3"><MapPin size={18} /> Nairobi, Kenya</div>
              <Link href="tel:+254741056053" className="flex items-center gap-3 transition hover:text-white"><Phone size={18} /> +254 741 056 053</Link>
              <Link href={`mailto:${contact.email}`} className="flex items-center gap-3 transition hover:text-white"><Mail size={18} /> {contact.email}</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-neutral-500">Marketplace</h3>
            <div className="space-y-3">{browse.map((item) => <Link key={item.name} href={item.href} className="flex items-center justify-between text-neutral-300 transition hover:text-emerald-400">{item.name}<ArrowRight size={16} /></Link>)}</div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-neutral-500">More</h3>
            <div className="space-y-3">{company.map((item) => <Link key={item.name} href={item.href} className="block text-neutral-300 transition hover:text-emerald-400">{item.name}</Link>)}</div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Stay close to the market</h3>
            <p className="mt-4 text-neutral-400">Get new listings, finds and vehicle updates directly on WhatsApp.</p>
            <Link href={contact.whatsappChannel} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-black text-emerald-950 transition hover:bg-emerald-300"><Radio size={18} /> Follow daily drops</Link>
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm font-semibold text-neutral-400 transition hover:text-white">Or chat with us →</Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-neutral-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Auto Bazaar Finds. Built in Kenya.</span>
          <div className="flex items-center gap-3"><span>Appearance</span><ThemeToggle darkSurface /></div>
        </div>
      </div>
    </footer>
  );
}
