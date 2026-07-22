import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-xl font-bold text-gray-900">
            Auto Bazaar Finds Admin
          </h1>

          <Link
            href="/"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            View Website
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/admin"
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/inventory"
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Inventory
            </Link>

            <Link
              href="/admin/listing"
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              New Listing
            </Link>

            <Link
              href="/admin/settings"
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Settings
            </Link>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}