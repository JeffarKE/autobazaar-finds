export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white p-5 flex justify-between">
        <h1 className="text-2xl font-bold">AutoBazaar Finds</h1>

        <div className="space-x-6">
          <a href="#">Home</a>
          <a href="#">Browse Cars</a>
          <a href="#">Sell</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className="text-center py-24">
        <h2 className="text-5xl font-bold">
          Find Your Perfect Car
        </h2>

        <p className="mt-6 text-gray-600 text-xl">
          Kenya's trusted marketplace for quality vehicles.
        </p>

        <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg">
          Browse Cars
        </button>
      </section>

      {/* Featured Vehicles */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://placehold.co/400x250"
              alt="Toyota Prado"
              className="w-full"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">
                Toyota Land Cruiser Prado
              </h3>

              <p className="text-gray-600 mt-2">
                2018 • Diesel • Automatic
              </p>

              <p className="text-2xl font-bold mt-4">
                KSh 4,850,000
              </p>

              <button className="mt-5 w-full bg-black text-white py-3 rounded-lg">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://placehold.co/400x250"
              alt="BMW X5"
              className="w-full"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">
                BMW X5 M Sport
              </h3>

              <p className="text-gray-600 mt-2">
                2019 • Diesel • Automatic
              </p>

              <p className="text-2xl font-bold mt-4">
                KSh 8,999,999
              </p>

              <button className="mt-5 w-full bg-black text-white py-3 rounded-lg">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://placehold.co/400x250"
              alt="Subaru Forester"
              className="w-full"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">
                Subaru Forester SG5
              </h3>

              <p className="text-gray-600 mt-2">
                Manual • Turbo • AWD
              </p>

              <p className="text-2xl font-bold mt-4">
                KSh 1,600,000
              </p>

              <button className="mt-5 w-full bg-black text-white py-3 rounded-lg">
                View Details
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}