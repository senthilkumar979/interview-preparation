export type PracticeKind = "question" | "coding" | "html" | "bug" | "bad-practice";

export interface McqOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: McqOption[];
  explanation: string;
  seconds?: number;
}

export interface CodingExercise {
  id: string;
  title: string;
  prompt: string;
  language: "javascript" | "typescript";
  starter: string;
  tests: string[];
}

export interface HtmlCssExercise {
  id: string;
  title: string;
  prompt: string;
  html: string;
  css: string;
  js: string;
}

export interface FinderOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface FinderExercise {
  id: string;
  title: string;
  prompt: string;
  language: "javascript" | "html" | "css";
  snippet: string;
  options: FinderOption[];
  explanation: string;
}

export interface PracticeSet {
  topicSlug: string;
  title: string;
  summary: string;
  timedSeconds: number;
  questions: PracticeQuestion[];
  coding?: CodingExercise;
  preview?: HtmlCssExercise;
  bugFinder?: FinderExercise;
  badPractice?: FinderExercise;
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
