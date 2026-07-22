export default function InventoryPage() {
  const vehicles = [
    {
      id: 1,
      name: "Toyota Land Cruiser Prado",
      year: 2020,
      price: "KSh 4,850,000",
      status: "Available",
    },
    {
      id: 2,
      name: "Mazda CX-5",
      year: 2019,
      price: "KSh 2,650,000",
      status: "Sold",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Inventory</h2>
          <p className="text-gray-600">
            Manage your vehicle listings.
          </p>
        </div>

        <a
          href="/admin/listing"
          className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
        >
          + New Vehicle
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t">
                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold">{vehicle.name}</p>
                    <p className="text-sm text-gray-500">
                      {vehicle.year}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5">
                  {vehicle.price}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      vehicle.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded border px-3 py-2 hover:bg-gray-100">
                      Edit
                    </button>

                    <button className="rounded border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}