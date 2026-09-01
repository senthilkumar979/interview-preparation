"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { tables } from "@prepquest/database";
import { completedSet, getAppUser, getProgressMap } from "@/lib/session";
import { PROGRESS_COOKIE } from "@/lib/session-types";
import { createServerSupabase } from "@/lib/supabase/server";

export async function markTopicProgress(topicSlug: string, status: "in_progress" | "completed") {
  const user = await getAppUser();
  if (!user) return;

  const supabase = await createServerSupabase();
  if (supabase && !user.isGuest) {
    const { error } = await supabase.from(tables.userTopicProgress).upsert(
      {
        user_id: user.id,
        topic_slug: topicSlug,
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,topic_slug" },
    );
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard");
    revalidatePath("/roadmap");
    revalidatePath(`/learn/${topicSlug}`);
    return;
  }

  const progress = await getProgressMap(user.id);
  progress[topicSlug] = status;
  const cookieStore = await cookies();
  cookieStore.set(PROGRESS_COOKIE, JSON.stringify(progress), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/dashboard");
  revalidatePath("/roadmap");
  revalidatePath(`/learn/${topicSlug}`);
}

export async function getCompletedSlugs() {
  const user = await getAppUser();
  if (!user) return new Set<string>();
  return completedSet(await getProgressMap(user.id));
}
