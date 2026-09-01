"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { GUEST_COOKIE, type AppUser } from "@/lib/session-types";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
};

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "Learner");
  const supabase = await createServerSupabase();
  if (!supabase) throw new Error("Supabase is not configured. Use Continue as guest.");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
  if (error) throw new Error(error.message);
  redirect("/onboarding");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createServerSupabase();
  if (!supabase) throw new Error("Supabase is not configured. Use Continue as guest.");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  redirect("/dashboard");
}

export async function continueAsGuest() {
  const cookieStore = await cookies();
  const guest: AppUser = {
    id: crypto.randomUUID(),
    displayName: "Guest",
    email: null,
    isGuest: true,
    roleSlug: null,
    technologySlug: null,
    experienceLevel: null,
  };
  cookieStore.set(GUEST_COOKIE, JSON.stringify(guest), cookieOptions);
  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createServerSupabase();
  if (supabase) await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_COOKIE);
  redirect("/");
}
