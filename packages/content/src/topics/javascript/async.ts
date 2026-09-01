import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptAsyncTopics: Topic[] = [
  jsTopic({
    slug: "javascript-promise",
    title: "Promises",
    order: 110,
    summary: "A Promise is a placeholder for a future value: pending, fulfilled, or rejected.",
    related: [
      "javascript-promise-then",
      "javascript-async-await",
      "javascript-microtasks",
      "javascript-event-loop",
    ],
    isHighYield: true,
    oneLiner:
      "A Promise represents an async result that starts pending, then settles once to fulfilled or rejected. Handlers run as microtasks.",
    beats: [
      "States: pending → fulfilled (value) or rejected (reason). Settlement is one-way and sticky.",
      "The executor runs synchronously. `.then` / `.catch` schedule microtasks, not the next line.",
      "`new Promise` is for wrapping callbacks. Prefer `async` functions and combinators for orchestration.",
    ],
    intro:
      "Interviews use promises to test whether you can order logs, chain results, and explain why `then` runs after the current stack.",
    why: "Fetch, timers, and almost every UI data path return promises. Wrong mental model produces race bugs and unhandled rejections.",
    concept:
      "A Promise is an object with [[PromiseState]] and [[PromiseResult]]. The executor `(resolve, reject) => {}` runs immediately. Calling `resolve(x)` fulfills (or adopts if `x` is thenable). Calling `reject(e)` rejects. Later `resolve`/`reject` calls are no-ops.",
    how: "`resolve`/`reject` close over the promise. Reactions (`.then` callbacks) enqueue as jobs on the microtask queue. Unhandled rejections fire `unhandledrejection` after the current turn if nothing attached a rejection handler.",
    usage: "Wrap one-shot callbacks (`fs.readFile`, geolocation). Return promises from APIs. Chain transformations instead of nesting callbacks.",
    practices:
      "Always handle rejection at a boundary. Do not nest `new Promise` around an existing promise. Prefer `async`/`await` for sequential work.",
    mistakes:
      "Assuming the executor is async. Forgetting that `throw` in the executor rejects. Calling `resolve` twice expecting two fulfillments. Mixing callbacks that never call `resolve`.",
    code: `const p = new Promise((resolve, reject) => {
  console.log("executor");
  resolve(42);
});
p.then((v) => console.log("then", v));
console.log("sync");
// executor
// sync
// then 42
`,
    examples: [
      {
        id: "sticky",
        title: "Settlement is sticky",
        about: "A second resolve is ignored.",
        language: "javascript",
        code: `const p = new Promise((resolve) => {
  resolve("first");
  resolve("second");
});
p.then(console.log); // "first"
`,
      },
      {
        id: "throw-executor",
        title: "Throw in executor rejects",
        about: "Synchronous throw becomes a rejection.",
        language: "javascript",
        code: `new Promise(() => {
  throw new Error("boom");
}).catch((e) => console.log(e.message)); // boom
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-then",
    title: "Promise.then",
    order: 111,
    summary: "Register fulfillment and optional rejection handlers; each then returns a new promise.",
    prerequisites: ["javascript-promise"],
    related: ["javascript-promise-catch", "javascript-microtasks"],
    oneLiner:
      "`.then(onFulfilled, onRejected)` schedules handlers as microtasks and returns a new promise whose settlement follows the handler’s return or throw.",
    beats: [
      "Both callbacks are optional. Missing `onFulfilled` forwards the value; missing `onRejected` forwards the rejection.",
      "Returning a thenable adopts it. Throwing rejects the next promise. Returning a value fulfills it.",
      "Handlers always run after the current call stack, even if the promise is already settled.",
    ],
    intro: "Chaining is the core interview mechanic: what does the next `.then` receive after a return, throw, or ignored rejection?",
    why: "Wrong chaining swallows errors or races UI updates. Understanding adoption explains flattening nested promises.",
    concept:
      "Each `.then` creates a new promise. If `onFulfilled` returns `x`, the new promise fulfills with `x` (or adopts `x` if thenable). If it throws, the new promise rejects. The original promise is unchanged.",
    how: "When the parent settles, matching reactions enqueue. `then` on an already-settled promise still defers to a microtask. Passing `undefined` as `onFulfilled` is a pass-through.",
    usage: "Map values in a pipeline. Attach a rejection handler as the second argument only when you need recovery at that step.",
    practices:
      "Prefer `.then(onFulfilled).catch(onRejected)` over the two-argument form so later fulfillment errors are not skipped. Keep handlers small and pure.",
    mistakes:
      "Forgetting `.then` returns a new promise. Returning nothing (fulfill with `undefined`). Attaching two-argument `then` and wondering why later throws are unhandled.",
    code: `Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => {
    throw new Error(String(n));
  })
  .then(null, (e) => e.message)
  .then(console.log); // "2"
`,
    examples: [
      {
        id: "already-settled",
        title: "Already settled still async",
        about: "`.then` never runs synchronously.",
        language: "javascript",
        code: `Promise.resolve("done").then((v) => console.log(v));
console.log("now");
// now
// done
`,
      },
      {
        id: "adopt",
        title: "Returning a promise adopts it",
        about: "The chain waits for the inner promise.",
        language: "javascript",
        code: `Promise.resolve(1)
  .then(() => Promise.resolve(2))
  .then(console.log); // 2
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-catch",
    title: "Promise.catch",
    order: 112,
    summary: "`.catch` is `.then(undefined, onRejected)` — recover or observe a rejection.",
    prerequisites: ["javascript-promise-then"],
    related: ["javascript-promise-finally", "javascript-try-catch"],
    oneLiner:
      "`.catch(onRejected)` handles a rejection and returns a new promise that fulfills with the handler’s return value unless the handler throws.",
    beats: [
      "`p.catch(fn)` ≡ `p.then(undefined, fn)`. It does not catch errors thrown in code that already ran synchronously before `p` existed.",
      "A successful catch recovers: later `.then` sees a fulfillment. Re-throw to keep the chain rejected.",
      "Place catch at the boundary. Mid-chain catch swallows unless you rethrow.",
    ],
    intro: "Interviews ask whether a catch “eats” the error and what the next then receives.",
    why: "Empty catch hides production failures. Recovery vs propagation is the whole API.",
    concept:
      "Rejection reactions run as microtasks. If `onRejected` returns `v`, the next promise fulfills with `v`. If it throws, the next promise rejects with that throw.",
    how: "Skip fulfilled promises: catch is a no-op until a rejection appears. After recovery, the chain is fulfilled again.",
    usage: "Log and recover at feature boundaries. Map network errors to UI messages. Do not catch only to `console.log` and continue as success unless that is the product.",
    practices: "Rethrow after logging if you cannot handle it. Prefer `try`/`catch` around `await` in async functions.",
    mistakes:
      "`.catch` after a `.then` that has no return, thinking it catches the then’s throw — it does, if chained on that then’s promise. Attaching catch too late after an unhandled rejection turn.",
    code: `Promise.reject(new Error("net"))
  .catch((e) => {
    console.log("handled", e.message);
    return "fallback";
  })
  .then(console.log); // fallback
`,
    examples: [
      {
        id: "rethrow",
        title: "Rethrow keeps rejection",
        about: "Later catch still runs.",
        language: "javascript",
        code: `Promise.reject("x")
  .catch((e) => {
    console.log("log", e);
    throw e;
  })
  .catch((e) => console.log("again", e));
`,
      },
      {
        id: "skip-fulfill",
        title: "Catch skips fulfillments",
        about: "No rejection → catch handler never runs.",
        language: "javascript",
        code: `Promise.resolve(1)
  .catch(() => 99)
  .then(console.log); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-finally",
    title: "Promise.finally",
    order: 113,
    summary: "Run a side effect when a promise settles, without changing the fulfillment value by default.",
    prerequisites: ["javascript-promise-catch"],
    related: ["javascript-try-catch"],
    oneLiner:
      "`.finally(onFinally)` runs on fulfill or reject. It forwards the original settlement unless `onFinally` throws or returns a rejected thenable.",
    beats: [
      "`onFinally` receives no settlement argument. Use `then`/`catch` when you need the value or reason.",
      "Returning a value from `finally` is ignored; throwing (or returning a rejected promise) replaces the outcome.",
      "It still schedules a microtask. Cleanup (spinners, locks) belongs here.",
    ],
    intro: "Finally is the promise analogue of `try`/`finally`: cleanup that must run either way.",
    why: "Loading flags and abort listeners must clear on both success and failure.",
    concept:
      "The derived promise waits for `onFinally` to finish. If that function completes normally, the original fulfillment value or rejection reason is reused. If it throws, the new promise rejects with that error.",
    how: "Implementation is equivalent to chaining then/catch that rethrow or re-fulfill after the callback. `await` in an async `finally` callback delays forwarding until that promise settles.",
    usage: "`setLoading(false)` after fetch. Close a DB handle. Detach a one-shot listener.",
    practices: "Keep finally side-effect only. Do not hide errors by returning a dummy value — it will not hide them anyway unless you throw/reject.",
    mistakes:
      "Expecting `finally` to receive the value. Assuming a `return 0` in finally replaces the result (it does not). Using finally instead of catch for error mapping.",
    code: `Promise.resolve("ok")
  .finally(() => console.log("cleanup"))
  .then(console.log);
// cleanup
// ok
`,
    examples: [
      {
        id: "throw-finally",
        title: "Throw in finally wins",
        about: "A throw replaces the original fulfillment.",
        language: "javascript",
        code: `Promise.resolve("ok")
  .finally(() => {
    throw new Error("cleanup failed");
  })
  .catch((e) => console.log(e.message)); // cleanup failed
`,
      },
      {
        id: "reject-forward",
        title: "Rejection is forwarded",
        about: "Cleanup still runs.",
        language: "javascript",
        code: `Promise.reject("no")
  .finally(() => console.log("done"))
  .catch(console.log);
// done
// no
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-all",
    title: "Promise.all",
    order: 114,
    summary: "Wait for every promise to fulfill; reject as soon as one rejects.",
    prerequisites: ["javascript-promise"],
    related: ["javascript-promise-allsettled", "javascript-promise-race"],
    isHighYield: true,
    oneLiner:
      "`Promise.all(iterable)` fulfills with an array of results in input order when all fulfill, and rejects with the first rejection (fail-fast).",
    beats: [
      "Result order matches the input, not completion order. Empty input fulfills with `[]`.",
      "A single rejection rejects the whole all; other promises keep running unless you abort them.",
      "Non-promise values are wrapped with `Promise.resolve`.",
    ],
    intro: "The default combinator for independent parallel work: several fetches that must all succeed.",
    why: "Fail-fast is correct for “page cannot render without all pieces.” It is wrong when you must show partial data.",
    concept:
      "The returned promise tracks remaining fulfillments. On first reject, it rejects and ignores later fulfillments. Values are stored by index.",
    how: "Iterate the input, `Promise.resolve` each item, attach then/catch. When the remaining count hits zero, fulfill with the collected array.",
    usage: "Parallel `fetch` of independent resources. `await Promise.all(ids.map(load))` instead of awaiting in a loop when order of start should be concurrent.",
    practices:
      "Pair with `AbortController` if a failure should cancel siblings. Prefer `allSettled` when you need every outcome. Do not use all for a mix of optional and required work.",
    mistakes:
      "Assuming rejection cancels other fetches (it does not). Awaiting in a `for` loop thinking it is `all`. Using all when one 404 should not fail the dashboard.",
    code: `const [a, b] = await Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
]);
console.log(a, b); // A B
`,
    examples: [
      {
        id: "fail-fast",
        title: "First rejection wins",
        about: "Later fulfillments are ignored by all.",
        language: "javascript",
        code: `Promise.all([
  Promise.resolve(1),
  Promise.reject("no"),
  Promise.resolve(3),
]).catch(console.log); // no
`,
      },
      {
        id: "order",
        title: "Order is input order",
        about: "Slow first still lands at index 0.",
        language: "javascript",
        code: `const slow = new Promise((r) => setTimeout(() => r("slow"), 20));
Promise.all([slow, Promise.resolve("fast")]).then(console.log);
// ["slow", "fast"]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-allsettled",
    title: "Promise.allSettled",
    order: 115,
    summary: "Wait until every promise settles; never fail-fast — you get status per item.",
    prerequisites: ["javascript-promise-all"],
    related: ["javascript-promise-any"],
    isHighYield: true,
    oneLiner:
      "`Promise.allSettled(iterable)` fulfills with `{ status, value }` / `{ status, reason }` for each input once all have settled.",
    beats: [
      "The outer promise almost always fulfills (empty input → `[]`). Individual failures are data, not a throw.",
      "Use when you must report every endpoint: dashboards, bulk jobs, “save all tabs.”",
      "Inspect `status === \"fulfilled\"` vs `\"rejected\"`. Do not assume `value` exists on rejects.",
    ],
    intro: "Opposite of fail-fast: you want a complete picture after mixed success.",
    why: "Product often needs partial success. `all` would hide the rest of the results behind one 500.",
    concept:
      "Each input is adopted. When all are settled, the result array preserves input order with a status discriminant.",
    how: "Same remaining-count pattern as `all`, but rejection increments the count and stores `reason` instead of rejecting the outer promise.",
    usage: "Fan-out requests where some may 404. Collect errors for a toast list. Retry only the rejected slots.",
    practices: "Type-narrow on `status`. Combine with timeouts per item. Still abort in-flight work if the user navigates away.",
    mistakes:
      "Treating the outer promise as infallible in older engines (polyfill). Reading `.value` on rejected entries. Using allSettled when a single failure must abort the feature.",
    code: `const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("no")),
]);
console.log(results[0]); // { status: "fulfilled", value: 1 }
console.log(results[1].status); // "rejected"
`,
    examples: [
      {
        id: "narrow",
        title: "Narrow by status",
        about: "Only fulfilled entries have value.",
        language: "javascript",
        code: `const rows = await Promise.allSettled([Promise.resolve(1), Promise.reject("x")]);
const ok = rows.filter((r) => r.status === "fulfilled").map((r) => r.value);
console.log(ok); // [1]
`,
      },
      {
        id: "empty",
        title: "Empty input",
        about: "Fulfills with an empty array.",
        language: "javascript",
        code: `Promise.allSettled([]).then((v) => console.log(v.length)); // 0
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-race",
    title: "Promise.race",
    order: 116,
    summary: "Settle with whichever input settles first — fulfill or reject.",
    prerequisites: ["javascript-promise-all"],
    related: ["javascript-promise-any", "javascript-timers"],
    oneLiner:
      "`Promise.race(iterable)` adopts the first settlement. A timeout race is the classic pattern; losers keep running unless aborted.",
    beats: [
      "First to fulfill or reject wins. Empty iterable stays pending forever.",
      "Losing promises are not cancelled. Pair with `AbortController` for fetch timeouts.",
      "A rejected timer or a fulfilled fetch — whichever happens first — becomes the race result.",
    ],
    intro: "Race is “first done,” not “fastest success.” A quick rejection beats a slow fulfillment.",
    why: "Timeouts, fallbacks, and “first cache or network” all use race. Forgetting cancellation wastes bandwidth.",
    concept:
      "Attach then/catch to each input. The first callback to fire settles the outer promise; later settlements are ignored.",
    how: "`Promise.resolve` each item. Empty list: no settlement path. Non-empty: first job wins.",
    usage: "`Promise.race([fetch(url, { signal }), timeout(ms)])`. First-of-many replica reads.",
    practices: "Abort the rest when one wins. Do not use race to ignore errors — a fast reject is a loss for the whole race.",
    mistakes:
      "Empty `race([])` hanging the UI. Assuming losers stop. Using race when you meant `any` (first fulfillment, ignore rejects until all reject).",
    code: `const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("timeout")), 5),
);
Promise.race([Promise.resolve("ok"), timeout]).then(console.log); // ok
`,
    examples: [
      {
        id: "reject-wins",
        title: "Fast reject beats slow fulfill",
        about: "Race is not “first success.”",
        language: "javascript",
        code: `Promise.race([
  Promise.reject("fast-fail"),
  new Promise((r) => setTimeout(() => r("slow"), 20)),
]).catch(console.log); // fast-fail
`,
      },
      {
        id: "empty",
        title: "Empty race never settles",
        about: "No inputs → pending forever.",
        language: "javascript",
        code: `const p = Promise.race([]);
p.then(() => console.log("never"));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-any",
    title: "Promise.any",
    order: 117,
    summary: "Fulfill with the first fulfillment; reject only if every input rejects (AggregateError).",
    prerequisites: ["javascript-promise-race"],
    related: ["javascript-promise-allsettled"],
    oneLiner:
      "`Promise.any(iterable)` is first-success. All-reject produces `AggregateError` with an `errors` array. Empty input rejects immediately.",
    beats: [
      "Unlike `race`, a rejection does not win while another input can still fulfill.",
      "Empty iterable rejects with `AggregateError`. All rejects → one `AggregateError`.",
      "Use for redundant sources: CDN A or CDN B, primary or fallback cache.",
    ],
    intro: "Any is the combinator when you need one good result and can ignore individual failures until none remain.",
    why: "Failover UX. `race` would take a fast 500 over a slow 200.",
    concept:
      "Track remaining rejections. On first fulfill, fulfill the outer promise. If remaining hits zero without a fulfill, reject with `AggregateError`.",
    how: "Each rejection is stored. `AggregateError.errors` preserves input order of reasons.",
    usage: "Multiple mirror URLs. Optional feature detection that should succeed if any strategy works.",
    practices: "Still abort unused fetches after the first success. Log `error.errors` for diagnostics.",
    mistakes: "Confusing any with race. Catching `AggregateError` as a generic Error without reading `.errors`. Assuming empty any fulfills.",
    code: `const v = await Promise.any([
  Promise.reject("a"),
  Promise.resolve("b"),
]);
console.log(v); // b
`,
    examples: [
      {
        id: "all-reject",
        title: "All reject → AggregateError",
        about: "Inspect `.errors`.",
        language: "javascript",
        code: `Promise.any([Promise.reject("a"), Promise.reject("b")]).catch((e) => {
  console.log(e.name, e.errors); // AggregateError ["a", "b"]
});
`,
      },
      {
        id: "empty",
        title: "Empty any rejects",
        about: "Opposite of all([]).",
        language: "javascript",
        code: `Promise.any([]).catch((e) => console.log(e.name)); // AggregateError
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-resolve",
    title: "Promise.resolve",
    order: 118,
    summary: "Lift a value into a fulfilled promise, or adopt a thenable.",
    prerequisites: ["javascript-promise"],
    related: ["javascript-promise-reject", "javascript-promise-then"],
    oneLiner:
      "`Promise.resolve(x)` returns `x` if it is already a Promise of the same constructor; otherwise wraps `x` or adopts a thenable.",
    beats: [
      "Thenables (`{ then }`) are assimilated: their `then` is called as if it were an executor.",
      "Useful to normalize “value or promise” APIs before chaining.",
      "Does not catch throws in `x` if `x` is computed before the call.",
    ],
    intro: "The standard way to start a chain from a maybe-async value.",
    why: "Helpers that accept sync or async inputs need one code path.",
    concept:
      "If `x` is a promise from the same species, return it. If `x` is thenable, create a new promise and call `x.then(resolve, reject)`. Otherwise fulfill with `x`.",
    how: "Adoption is why returning a promise from `.then` flattens. Malicious thenables can throw; that rejects.",
    usage: "`Promise.resolve(maybePromise).then(...)`. Default values in combinators.",
    practices: "Prefer `async` functions that `return x` (auto-wrap). Use resolve at boundaries that are not already async.",
    mistakes: "Assuming `Promise.resolve(thenable)` is a no-op. Wrapping `new Promise` around `Promise.resolve`.",
    code: `Promise.resolve(1).then(console.log); // 1
Promise.resolve(Promise.resolve(2)).then(console.log); // 2
`,
    examples: [
      {
        id: "thenable",
        title: "Thenable adoption",
        about: "Non-promise with then is still assimilated.",
        language: "javascript",
        code: `const thenable = { then: (resolve) => resolve(3) };
Promise.resolve(thenable).then(console.log); // 3
`,
      },
      {
        id: "undefined",
        title: "Resolve undefined",
        about: "No-arg resolve fulfills with undefined.",
        language: "javascript",
        code: `Promise.resolve().then((v) => console.log(v)); // undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-reject",
    title: "Promise.reject",
    order: 119,
    summary: "Create a promise already rejected with a given reason.",
    prerequisites: ["javascript-promise-resolve"],
    related: ["javascript-promise-catch", "javascript-errors"],
    oneLiner:
      "`Promise.reject(reason)` returns a rejected promise. The reason is usually an Error. Handlers still run as microtasks.",
    beats: [
      "Always async: `Promise.reject(e).catch(fn)` does not run `fn` in the same tick.",
      "Prefer `throw` inside `async` functions; `Promise.reject` is for non-async factories.",
      "Rejecting with a non-Error works but hurts stack traces and `instanceof` checks.",
    ],
    intro: "The dual of resolve. Used in tests, stubs, and early-exit helpers.",
    why: "You need a rejected promise without an executor, or to convert a known failure into the promise world.",
    concept: "Creates a promise, rejects it with `reason`, returns it. No executor runs.",
    how: "Same reaction queue as any other rejection. Unhandled if nothing catches before the end of the turn.",
    usage: "Guard clauses: `if (!id) return Promise.reject(new Error(\"missing\"))`. Mock failed fetch.",
    practices: "Reject with `Error` (or a subclass). Attach `.catch` or return into an async function that awaits.",
    mistakes: "Using reject for control flow that should be a fulfilled `{ ok: false }`. Forgetting it is still a microtask.",
    code: `Promise.reject(new Error("no"))
  .catch((e) => console.log(e.message)); // no
`,
    examples: [
      {
        id: "async-tick",
        title: "Reject is still async",
        about: "Sync log runs first.",
        language: "javascript",
        code: `Promise.reject("x").catch((e) => console.log("catch", e));
console.log("sync");
// sync
// catch x
`,
      },
      {
        id: "async-fn",
        title: "Throw vs Promise.reject",
        about: "Inside async, throw is equivalent.",
        language: "javascript",
        code: `async function f() {
  throw new Error("no");
}
f().catch((e) => console.log(e.message));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-promise-withresolvers",
    title: "Promise.withResolvers",
    order: 120,
    summary: "Get `{ promise, resolve, reject }` without declaring them in an outer let.",
    prerequisites: ["javascript-promise"],
    related: ["javascript-abort-controller"],
    oneLiner:
      "`Promise.withResolvers()` returns a deferred: the promise plus the `resolve`/`reject` functions bound to it (ES2024).",
    beats: [
      "Replaces the `let resolve; new Promise(r => { resolve = r })` pattern.",
      "Useful when settlement is triggered from an event, worker message, or abort listener.",
      "Same one-shot rules: first call wins; later calls are ignored.",
    ],
    intro: "Deferred promises show up in adapters: wait until an EventTarget fires once.",
    why: "Cleaner than leaking resolve into outer scope. Interviews may still write the old pattern; know both.",
    concept:
      "`const { promise, resolve, reject } = Promise.withResolvers()`. `promise` is pending until you call one of the functions.",
    how: "Equivalent to creating a promise and exporting its capability functions. Species follows the constructor you called.",
    usage: "`once(el, \"load\")` helpers. Bridge callbacks to async/await. Coordinate tests.",
    practices: "Always settle (timeout or abort). Do not expose resolve to untrusted code.",
    mistakes: "Calling withResolvers per event without removing listeners. Assuming older browsers have it without a polyfill.",
    code: `const { promise, resolve } = Promise.withResolvers();
queueMicrotask(() => resolve(1));
console.log(await promise); // 1
`,
    examples: [
      {
        id: "event",
        title: "Wait for one event",
        about: "Resolve from a listener.",
        language: "javascript",
        code: `function once(target, type) {
  const { promise, resolve } = Promise.withResolvers();
  target.addEventListener(type, resolve, { once: true });
  return promise;
}
`,
      },
      {
        id: "reject",
        title: "Expose reject",
        about: "Same deferred, failure path.",
        language: "javascript",
        code: `const { promise, reject } = Promise.withResolvers();
reject(new Error("no"));
promise.catch((e) => console.log(e.message));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-fetch",
    title: "fetch",
    order: 121,
    summary: "Browser/Node HTTP API that returns a Promise of a Response — not JSON, not thrown HTTP errors.",
    prerequisites: ["javascript-promise"],
    related: ["javascript-async-await", "javascript-abort-controller", "javascript-axios-vs-fetch"],
    isHighYield: true,
    oneLiner:
      "`fetch(url, init)` fulfills with a `Response` on network success. HTTP 404/500 still fulfill; check `response.ok` or `status`. Body is read via `json()`/`text()` which return more promises.",
    beats: [
      "Only network failure, abort, or CORS/opaque issues reject. Status codes do not reject by default.",
      "`response.json()` consumes the body once. Pass `signal` from `AbortController` to cancel.",
      "`credentials`, `headers`, and `method` live on the init object. `GET` bodies are invalid.",
    ],
    intro: "The interview fetch trap: treating 404 as a thrown error, or forgetting the second await for the body.",
    why: "Every SPA data layer sits on this. Wrong error handling shows as silent empty UI.",
    concept:
      "Fetch is a Web/Node API, not ECMAScript. It returns a promise for `Response`. Headers and body are streams; reading is async and one-shot unless you `clone()`.",
    how: "DNS/TCP/TLS/HTTP complete → fulfill Response. User abort → reject `AbortError` (DOMException). Then `response.json()` parses UTF-8 JSON on a second microtask chain.",
    usage: "`const res = await fetch(url, { signal, headers: { Accept: \"application/json\" } }); if (!res.ok) throw ...; return res.json();`",
    practices:
      "Always check `ok`. Wrap helper `getJson`. Abort on unmount/navigation. Do not parse JSON on empty 204 without a guard.",
    mistakes:
      "`await fetch` then using the Response as data. Assuming reject on 404. Double-reading the body. Forgetting CORS is a reject, not a status.",
    code: `async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}
`,
    examples: [
      {
        id: "not-ok",
        title: "404 fulfills",
        about: "You must check status.",
        language: "javascript",
        code: `const res = await fetch("/missing");
console.log(res.ok, res.status); // false 404
`,
      },
      {
        id: "post",
        title: "JSON POST",
        about: "Set Content-Type and stringify.",
        language: "javascript",
        code: `await fetch("/api/items", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ada" }),
});
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-async-await",
    title: "async / await",
    order: 123,
    summary: "Syntax over promises: async functions always return a Promise; await yields and resumes as a microtask.",
    prerequisites: ["javascript-promise", "javascript-promise-then"],
    related: ["javascript-try-catch", "javascript-microtasks", "javascript-fetch"],
    isHighYield: true,
    oneLiner:
      "`async function` wraps the return value in a promise. `await expr` pauses the function, unwraps fulfillment, and throws on rejection into try/catch.",
    beats: [
      "`await` only works in async functions and modules. It desugars to `.then` continuation.",
      "Sequential `await` in a loop is serial. Parallelize with `Promise.all` when independent.",
      "`return` fulfills; `throw` rejects. `await` of a non-promise wraps via `Promise.resolve`.",
    ],
    intro: "Interviews mix await with timers to test whether you still know the microtask timing.",
    why: "Readable control flow without then-chains, but easy to serialize work by accident.",
    concept:
      "An async function starts executing synchronously until the first await. After await, the rest is a job. The caller receives a promise immediately.",
    how: "`await p` : if `p` fulfills with `v`, resume with `v`. If `p` rejects, resume with throw. try/catch around await catches that throw.",
    usage: "Fetch pipelines, sequential steps that depend on prior results, async event handlers (`async (e) => { ... }`).",
    practices:
      "try/catch at a meaningful boundary. Don’t await in map if you wanted concurrency — map to promises then `all`. Handle the returned promise of async listeners (void or catch).",
    mistakes:
      "Forgetting async on a function that uses await. `await` in a non-async callback. Assuming await is multithreaded. Swallowing errors in async event handlers.",
    code: `async function load() {
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);
  return a + b;
}
load().then(console.log); // 3
`,
    examples: [
      {
        id: "sync-start",
        title: "Runs sync until await",
        about: "Logs before the await are immediate.",
        language: "javascript",
        code: `async function f() {
  console.log("1");
  await Promise.resolve();
  console.log("3");
}
f();
console.log("2");
// 1 2 3
`,
      },
      {
        id: "all-vs-loop",
        title: "all vs serial await",
        about: "Independent work should not wait in a chain.",
        language: "javascript",
        code: `const ids = [1, 2];
const serial = [];
for (const id of ids) serial.push(await Promise.resolve(id));
const parallel = await Promise.all(ids.map((id) => Promise.resolve(id)));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-abort-controller",
    title: "AbortController",
    order: 124,
    summary: "A signal you can abort to cancel fetch and other abortable APIs.",
    prerequisites: ["javascript-fetch"],
    related: ["javascript-promise-race", "javascript-async-await", "javascript-axios-vs-fetch"],
    isHighYield: true,
    oneLiner:
      "`AbortController` exposes `signal`. Pass `{ signal }` to `fetch`. `abort(reason)` rejects in-flight fetch with `AbortError` (or the reason) and is idempotent after the first abort.",
    beats: [
      "One controller can be shared across multiple fetches. Aborting fires `abort` on the signal.",
      "`signal.aborted` and `signal.reason` let you skip starting work. `AbortSignal.timeout(ms)` is a built-in timer abort.",
      "Abort does not magically stop CPU loops — only APIs that observe the signal.",
    ],
    intro: "Cancellation is how you avoid setState-on-unmounted and wasted bandwidth when the user navigates.",
    why: "Race: stale response overwrites fresh UI if you do not abort or ignore the old request.",
    concept:
      "Controller owns a signal. Consumers register abort listeners or pass the signal into fetch/streams. First `abort()` settles those operations; further aborts are no-ops.",
    how: "`fetch` rejects with `DOMException` name `AbortError` unless you pass a custom reason. Catch and ignore abort if it is intentional navigation.",
    usage: "React effect cleanup: `const ac = new AbortController(); fetch(url, { signal: ac.signal }); return () => ac.abort()`. Debounced search.",
    practices:
      "Create a controller per logical operation. Distinguish abort from real errors (`error.name === \"AbortError\"`). Combine signals when needed (`AbortSignal.any`).",
    mistakes:
      "Reusing an aborted controller. Assuming abort stops `Promise.all` siblings that did not get the signal. Catching abort as a toast error.",
    code: `const ac = new AbortController();
const p = fetch("/api/slow", { signal: ac.signal });
ac.abort();
p.catch((e) => console.log(e.name)); // AbortError
`,
    examples: [
      {
        id: "cleanup",
        title: "Abort on cleanup",
        about: "Effect-style pattern.",
        language: "javascript",
        code: `function load(url) {
  const ac = new AbortController();
  const done = fetch(url, { signal: ac.signal });
  return { done, cancel: () => ac.abort() };
}
`,
      },
      {
        id: "already",
        title: "Check aborted first",
        about: "Skip work if the user already cancelled.",
        language: "javascript",
        code: `async function run(signal) {
  if (signal.aborted) throw signal.reason;
  await fetch("/x", { signal });
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-try-catch",
    title: "try / catch / finally",
    order: 125,
    summary: "Synchronous exception handling; with await it also catches promise rejections in async functions.",
    prerequisites: ["javascript-control-flow"],
    related: ["javascript-errors", "javascript-async-await", "javascript-promise-catch"],
    oneLiner:
      "`try`/`catch` catches throw completions in that block. `await` inside try turns rejections into throws. `finally` always runs on the way out.",
    beats: [
      "Only throw completions are caught — not HTTP status, not returned `{ error }`.",
      "`finally` runs on return/throw/break from try or catch. A return in finally overrides an earlier return.",
      "Async: `try { await p }` ≡ `p.then(...).catch` for that await. Errors after the async function returns are not in that try.",
    ],
    intro: "The language’s exception channel. Interviews mix it with promises to see if you await inside the try.",
    why: "Boundaries (JSON.parse, await fetch helpers) need catch. Empty catch is how bugs go silent.",
    concept:
      "Throw sets an abrupt completion. Catch binds the thrown value. Finally runs during unwind. Optional catch binding: `catch { }` ignores the value.",
    how: "Without await, a rejected promise in try is not thrown unless you await or `.then` it. That is the #1 async try/catch bug.",
    usage: "Parse, await, and host APIs that throw. Re-throw after logging. Use finally for locks and loading flags.",
    practices: "Catch narrow, rethrow unknown. Prefer typed errors. Do not use try as a boolean (`try { JSON.parse }`).",
    mistakes:
      "`try { fetch() }` without await. Catch then returning undefined. Returning from finally and losing the original error.",
    code: `async function parse(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    throw new Error("load failed", { cause: e });
  } finally {
    console.log("done");
  }
}
`,
    examples: [
      {
        id: "no-await",
        title: "Forgotten await",
        about: "The try does not see the rejection.",
        language: "javascript",
        code: `async function bad() {
  try {
    Promise.reject(new Error("x"));
  } catch {
    console.log("caught"); // never
  }
}
`,
      },
      {
        id: "finally-return",
        title: "finally return wins",
        about: "Same rule as sync control flow.",
        language: "javascript",
        code: `function f() {
  try {
    return 1;
  } finally {
    return 2;
  }
}
console.log(f()); // 2
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-errors",
    title: "Errors",
    order: 126,
    summary: "Error objects, subclasses, throw values, and error.cause for wrapping.",
    prerequisites: ["javascript-try-catch"],
    related: ["javascript-promise-reject"],
    oneLiner:
      "`Error` has `name`, `message`, and `stack`. Throw any value, but throw `Error` (or a subclass) so `instanceof` and stacks work. `cause` chains the original failure.",
    beats: [
      "`TypeError`, `RangeError`, `SyntaxError`, `URIError`, `ReferenceError` are built-ins. DOM APIs add `DOMException`.",
      "`throw 1` is legal and painful. Prefer `new Error(msg, { cause })`.",
      "`instanceof Error` fails across realms (iframes). Some libraries use `error.name` instead.",
    ],
    intro: "Interviews expect you to distinguish language errors from HTTP and from AbortError.",
    why: "Debugging and telemetry depend on stable shapes. Swallowing non-Errors loses stacks.",
    concept:
      "Error is a constructor. Subclasses set `name`. `Error.captureStackTrace` exists on V8. `cause` is a standard property for wrapping.",
    how: "`throw e` begins unwind. Promise reject uses the same values. `AggregateError` from `Promise.any` holds `.errors`.",
    usage: "Custom `class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }`. Wrap at module boundaries.",
    practices: "Preserve cause. Do not stringify errors for logs only — keep the object. Normalize unknown catch to Error.",
    mistakes: "Throwing strings. Catching everything and sending `e.message` when `e` is a string. Ignoring `AbortError` vs real failures.",
    code: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
throw new HttpError(404, "missing");
`,
    examples: [
      {
        id: "cause",
        title: "Wrap with cause",
        about: "Keep the original error.",
        language: "javascript",
        code: `try {
  JSON.parse("{");
} catch (e) {
  throw new Error("bad json", { cause: e });
}
`,
      },
      {
        id: "abort",
        title: "Detect abort",
        about: "DOMException name.",
        language: "javascript",
        code: `function isAbort(e) {
  return e instanceof DOMException && e.name === "AbortError";
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-timers",
    title: "Timers",
    order: 127,
    summary: "setTimeout, setInterval, setImmediate (Node), and requestAnimationFrame — macrotasks (or rendering).",
    prerequisites: ["javascript-promise"],
    related: ["javascript-macrotasks", "javascript-event-loop"],
    oneLiner:
      "`setTimeout(fn, ms)` schedules a macrotask after at least `ms`. Nested timeouts are clamped. `setInterval` repeats until `clearInterval`. Timers do not run while the stack is busy.",
    beats: [
      "`setTimeout(fn, 0)` is not “next microtask” — it is a later macrotask after the microtask queue drains.",
      "Delay is a minimum. Busy stacks and browser minimums (often 4ms nested) stretch it.",
      "`clearTimeout`/`clearInterval` cancel by id. rAF is vsync-aligned, not a generic timer.",
    ],
    intro: "The classic interview: timeout 0 vs Promise.then. Timeout loses.",
    why: "Debounce, retry backoff, and fake “async” in tests all use timers. Wrong queue → wrong order.",
    concept:
      "Host timer APIs enqueue a task. The event loop runs it when the stack is empty and microtasks are drained. Interval scheduling can coalesce under load.",
    how: "Browser: delay, then task source “timer.” Node: libuv timers phase. `queueMicrotask` is not a timer.",
    usage: "Debounce input. Timeout a race. `setInterval` for polling only with abort/cleanup.",
    practices: "Store ids and clear on unmount. Prefer `AbortSignal.timeout` with fetch. Avoid interval overlap (`await` inside interval without a lock).",
    mistakes:
      "Using timeout 0 to “yield” when you needed `queueMicrotask`. Assuming exact ms. Forgetting clearInterval.",
    code: `const id = setTimeout(() => console.log("later"), 0);
Promise.resolve().then(() => console.log("micro"));
console.log("sync");
// sync
// micro
// later
clearTimeout(id);
`,
    examples: [
      {
        id: "interval",
        title: "Clear interval",
        about: "Stop repeating work.",
        language: "javascript",
        code: `let n = 0;
const id = setInterval(() => {
  n += 1;
  if (n === 3) clearInterval(id);
}, 10);
`,
      },
      {
        id: "raf",
        title: "rAF vs timeout",
        about: "Animation follows frames.",
        language: "javascript",
        code: `requestAnimationFrame((t) => console.log("frame", t));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-microtasks",
    title: "Microtasks",
    order: 128,
    summary: "Promise reactions and queueMicrotask — drained completely before the next macrotask.",
    prerequisites: ["javascript-promise", "javascript-timers"],
    related: ["javascript-macrotasks", "javascript-event-loop"],
    isHighYield: true,
    oneLiner:
      "When the call stack is empty, the event loop runs all microtasks (including ones they enqueue) before taking the next macrotask. Promises and `queueMicrotask` are microtasks; `setTimeout` is not.",
    beats: [
      "A microtask can enqueue more microtasks; the queue drains until empty in that checkpoint.",
      "`MutationObserver`, `queueMicrotask`, and promise then/catch/finally are microtasks in browsers.",
      "Starvation: an infinite microtask chain delays timers and rendering.",
    ],
    intro: "This is the rule that explains every “why did then beat timeout 0?” question.",
    why: "UI fairness vs prompt promise sequencing. You need both queues in your head.",
    concept:
      "HTML: after each task, perform a microtask checkpoint. ECMAScript jobs (promise jobs) feed that queue in browsers/Node.",
    how: "Stack empty → drain microtasks → (maybe render) → next task (timer, I/O, click). Nested `then` in the same drain still runs before the timer.",
    usage: "Defer until after the current stack (`queueMicrotask`) without waiting a timer. Promise combinators.",
    extras: [
      {
        key: "priority-order",
        title: "Where microtasks sit",
        body: "After the current stack (and Node `nextTick` if you are in Node), the engine drains every microtask before it will run a timer, a click handler, or a `postMessage` callback. Nested `then` callbacks scheduled during that drain still run in the same checkpoint. Rendering waits until the checkpoint finishes — an infinite `Promise.resolve().then(loop)` starves paint and timers.",
      },
    ],
    practices: "Do not busy-loop via `Promise.resolve().then(loop)`. Yield with `setTimeout` or `scheduler.yield` when you must paint.",
    mistakes: "Calling promise then “the event loop” as if it were a macrotask. Assuming Node `process.nextTick` is the same as `queueMicrotask` (nextTick is even sooner in Node).",
    code: `queueMicrotask(() => console.log("micro"));
setTimeout(() => console.log("macro"), 0);
Promise.resolve().then(() => console.log("then"));
console.log("sync");
// sync
// micro
// then
// macro
`,
    examples: [
      {
        id: "chain-drain",
        title: "Chained then stays in the drain",
        about: "Both thens beat the timeout.",
        language: "javascript",
        code: `setTimeout(() => console.log("T"), 0);
Promise.resolve()
  .then(() => console.log("A"))
  .then(() => console.log("B"));
// A B T
`,
      },
      {
        id: "queueMicrotask",
        title: "queueMicrotask vs then",
        about: "Same queue, order is enqueue order.",
        language: "javascript",
        code: `queueMicrotask(() => console.log("q"));
Promise.resolve().then(() => console.log("p"));
// q p  (if q was enqueued first)
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-macrotasks",
    title: "Macrotasks",
    order: 129,
    summary: "Tasks from timers, I/O, user events, and message ports — one runs, then microtasks drain.",
    prerequisites: ["javascript-microtasks"],
    related: ["javascript-event-loop", "javascript-timers"],
    oneLiner:
      "A macrotask (HTML “task”) is lower priority than microtasks: it only starts after the previous task’s stack and its microtask drain. Clicks, timeouts, I/O, and `postMessage` are macrotasks.",
    beats: [
      "One task at a time on the JS thread. Long tasks block input and paint.",
      "After a task: microtask checkpoint, then optional rendering, then another task.",
      "MessageChannel / `setTimeout(0)` are ways to schedule a macrotask; they still lose to pending microtasks from the previous task.",
    ],
    intro: "Macrotask is informal for HTML task. Interviews contrast it with microtasks.",
    why: "You schedule work on the right queue: update state in microtasks, yield for paint with a task.",
    concept:
      "Task sources (DOM events, timers, networking) enqueue tasks. The event loop picks one, runs it, then checkpoints microtasks.",
    how: "Click handler runs (task) → promise then from it (micro) → timeout callback (later task).",
    usage: "Break up long work with `setTimeout` chunks. Event handlers. Node I/O callbacks.",
    extras: [
      {
        key: "priority-order",
        title: "Macrotasks are after microtasks",
        body: "Order: current stack → (Node nextTick) → all microtasks → optional rAF/render → one macrotask. Sources of macrotasks: `setTimeout`/`setInterval`, UI events, `fetch` completion as a task in some paths (the Promise still settles as a microtask), `MessageChannel`, `setImmediate` (Node). Two `setTimeout(0)` callbacks are two tasks; any promises the first one queues run before the second timeout.",
      },
    ],
    practices: "Keep tasks short. Do not assume two timeouts of 0 run back-to-back without microtasks in between if the first enqueued any.",
    mistakes: "Calling everything “the event loop” without naming queues. Using macrotasks when you needed microtasks for ordering with promises.",
    code: `console.log("script"); // current task
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("micro"));
// script
// micro
// timer
`,
    examples: [
      {
        id: "two-timeouts",
        title: "Two macrotasks",
        about: "Each timeout is its own task.",
        language: "javascript",
        code: `setTimeout(() => {
  console.log("t1");
  Promise.resolve().then(() => console.log("m1"));
}, 0);
setTimeout(() => console.log("t2"), 0);
// t1 m1 t2
`,
      },
      {
        id: "click",
        title: "Events are tasks",
        about: "A click is not a microtask.",
        language: "javascript",
        code: `button.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("after click stack"));
});
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-event-loop",
    title: "The event loop",
    order: 130,
    summary: "Call stack, Web APIs, microtask queue, macrotask queue — the concurrency model of JS on one thread.",
    prerequisites: ["javascript-microtasks", "javascript-macrotasks"],
    related: ["javascript-promise", "javascript-web-workers"],
    isHighYield: true,
    oneLiner:
      "JavaScript is single-threaded: the event loop runs a task, then drains microtasks, then may render, then takes the next task. Host APIs (timers, fetch, DOM) run off-thread or in the browser and enqueue callbacks.",
    beats: [
      "Call stack runs synchronously to completion. Host work is outside the stack.",
      "Microtasks (promises) drain before the next macrotask (timers, I/O, events).",
      "Workers have their own event loop. The main thread is still one JS stack.",
    ],
    intro: "The diagram is the whole interview: stack, Web APIs, queues, loop. Draw it and order the logs.",
    why: "Race conditions, jank, and “random” log order are event-loop questions wearing other hats.",
    concept:
      "Execution contexts push/pop the stack. When empty, the loop takes a macrotask, runs it, then a microtask checkpoint. Rendering is typically between tasks, not between microtasks.",
    how: "`fetch` is handed to the host; when the response is ready, a task or promise job is queued. `await` continues as a microtask. `setTimeout` as a timer task.",
    usage: "Predict output of mixed logs. Choose queue for deferral. Explain why a tight loop freezes UI.",
    extras: [
      {
        key: "priority-order",
        title: "Priority order (what runs first)",
        body: "1. The current call stack — all synchronous JS until it returns, including nested function calls.\n\n2. Node-only: `process.nextTick` — runs before Promise jobs on Node. Browsers do not have this queue.\n\n3. Microtasks — `queueMicrotask`, Promise `then`/`catch`/`finally`, `await` resumptions, `MutationObserver`. The checkpoint drains until empty, including micros scheduled during the drain.\n\n4. Rendering — style, layout, paint, and `requestAnimationFrame`. Usually between tasks, not between two microtasks in the same checkpoint.\n\n5. The next macrotask (HTML task) — one of: timers (`setTimeout`/`setInterval`), UI events, networking/I/O, `postMessage`/`MessageChannel`, `setImmediate` (Node). Then return to step 3.\n\nMnemonic: sync → all micros → maybe paint → one task → all micros again. `setTimeout(fn, 0)` is never “before then”.",
      },
    ],
    practices:
      "Do not block the stack. Yield long work. Know Node’s phases differ in detail but the promise-vs-timeout rule still holds.",
    mistakes:
      "Thinking JS is multi-threaded because fetch is concurrent. Putting promise then after timeout in the expected log order. Ignoring that microtasks can starve rendering.",
    code: `console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("end");
// start
// end
// microtask
// timeout
`,
    figures: [
      {
        src: "/diagrams/js/js-event-loop.png",
        alt: "Call stack, Web APIs, microtask queue, macrotask queue, event loop",
        caption: "The event loop",
      },
      {
        src: "/diagrams/js/js-task-priority.png",
        alt: "Priority: call stack, then microtasks, then rendering, then macrotasks",
        caption: "Priority order",
      },
    ],
    examples: [
      {
        id: "await-timeout",
        title: "await vs timeout",
        about: "Resume after await is a microtask.",
        language: "javascript",
        code: `setTimeout(() => console.log("T"), 0);
(async () => {
  await Promise.resolve();
  console.log("A");
})();
// A T
`,
      },
      {
        id: "nested-micro",
        title: "Nested microtasks first",
        about: "Drain until empty.",
        language: "javascript",
        code: `setTimeout(() => console.log("M"), 0);
Promise.resolve().then(() => {
  Promise.resolve().then(() => console.log("m2"));
  console.log("m1");
});
// m1 m2 M
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-dates",
    title: "Dates",
    order: 131,
    summary: "Date is a timestamp plus local/UTC display; parsing and time zones are the usual bugs.",
    related: ["javascript-timers"],
    oneLiner:
      "`Date` stores milliseconds since Unix epoch UTC. Local getters (`getHours`) use the host time zone; ISO strings without a zone are implementation-defined for date-only forms.",
    beats: [
      "`Date.now()` and `+date` are epoch ms. `new Date(string)` parsing is a minefield — prefer ISO with `Z` or a library.",
      "`getMonth()` is 0-based. `getDay()` is weekday, `getDate()` is day of month.",
      "`Temporal` is the modern API; `Date` remains ubiquitous in interviews and codebases.",
    ],
    intro: "Off-by-one months and UTC vs local are classic traps.",
    why: "Scheduling, cookies, and logs all go wrong at DST and parse edges.",
    concept:
      "An instant (ms) plus formatting in a zone. Invalid dates are `NaN` time values (`isNaN(date.getTime())`).",
    how: "`new Date(y, m, d)` is local. `Date.UTC` is UTC. `toISOString` is always UTC `Z`.",
    usage: "Store UTC in APIs. Format with `Intl.DateTimeFormat` for display. Prefer ISO instants with Z over date-only strings.",
    practices: "Do not roll your own TZ math. Validate `getTime()`. Use Temporal when available for calendars.",
    mistakes: "`getMonth() + 1` forgotten. Comparing dates with `==`. `new Date(2024, 12, 1)` overflowing to next year.",
    code: `const d = new Date("2024-06-01T00:00:00Z");
console.log(d.toISOString());
console.log(d.getUTCMonth()); // 5
console.log(d.getMonth()); // host-local month
`,
    examples: [
      {
        id: "invalid",
        title: "Invalid Date",
        about: "Check the time value.",
        language: "javascript",
        code: `const bad = new Date("not a date");
console.log(Number.isNaN(bad.getTime())); // true
`,
      },
      {
        id: "zero-month",
        title: "Zero-based month",
        about: "January is 0.",
        language: "javascript",
        code: `console.log(new Date(2024, 0, 1).getMonth()); // 0
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-console",
    title: "console",
    order: 132,
    summary: "Host logging: log, warn, error, table, time, and that objects may be live in DevTools.",
    related: ["javascript-errors"],
    oneLiner:
      "`console` is a host object. `log`/`info`/`warn`/`error` differ in level. DevTools may show object previews by reference, so later mutations look like they happened at log time.",
    beats: [
      "`console.log(obj)` does not freeze `obj`. Clone if you need a snapshot (`structuredClone` or JSON).",
      "`console.time`/`timeEnd` and `count` are for quick profiling, not production metrics.",
      "`console.trace` prints a stack. `assert` logs on falsy without throwing.",
    ],
    intro: "Not part of ECMA-262, but every interview uses it to show output.",
    why: "Misleading live previews waste debug time. Left-in logs leak PII.",
    concept: "Methods write to a stream or inspector. Format specifiers (`%s`, `%o`) exist in browsers.",
    how: "Engines store a reference for objects. Primitives are copied into the message.",
    usage: "Temporary debug. `error` for real failures. `table` for arrays of objects.",
    practices: "Strip or gate logs in production. Snapshot objects. Prefer a logger with levels in apps.",
    mistakes: "Trusting expanded object as historical. `console.log` as error handling. Logging secrets.",
    code: `const user = { n: 1 };
console.log(user);
user.n = 2; // inspector may show n: 2 when you expand
console.log(structuredClone(user));
`,
    examples: [
      {
        id: "time",
        title: "time / timeEnd",
        about: "Named timers.",
        language: "javascript",
        code: `console.time("x");
console.timeEnd("x");
`,
      },
      {
        id: "assert",
        title: "assert does not throw",
        about: "Falsy logs an error-level message.",
        language: "javascript",
        code: `console.assert(1 === 2, "math is broken");
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-modules",
    title: "Modules",
    order: 133,
    summary: "ES modules: static import/export, live bindings, strict by default, deferred execution.",
    related: ["javascript-promise", "javascript-event-loop"],
    isHighYield: true,
    oneLiner:
      "ES modules are files with `import`/`export`. They are strict, scoped, cached as a singleton graph, and `export` creates live bindings — not copies.",
    beats: [
      "Static `import` is hoisted and evaluated before the module body that uses it. `import()` is dynamic and returns a Promise.",
      "Live bindings: when the exporter assigns, importers see the new value. `export default` is still a binding.",
      "`type=\"module\"` in browsers defers and uses CORS for cross-origin. Circular imports can see temporal dead zone values.",
    ],
    intro: "Modules replaced globals and IIFEs. Interviews probe live bindings vs CommonJS copies.",
    why: "Tree-shaking, circular deps, and “why is my export undefined?” all live here.",
    concept:
      "A module record has environment, exports, and status (unlinked → evaluating → evaluated). Instantiation links bindings; evaluation runs bodies depth-first after dependencies.",
    how: "Static imports must be top-level. Dynamic `import()` is a microtask-fulfilling promise of the module namespace. `export { x as y }`.",
    usage: "One module per concern. `import type` is TypeScript only. Node: `\"type\": \"module\"` or `.mjs`.",
    practices:
      "Avoid cycles; if needed, import after functions run. Prefer named exports for refactoring. Do not mutate imported objects as a public API.",
    mistakes:
      "Assuming `import { x }` copied `x`. Using `require` semantics in ESM. Dynamic import without handling the promise. Expecting `this` at top level to be `window` in modules (`this` is `undefined`).",
    code: `// math.js
export let n = 1;
export function inc() {
  n += 1;
}

// app.js
import { n, inc } from "./math.js";
inc();
console.log(n); // 2 — live binding
`,
    examples: [
      {
        id: "dynamic",
        title: "Dynamic import",
        about: "Code-split; returns a namespace object.",
        language: "javascript",
        code: `const { inc } = await import("./math.js");
inc();
`,
      },
      {
        id: "default",
        title: "Default vs named",
        about: "Default is one binding named default.",
        language: "javascript",
        code: `export default function add(a, b) {
  return a + b;
}
import add from "./math.js";
`,
      },
    ],
  }),
];
