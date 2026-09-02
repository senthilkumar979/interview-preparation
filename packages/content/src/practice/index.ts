import { badPracticePacks } from "./bad-practice";
import { bugComponentPack } from "./bugs-component";
import { bugJsPack, bugTsPack } from "./bugs-functions";
import { codingChallenges } from "./coding";
import { quizExpert } from "./quiz-expert";
import { quizJunior } from "./quiz-junior";
import { quizMedior } from "./quiz-medior";
import { quizSenior } from "./quiz-senior";
import { cssTopicQuizzes, htmlTopicQuizzes, javascriptTopicQuizzes } from "./topic-quizzes";
import type { CodingChallenge, FinderPackage, QuizPackage } from "./types";

export const mixedQuizPackages: QuizPackage[] = [quizJunior, quizMedior, quizSenior, quizExpert];
export const quizPackages: QuizPackage[] = [
  ...mixedQuizPackages,
  ...htmlTopicQuizzes,
  ...cssTopicQuizzes,
  ...javascriptTopicQuizzes,
];
export const bugPackages: FinderPackage[] = [bugJsPack, bugTsPack, bugComponentPack];
export const badPracticePackages: FinderPackage[] = badPracticePacks;
export { codingChallenges };

export interface PracticeChallenge {
  key: string;
  title: string;
  href: string;
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

function pickIndex(seed: string, length: number): number {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return Math.abs(hash) % length;
}

export function getQuizPackage(slug: string): QuizPackage | undefined {
  return quizPackages.find((pack) => pack.slug === slug);
}

export function getBugPackage(slug: string): FinderPackage | undefined {
  return bugPackages.find((pack) => pack.slug === slug);
}

export function getBadPracticePackage(slug: string): FinderPackage | undefined {
  return badPracticePackages.find((pack) => pack.slug === slug);
}

export function getCodingChallenge(id: string): CodingChallenge | undefined {
  return codingChallenges.find((item) => item.id === id);
}

export function getDailyChallenge(date = new Date()): PracticeChallenge {
  const key = dayKey(date);
  const pack = mixedQuizPackages[pickIndex(`daily:${key}`, mixedQuizPackages.length)] ?? mixedQuizPackages[0];
  return { key, title: pack.title, href: `/practice/quiz/${pack.slug}?challenge=daily` };
}

export function getWeeklyChallenge(date = new Date()): PracticeChallenge {
  const key = weekKey(date);
  const item = codingChallenges[pickIndex(`weekly:${key}`, codingChallenges.length)] ?? codingChallenges[0];
  return { key, title: item.title, href: `/practice/coding/${item.id}?challenge=weekly` };
}

export function countPracticeActivities(): number {
  const quiz = quizPackages.reduce((sum, pack) => sum + pack.questions.length, 0);
  return quiz + codingChallenges.length;
}

export { XP } from "./types";
export type {
  BugKind,
  CodingChallenge,
  FinderPackage,
  QuizItem,
  QuizPackage,
  QuizTrack,
  RevealExercise,
  XpReason,
} from "./types";
