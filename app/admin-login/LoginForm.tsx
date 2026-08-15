"use client";

import { useActionState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";

import { login } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-semibold">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 caret-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-white/15 dark:bg-neutral-950 dark:text-white dark:caret-white dark:focus:border-emerald-400 dark:focus:bg-neutral-950 dark:focus:ring-emerald-900/40"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={8}
          required
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 caret-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-white/15 dark:bg-neutral-950 dark:text-white dark:caret-white dark:focus:border-emerald-400 dark:focus:bg-neutral-950 dark:focus:ring-emerald-900/40"
        />
      </div>
      {state?.message && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <LockKeyhole className="h-5 w-5" />}
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
