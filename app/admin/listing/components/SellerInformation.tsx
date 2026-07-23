"use client";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Globe,
} from "lucide-react";

export default function SellerInformation() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <User className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Seller Information
          </h2>

          <p className="text-gray-500">
            Contact information displayed to interested buyers.
          </p>
        </div>
      </div>

      {/* Dealer Card */}
      <div className="mt-8 rounded-2xl border bg-gradient-to-r from-black to-gray-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">
              Default Seller
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              Auto Baazar Finds
            </h3>

            <p className="mt-2 text-gray-300">
              Your dealership information will automatically appear on new
              listings unless you change it below.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-2 text-sm">
            Default Profile
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <InputField
          label="Seller Name"
          placeholder="Auto Baazar Finds"
          icon={<Building2 className="h-5 w-5" />}
        />

        <InputField
          label="Contact Number"
          placeholder="+254 700 000 000"
          icon={<Phone className="h-5 w-5" />}
        />

        <InputField
          label="Email Address"
          placeholder="sales@autobaazarfinds.co.ke"
          icon={<Mail className="h-5 w-5" />}
        />

        <InputField
          label="Website"
          placeholder="www.autobaazarfinds.co.ke"
          icon={<Globe className="h-5 w-5" />}
        />

        <div className="md:col-span-2">
          <InputField
            label="Business Address"
            placeholder="Karen, Nairobi"
            icon={<MapPin className="h-5 w-5" />}
          />
        </div>

      </div>

      {/* Contact Preferences */}
      <div className="mt-10">
        <h3 className="mb-5 text-lg font-semibold">
          Preferred Contact Methods
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          <ToggleCard
            title="Phone Calls"
            description="Allow customers to call directly."
          />

          <ToggleCard
            title="WhatsApp"
            description="Display WhatsApp contact option."
          />

          <ToggleCard
            title="Email"
            description="Allow enquiries via email."
          />

          <ToggleCard
            title="Hide Contact Until Enquiry"
            description="Only reveal details after buyer interaction."
          />

        </div>
      </div>
    </section>
  );
}

/* ---------------- Input ---------------- */

type InputFieldProps = {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
};

function InputField({
  label,
  placeholder,
  icon,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
        <div className="text-gray-400">
          {icon}
        </div>

        <input
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

/* ---------------- Toggle ---------------- */

type ToggleCardProps = {
  title: string;
  description: string;
};

function ToggleCard({
  title,
  description,
}: ToggleCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-5 transition hover:border-black">
      <div>
        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-black"></div>

        <div className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}