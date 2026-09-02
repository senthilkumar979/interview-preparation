import type { QuizPackage } from "./types";

export const quizExpert: QuizPackage = {
  slug: "frontend-expert",
  title: "Runtime, types, and concurrent React",
  summary: "Microtasks vs tasks, `this`, TS narrowing, transitions.",
  difficulty: "expert",
  track: "mixed",
  topics: ["javascript", "typescript", "react"],
  questions: [
    {
      id: "e1",
      kind: "mcq",
      prompt: "A recursive `Promise.resolve().then(flood)` primarily risks:",
      choices: [
        { id: "a", label: "Starving macrotasks (timers, rendering)", isCorrect: true },
        { id: "b", label: "Skipping microtasks forever", isCorrect: false },
        { id: "c", label: "Forcing layout on SVG only", isCorrect: false },
      ],
      explanation: "The microtask queue drains before the next task. Yield with `setTimeout`/`rAF`.",
    },
    {
      id: "e2",
      kind: "output",
      prompt: "What is logged?",
      code: `const obj = {
  n: 1,
  f() { return this.n; },
};
const g = obj.f;
console.log(g());`,
      language: "javascript",
      choices: [
        { id: "a", label: "`1`", isCorrect: false },
        { id: "b", label: "`undefined` (or throws in strict) because `this` is not `obj`", isCorrect: true },
        { id: "c", label: "`NaN`", isCorrect: false },
      ],
      explanation: "Method extraction loses `this`. Use `obj.f()` or `g.bind(obj)`.",
    },
    {
      id: "e3",
      kind: "tf",
      prompt: "True or false: TypeScript `as` assertions are checked at runtime.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation: "Erase at emit. Narrow with actual checks.",
    },
    {
      id: "e4",
      kind: "mcq",
      prompt: "`startTransition` is for:",
      choices: [
        { id: "a", label: "Urgent typed input", isCorrect: false },
        { id: "b", label: "Non-urgent updates that may be interrupted", isCorrect: true },
        { id: "c", label: "Replacing `useEffect`", isCorrect: false },
      ],
      explanation: "Keep controlled inputs urgent; wrap heavy filters/navigation.",
    },
    {
      id: "e5",
      kind: "output",
      prompt: "Result of `Object.is(-0, 0)`?",
      choices: [
        { id: "a", label: "`true`", isCorrect: false },
        { id: "b", label: "`false`", isCorrect: true },
      ],
      explanation: "`Object.is` distinguishes `-0`/`0` and treats `NaN` as equal to `NaN`.",
    },
    {
      id: "e6",
      kind: "mcq",
      prompt: "`unknown` vs `any` in TypeScript:",
      choices: [
        { id: "a", label: "`unknown` requires narrowing before use; `any` does not", isCorrect: true },
        { id: "b", label: "They are identical at compile time", isCorrect: false },
        { id: "c", label: "`any` is safer", isCorrect: false },
      ],
      explanation: "Prefer `unknown` at boundaries.",
    },
    {
      id: "e7",
      kind: "tf",
      prompt: "True or false: React 18 `useId` is a valid list `key`.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation: "`useId` is for a11y/SSR identity, not list reconciliation. Keys come from data.",
    },
    {
      id: "e8",
      kind: "mcq",
      prompt: "`queueMicrotask` vs `setTimeout(fn, 0)`:",
      choices: [
        { id: "a", label: "Microtask runs before the next macrotask", isCorrect: true },
        { id: "b", label: "Timeout always wins", isCorrect: false },
        { id: "c", label: "They are the same queue", isCorrect: false },
      ],
      explanation: "Promise jobs and `queueMicrotask` drain first.",
    },
    {
      id: "e9",
      kind: "output",
      prompt: "What prints?",
      code: `console.log(JSON.stringify({ a: undefined, b: 1 }));`,
      language: "javascript",
      choices: [
        { id: "a", label: "`{\"a\":null,\"b\":1}`", isCorrect: false },
        { id: "b", label: "`{\"b\":1}`", isCorrect: true },
        { id: "c", label: "`{\"a\":undefined,\"b\":1}`", isCorrect: false },
      ],
      explanation: "`undefined` values are omitted in objects (arrays become `null`).",
    },
    {
      id: "e10",
      kind: "mcq",
      prompt: "Server Components (RSC) cannot:",
      choices: [
        { id: "a", label: "Use `async`/`await` for data", isCorrect: false },
        { id: "b", label: "Use `useState` or event handlers in that module", isCorrect: true },
        { id: "c", label: "Import a Client Component child", isCorrect: false },
      ],
      explanation: "Hooks and interactivity live in Client Components (`use client`).",
    },
  ],
};
