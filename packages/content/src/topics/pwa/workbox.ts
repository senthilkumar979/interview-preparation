import { pwaTopic } from "./factory";

export const pwaWorkbox = pwaTopic({
  slug: "pwa-workbox",
  title: "Workbox",
  order: 6,
  summary: "Google’s library for precaching, routing, and strategies without a hand-rolled SW.",
  prerequisites: ["pwa-cache-strategies"],
  related: ["pwa-updates"],
  oneLiner:
    "Workbox generates or runtime-configures a service worker: `precacheAndRoute` for a revisioned asset manifest, `registerRoute` with `CacheFirst` / `NetworkFirst` / `StaleWhileRevalidate`, expiration plugins, and background sync queues. You still own HTTPS, the manifest, and cache versioning.",
  beats: [
    "InjectManifest (custom SW + webpack/vite plugin) vs generateSW (config-only).",
    "Precache manifest is a list of `{url, revision}` — revisions bust caches when content changes.",
    "Workbox does not replace IndexedDB for app data.",
  ],
  intro: "Production PWAs rarely maintain raw `fetch` switches. Interviews still want you to know what Workbox is wrapping.",
  why: "Fewer off-by-one cache bugs; same strategies as the previous topic, with plugins.",
  concept:
    "Routing: method + matcher → strategy. Precache: install-time list. Runtime: max entries, max age. `workbox-window` in the page for update UX.",
  how: "Vite PWA plugin / `workbox-cli` / `workbox-build`. Keep a tiny custom SW if you need push handlers alongside Workbox routes.",
  usage: "Create React App heritage, Next PWA plugins, Vite-plugin-pwa.",
  practices: "Commit to InjectManifest once you have push or sync. Review the generated SW in DevTools. Don’t mix a second hand-written SW on the same scope.",
  mistakes: "Two SWs fighting. Precaching an unbounded `/api` route. Ignoring Workbox’s revision field and wondering why HTML is stale.",
  code: `import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(({ request }) => request.destination === "image", new CacheFirst());
registerRoute(({ url }) => url.pathname.startsWith("/api/"), new NetworkFirst());
`,
  examples: [
    {
      id: "expiration",
      title: "Cap a runtime cache",
      about: "ExpirationPlugin.",
      language: "javascript",
      code: `import { ExpirationPlugin } from "workbox-expiration";
import { StaleWhileRevalidate } from "workbox-strategies";

new StaleWhileRevalidate({
  cacheName: "images",
  plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 7 * 86400 })],
});
`,
    },
  ],
});
