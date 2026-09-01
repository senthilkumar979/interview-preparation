import { cookies } from "next/headers";
import { tables, type ProfileRow, type TopicProgressRow } from "@prepquest/database";
import type { ExperienceLevel } from "@prepquest/content";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  GUEST_COOKIE,
  PROGRESS_COOKIE,
  parseGuest,
  parseProgress,
  type AppUser,
  type ProgressMap,
} from "@/lib/session-types";

export async function getAppUser(): Promise<AppUser | null> {
  const supabase = await createServerSupabase();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from(tables.profiles)
      .select("*")
      .eq("id", user.id)
      .maybeSingle<ProfileRow>();

    return {
      id: user.id,
      displayName: profile?.display_name ?? user.email?.split("@")[0] ?? "Learner",
      email: user.email ?? null,
      isGuest: false,
      roleSlug: profile?.role_slug ?? null,
      technologySlug: profile?.technology_slug ?? null,
      experienceLevel: (profile?.experience_level as ExperienceLevel) ?? null,
    };
  }

  const cookieStore = await cookies();
  return parseGuest(cookieStore.get(GUEST_COOKIE)?.value);
}

export async function getProgressMap(userId: string): Promise<ProgressMap> {
  const supabase = await createServerSupabase();
  if (supabase) {
    const { data } = await supabase
      .from(tables.userTopicProgress)
      .select("*")
      .eq("user_id", userId)
      .returns<TopicProgressRow[]>();

    const map: ProgressMap = {};
    for (const row of data ?? []) {
      if (row.status === "completed" || row.status === "in_progress") {
        map[row.topic_slug] = row.status;
      }
    }
    return map;
  }

  const cookieStore = await cookies();
  return parseProgress(cookieStore.get(PROGRESS_COOKIE)?.value);
}

export function completedSet(progress: ProgressMap): Set<string> {
  return new Set(
    Object.entries(progress)
      .filter(([, status]) => status === "completed")
      .map(([slug]) => slug),
  );
}
