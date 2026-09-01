import type { PracticeSet } from "./types";

export const eventLoopPractice: PracticeSet = {
  topicSlug: "javascript-event-loop",
  title: "Event loop",
  summary: "Call stack, microtasks, and macrotasks.",
  timedSeconds: 120,
  questions: [
    {
      id: "q1",
      prompt: "After the current stack clears, which runs first?",
      options: [
        { id: "a", label: "All `setTimeout(0)` callbacks, then Promise jobs", isCorrect: false },
        { id: "b", label: "Microtasks (Promise jobs, queueMicrotask), then rendering/macrotasks", isCorrect: true },
        { id: "c", label: "RequestAnimationFrame always before microtasks", isCorrect: false },
      ],
      explanation: "HTML/whatwg: checkpoint microtask queue after each task, before the next macrotask.",
      seconds: 90,
    },
  ],
  coding: {
    id: "code-order",
    title: "Predict and encode order",
    prompt:
      "Return an array `order()` that records this sequence using push: sync, then microtask, then timeout. Implement by scheduling those three and returning the array (tests wait a tick).",
    language: "javascript",
    starter: `export function order() {
  const out = [];
  out.push('sync');
  queueMicrotask(() => out.push('micro'));
  setTimeout(() => out.push('macro'), 0);
  return out;
}
`,
    tests: [
      `const out = order();
       if (out[0] !== 'sync') throw new Error('sync first');
       await Promise.resolve();
       if (!out.includes('micro')) throw new Error('micro');
       await new Promise((r) => setTimeout(r, 20));
       if (out.join(',') !== 'sync,micro,macro') throw new Error(out.join(','));`,
    ],
  },
  bugFinder: {
    id: "bug-starve",
    title: "Bug Finder: microtask flood",
    prompt: "Select accurate risks.",
    language: "javascript",
    snippet: `function flood() {
  Promise.resolve().then(flood);
}
flood();
`,
    options: [
      { id: "b1", label: "Macrotasks (paints, timers) can be starved", isCorrect: true },
      { id: "b2", label: "This is the recommended animation loop", isCorrect: false },
      { id: "b3", label: "A recursive microtask never returns to the event loop’s next task", isCorrect: true },
    ],
    explanation: "Keep microtask work bounded. Use `setTimeout`/`rAF` to yield.",
  },
};
