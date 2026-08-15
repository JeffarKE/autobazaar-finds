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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16 dark:bg-neutral-950">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-slate-950 shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">Auto Bazaar Finds</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Admin sign in</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Use an approved administrator account to manage inventory.</p>
        <LoginForm />
      </section>
    </main>
  );
}
