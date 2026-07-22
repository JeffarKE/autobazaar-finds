import { ShieldCheck } from "lucide-react";

export default function Intro() {
  return (
    <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800">
        Selling your car shouldn't be complicated.
      </h1>

      <p className="mt-3 leading-relaxed text-gray-700">
        Fill in a few details below and our team will review your submission
        before professionally marketing your vehicle on Auto Bazaar Finds.
      </p>

      <div className="mt-5 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
        ⏱ It only takes about one minute to complete this form.
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-white p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 text-green-600" />

        <p className="text-sm leading-relaxed text-gray-700">
          <span className="font-semibold">
            Every submission is reviewed before it goes live.
          </span>{" "}
          This helps us maintain high-quality vehicle listings, builds trust with
          buyers, and ensures every vehicle advertised on Auto Bazaar Finds
          meets our listing standards.
        </p>
      </div>
    </section>
  );
}