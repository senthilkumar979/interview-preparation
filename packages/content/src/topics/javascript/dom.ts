import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptDomTopics: Topic[] = [
  jsTopic({
    slug: "javascript-dom",
    title: "The DOM",
    order: 134,
    summary: "The Document Object Model: a live tree of nodes the browser builds from HTML and JS mutates.",
    related: ["javascript-bom", "javascript-event-listener"],
    oneLiner:
      "The DOM is a live tree of `Node`s (`Document`, `Element`, `Text`). Querying returns live or static collections depending on the API; mutations reflow layout.",
    beats: [
      "`document` is the root. `querySelector` returns one element or `null`; `querySelectorAll` returns a static `NodeList`.",
      "`getElementsBy*` collections are live — they update as the tree changes. `childNodes` includes text; `children` is elements only.",
      "The DOM is not HTML text. Serializing (`innerHTML`) and parsing are lossy around scripts and user input (XSS).",
    ],
    intro: "Vanilla interviews start with selecting nodes and mutating them without a framework.",
    why: "Every UI library diffs down to DOM writes. Knowing live vs static lists and reflow avoids jank and stale node bugs.",
    concept:
      "HTML is parsed into a tree. Each node has parent/child/sibling pointers. Attributes vs properties (`getAttribute` vs `.value`) can diverge for inputs.",
    how: "`querySelector` uses CSS selectors. `createElement` + `append` builds nodes. `textContent` is text-only; `innerHTML` parses markup.",
    usage: "Widgets, interview exercises, understanding React `ref`s. Prefer `textContent` when you do not need HTML.",
    practices:
      "Cache queries outside hot loops. Batch DOM writes. Use `classList`, not string `className` concat. Sanitize any HTML you assign.",
    mistakes:
      "Assuming `querySelectorAll` is live. Forgetting `null` checks. Building HTML with untrusted strings. Confusing `NodeList` with `Array` (spread or `Array.from`).",
    code: `const el = document.querySelector("#status");
el?.classList.add("ready");
el && (el.textContent = "ok");
`,
    examples: [
      {
        id: "live",
        title: "Live HTMLCollection",
        about: "`getElementsByClassName` updates as you add nodes.",
        language: "javascript",
        code: `const live = document.getElementsByClassName("item");
const n = live.length;
document.body.append(Object.assign(document.createElement("div"), { className: "item" }));
console.log(live.length === n + 1); // true
`,
      },
      {
        id: "static",
        title: "Static NodeList",
        about: "`querySelectorAll` does not grow.",
        language: "javascript",
        code: `const snap = document.querySelectorAll(".item");
const n = snap.length;
document.body.append(Object.assign(document.createElement("div"), { className: "item" }));
console.log(snap.length === n); // true
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-bom",
    title: "The BOM",
    order: 135,
    summary: "Browser Object Model: window, location, history, navigator, screen — host objects around the document.",
    prerequisites: ["javascript-dom"],
    related: ["javascript-timers", "javascript-fetch", "javascript-storage"],
    oneLiner:
      "The BOM is the browser’s window-level APIs: `location`, `history`, `navigator`, `screen`, frames. `window` is the global object in classic scripts.",
    beats: [
      "`location` is navigation; assigning `location.href` loads a URL. `history.pushState` changes the URL without a full load.",
      "`navigator.userAgent` is spoofable; prefer feature detection. `navigator.clipboard` is permissioned.",
      "In ES modules, top-level `this` is `undefined`; still use `window`/`globalThis` for BOM.",
    ],
    intro: "DOM is the document tree. BOM is everything else on `window` that is not layout.",
    why: "Routing, analytics, and “is this a browser?” checks sit on BOM objects.",
    concept:
      "Host-defined objects on the Window. `globalThis` is the portable global. Node has no BOM (no `window`/`document` unless you polyfill).",
    how: "`location.assign` vs `replace` (replace skips history). `history.back`. `window.open` may be blocked.",
    usage: "Read `location.search`. `history.pushState` for SPAs. `matchMedia` for viewport (often grouped with BOM/CSSOM).",
    practices: "Do not use UA sniffing. Guard `window` for SSR. Prefer `globalThis` in isomorphic code.",
    mistakes: "Treating `document` as BOM. Assuming `window` exists in workers (`self` / `globalThis`; no `document`). Confusing `location` object with a string.",
    code: `console.log(location.pathname);
history.pushState({ t: 1 }, "", "/app");
console.log(navigator.language);
`,
    examples: [
      {
        id: "globalthis",
        title: "globalThis",
        about: "Works in window, worker, and Node.",
        language: "javascript",
        code: `const g = globalThis;
console.log(g === window); // true in a window
`,
      },
      {
        id: "search",
        title: "Query string",
        about: "`URLSearchParams` over `location.search`.",
        language: "javascript",
        code: `const q = new URLSearchParams(location.search);
console.log(q.get("id"));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-event-listener",
    title: "addEventListener",
    order: 136,
    summary: "Register handlers on EventTargets with capture option, once, and AbortSignal.",
    prerequisites: ["javascript-dom"],
    related: ["javascript-event-propagation", "javascript-abort-controller"],
    oneLiner:
      "`addEventListener(type, listener, options)` registers on an EventTarget. The same function reference is required to `removeEventListener`. Options: `capture`, `once`, `passive`, `signal`.",
    beats: [
      "Anonymous functions cannot be removed. `once: true` self-removes after one call.",
      "`signal` from `AbortController` removes the listener on abort — the modern cleanup path.",
      "Third argument `true` is capture. Object `{ capture: true }` is equivalent.",
    ],
    intro: "The DOM event API interviews actually want — not `onclick` properties.",
    why: "Leaked listeners freeze detached trees in memory. Wrong capture flag misses events.",
    concept:
      "EventTarget maintains listener lists per type and phase. The listener can be a function or object with `handleEvent`.",
    how: "Dispatch walks the path (see propagation). Each matching listener is invoked with the `Event`. `event.target` is the origin; `currentTarget` is the node whose listener is running.",
    usage: "Clicks, submit, `DOMContentLoaded`, custom events. Abort on component unmount.",
    practices: "Use `{ signal }` or store the function. Prefer `listen` helpers. `passive: true` on touch/wheel for scroll performance.",
    mistakes:
      "Adding a new arrow each render without remove. Removing a bound wrapper that is not the added reference. Using `onclick` and `addEventListener` and wondering about order.",
    code: `const ac = new AbortController();
button.addEventListener("click", (e) => {
  console.log(e.currentTarget);
}, { signal: ac.signal });
ac.abort(); // listener gone
`,
    examples: [
      {
        id: "once",
        title: "once",
        about: "Fires a single time.",
        language: "javascript",
        code: `el.addEventListener("click", () => console.log("once"), { once: true });
`,
      },
      {
        id: "handleEvent",
        title: "handleEvent object",
        about: "`this` is the object.",
        language: "javascript",
        code: `const h = {
  handleEvent(e) {
    console.log(e.type, this);
  },
};
el.addEventListener("click", h);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-event-propagation",
    title: "Event propagation",
    order: 137,
    summary: "Capture phase down the tree, target phase, then bubble phase up — unless stopped.",
    prerequisites: ["javascript-event-listener"],
    related: ["javascript-event-bubbling", "javascript-event-capturing"],
    oneLiner:
      "Dispatch: capturing listeners from window toward the target, then target listeners, then bubbling listeners back toward window. `stopPropagation` cuts the rest of the path; `stopImmediatePropagation` also skips remaining listeners on the current node.",
    beats: [
      "Order: capture (root → target) → target → bubble (target → root). Not all events bubble (`focus` historically does not; `focusin` does).",
      "`event.eventPhase` is CAPTURING_PHASE, AT_TARGET, or BUBBLING_PHASE. At target, both capture and bubble listeners run (capture first if both registered).",
      "`preventDefault` is not stopPropagation — it cancels default action if `cancelable`.",
    ],
    intro: "Draw the tree and walk the path. That is the interview.",
    why: "Delegation, overlay click-outside, and “why did parent see this?” all require the three phases.",
    concept:
      "The event path is a list of ancestors computed at dispatch (shadow DOM retargets). Listeners are invoked along that path in phase order.",
    how: "`dispatchEvent` on a node. Capture listeners with `{ capture: true }`. Bubble is the default for bubbling events.",
    usage: "Delegation on a parent in bubble phase. Intercept in capture for overlays that must win.",
    practices: "Know which events bubble. Use `stopPropagation` sparingly — it breaks unrelated listeners. Prefer `stopImmediatePropagation` only when you own the node.",
    mistakes:
      "Thinking capture runs after bubble. Stopping propagation to “fix” bubbling instead of checking `target`. Forgetting target-phase listeners on the target itself.",
    code: `parent.addEventListener("click", () => console.log("bubble"), false);
parent.addEventListener("click", () => console.log("capture"), true);
child.click();
// capture then target handlers then bubble
`,
    figures: [
      {
        src: "/diagrams/js/js-event-propagation.png",
        alt: "Capture phase down the DOM, target phase, bubble phase up",
        caption: "Event propagation",
      },
    ],
    examples: [
      {
        id: "stop",
        title: "stopPropagation",
        about: "Parent bubble listener does not run.",
        language: "javascript",
        code: `child.addEventListener("click", (e) => e.stopPropagation());
parent.addEventListener("click", () => console.log("parent"));
child.click(); // parent silent
`,
      },
      {
        id: "phase",
        title: "eventPhase on target",
        about: "At target, phase is AT_TARGET for both capture and bubble registrations.",
        language: "javascript",
        code: `el.addEventListener("click", (e) => console.log(e.eventPhase), true);
el.addEventListener("click", (e) => console.log(e.eventPhase), false);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-event-bubbling",
    title: "Event bubbling",
    order: 138,
    summary: "After the target phase, the event travels from the target up through ancestors.",
    prerequisites: ["javascript-event-propagation"],
    related: ["javascript-event-capturing", "javascript-event-listener"],
    isHighYield: true,
    oneLiner:
      "Bubbling is the upward phase: listeners on ancestors see the event if it bubbles and nothing stopped it. Delegation relies on `event.target` vs `currentTarget`.",
    beats: [
      "Default `addEventListener` is bubble phase (`capture: false`).",
      "Delegation: one listener on a parent, branch on `event.target.closest(selector)`.",
      "Some events do not bubble; check MDN (`submit` bubbles, `focus` does not, `focusin` does).",
    ],
    intro: "Delegation is the high-yield bubbling application: lists that add rows without new listeners.",
    why: "Fewer listeners, works for future children, and is how many design systems handle clicks.",
    concept:
      "After target phase, the engine walks the path toward the root invoking non-capture listeners. `event.target` stays the origin node.",
    how: "`parent.addEventListener(\"click\", handler)`. Inside, `if (!(e.target instanceof Element)) return; const row = e.target.closest(\"li\")`.",
    usage: "Table rows, menus, document-level click-outside (`if (!root.contains(e.target))`).",
    practices: "Delegate on a stable parent. Use `closest`, not only `=== e.target` (clicks on children). Remove the parent listener on teardown.",
    mistakes:
      "Delegating a non-bubbling event. Comparing `target` to a button when the user clicked an icon inside it. Using bubble to mean “all phases.”",
    code: `list.addEventListener("click", (e) => {
  const btn = e.target instanceof Element ? e.target.closest("button") : null;
  if (!btn || !list.contains(btn)) return;
  console.log("row action", btn.dataset.id);
});
`,
    examples: [
      {
        id: "target-vs-current",
        title: "target vs currentTarget",
        about: "target is origin; currentTarget is the delegated parent.",
        language: "javascript",
        code: `parent.addEventListener("click", (e) => {
  console.log(e.target, e.currentTarget);
});
`,
      },
      {
        id: "no-bubble",
        title: "focus does not bubble",
        about: "Use focusin for delegation.",
        language: "javascript",
        code: `form.addEventListener("focusin", (e) => console.log("field", e.target));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-event-capturing",
    title: "Event capturing",
    order: 139,
    summary: "The downward phase from the root toward the target, before target and bubble listeners.",
    prerequisites: ["javascript-event-propagation"],
    related: ["javascript-event-bubbling"],
    oneLiner:
      "Capturing listeners run on the way down (`{ capture: true }`). They see the event before target and bubble listeners on descendant nodes.",
    beats: [
      "Capture is first on the path: window → document → html → … → parent, then target.",
      "Use capture to intercept before a child can `stopPropagation` in bubble (child bubble has not run yet; child capture on the target may still run).",
      "A child that `stopPropagation` in its capture listener can still block parent bubble, but parent capture already ran.",
    ],
    intro: "Less common than bubble, essential for “I must run before the widget.”",
    why: "Modals, analytics that must see the event, and dropping events before a third-party handler.",
    concept:
      "Same path, reverse walk before target. Registration flag selects the list.",
    how: "`addEventListener(\"click\", fn, true)` or `{ capture: true }`. Remove with the same capture flag or removal fails.",
    usage: "Document-level capture to close menus. Security/instrumentation wrappers.",
    practices: "Match capture flag on remove. Document why you used capture — bubble is the default for a reason.",
    mistakes:
      "Removing with `capture: false` after adding with `true`. Assuming capture runs on the way up. Using capture when delegation on bubble was enough.",
    code: `document.addEventListener("click", () => console.log("doc capture"), true);
button.addEventListener("click", () => console.log("button"));
button.click();
// doc capture
// button
`,
    examples: [
      {
        id: "order",
        title: "Parent capture before child bubble",
        about: "Down first.",
        language: "javascript",
        code: `parent.addEventListener("click", () => console.log("p-cap"), true);
child.addEventListener("click", () => console.log("c-bub"));
child.click();
// p-cap
// c-bub
`,
      },
      {
        id: "remove",
        title: "Remove must match capture",
        about: "Different flag → listener stays.",
        language: "javascript",
        code: `const fn = () => {};
el.addEventListener("click", fn, true);
el.removeEventListener("click", fn, false); // still listening
el.removeEventListener("click", fn, true);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-web-workers",
    title: "Web Workers",
    order: 140,
    summary: "Background JS threads with their own event loop — no DOM, message-passing only.",
    prerequisites: ["javascript-event-loop"],
    related: ["javascript-service-workers", "javascript-modules"],
    oneLiner:
      "A `Worker` runs a script on another thread. It cannot touch `document`. You pass data with `postMessage` (structured clone or transfer). Dedicated workers are 1:1 with the creator; `SharedWorker` is named and shared.",
    beats: [
      "Workers have `self`, timers, `fetch`, Wasm — not `window`/`document`. DOM work stays on the main thread.",
      "`postMessage` copies by structured clone unless you transfer `ArrayBuffer`s. Functions and DOM nodes cannot be cloned.",
      "CPU-heavy work (parse, crypto, image) belongs here so the main event loop can paint.",
    ],
    intro: "The honest answer to “is JS single-threaded?” — the language per realm is; workers are extra realms.",
    why: "Long JSON parse on the main thread drops frames. Workers fix that without making JS multithreaded inside one realm.",
    concept:
      "Each worker has its own heap, stack, and event loop. Communication is async messages. Module workers use `{ type: \"module\" }`.",
    how: "`new Worker(url)`. `onmessage` / `message` events. `terminate()` from the owner. Errors surface as `error` events.",
    usage:
      "CSV/JSON parse, image resize, crypto, wasm, OffscreenCanvas drawing, search indexes. Keep UI on the main thread.",
    extras: [
      {
        key: "kinds",
        title: "Worker kinds",
        body: "Dedicated `Worker` — one page, one script, 1:1. `SharedWorker` — named, several tabs share a port (`port.start()`, `port.postMessage`). Worklets (`AudioWorklet`, CSS paint) are specialized, not general JS threads. Service workers are a different API: they proxy the network; they are not for CPU jobs.",
      },
    ],
    practices:
      "Transfer large `ArrayBuffer`s. Pool workers if spawn cost matters. Handle `error`/`messageerror`. Do not share objects without `SharedArrayBuffer` plus COOP/COEP. Prefer `{ type: \"module\" }` so you can `import`.",
    mistakes:
      "Passing functions or DOM nodes. Blocking the worker with sync XHR. Using a service worker as a math worker. Forgetting `terminate()` on abandoned workers.",
    code: `const w = new Worker("/worker.js");
w.postMessage({ n: 41 });
w.onmessage = (e) => console.log(e.data);
w.onerror = (e) => console.error(e.message);
`,
    examples: [
      {
        id: "worker-script",
        title: "Inside the worker",
        about: "`self.onmessage` — no `document`.",
        language: "javascript",
        code: `self.onmessage = (e) => {
  self.postMessage(e.data.n + 1);
};
`,
      },
      {
        id: "module-worker",
        title: "Module worker",
        about: "ES modules and `import` inside the worker.",
        language: "javascript",
        code: `const w = new Worker(new URL("./heavy.js", import.meta.url), {
  type: "module",
});
`,
      },
      {
        id: "transfer",
        title: "Transfer a buffer",
        about: "Sender loses access after transfer.",
        language: "javascript",
        code: `const buf = new ArrayBuffer(8);
w.postMessage(buf, [buf]);
console.log(buf.byteLength); // 0
`,
      },
      {
        id: "cpu",
        title: "CPU work off the main thread",
        about: "Parse or compute in the worker; post the result back.",
        language: "javascript",
        code: `// worker.js
self.onmessage = ({ data }) => {
  const rows = JSON.parse(data.text);
  self.postMessage({ count: rows.length });
};

// page
worker.postMessage({ text: hugeJson });
`,
      },
      {
        id: "shared",
        title: "SharedWorker sketch",
        about: "One worker, many documents; each gets a MessagePort.",
        language: "javascript",
        code: `const shared = new SharedWorker("/shared.js", "tab-bus");
shared.port.start();
shared.port.postMessage("hello");
shared.port.onmessage = (e) => console.log(e.data);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-service-workers",
    title: "Service Workers",
    order: 141,
    summary: "A programmable network proxy in the browser — not a generic CPU worker.",
    prerequisites: ["javascript-web-workers"],
    related: ["javascript-fetch", "javascript-event-listener", "pwa-overview"],
    oneLiner:
      "A service worker intercepts `fetch` for a scope, can cache responses, and run offline. It is event-driven (`install`, `activate`, `fetch`), has no DOM, and is not `new Worker()` for math.",
    beats: [
      "Lifecycle: register → install → waiting → activate. `skipWaiting` / `clients.claim` change takeover timing.",
      "Unlike dedicated workers, SWs persist, sit between page and network, and require HTTPS (or localhost).",
      "They can show notifications and drive push. They cannot access `document`. CPU work still belongs in dedicated workers.",
    ],
    intro: "PWA interviews: cache strategies and “why didn’t my SW update?”",
    why: "Offline, precache, and request routing. Misconfigured SWs brick deploys with old caches.",
    concept:
      "A service worker is a worker script registered to a URL scope. Fetch events can `respondWith` a cache or network promise. Clients are windows controlled after activate.",
    how: "`navigator.serviceWorker.register(\"/sw.js\")`. In SW: `self.addEventListener(\"fetch\", (e) => e.respondWith(...))`. Version caches by name and delete old on activate.",
    usage:
      "App-shell precache, runtime API intercept, offline fallbacks, push, background sync. Not for CPU — use a dedicated Worker.",
    extras: [
      {
        key: "purposes",
        title: "What service workers are for",
        body: "Offline and PWA — serve a cached app shell so the site loads with no network. Caching — Cache Storage plus `fetch` intercept: cache-first for static assets, network-first for APIs, stale-while-revalidate when freshness can lag. Request routing — rewrite, mock, or fail over URLs (CDN vs origin). Push notifications — the browser wakes the SW on a push; the SW shows a notification and handles clicks (`notificationclick`). Background Sync — queue a `sync` tag when offline; the SW retries when connectivity returns. Periodic Background Sync (limited, permissioned) — opportunistic refresh. Navigation preload — start the network request while the SW boots so TTFB does not stall. None of these replace a Web Worker for heavy CPU.",
      },
      {
        key: "lifecycle",
        title: "Lifecycle (why updates feel stuck)",
        body: "register → install (`waitUntil` caches) → waiting (old SW still controls pages) → activate (delete old caches; `clients.claim` takes over open clients). `skipWaiting()` jumps waiting. Users often need a refresh (or two) until activate. HTTPS or localhost only.",
      },
    ],
    practices:
      "Version cache names on deploy. `waitUntil` on install/activate. Never cache POST or error HTML blindly. Skip `chrome-extension:` and non-GET. Test the update path. Keep SW scripts small so boot is fast.",
    mistakes:
      "Using a service worker as a Web Worker for math. Forgetting HTTPS. Caching opaque or 5xx responses. Confusing `Worker` with `navigator.serviceWorker`. Intercepting every request including analytics and breaking POST.",
    figures: [
      {
        src: "/diagrams/js/js-service-worker.png",
        alt: "Page, service worker, Cache Storage, and network",
        caption: "Service worker as a network proxy",
      },
    ],
    code: `self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request)),
  );
});
`,
    examples: [
      {
        id: "register",
        title: "Register from the page",
        about: "HTTPS or localhost.",
        language: "javascript",
        code: `await navigator.serviceWorker.register("/sw.js", { scope: "/" });
`,
      },
      {
        id: "install",
        title: "Precache on install",
        about: "`waitUntil` extends the install event.",
        language: "javascript",
        code: `self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-v1").then((c) => c.addAll(["/", "/app.js", "/app.css"])),
  );
  self.skipWaiting();
});
`,
      },
      {
        id: "intercept-api-mock",
        title: "Intercept an API (mock JSON)",
        about: "`respondWith` short-circuits the network for matching URLs.",
        language: "javascript",
        code: `self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/api/profile") {
    event.respondWith(
      new Response(JSON.stringify({ name: "offline-user" }), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
});
`,
      },
      {
        id: "cache-first",
        title: "Cache-first (static assets)",
        about: "Hit Cache Storage; fall back to network and store.",
        language: "javascript",
        code: `event.respondWith(
  caches.match(event.request).then((hit) => {
    if (hit) return hit;
    return fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open("assets-v1").then((c) => c.put(event.request, copy));
      return res;
    });
  }),
);
`,
      },
      {
        id: "network-first",
        title: "Network-first (API GET)",
        about: "Prefer live data; cache as backup. Skip mutating methods.",
        language: "javascript",
        code: `if (event.request.method !== "GET") return;

event.respondWith(
  fetch(event.request)
    .then((res) => {
      const copy = res.clone();
      caches.open("api-v1").then((c) => c.put(event.request, copy));
      return res;
    })
    .catch(() => caches.match(event.request)),
);
`,
      },
      {
        id: "swr",
        title: "Stale-while-revalidate",
        about: "Return cache immediately; refresh in the background.",
        language: "javascript",
        code: `event.respondWith(
  caches.open("swr-v1").then(async (cache) => {
    const cached = await cache.match(event.request);
    const network = fetch(event.request).then((res) => {
      cache.put(event.request, res.clone());
      return res;
    });
    return cached || network;
  }),
);
`,
      },
    ],
  }),
];
