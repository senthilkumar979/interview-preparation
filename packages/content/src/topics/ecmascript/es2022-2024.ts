import { esTopic } from "./factory";

export const es2022 = esTopic({
  slug: "es2022",
  title: "ES2022",
  order: 9,
  summary: "Top-level `await`, class fields and `#private`, `.at()`, `Error.cause`, `Object.hasOwn`, `/d`.",
  prerequisites: ["es2021"],
  related: ["es2023"],
  isHighYield: true,
  oneLiner:
    "ES2022: `await` at module top (load config before exports), public/private class fields and `#id` / `in` brand checks, `static {}` blocks, `arr.at(-1)`, `Object.hasOwn(obj, key)` (safer than `hasOwnProperty`), `new Error(msg, { cause })`, RegExp `/d` match indices.",
  beats: [
    "Top-level await only in modules; it delays evaluating importers.",
    "`#priv` is hard-private (not `this._priv`). `#id in obj` tests the brand.",
    "`.at(-1)` is the last message in a chat without `messages[messages.length - 1]`.",
  ],
  intro: "Class fields landed “for real.” Error wrapping finally has a standard `cause`.",
  why: "Chat UIs, config modules, wrapping API errors for logs.",
  concept: "Private fields are per-class. `Object.hasOwn` works if `hasOwnProperty` was overridden.",
  how: "`export const env = await loadEnv()`. `messages.at(-1)`. `throw new Error(\"save failed\", { cause: e })`.",
  usage: "Vite config, last-item UX, observability.",
  extras: [
    {
      key: "private",
      title: "Private fields",
      body: "`class Account { #balance = 0; deposit(n) { this.#balance += n; } }`. Subclasses cannot read `#balance`. Don’t serialize private fields to JSON automatically.",
    },
  ],
  practices: "Use `cause` when rethrowing. Prefer `at(-1)` for readability. Keep top-level await for truly boot-critical I/O.",
  mistakes: "Top-level await in a huge barrel file (slow graph). `#x in obj` confused with `\"x\" in obj`.",
  code: `const config = await fetch("/config.json").then((r) => r.json());
export const apiBase = config.apiBase;

function lastMessage(thread) {
  return thread.messages.at(-1);
}
`,
  examples: [
    {
      id: "wrap",
      title: "Realtime: wrap a failed save",
      about: "`cause` keeps the original stack.",
      language: "javascript",
      code: `try {
  await saveDraft(draft);
} catch (e) {
  throw new Error("Could not save draft", { cause: e });
}
`,
    },
  ],
});

export const es2023 = esTopic({
  slug: "es2023",
  title: "ES2023",
  order: 10,
  summary: "Immutable array copies: `toSorted`, `toReversed`, `toSpliced`, `with`, plus `findLast`.",
  prerequisites: ["es2022"],
  related: ["es2024", "javascript-array-tosorted"],
  isHighYield: true,
  oneLiner:
    "ES2023 added non-mutating copies: `toSorted`, `toReversed`, `toSpliced`, `with(index, value)`, and `findLast`/`findLastIndex`. Also `#!` hashbang and Symbols as WeakMap keys. React/Vue state wants copies — these replace `[...arr].sort()`.",
  beats: [
    "`sort` mutates. `toSorted` returns a new array. Same for reverse/splice.",
    "`with` is `copyWith` at an index (works with negative indexes like `at`).",
    "`findLast` is the last matching notification without `reduceRight` tricks.",
  ],
  intro: "The React-state edition of Array.",
  why: "Todo lists, leaderboards, restoring an item without mutating the previous render’s array.",
  concept: "Copy-on-write array methods. Original stays referentially equal for memoization.",
  how: "`setTodos((t) => t.toSpliced(i, 1))`. `rows.toSorted((a, b) => a.score - b.score)`.",
  usage: "Tables, undo stacks, chat history.",
  practices: "Use copy methods in reducers. Keep mutating methods for local scratch arrays.",
  mistakes: "Still `.sort()` on props. `with` vs `splice` (splice mutates).",
  code: `function sortByScore(players) {
  return players.toSorted((a, b) => b.score - a.score);
}

function rename(todos, index, title) {
  return todos.with(index, { ...todos[index], title });
}
`,
  examples: [
    {
      id: "inbox",
      title: "Realtime: last unread",
      about: "`findLast` on a thread.",
      language: "javascript",
      code: `const lastUnread = messages.findLast((m) => !m.read);
`,
    },
  ],
});

export const es2024 = esTopic({
  slug: "es2024",
  title: "ES2024",
  order: 11,
  summary: "`Object.groupBy`/`Map.groupBy`, `Promise.withResolvers`, `/v` regex, well-formed strings, resizable buffers.",
  prerequisites: ["es2023"],
  related: ["es2025", "javascript-promise-withresolvers"],
  isHighYield: true,
  oneLiner:
    "ES2024: `Object.groupBy(items, item => item.status)` (and `Map.groupBy` when keys aren’t strings), `Promise.withResolvers()` for deferred promises, RegExp `/v` (set notation for Unicode), `isWellFormed`/`toWellFormed` on strings, resizable/transferable `ArrayBuffer`, `Atomics.waitAsync`. `Array.fromAsync` (async iterable → array) is in this era of the library — confirm engine support.",
  beats: [
    "`groupBy` callback return becomes the key. Values are arrays of originals (not unique).",
    "`withResolvers` is `{ promise, resolve, reject }` — wait until a modal closes.",
    "Lone surrogates: `isWellFormed` before putting a string in a protocol.",
  ],
  intro: "The “group orders by status” edition.",
  why: "Kanban columns, dialogs that return Promises, binary uploads.",
  concept: "`groupBy` is reduce-to-map, standardized. `withResolvers` is the deferred pattern without the constructor anti-pattern sprawl.",
  how: "`const cols = Object.groupBy(tasks, (t) => t.column)`. `const { promise, resolve } = Promise.withResolvers();`.",
  usage: "Boards, confirm modals, file pickers, workers + SAB.",
  extras: [
    {
      key: "fromasync",
      title: "`Array.fromAsync`",
      body: "Build an array from an async iterable (`for await` under the hood). Example: paginate `for await (const page of pager)` then one table. Feature-detect if your baseline is older than 2024 engines.",
    },
  ],
  practices: "`Map.groupBy` for object keys (users as groups). Always `toWellFormed` before `fetch` body if the string came from random UTF-16.",
  mistakes: "Expecting `groupBy` to unique-by-key (it buckets). Transferring a buffer then using it (detached).",
  code: `const byStatus = Object.groupBy(orders, (o) => o.status);
const { promise, resolve } = Promise.withResolvers();
modal.onConfirm = () => resolve(true);
`,
  examples: [
    {
      id: "kanban",
      title: "Realtime: kanban columns",
      about: "Todo / doing / done from one list.",
      language: "javascript",
      code: `const columns = Object.groupBy(cards, (c) => c.column);
const todo = columns.todo ?? [];
`,
    },
    {
      id: "modal",
      title: "Realtime: confirm dialog",
      about: "`withResolvers` as user intent.",
      language: "javascript",
      code: `function confirmDelete() {
  const { promise, resolve } = Promise.withResolvers();
  openModal({ onYes: () => resolve(true), onNo: () => resolve(false) });
  return promise;
}
`,
    },
  ],
});
