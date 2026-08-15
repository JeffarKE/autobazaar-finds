import { redirect } from "next/navigation";

import { isAdminUser } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (isAdminUser(user)) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16">
      <section className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">Auto Bazaar Finds</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Admin sign in</h1>
        <p className="mt-3 text-slate-600">Use an approved administrator account to manage inventory.</p>
        <LoginForm />
      </section>
    </main>
  );
}
