import type { QuizPackage } from "./types";

export const quizMedior: QuizPackage = {
  slug: "frontend-medior",
  title: "JS runtime and React basics",
  summary: "Closures, fetch, event loop, keys, and controlled inputs.",
  difficulty: "medior",
  track: "mixed",
  topics: ["javascript", "react"],
  questions: [
    {
      id: "m1",
      kind: "mcq",
      prompt: "A closure retains:",
      choices: [
        { id: "a", label: "Only global variables", isCorrect: false },
        { id: "b", label: "The lexical environment where the function was created", isCorrect: true },
        { id: "c", label: "The caller’s `this` forever", isCorrect: false },
      ],
      explanation:
        "A closure is the function plus the lexical environment where it was created. It keeps bindings from that scope alive after the outer function returns—not a snapshot of globals, and not the caller’s `this`.",
    },
    {
      id: "m2",
      kind: "tf",
      prompt: "True or false: `fetch` rejects on HTTP 404.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation:
        "`fetch` only rejects on network failure or abort. HTTP 404 still fulfills with a `Response`; you must check `response.ok` or `status` before parsing.",
    },
    {
      id: "m3",
      kind: "output",
      prompt: "What logs (assume a browser task/microtask model)?",
      code: `console.log('a');
Promise.resolve().then(() => console.log('b'));
console.log('c');`,
      language: "javascript",
      choices: [
        { id: "a", label: "`a` `b` `c`", isCorrect: false },
        { id: "b", label: "`a` `c` `b`", isCorrect: true },
        { id: "c", label: "`b` `a` `c`", isCorrect: false },
      ],
      explanation:
        "Synchronous logs run first (`a`, then `c`). `Promise.then` is a microtask, so `b` runs after the current turn, before the next timer/task.",
    },
    {
      id: "m4",
      kind: "mcq",
      prompt: "Using the array index as `key` in a reorderable list is a problem because:",
      choices: [
        { id: "a", label: "React forbids numbers as keys", isCorrect: false },
        { id: "b", label: "Identity follows position, so state can attach to the wrong row", isCorrect: true },
        { id: "c", label: "Keys must be UUIDs", isCorrect: false },
      ],
      explanation:
        "Keys tell React which child is which. Index keys move with position, so input state can stick to the wrong row after insert/reorder. Use a stable id from data; index is only safe for static lists.",
    },
    {
      id: "m5",
      kind: "tf",
      prompt: "True or false: `useEffect(() => fetch(), [])` runs after the first paint.",
      choices: [
        { id: "t", label: "True", isCorrect: true },
        { id: "f", label: "False", isCorrect: false },
      ],
      explanation:
        "`useEffect` is a passive effect: it runs after paint/commit. An empty dependency array means “after first mount” (Strict Mode may run it twice in development).",
    },
    {
      id: "m6",
      kind: "output",
      prompt: "What is `x`?",
      code: `let x = 0;
const f = () => ++x;
f(); f();`,
      language: "javascript",
      choices: [
        { id: "a", label: "`x` is 2", isCorrect: true },
        { id: "b", label: "`x` is 1", isCorrect: false },
        { id: "c", label: "`x` is 0", isCorrect: false },
      ],
      explanation:
        "`f` closes over the same `x`. Each `++x` mutates that binding, so two calls leave `x` at 2.",
    },
    {
      id: "m7",
      kind: "mcq",
      prompt: "A controlled input in React needs:",
      choices: [
        { id: "a", label: "`value` and `onChange` (or it is read-only)", isCorrect: true },
        { id: "b", label: "`defaultValue` only", isCorrect: false },
        { id: "c", label: "A ref and no state", isCorrect: false },
      ],
      explanation:
        "A controlled input is driven by React state: `value` plus `onChange`. `value` without `onChange` makes the field read-only. `defaultValue` is for uncontrolled fields.",
    },
    {
      id: "m8",
      kind: "tf",
      prompt: "True or false: `useState` updater `setN(n => n+1)` is required when next state depends on previous.",
      choices: [
        { id: "t", label: "True", isCorrect: true },
        { id: "f", label: "False", isCorrect: false },
      ],
      explanation:
        "If the next state depends on the previous state, pass an updater `setN(n => n + 1)`. Using the `n` from the current render twice in one event can both see the same stale value.",
    },
    {
      id: "m9",
      kind: "mcq",
      prompt: "`AbortController` is used with fetch to:",
      choices: [
        { id: "a", label: "Retry 500s automatically", isCorrect: false },
        { id: "b", label: "Cancel the request via `signal` / `abort()`", isCorrect: true },
        { id: "c", label: "Force JSON parsing", isCorrect: false },
      ],
      explanation:
        "Pass `signal: controller.signal` into `fetch`. Call `abort()` (often in effect cleanup) to cancel; the promise rejects with an abort error.",
    },
    {
      id: "m10",
      kind: "output",
      prompt: "What does this print?",
      code: `console.log([1, 2, 3].map((n) => n * 2)[1]);`,
      language: "javascript",
      choices: [
        { id: "a", label: "`2`", isCorrect: false },
        { id: "b", label: "`4`", isCorrect: true },
        { id: "c", label: "`6`", isCorrect: false },
      ],
      explanation:
        "`map` returns `[2, 4, 6]`. Index `1` is the second item, `4`. `map` does not mutate the original array.",
    },
  ],
};
