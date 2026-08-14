"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { isAdminUser } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export type LoginState = { message: string } | undefined;

const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8),
});

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    return { message: "Enter a valid email address and password." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword(values.data);

  if (error || !data.user) {
    return { message: "The email or password is incorrect." };
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();
    return { message: "This account does not have administrator access." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin-login");
}
