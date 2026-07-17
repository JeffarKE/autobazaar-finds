import { User, Lock } from "lucide-react";

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

        <div>
          <label className="mb-2 block font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. John Mwangi"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            placeholder="07XXXXXXXX"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Preferred Contact Method
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>Phone Call</option>
            <option>WhatsApp</option>
            <option>SMS</option>
            <option>Email</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            County / Town <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Karen, Nairobi"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Best Time to Contact
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>Anytime</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
        <Lock className="mt-1 h-5 w-5 text-green-700" />

        <div>
          <p className="font-semibold text-green-800">
            Your privacy matters.
          </p>

          <p className="mt-1 text-sm leading-relaxed text-gray-700">
            Your phone number and email address will never be publicly displayed
            without your permission. We only use your contact details to verify
            your listing and communicate with you regarding your submission.
          </p>
        </div>
      </div>
    </section>
  );
}