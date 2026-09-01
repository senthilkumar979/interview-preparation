import type { Topic } from "../types";

export const asyncTopic: Topic = {
  slug: "javascript-async",
  title: "Async JavaScript",
  technologySlug: "javascript",
  module: "Async JavaScript",
  order: 5,
  summary: "The event loop, promises, async/await, and concurrent requests.",
  prerequisites: ["javascript-closures"],
  related: ["javascript-functions"],
  levels: ["junior", "medior", "senior", "expert"],
  isHighYield: true,
  codeExample: {
    language: "javascript",
    caption: "Microtasks run before the next timer",
    code: `console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("microtask"));

console.log("end");

// start
// end
// microtask
// timeout
`,
  },
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "JavaScript is single-threaded with a concurrency model. Interviews ask you to order logs around promises, timeouts, and microtasks.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "The call stack runs to completion. The event loop drains the microtask queue (promises) before the next macrotask (timers, I/O). `async/await` is syntax over promises.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "UI freezes, race conditions, and 'why did this log first?' questions all sit here. Frontend data fetching is this topic plus HTTP.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "`Promise.then` schedules a microtask. `setTimeout(fn, 0)` is still a macrotask. `await` yields, then continues as a microtask. Unhandled rejections surface as errors.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Prefer `async/await` with try/catch. Use `Promise.all` for independent work, `Promise.allSettled` when you must not fail-fast, and abort controllers for cancellation.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Never swallow errors. Do not `await` in a loop unless the work is sequential. Surface loading and error states at the UI boundary.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Forgetting to return a promise, mixing callbacks with un-awaited promises, and assuming `setTimeout` runs before promise handlers.",
    },
  ],
};
