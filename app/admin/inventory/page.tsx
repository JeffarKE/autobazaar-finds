import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Copy,
  Archive,
  Trash2,
  Eye,
  Phone,
  Star,
} from "lucide-react";

export default function InventoryPage() {
  const vehicles = [
    {
      id: 1,
      name: "Toyota Land Cruiser Prado",
      year: 2020,
      price: "KSh 4,850,000",
      location: "Nairobi",
      image: "/cars/prado.jpg",
      status: "Live",
      views: 356,
      leads: 18,
      featured: true,
    },
    {
      id: 2,
      name: "Mazda CX-5",
      year: 2019,
      price: "KSh 2,650,000",
      location: "Mombasa",
      image: "/cars/cx5.jpg",
      status: "Sold",
      views: 214,
      leads: 9,
      featured: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Inventory</h1>

          <p className="mt-2 text-gray-600">
            Manage, edit and monitor all your vehicle listings.
          </p>
        </div>

        <Link
          href="/admin/listing"
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={20} />
          New Listing
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by make, model, year or location..."
            className="w-full rounded-xl border bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-black focus:bg-white"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {["All", "Live", "Featured", "Draft", "Sold"].map((filter) => (
            <button
              key={filter}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === "All"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-5">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              {/* Vehicle */}
              <div className="flex gap-5">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-28 w-40 rounded-xl object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">
                      {vehicle.year} {vehicle.name}
                    </h2>

                    {vehicle.featured && (
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-2xl font-bold text-black">
                    {vehicle.price}
                  </p>

                  <p className="mt-1 text-gray-500">
                    {vehicle.location}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Eye size={18} />
                      {vehicle.views} Views
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      {vehicle.leads} Leads
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 font-medium ${
                        vehicle.status === "Live"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <button className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
                  <Pencil size={18} />
                  Edit
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
                  <Copy size={18} />
                  Copy
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
                  <Star size={18} />
                  Feature
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100">
                  <Archive size={18} />
                  Archive
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-red-600 transition hover:bg-red-50">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && (
        <div className="rounded-2xl border border-dashed bg-gray-50 p-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Listings Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Your inventory is empty. Start by creating your first vehicle
            listing.
          </p>

          <Link
            href="/admin/listing"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-white hover:bg-gray-800"
          >
            <Plus size={20} />
            Add First Listing
          </Link>
        </div>
      )}
    </div>
  );
}