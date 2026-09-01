import { pwaTopic } from "./factory";

export const pwaUpdates = pwaTopic({
  slug: "pwa-updates",
  title: "Updating a PWA",
  order: 8,
  summary: "Why users see old JS: waiting workers, cache names, and a refresh UX.",
  prerequisites: ["pwa-service-worker", "pwa-cache-strategies"],
  related: ["pwa-workbox"],
  isHighYield: true,
  oneLiner:
    "A new `sw.js` byte stream starts a new worker that sits in waiting while the old one controls tabs. `skipWaiting` + `clients.claim` takes over immediately (can break in-flight pages). Safer: tell the user “Update available,” then `registration.waiting.postMessage('SKIP_WAITING')` and reload on `controllerchange`. Change precache names or Workbox revisions or users keep old bundles.",
  beats: [
    "Browsers check for SW updates on navigation (and on an interval). HTTP cache of `sw.js` must be short (`max-age` small or `no-cache`).",
    "HTML that points at hashed JS must also update — or the new SW still serves yesterday’s `index.html`.",
    "`self.skipWaiting()` in install is aggressive; pair with careful cache cleanup on activate.",
  ],
  intro: "The most common PWA incident: “we deployed but the app is old.” This topic is that incident.",
  why: "Support tickets and broken APIs after a backend change that the cached client does not know.",
  concept:
    "Two generations: old controller, new waiting. Clients are windows. `postMessage` between page and worker. Activate deletes `shell-v1` when `shell-v2` is live.",
  how: "Page: `registration.update()`. Listen `updatefound` → `waiting`. UX button → skip waiting → reload. SW: `message` handler calls `skipWaiting()`.",
  usage: "Any production PWA. Workbox `skipWaiting` / `clientsClaim` config is the same idea.",
  extras: [
    {
      key: "sw-js-cache",
      title: "Do not long-cache sw.js",
      body: "`Cache-Control: max-age=0, must-revalidate` (or a few hours max) on the service worker script. Hashed assets can be `immutable`. If `sw.js` is cached for a year, updates never install.",
    },
  ],
  practices: "Show an in-app banner. Reload after claim. Version APIs. Test the two-tab case.",
  mistakes: "Long-lived `sw.js`. `skipWaiting` with no activate cleanup (disk fills with caches). Reloading in a loop on `controllerchange`.",
  code: `self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== "shell-v2").map((k) => caches.delete(k))),
    ),
  );
});
`,
  examples: [
    {
      id: "page",
      title: "Page asks waiting SW to activate",
      about: "Then reload once.",
      language: "javascript",
      code: `const reg = await navigator.serviceWorker.getRegistration();
reg?.waiting?.postMessage("SKIP_WAITING");
navigator.serviceWorker.addEventListener("controllerchange", () => {
  window.location.reload();
});
`,
    },
  ],
});
