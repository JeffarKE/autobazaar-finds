"use client";

import { Lock, User } from "lucide-react";

import FormInput from "@/app/components/ui/FormInput";
import FormSelect from "@/app/components/ui/FormSelect";

import { SellFormData } from "../types";

export default function SellerDetails() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <User className="mt-1 h-7 w-7 text-green-700" />

        <div>
          <h2 className="text-2xl font-bold">
            Seller Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Tell us how buyers can reach you. Your personal information
            remains private until your listing is approved.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <FormInput<SellFormData>
          name="sellerName"
          label="Full Name"
          placeholder="e.g. John Mwangi"
          required
        />

        <FormInput<SellFormData>
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="07XXXXXXXX"
          required
        />

        <FormInput<SellFormData>
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
        />

        <FormSelect<SellFormData>
          name="preferredContact"
          label="Preferred Contact Method"
          required
          options={[
            {
              label: "Phone Call",
              value: "Phone Call",
            },
            {
              label: "WhatsApp",
              value: "WhatsApp",
            },
            {
              label: "Email",
              value: "Email",
            },
          ]}
        />

        <FormInput<SellFormData>
          name="location"
          label="County / Town"
          placeholder="e.g. Karen, Nairobi"
          required
        />

        <FormSelect<SellFormData>
          name="bestTime"
          label="Best Time to Contact"
          required
          options={[
            {
              label: "Anytime",
              value: "Anytime",
            },
            {
              label: "Morning",
              value: "Morning",
            },
            {
              label: "Afternoon",
              value: "Afternoon",
            },
            {
              label: "Evening",
              value: "Evening",
            },
          ]}
        />

      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
        <Lock className="mt-1 h-5 w-5 text-green-700" />

        <div>
          <p className="font-semibold text-green-800">
            Your privacy matters.
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-700">
            Your phone number and email address will never be publicly
            displayed without your permission. We only use your contact
            details to verify your listing and communicate with you
            regarding your submission.
          </p>
        </div>
      </div>
    </section>
  );
}