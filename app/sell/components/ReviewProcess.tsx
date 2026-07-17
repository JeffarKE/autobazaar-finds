import { ShieldCheck } from "lucide-react";

export default function ReviewProcess() {
  return (
    <section className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-sm">
      <div className="mb-8 flex items-start gap-3">
        <ShieldCheck className="mt-1 h-7 w-7 text-green-700" />

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            What Happens Next?
          </h2>

          <p className="mt-2 text-gray-600">
            Every vehicle submitted to Auto Baazar Finds is reviewed before it
            goes live to ensure buyers receive accurate, trustworthy listings.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold text-green-700">
            1. Listing Review
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Our team checks your photos, vehicle information and description for
            completeness and accuracy.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold text-green-700">
            2. Verification
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            If we require additional information, we'll contact you using your
            preferred contact method.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold text-green-700">
            3. Publication
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Once approved, your vehicle will be published on Auto Baazar Finds
            for potential buyers to discover.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-green-200 bg-green-100 p-5">
        <p className="text-sm text-green-900">
          <strong>Typical review time:</strong> Most listings are reviewed
          within <strong>24 hours</strong>.
        </p>
      </div>
    </section>
  );
}