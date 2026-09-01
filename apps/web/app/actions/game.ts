"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { XpReason } from "@prepquest/content";
import { tables } from "@prepquest/database";
import {
  applyActivity,
  BADGE_IDS,
  GAME_COOKIE,
  parseGameState,
  type GameState,
} from "@/lib/game";
import { getAppUser } from "@/lib/session";
import { createServerSupabase } from "@/lib/supabase/server";

export async function getGameState(): Promise<GameState> {
  const user = await getAppUser();
  if (!user) return parseGameState(undefined);

  const supabase = await createServerSupabase();
  if (supabase && !user.isGuest) {
    const { data, error } = await supabase
      .from(tables.profiles)
      .select(
        "xp_total, streak, last_active_on, leaderboard_opt_in, badges, completed_activity_ids, daily_key, weekly_key, notify_practice",
      )
      .eq("id", user.id)
      .maybeSingle();
    if (!error && data) {
      return {
        xp: data.xp_total ?? 0,
        streak: data.streak ?? 0,
        lastActiveDay: data.last_active_on ?? null,
        badges: data.badges ?? [],
        completedIds: data.completed_activity_ids ?? [],
        dailyKey: data.daily_key ?? null,
        weeklyKey: data.weekly_key ?? null,
        leaderboardOptIn: Boolean(data.leaderboard_opt_in),
        notifyPractice: data.notify_practice ?? true,
      };
    }
  }

  const cookieStore = await cookies();
  return parseGameState(cookieStore.get(GAME_COOKIE)?.value);
}

async function persist(state: GameState) {
  const user = await getAppUser();
  if (!user) return;
  const supabase = await createServerSupabase();
  if (supabase && !user.isGuest) {
    await supabase
      .from(tables.profiles)
      .update({
        xp_total: state.xp,
        streak: state.streak,
        last_active_on: state.lastActiveDay,
        leaderboard_opt_in: state.leaderboardOptIn,
        badges: state.badges,
        completed_activity_ids: state.completedIds,
        daily_key: state.dailyKey,
        weekly_key: state.weeklyKey,
        notify_practice: state.notifyPractice,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    return;
  }
  const cookieStore = await cookies();
  cookieStore.set(GAME_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function recordPracticeWin(input: {
  activityId: string;
  reason: XpReason;
  dailyKey?: string;
  weeklyKey?: string;
}) {
  const user = await getAppUser();
  const current = await getGameState();
  if (!user) return { ok: false as const, state: current };

  const beforeXp = current.xp;
  let state = applyActivity(current, { activityId: input.activityId, reason: input.reason });
  if (input.dailyKey && state.dailyKey !== input.dailyKey) {
    state = applyActivity(state, { activityId: `daily:${input.dailyKey}`, reason: "daily" });
    state = { ...state, dailyKey: input.dailyKey };
  }
  if (input.weeklyKey && state.weeklyKey !== input.weeklyKey) {
    state = applyActivity(state, { activityId: `weekly:${input.weeklyKey}`, reason: "weekly" });
    state = { ...state, weeklyKey: input.weeklyKey };
  }
  if (input.reason === "architectureTopic") {
    state = { ...state, badges: [...new Set([...state.badges, BADGE_IDS.architectureThinker])] };
  }

  const supabase = await createServerSupabase();
  if (supabase && !user.isGuest && state.xp > beforeXp) {
    await supabase.from(tables.xpTransactions).insert({
      user_id: user.id,
      amount: state.xp - beforeXp,
      reason: input.reason,
      activity_id: input.activityId,
    });
  }

  await persist(state);
  revalidatePath("/dashboard");
  revalidatePath("/practice");
  revalidatePath("/leaderboard");
  return { ok: true as const, state };
}

export async function recordTopicXp(topicSlug: string, technologySlug: string) {
  const reason: XpReason = technologySlug === "architecture" ? "architectureTopic" : "completeTopic";
  return recordPracticeWin({ activityId: `topic:${topicSlug}`, reason });
}

export async function setLeaderboardOptIn(optIn: boolean) {
  const state = await getGameState();
  await persist({ ...state, leaderboardOptIn: optIn });
  revalidatePath("/leaderboard");
  revalidatePath("/dashboard");
}
