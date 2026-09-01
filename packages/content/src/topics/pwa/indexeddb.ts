import { pwaTopic } from "./factory";

export const pwaIndexeddb = pwaTopic({
  slug: "pwa-indexeddb",
  title: "IndexedDB",
  order: 9,
  summary: "Async transactional object store in the browser — the real client database.",
  prerequisites: ["javascript-storage", "pwa-overview"],
  related: ["pwa-dexie", "pwa-app-shell"],
  isHighYield: true,
  oneLiner:
    "IndexedDB is an origin-scoped, asynchronous, transactional key-value database. You open a DB, bump `version` to create object stores and indexes, then `put`/`get`/`getAll` inside transactions. It stores structured clones (objects, blobs), not just strings.",
  beats: [
    "API is callback-heavy (`onsuccess`/`onerror`). Wrap in Promises or use Dexie.",
    "Schema changes only in `onupgradeneeded`. Existing connections must close or the upgrade waits.",
    "Quota is shared with Cache Storage. `navigator.storage.persist()` requests durable storage.",
  ],
  intro: "localStorage is the wrong tool past a few KB of JSON. IndexedDB is what offline PWAs actually use.",
  why: "Drafts, queues, catalogs, and binary assets need indexes and transactions without blocking the UI thread.",
  concept:
    "Database → object store (like a table) → records with a key (`keyPath` or out-of-line). Indexes for secondary queries. Transactions: `readonly` / `readwrite`. Same-origin only.",
  how: "`indexedDB.open(name, version)`. Handle `upgradeneeded` to `createObjectStore`. Use `store.put(value)` / `store.get(key)`. Cursors for large scans. Close when tearing down.",
  usage: "Offline-first lists, outbox for later POST, caching API entities with indexes by `updatedAt`.",
  extras: [
    {
      key: "vs-cache",
      title: "IndexedDB vs Cache Storage",
      body: "Cache Storage maps HTTP Request → Response (great for SW `fetch`). IndexedDB maps your keys → JS values (great for app state). Many PWAs use both: shell in Cache, user records in IDB.",
    },
  ],
  practices: "Keep transactions short. Version migrations explicitly. Don’t store File handles you cannot revive. Handle `QuotaExceededError`. Prefer Dexie for non-trivial schemas.",
  mistakes: "Using IDB on the main thread with huge writes and no worker. Nested transactions. Forgetting `onupgradeneeded` when bumping version. Treating IDB as sync.",
  code: `const req = indexedDB.open("prepquest", 1);
req.onupgradeneeded = () => {
  req.result.createObjectStore("notes", { keyPath: "id" });
};
req.onsuccess = () => {
  const db = req.result;
  const tx = db.transaction("notes", "readwrite");
  tx.objectStore("notes").put({ id: "1", text: "async event loop" });
};
`,
  examples: [
    {
      id: "get",
      title: "Read one record",
      about: "Still event-based unless you wrap it.",
      language: "javascript",
      code: `function getNote(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("notes", "readonly");
    const r = tx.objectStore("notes").get(id);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
`,
    },
    {
      id: "index",
      title: "Index for queries",
      about: "Created only in a version upgrade.",
      language: "javascript",
      code: `req.onupgradeneeded = () => {
  const store = req.result.createObjectStore("notes", { keyPath: "id" });
  store.createIndex("by-tag", "tag", { unique: false });
};
`,
    },
  ],
});
