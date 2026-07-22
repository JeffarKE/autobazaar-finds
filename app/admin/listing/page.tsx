import SellForm from "@/app/sell/SellForm";

export default function NewListingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          New Vehicle
        </h2>

        <p className="mt-2 text-gray-600">
          Create a new vehicle listing for Auto Bazaar Finds.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <SellForm />
      </div>
    </div>
  );
}