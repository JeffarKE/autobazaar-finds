import { Car } from "lucide-react";

export default function VehicleDetails() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <Car className="mt-1 h-7 w-7 text-green-700" />

        <div>
          <h2 className="text-2xl font-bold">Vehicle Details</h2>

          <p className="mt-1 text-sm text-gray-500">
            Tell us everything buyers should know about your vehicle.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Make <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Toyota"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Model <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Land Cruiser Prado TX"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Year <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            placeholder="e.g. 2020"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Engine Size (cc)
          </label>

          <input
            type="text"
            placeholder="e.g. 1998"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mileage (km)
          </label>

          <input
            type="text"
            placeholder="e.g. 85,000"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Asking Price (KSh) <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. 2,350,000"
            className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          />

          <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 accent-green-600"
            />

            I'm open to reasonable offers.
          </label>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Transmission
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>Automatic</option>
            <option>Manual</option>
            <option>CVT</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Fuel Type
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Body Type
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>Sedan</option>
            <option>Hatchback</option>
            <option>SUV</option>
            <option>Pickup</option>
            <option>Van</option>
            <option>Coupe</option>
            <option>Convertible</option>
            <option>Wagon</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Drive Type
          </label>

          <select className="w-full rounded-xl border border-gray-300 p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
            <option>2WD</option>
            <option>FWD</option>
            <option>RWD</option>
            <option>AWD</option>
            <option>4WD</option>
          </select>
        </div>
      </div>
    </section>
  );
}