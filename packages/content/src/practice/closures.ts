import type { PracticeSet } from "./types";

export const closuresPractice: PracticeSet = {
  topicSlug: "javascript-closures",
  title: "Closures",
  summary: "Lexical environment, factory functions, and the classic loop trap.",
  timedSeconds: 180,
  questions: [
    {
      id: "q1",
      prompt: "A closure is a function that retains access to:",
      options: [
        { id: "a", label: "Only its own parameters", isCorrect: false },
        { id: "b", label: "The lexical environment where it was created", isCorrect: true },
        { id: "c", label: "The global object exclusively", isCorrect: false },
        { id: "d", label: "The caller’s `this` forever", isCorrect: false },
      ],
      explanation:
        "The function object keeps a reference to the environment record of the scope in which it was defined, even after that scope has returned.",
      seconds: 90,
    },
    {
      id: "q2",
      prompt: "In `function make() { let n = 0; return () => ++n }` what does each call to `make()` create?",
      options: [
        { id: "a", label: "A shared `n` for all returned functions", isCorrect: false },
        { id: "b", label: "A new environment, so each returned function has its own `n`", isCorrect: true },
        { id: "c", label: "A copy of `n` on the prototype", isCorrect: false },
      ],
      explanation: "Each invocation of `make` allocates a new declarative environment. Closures from different calls do not share `n`.",
      seconds: 90,
    },
  ],
  coding: {
    id: "code-counter",
    title: "Counter factory",
    prompt: "Implement `createCounter(start)` that returns a function incrementing from `start` on each call.",
    language: "javascript",
    starter: `export function createCounter(start) {
  return function () {
    start += 1;
    return start;
  };
}
`,
    tests: [
      "const a = createCounter(0); if (a() !== 1) throw new Error('expected 1'); if (a() !== 2) throw new Error('expected 2');",
      "const b = createCounter(10); if (b() !== 11) throw new Error('independent counters');",
    ],
  },
  bugFinder: {
    id: "bug-var-loop",
    title: "Bug Finder: delayed log",
    prompt: "Select every true statement about this snippet.",
    language: "javascript",
    snippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
`,
    options: [
      { id: "b1", label: "It logs 0, 1, 2", isCorrect: false },
      { id: "b2", label: "It logs 3, 3, 3 because `var` is function-scoped", isCorrect: true },
      { id: "b3", label: "`let` in the loop would close over a per-iteration binding", isCorrect: true },
      { id: "b4", label: "`setTimeout` runs before the loop finishes", isCorrect: false },
    ],
    explanation: "`var i` is one binding. Timeouts run after the loop, so they all read `i === 3`.",
  },
  badPractice: {
    id: "bad-global",
    title: "Bad Practice Finder",
    prompt: "Which choices are real maintainability issues here?",
    language: "javascript",
    snippet: `function attach() {
  counter = 0;
  return () => ++counter;
}
`,
    options: [
      { id: "p1", label: "Implicit global `counter` (missing declaration)", isCorrect: true },
      { id: "p2", label: "Using an arrow function", isCorrect: false },
      { id: "p3", label: "Shared mutable state that is hard to reset or test", isCorrect: true },
      { id: "p4", label: "Returning a function at all", isCorrect: false },
    ],
    explanation: "Undeclared assignment creates (or throws in strict mode) a global. Prefer `let` in the factory so each closure owns its state.",
  },
};
