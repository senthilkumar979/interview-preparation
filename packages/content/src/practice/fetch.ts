import type { PracticeSet } from "./types";

export const fetchPractice: PracticeSet = {
  topicSlug: "javascript-fetch",
  title: "fetch",
  summary: "Promise HTTP, status codes, and AbortController.",
  timedSeconds: 150,
  questions: [
    {
      id: "q1",
      prompt: "When does `fetch` reject the promise?",
      options: [
        { id: "a", label: "Any HTTP status ≥ 400", isCorrect: false },
        { id: "b", label: "Network failure / abort — not 404/500 by default", isCorrect: true },
        { id: "c", label: "Whenever `Content-Type` is not JSON", isCorrect: false },
      ],
      explanation: "HTTP errors are still successful fetches. Check `response.ok` or `status` yourself.",
      seconds: 75,
    },
    {
      id: "q2",
      prompt: "How do you cancel an in-flight `fetch`?",
      options: [
        { id: "a", label: "`fetch.cancel()`", isCorrect: false },
        { id: "b", label: "Pass `signal` from `AbortController` and call `abort()`", isCorrect: true },
        { id: "c", label: "Close the tab’s Service Worker", isCorrect: false },
      ],
      explanation: "`AbortController` is the standard cancellation primitive for fetch and many DOM APIs.",
      seconds: 60,
    },
  ],
  coding: {
    id: "code-ok-json",
    title: "Safe JSON helper",
    prompt:
      "Write `async function getJson(url)` that fetch-es, throws if `!response.ok`, otherwise returns `response.json()`.",
    language: "javascript",
    starter: `export async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
}
`,
    tests: [
      `const orig = globalThis.fetch;
       let called = false;
       globalThis.fetch = async (u) => { called = u === '/x'; return { ok: true, json: async () => ({ a: 1 }) }; };
       const data = await getJson('/x');
       globalThis.fetch = orig;
       if (!called || data.a !== 1) throw new Error('happy path');`,
      `const orig = globalThis.fetch;
       globalThis.fetch = async () => ({ ok: false, status: 404, json: async () => ({}) });
       let threw = false;
       try { await getJson('/missing'); } catch { threw = true; }
       globalThis.fetch = orig;
       if (!threw) throw new Error('must throw on !ok');`,
    ],
  },
  bugFinder: {
    id: "bug-no-ok",
    title: "Bug Finder: silent 500",
    prompt: "What is wrong?",
    language: "javascript",
    snippet: `const data = await fetch('/api').then((r) => r.json());
`,
    options: [
      { id: "b1", label: "500/404 still parse JSON and look like success", isCorrect: true },
      { id: "b2", label: "`fetch` cannot be awaited", isCorrect: false },
      { id: "b3", label: "Should check `r.ok` (or status) before `json()`", isCorrect: true },
    ],
    explanation: "Treat `ok` as part of the contract. Error bodies may not even be JSON.",
  },
};
