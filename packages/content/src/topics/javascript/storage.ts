import { jsTopic } from "./factory";

export const javascriptStorageTopics = [
  jsTopic({
    slug: "javascript-storage",
    title: "Browser storage",
    order: 142,
    summary:
      "Where data lives in the browser: cookies, sessionStorage, localStorage, IndexedDB, Cache Storage, and memory.",
    prerequisites: ["javascript-bom"],
    related: ["javascript-service-workers", "pwa-indexeddb"],
    isHighYield: true,
    oneLiner:
      "Cookies ride on HTTP and have size/privacy costs. `sessionStorage` is per-tab and dies with the tab. `localStorage` is origin-wide, sync, ~5 MB strings. IndexedDB is async, large, structured. Cache Storage holds `Request`/`Response` pairs for service workers. None of these are a database on the server.",
    beats: [
      "Same origin: protocol + host + port. Storage is partitioned by origin (and often by top-level site).",
      "Cookies: sent on matching requests unless `HttpOnly`/`Secure`/`SameSite` constrain them. Prefer tokens in memory or HttpOnly cookies, not `localStorage`, for auth.",
      "Web Storage (`local`/`session`) is synchronous string KV. IndexedDB is for structured, queryable, large data. Cache API is for HTTP responses.",
    ],
    intro:
      "Interviews mix “where do I put the JWT?” with “how does offline work?” The answer is different APIs with different lifetimes, sizes, and who can read them.",
    why: "Picking the wrong store leaks sessions, blocks the main thread, or vanishes on refresh.",
    concept:
      "Memory: JS variables — fastest, gone on reload. sessionStorage: same origin, one tab, survives refresh, not a new tab. localStorage: same origin, all tabs, survives browser restart, `storage` event in other tabs. Cookies: optional expiry, path/domain, sent to the server. IndexedDB: async object store. Cache Storage: SW/page `caches.*`. File System Access is a separate, permissioned API.",
    how: "`localStorage.setItem`/`getItem`. `document.cookie` is a clunky string; prefer `Set-Cookie` from the server. IndexedDB via `indexedDB.open` or Dexie. Cache via `caches.open`. Quota is origin-wide; `navigator.storage.estimate()` and `persist()`.",
    usage: "Theme in localStorage. Wizard draft in sessionStorage. Session cookie for auth. Offline records in IndexedDB. Precached assets in Cache Storage.",
    extras: [
      {
        key: "compare",
        title: "Comparison",
        body: "Cookie — ~4 KB, sent with HTTP, set expiry, `HttpOnly` hides from JS, `Secure` + `SameSite` for CSRF/HTTPS. sessionStorage — ~5 MB strings, tab-scoped, no HTTP. localStorage — ~5 MB strings, origin-scoped, sync (can jank). IndexedDB — hundreds of MB+, objects/blobs, async, indexes. Cache Storage — Response bodies, SW intercept. Memory — no persistence. Do not store secrets in localStorage (XSS reads it). Do not put large JSON in cookies (every request pays).",
      },
    ],
    practices:
      "JSON.parse in try/catch. Version keys (`theme:v2`). Listen to `storage` for cross-tab. Use HttpOnly cookies for session IDs. Quota-aware for IndexedDB. Clear on logout.",
    mistakes:
      "Auth JWT in localStorage. Assuming localStorage is private. Forgetting stringify. Blocking UI with huge sync reads. Treating cookies as a 5 MB store.",
    figures: [
      {
        src: "/diagrams/js/js-storage.png",
        alt: "Cookies, sessionStorage, localStorage, IndexedDB, Cache Storage",
        caption: "Browser storage options",
      },
    ],
    code: `localStorage.setItem("theme", "dark");
sessionStorage.setItem("step", "2");
document.cookie = "locale=en; Path=/; SameSite=Lax; Secure";
`,
    examples: [
      {
        id: "web-storage",
        title: "local vs session",
        about: "Same API; different lifetime and tab scope.",
        language: "javascript",
        code: `localStorage.setItem("user", JSON.stringify({ id: 1 }));
const user = JSON.parse(localStorage.getItem("user") ?? "null");
sessionStorage.clear(); // this tab only
`,
      },
      {
        id: "storage-event",
        title: "Cross-tab `storage` event",
        about: "Fires in other documents of the origin, not the writer.",
        language: "javascript",
        code: `window.addEventListener("storage", (e) => {
  if (e.key === "theme") applyTheme(e.newValue);
});
`,
      },
      {
        id: "cookie",
        title: "Cookie constraints",
        about: "JS cannot set HttpOnly; the server can.",
        language: "javascript",
        code: `// Readable by JS — XSS can steal this. Avoid for sessions.
document.cookie = "pref=compact; Max-Age=31536000; SameSite=Lax";
`,
      },
    ],
  }),
];
