import UploadPhotos from "./components/UploadPhotos";
import VehicleInformation from "./components/VehicleInformation";
import VehicleSpecifications from "./components/VehicleSpecifications";
import Pricing from "./components/Pricing";
import Description from "./components/Description";
import SellerInformation from "./components/SellerInformation";
import LivePreview from "./components/LivePreview";
import PublishBar from "./components/PublishBar";

export default function ListingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Create Vehicle Listing
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new vehicle to your inventory. Complete the information below
            and publish when you're ready.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* Left Column */}
          <form className="space-y-8">
            <UploadPhotos />

            <VehicleInformation />

            <VehicleSpecifications />

            <Pricing />

            <Description />

            <SellerInformation />
          </form>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <LivePreview />

            <PublishBar />
          </aside>
        </div>
      </section>
    </main>
  );
}