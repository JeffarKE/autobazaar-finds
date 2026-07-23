import Link from "next/link";
import {
  Car,
  Plus,
  Star,
  CheckCircle,
  TrendingUp,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Listings",
      value: "0",
      icon: Car,
    },
    {
      title: "Featured",
      value: "0",
      icon: Star,
    },
    {
      title: "Verified",
      value: "0",
      icon: CheckCircle,
    },
    {
      title: "Total Views",
      value: "0",
      icon: Eye,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Auto Bazaar Finds
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Welcome back 👋
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Manage your inventory, publish new listings and monitor your
            dealership from one place.
          </p>
        </div>

        <Link
          href="/admin/listing"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-white transition hover:bg-gray-800"
        >
          <Plus size={20} />
          New Listing
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-3">
                  <Icon className="h-6 w-6 text-gray-700" />
                </div>

                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-2 text-gray-500">
          Frequently used tools for managing your inventory.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/listing"
            className="rounded-xl border p-6 transition hover:border-black hover:bg-gray-50"
          >
            <Plus className="mb-4 h-7 w-7" />

            <h3 className="font-semibold">
              Add New Vehicle
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create and publish a new vehicle listing.
            </p>
          </Link>

          <Link
            href="/admin/inventory"
            className="rounded-xl border p-6 transition hover:border-black hover:bg-gray-50"
          >
            <Car className="mb-4 h-7 w-7" />

            <h3 className="font-semibold">
              Inventory
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View, edit and manage your current listings.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <p className="mt-3 text-gray-500">
          Vehicle activity, enquiries and analytics will appear here once your
          inventory goes live.
        </p>
      </div>
    </div>
  );
}