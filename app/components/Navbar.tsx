import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-5 flex justify-between items-center">

      <Link
        href="/"
        className="text-2xl font-bold hover:text-gray-300 transition"
      >
        Auto Baazar Finds
      </Link>


      <div className="space-x-6">

        <Link
          href="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>


        <Link
          href="/browse"
          className="hover:text-gray-300 transition"
        >
          Browse Cars
        </Link>


        <Link
          href="/sell"
          className="hover:text-gray-300 transition"
        >
          Sell Your Car
        </Link>


        <Link
          href="/contact"
          className="hover:text-gray-300 transition"
        >
          Contact
        </Link>

      </div>

    </nav>
  );
}