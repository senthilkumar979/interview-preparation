import type { ExperienceLevel } from "@prepquest/content";

export const GUEST_COOKIE = "pq_guest";
export const PROGRESS_COOKIE = "pq_progress";

export interface AppUser {
  id: string;
  displayName: string;
  email: string | null;
  isGuest: boolean;
  roleSlug: string | null;
  technologySlug: string | null;
  experienceLevel: ExperienceLevel | null;
}

export interface ProgressMap {
  [topicSlug: string]: "in_progress" | "completed";
}

export function parseGuest(value: string | undefined): AppUser | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<AppUser>;
    if (!parsed.id) return null;
    return {
      id: parsed.id,
      displayName: parsed.displayName ?? "Learner",
      email: parsed.email ?? null,
      isGuest: true,
      roleSlug: parsed.roleSlug ?? null,
      technologySlug: parsed.technologySlug ?? null,
      experienceLevel: (parsed.experienceLevel as ExperienceLevel) ?? null,
    };
  } catch {
    return null;
  }
}

export function parseProgress(value: string | undefined): ProgressMap {
  if (!value) return {};
  try {
    return JSON.parse(value) as ProgressMap;
  } catch {
    return {};
  }
}
