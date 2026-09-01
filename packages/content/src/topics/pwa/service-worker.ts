import { pwaTopic } from "./factory";

export const pwaServiceWorker = pwaTopic({
  slug: "pwa-service-worker",
  title: "Service workers for PWAs",
  order: 3,
  summary: "Lifecycle, scope, and Cache Storage — the PWA’s programmable network layer.",
  prerequisites: ["pwa-overview", "javascript-service-workers"],
  related: ["pwa-app-shell", "pwa-cache-strategies", "pwa-updates"],
  isHighYield: true,
  oneLiner:
    "A PWA’s service worker is registered to a URL scope, installed with `waitUntil` (precache), then activated (`clients.claim` / `skipWaiting`). It has no DOM. `fetch` events can `respondWith` Cache Storage or the network. HTTPS or localhost only.",
  beats: [
    "States: parsed → installing → waiting → activating → activated. An old SW keeps control until waiting is skipped or all clients close.",
    "`caches.open` / `match` / `put` / `addAll` is Cache Storage — Request/Response pairs, not IndexedDB.",
    "Keep the SW script small; boot time sits on the critical path unless you use navigation preload.",
  ],
  intro: "The JS track covered intercept recipes. Here the SW is a product dependency: offline, updates, push, sync.",
  why: "A broken SW bricks deploys. A missing `fetch` handler can fail installability checks.",
  concept:
    "One controlling SW per client. Scope defaults to the script’s directory. `navigator.serviceWorker.ready` waits for an active worker. `controllerchange` fires when a new SW takes over.",
  how: "`register('/sw.js', { scope: '/' })`. In the worker: `install`, `activate`, `fetch`, `push`, `sync`. Use `event.waitUntil` so the browser does not kill the worker mid-work.",
  usage: "App-shell precache, API runtime cache, offline fallback document.",
  extras: [
    {
      key: "lifecycle",
      title: "Lifecycle",
      body: "install — open a new cache name, `addAll` the shell; fail install if a file 404s. waiting — new SW sits behind the old one. activate — delete old cache names; `clients.claim()` takes open pages. fetch — only after activate (and claim, or a navigation). Always version the cache: `shell-v3`.",
    },
  ],
  practices: "One SW file at the origin root for `/` scope. Never cache opaque error pages. Skip non-GET. Feature-detect `serviceWorker`.",
  mistakes: "Registering from a `/app/` page with a script at `/app/sw.js` and expecting to control `/`. Treating SW as a CPU worker.",
  code: `self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("shell-v1").then((c) => c.addAll(["/", "/app.js"])));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
`,
  examples: [
    {
      id: "register",
      title: "Register after load",
      about: "Avoid competing with first paint.",
      language: "javascript",
      code: `window.addEventListener("load", () => {
  navigator.serviceWorker.register("/sw.js");
});
`,
    },
  ],
});
