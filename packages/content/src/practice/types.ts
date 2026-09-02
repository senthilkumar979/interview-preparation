import type { ExperienceLevel } from "../types";

export type QuizKind = "mcq" | "tf" | "output";

export interface QuizChoice {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface QuizItem {
  id: string;
  kind: QuizKind;
  prompt: string;
  code?: string;
  language?: "javascript" | "typescript" | "html" | "css";
  choices: QuizChoice[];
  explanation: string;
}

export type QuizTrack = "html" | "css" | "javascript" | "mixed";

export interface QuizPackage {
  slug: string;
  title: string;
  summary: string;
  difficulty: ExperienceLevel;
  track: QuizTrack;
  topics: string[];
  questions: QuizItem[];
}

export type BugKind = "js-function" | "ts-function" | "component";

export interface RevealExercise {
  id: string;
  title: string;
  kind: BugKind;
  language: "javascript" | "typescript";
  snippet: string;
  answers: string[];
}

export interface FinderPackage {
  slug: string;
  title: string;
  summary: string;
  kind: BugKind;
  items: RevealExercise[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  prompt: string;
  minutes: number;
  language: "javascript" | "typescript";
  starter: string;
  tests: string[];
  solution: string;
}

export const XP = {
  read: 5,
  completeTopic: 10,
  architectureTopic: 40,
  correctAnswer: 15,
  coding: 30,
  bug: 25,
  badPractice: 25,
  daily: 25,
  weekly: 100,
} as const;

export type XpReason = keyof typeof XP;
