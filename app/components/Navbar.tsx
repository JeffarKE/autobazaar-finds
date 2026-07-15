export default function Navbar() {
  return (
    <nav className="bg-black text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">AutoBazaar Finds</h1>

      <div className="space-x-6">
        <a href="#" className="hover:text-gray-300 transition">
          Home
        </a>

        <a href="#" className="hover:text-gray-300 transition">
          Browse Cars
        </a>

        <a href="#" className="hover:text-gray-300 transition">
          Sell Your Car
        </a>

        <a href="#" className="hover:text-gray-300 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}