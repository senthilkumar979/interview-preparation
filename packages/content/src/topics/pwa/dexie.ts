import { pwaTopic } from "./factory";

export const pwaDexie = pwaTopic({
  slug: "pwa-dexie",
  title: "Dexie.js",
  order: 10,
  summary: "A small wrapper that makes IndexedDB feel like async/await tables.",
  prerequisites: ["pwa-indexeddb"],
  related: ["pwa-background-sync", "pwa-push"],
  oneLiner:
    "Dexie is a typed, Promise-based API over IndexedDB. You declare stores (`notes: 'id, tag'`), then `db.notes.add()`, `where('tag').equals('js').toArray()`. Version upgrades are `db.version(n).stores({...})`.",
  beats: [
    "Same security and quota as IndexedDB — Dexie does not add a server.",
    "Live queries (`dexie-react-hooks` / `useLiveQuery`) re-render when tables change.",
    "Keep schema strings in version bumps; Dexie migrates indexes for you when declared.",
  ],
  intro: "Raw IndexedDB interviews still happen. Production PWAs almost always hide it behind Dexie or idb.",
  why: "Less callback noise, composable queries, easier TypeScript classes for each table.",
  concept:
    "`Dexie` subclass or instance, `version().stores()`, Table methods: `get`, `put`, `bulkPut`, `where`, `orderBy`. Transactions: `db.transaction('rw', db.notes, async () => ...)`.",
  how: "npm `dexie`. One DB module imported from the app. Open happens lazily. Map errors (`DexieError`) to UI.",
  usage: "Offline notes, sync outboxes, search-as-you-type against an index.",
  practices: "One DB module. Explicit versions. `bulkPut` for imports. Don’t open a new Dexie per component. Test upgrades on copies of production data.",
  mistakes: "Changing store schema without a version bump. Mixing raw IDB and Dexie on the same DB name. Assuming Dexie works in every private-mode quota (Safari can still evict).",
  language: "typescript",
  code: `import Dexie, { type EntityTable } from "dexie";

interface Note {
  id: string;
  tag: string;
  text: string;
}

const db = new Dexie("prepquest") as Dexie & {
  notes: EntityTable<Note, "id">;
};

db.version(1).stores({ notes: "id, tag" });

await db.notes.put({ id: "1", tag: "js", text: "microtasks first" });
const jsNotes = await db.notes.where("tag").equals("js").toArray();
`,
  examples: [
    {
      id: "tx",
      title: "Transaction",
      about: "Atomic multi-table writes.",
      language: "typescript",
      code: `await db.transaction("rw", db.notes, async () => {
  await db.notes.delete("old");
  await db.notes.add({ id: "2", tag: "pwa", text: "dexie" });
});
`,
    },
    {
      id: "live",
      title: "Live query (React)",
      about: "Re-runs when the table changes.",
      language: "typescript",
      code: `import { useLiveQuery } from "dexie-react-hooks";

const notes = useLiveQuery(() => db.notes.toArray()) ?? [];
`,
    },
  ],
});
