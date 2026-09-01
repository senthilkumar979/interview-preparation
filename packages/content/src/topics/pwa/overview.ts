import { pwaTopic } from "./factory";

export const pwaOverview = pwaTopic({
  slug: "pwa-overview",
  title: "Progressive Web Apps",
  order: 1,
  summary: "Installable, offline-capable web apps: HTTPS, a web app manifest, and a service worker.",
  prerequisites: ["javascript-service-workers"],
  related: ["pwa-manifest", "pwa-service-worker", "pwa-indexeddb", "pwa-push"],
  isHighYield: true,
  oneLiner:
    "A PWA is a website that meets installability: served over HTTPS, has a web app manifest (name, icons, `start_url`, `display`), and a service worker that controls the page. Then the OS can add it to the home screen, run it standalone, and the SW can keep it usable offline.",
  beats: [
    "Core pieces: secure origin, `manifest.webmanifest` linked from HTML, service worker registered and activated.",
    "Install UI (`beforeinstallprompt` on Chromium) is extra; iOS uses Share → Add to Home Screen and is stricter.",
    "Offline is Cache Storage + fetch intercept, not “magic.” Updates need a new SW + cache version.",
  ],
  intro:
    "PWA is a product bar, not a single API. Interviews want the checklist and the failure modes (stuck SW, no icons, mixed content).",
  why: "Install, offline, and push are how a web app competes with native shells without an app store for every platform.",
  concept:
    "Progressive: works as a normal site first, then layers capabilities. The browser (and OS) decide installability. Display modes: `browser`, `standalone`, `minimal-ui`, `fullscreen`. Scope must match the SW scope.",
  how: "Link the manifest. Register `/sw.js`. Precache the app shell. Handle `fetch` with a documented strategy. Optional: IndexedDB for user data, Web Push for re-engagement.",
  usage: "News readers, field tools, internal dashboards, storefronts that must open on a bad network.",
  extras: [
    {
      key: "checklist",
      title: "Installability checklist",
      body: "HTTPS (or localhost). Manifest with `name`/`short_name`, 192 and 512 icons, `start_url`, `display`. A service worker with a `fetch` handler. No mixed content. Prefer a `maskable` icon. Lighthouse “PWA” audit is a starting point, not the spec.",
    },
  ],
  practices: "Version caches. Provide an offline fallback page. Keep the SW tiny. Test iOS Safari separately. Do not require install to use the site.",
  mistakes:
    "Shipping a SW with no update story. Missing icons. `start_url` outside scope. Treating PWA as “just a manifest.”",
  figures: [
    {
      src: "/diagrams/pwa/pwa-overview.png",
      alt: "HTTPS, manifest, service worker, install, offline, push",
      caption: "PWA building blocks",
    },
  ],
  code: `<link rel="manifest" href="/manifest.webmanifest" />
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
</script>
`,
  language: "html",
  examples: [
    {
      id: "detect",
      title: "Standalone display",
      about: "CSS and JS can detect installed mode.",
      language: "javascript",
      code: `const standalone =
  window.matchMedia("(display-mode: standalone)").matches;
`,
    },
  ],
});
