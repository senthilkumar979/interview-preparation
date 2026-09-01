import { pwaTopic } from "./factory";

export const pwaAppShell = pwaTopic({
  slug: "pwa-app-shell",
  title: "App shell",
  order: 4,
  summary: "Precache chrome (HTML, CSS, JS) so the UI loads offline; fill content at runtime.",
  prerequisites: ["pwa-service-worker"],
  related: ["pwa-cache-strategies", "pwa-indexeddb"],
  isHighYield: true,
  oneLiner:
    "The app shell is the minimal HTML/CSS/JS that draws chrome (header, nav, layout) without user data. Precache it on `install`. Content (lists, articles) comes from the network or IndexedDB after the shell paints. That split is how a PWA feels instant on a dead network.",
  beats: [
    "Shell = static, versioned, hashed bundles + a skeleton route. Data = JSON/IDB, not in the SW precache list.",
    "SPA shells need the fallback `index.html` in the cache so refresh offline still boots the router.",
    "Keep the shell small; it is downloaded on every SW update that changes those URLs.",
  ],
  intro: "Google’s original PWA pattern: chrome from cache, content from API. It still interviews well.",
  why: "Without a shell, “offline” is a blank tab. With only a shell, you still need a data story (IDB or cached GET).",
  concept:
    "Precache known URLs at install. Runtime cache or IDB for unbounded content. Offline fallback page for navigations that miss.",
  how: "`addAll` of `/`, CSS, JS, fonts, icons. Navigations: cache-first for same-origin documents that are the shell; network-first for HTML you cannot list.",
  usage: "Dashboards, readers, note apps.",
  practices: "Revision the shell cache when bundles change. Include an `/offline.html`. Do not precache every article URL.",
  mistakes: "Precaching authenticated HTML. Putting user notes in Cache Storage instead of IndexedDB. A shell so large it delays install.",
  figures: [
    {
      src: "/diagrams/pwa/pwa-app-shell.png",
      alt: "App chrome precached, content filled at runtime from network or IndexedDB",
      caption: "Shell vs runtime data",
    },
  ],
  code: `const SHELL = ["/", "/app.css", "/app.js", "/offline.html"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("shell-v4").then((c) => c.addAll(SHELL)));
});
`,
  examples: [
    {
      id: "offline-nav",
      title: "Offline navigation fallback",
      about: "HTML navigations that miss the cache.",
      language: "javascript",
      code: `if (event.request.mode === "navigate") {
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/offline.html")),
  );
}
`,
    },
  ],
});
