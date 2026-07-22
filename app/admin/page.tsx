export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="mt-2 text-gray-600">
          Welcome to your Auto Bazaar Finds admin panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Vehicles</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Available</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Featured</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Sold</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">
          Quick Actions
        </h3>

        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="/admin/listing"
            className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            + Add New Vehicle
          </a>

          <a
            href="/admin/inventory"
            className="rounded-lg border px-5 py-3 hover:bg-gray-100"
          >
            View Inventory
          </a>
        </div>
      </div>
    </div>
  );
}