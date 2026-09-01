"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ExperienceLevel } from "@prepquest/content";
import { tables } from "@prepquest/database";
import { getAppUser } from "@/lib/session";
import { GUEST_COOKIE, parseGuest } from "@/lib/session-types";
import { createServerSupabase } from "@/lib/supabase/server";

export async function saveOnboarding(formData: FormData) {
  const roleSlug = String(formData.get("roleSlug") ?? "");
  const technologySlug = String(formData.get("technologySlug") ?? "");
  const experienceLevel = String(formData.get("experienceLevel") ?? "") as ExperienceLevel;
  const user = await getAppUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();
  if (supabase && !user.isGuest) {
    const { error } = await supabase
      .from(tables.profiles)
      .update({
        role_slug: roleSlug,
        technology_slug: technologySlug,
        experience_level: experienceLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    if (error) throw new Error(error.message);
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const guest = parseGuest(cookieStore.get(GUEST_COOKIE)?.value) ?? user;
  cookieStore.set(
    GUEST_COOKIE,
    JSON.stringify({
      ...guest,
      roleSlug,
      technologySlug,
      experienceLevel,
    }),
    { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 },
  );
  redirect("/dashboard");
}
