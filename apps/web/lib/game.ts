import { XP, type XpReason } from "@prepquest/content";

export const GAME_COOKIE = "pq_game";

export const BADGE_IDS = {
  firstBlood: "first-blood",
  bugHunter: "bug-hunter",
  codeRunner: "code-runner",
  streakThree: "streak-three",
  architectureThinker: "architecture-thinker",
} as const;

export interface GameState {
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  badges: string[];
  completedIds: string[];
  dailyKey: string | null;
  weeklyKey: string | null;
  leaderboardOptIn: boolean;
  notifyPractice: boolean;
}

export const emptyGameState = (): GameState => ({
  xp: 0,
  streak: 0,
  lastActiveDay: null,
  badges: [],
  completedIds: [],
  dailyKey: null,
  weeklyKey: null,
  leaderboardOptIn: false,
  notifyPractice: true,
});

export function utcDay(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function previousUtcDay(date = new Date()): string {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() - 1);
  return copy.toISOString().slice(0, 10);
}

export function levelForXp(xp: number): { level: number; into: number; span: number } {
  const span = 150;
  const level = 1 + Math.floor(Math.max(0, xp) / span);
  const into = xp % span;
  return { level, into, span };
}

export function applyActivity(
  state: GameState,
  input: { activityId: string; reason: XpReason; now?: Date },
): GameState {
  if (state.completedIds.includes(input.activityId)) return state;
  const now = input.now ?? new Date();
  const today = utcDay(now);
  const next: GameState = {
    ...state,
    completedIds: [...state.completedIds, input.activityId].slice(-200),
    xp: state.xp + XP[input.reason],
    lastActiveDay: today,
    streak: nextStreak(state, today),
  };
  return { ...next, badges: unique([...next.badges, ...badgesFor(next)]) };
}

function nextStreak(state: GameState, today: string): number {
  if (state.lastActiveDay === today) return Math.max(state.streak, 1);
  if (state.lastActiveDay === previousUtcDay()) return state.streak + 1;
  return 1;
}

function badgesFor(state: GameState): string[] {
  const earned: string[] = [];
  if (state.completedIds.length >= 1) earned.push(BADGE_IDS.firstBlood);
  if (state.completedIds.filter((id) => id.includes(":bug:")).length >= 2) earned.push(BADGE_IDS.bugHunter);
  if (state.completedIds.some((id) => id.includes(":code:"))) earned.push(BADGE_IDS.codeRunner);
  if (state.streak >= 3) earned.push(BADGE_IDS.streakThree);
  return earned;
}

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

export function parseGameState(value: string | undefined): GameState {
  if (!value) return emptyGameState();
  try {
    return { ...emptyGameState(), ...(JSON.parse(value) as Partial<GameState>) };
  } catch {
    return emptyGameState();
  }
}
