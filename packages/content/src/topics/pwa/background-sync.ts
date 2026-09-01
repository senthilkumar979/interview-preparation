import { pwaTopic } from "./factory";

export const pwaBackgroundSync = pwaTopic({
  slug: "pwa-background-sync",
  title: "Background Sync",
  order: 11,
  summary: "Queue failed POSTs while offline; the SW retries when the browser sees connectivity.",
  prerequisites: ["pwa-service-worker", "pwa-indexeddb"],
  related: ["pwa-push", "pwa-dexie"],
  oneLiner:
    "Background Sync lets the page `registration.sync.register('outbox')` when a write fails offline. The service worker later gets a `sync` event (tag name) and drains an IndexedDB outbox to the network. Support is Chromium-led; always keep a manual Retry. Periodic Background Sync is a separate, permissioned API for opportunistic fetches.",
  beats: [
    "The SW may be woken when the user is not in the tab. Persist the payload in IDB before you trust the sync event.",
    "`sync` is not a cron on iOS WebKit the way Chromium documents it — feature-detect and degrade.",
    "Workbox `BackgroundSyncPlugin` queues failed POSTs for you.",
  ],
  intro: "Offline-first is not only reads. Writes need an outbox.",
  why: "Field apps and “send comment” buttons. Interviewers distinguish this from push (server → device) vs sync (device → server later).",
  concept:
    "Tag string → one or more `sync` events until `waitUntil` succeeds (browser may retry with backoff). Periodic Sync needs permission and is limited.",
  how: "Save record to Dexie/IDB → `sync.register`. In SW `sync`, read outbox, `fetch`, delete on 2xx. If `sync` is missing, retry on `online` in the page.",
  usage: "Drafts, analytics with care (privacy), form posts.",
  extras: [
    {
      key: "periodic",
      title: "Periodic Background Sync",
      body: "`periodicSync.register('refresh', { minInterval })` after permission. The SW `periodicsync` event may run in the background to refresh caches. Not a substitute for push. Availability and interval are at the browser’s discretion.",
    },
  ],
  practices: "Idempotent API keys on queued jobs. Cap outbox size. Surface “waiting to send” in the UI.",
  mistakes: "Keeping the payload only in memory. Assuming Safari equals Chrome. Infinite retry on 400 (bad payload).",
  code: `await saveToOutbox(job);
const reg = await navigator.serviceWorker.ready;
await reg.sync.register("outbox");
`,
  examples: [
    {
      id: "sw-sync",
      title: "Drain the outbox",
      about: "`sync` event in the worker.",
      language: "javascript",
      code: `self.addEventListener("sync", (event) => {
  if (event.tag !== "outbox") return;
  event.waitUntil(flushOutbox());
});
`,
    },
  ],
});
