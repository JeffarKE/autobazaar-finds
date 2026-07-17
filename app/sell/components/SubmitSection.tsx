import { ShieldCheck } from "lucide-react";

export default function SubmitSection() {
  return (
    <section className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-sm">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <ShieldCheck className="h-8 w-8 text-green-700" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Submit?
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Please review all the information you've entered before submitting
          your vehicle. Our team will review your listing and contact you if any
          additional information is required.
        </p>

        <div className="mt-8 rounded-xl border border-green-200 bg-white p-6 text-left">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 accent-green-700"
            />

            <span className="text-sm leading-relaxed text-gray-700">
              I confirm that I own or have permission to advertise this vehicle
              and that all information provided is accurate.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-green-700 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-800"
        >
          Submit Vehicle Listing
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Average review time: <strong>Within 24 hours</strong>
        </p>
      </div>
    </section>
  );
}