export default function Hero() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-5xl font-bold">
          Find Your Perfect Car
        </h2>

        <p className="mt-5 text-xl text-gray-600">
          Search thousands of quality vehicles across Kenya.
        </p>

        <div className="mt-10 bg-gray-100 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4">

          <select className="border rounded-lg p-3 flex-1">
            <option>Any Make</option>
            <option>Toyota</option>
            <option>BMW</option>
            <option>Subaru</option>
            <option>Nissan</option>
            <option>Mazda</option>
          </select>

          <input
            type="text"
            placeholder="Model"
            className="border rounded-lg p-3 flex-1"
          />

          <input
            type="number"
            placeholder="Maximum Price"
            className="border rounded-lg p-3 flex-1"
          />

          <button className="bg-black text-white px-8 rounded-lg">
            Search
          </button>

        </div>

      </div>
    </section>
  );
}