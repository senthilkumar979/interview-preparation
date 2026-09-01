import { closuresPractice } from "./closures";
import { cssFlexPractice } from "./css-flex";
import { eventLoopPractice } from "./event-loop";
import { fetchPractice } from "./fetch";
import { htmlFormsPractice } from "./html-forms";
import type { PracticeSet } from "./types";

export const practiceSets: PracticeSet[] = [
  closuresPractice,
  fetchPractice,
  eventLoopPractice,
  htmlFormsPractice,
  cssFlexPractice,
];

const byTopic = new Map(practiceSets.map((set) => [set.topicSlug, set]));

export function getPracticeSet(topicSlug: string): PracticeSet | undefined {
  return byTopic.get(topicSlug);
}

export function listPracticeSets(): PracticeSet[] {
  return practiceSets;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function weekKey(date: Date): string {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function pick(seed: string, items: PracticeSet[]): PracticeSet {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  const index = Math.abs(hash) % items.length;
  return items[index] ?? items[0];
}

export function getDailyChallenge(date = new Date()): { key: string; set: PracticeSet } {
  const key = dayKey(date);
  return { key, set: pick(`daily:${key}`, practiceSets) };
}

export function getWeeklyChallenge(date = new Date()): { key: string; set: PracticeSet } {
  const key = weekKey(date);
  const withCode = practiceSets.filter((set) => set.coding);
  return { key, set: pick(`weekly:${key}`, withCode.length ? withCode : practiceSets) };
}

export { XP } from "./types";
export type {
  CodingExercise,
  FinderExercise,
  HtmlCssExercise,
  McqOption,
  PracticeQuestion,
  PracticeSet,
  XpReason,
} from "./types";
