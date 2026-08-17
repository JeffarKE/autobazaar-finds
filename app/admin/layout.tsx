import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAdminUser } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { logout } from "../admin-login/actions";
import ThemeToggle from "../components/theme/ThemeToggle";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!isAdminUser(user)) redirect("/admin-login");

  return (
    <div className="admin-surface min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="border-b bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Auto Bazaar Finds Admin
          </h1>

          <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
            <ThemeToggle />
            <Link href="/" className="flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium hover:bg-gray-100 sm:flex-none sm:px-4">
              View Website
            </Link>
            <form action={logout}>
              <button className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 sm:px-4">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full border-b bg-white dark:border-gray-800 dark:bg-gray-900 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <nav className="grid grid-cols-3 gap-2 p-3 lg:flex lg:flex-col lg:p-4">
            <Link
              href="/admin"
              className="rounded-lg px-2 py-3 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 lg:px-4 lg:text-left lg:text-base"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/inventory"
              className="rounded-lg px-2 py-3 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 lg:px-4 lg:text-left lg:text-base"
            >
              Inventory
            </Link>

            <Link
              href="/admin/listing"
              className="rounded-lg px-2 py-3 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 lg:px-4 lg:text-left lg:text-base"
            >
              New Listing
            </Link>

          </nav>
        </aside>

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
