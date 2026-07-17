export default function VehicleDescription() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Vehicle Description</h2>

        <p className="mt-1 text-sm text-gray-500">
          Tell buyers what makes your vehicle special. A detailed description
          builds trust and helps buyers make informed decisions.
        </p>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description <span className="text-red-500">*</span>
        </label>

        <textarea
          rows={10}
          placeholder="Describe your vehicle..."
          className="w-full rounded-xl border border-gray-300 p-4 leading-relaxed focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">
          Tips for a Great Listing
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>• Be honest about the vehicle's condition.</li>
          <li>• Mention service history.</li>
          <li>• Mention any upgrades.</li>
          <li>• Mention spare keys and manuals.</li>
          <li>• Detailed listings attract more buyers.</li>
        </ul>
      </div>
    </section>
  );
}