import { esTopic } from "./factory";

export const es2025 = esTopic({
  slug: "es2025",
  title: "ES2025",
  order: 12,
  summary: "Iterator helpers, Set methods, `Promise.try`, JSON modules, `RegExp.escape`, Float16Array.",
  prerequisites: ["es2024"],
  related: ["es2026"],
  isHighYield: true,
  oneLiner:
    "ES2025 (16th edition): `Iterator` helpers (`map`/`filter`/`take`/`drop`/`toArray` on iterators — lazy like a pipeline), `Set` algebra (`union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`), `Promise.try(fn)` to start a chain from sync-or-async work, `import data from \"./a.json\" with { type: \"json\" }`, `RegExp.escape`, inline regex modifiers, `Float16Array` / `Math.f16round`.",
  beats: [
    "Iterator helpers don’t build intermediate arrays — good for huge click streams until `toArray()`.",
    "Set methods return new Sets. `selected.intersection(allowed)` is the permission filter.",
    "`Promise.try` catches sync throws as rejections — wrap `JSON.parse` + `fetch` uniformly.",
  ],
  intro: "The collection-math and lazy-iterator edition. JSON import is how you load i18n catalogs.",
  why: "Feature-flag ∩ plan-permissions. Search-as-you-type without allocating 20 arrays. Safe user-input regex.",
  concept: "Sets as values with algebra. Iterators as lazy seqs. Import attributes tell the runtime the module format.",
  how: "`Iterator.from(nodeList).filter(…).take(20).toArray()`. `RegExp.escape(userQuery)` before `new RegExp`.",
  usage: "ACL filters, typeahead, locale JSON, ML float16 buffers.",
  extras: [
    {
      key: "set",
      title: "Set methods",
      body: "`a.union(b)` all ids. `a.intersection(b)` common. `a.difference(b)` in a not b (left-only). `symmetricDifference` xor. `isSubsetOf` for “these roles are covered.”",
    },
    {
      key: "json",
      title: "JSON modules",
      body: "`import dict from \"./en.json\" with { type: \"json\" }`. Dynamic: `import(\`./\${locale}.json\`, { with: { type: \"json\" } })`. Wrong type attribute is a runtime error, not a silent eval.",
    },
  ],
  practices: "Escape user text in regex. Prefer Set algebra over nested `filter`+`includes`. Don’t `toArray()` a huge iterator unless you must.",
  mistakes: "Mutating Sets in place when you meant `union`. `Promise.try` without understanding it still returns a Promise. Importing JSON as JS.",
  code: `const visible = selectedIds.intersection(allowedIds);
const top = Iterator.from(clicks)
  .filter((c) => c.page === "/checkout")
  .take(50)
  .toArray();
`,
  examples: [
    {
      id: "acl",
      title: "Realtime: feature flags ∩ role",
      about: "Only flags the plan allows.",
      language: "javascript",
      code: `function enabled(userFlags, planFlags) {
  return userFlags.intersection(planFlags);
}
`,
    },
    {
      id: "search",
      title: "Realtime: typeahead regex",
      about: "`RegExp.escape` so `C++` doesn’t blow the parser.",
      language: "javascript",
      code: `function highlight(query, title) {
  const safe = RegExp.escape(query);
  return title.replace(new RegExp(safe, "gi"), (m) => \`<mark>\${m}</mark>\`);
}
`,
    },
    {
      id: "try",
      title: "Realtime: parse then fetch",
      about: "`Promise.try` unifies throw and reject.",
      language: "javascript",
      code: `await Promise.try(() => JSON.parse(raw))
  .then((body) => fetch("/api/import", { method: "POST", body: raw }));
`,
    },
  ],
});

export const es2026 = esTopic({
  slug: "es2026",
  title: "ES2026",
  order: 13,
  summary: "17th edition (June 2026): JSON raw values and Uint8Array base64/hex helpers — confirm engine notes.",
  prerequisites: ["es2025"],
  related: ["es-overview"],
  oneLiner:
    "ECMA-262 17th edition (ES2026, June 2026) continues the yearly drop. The spec text adds `JSON.rawJSON` / `JSON.isRawJSON` (embed already-serialized JSON without double-encoding) and extra `Uint8Array` methods for base64/hex (`fromBase64` / `toBase64` / `fromHex` / `toHex` in engines that implement the Uint8Array appendix). Always verify MDN for your target — editors ship ahead of or behind the PDF.",
  beats: [
    "`JSON.rawJSON` is for composing JSON (IDs, decimals) without parse/stringify loss.",
    "Uint8Array base64 replaces `btoa`/`atob` hacks for file bytes and JWTs’ binary parts.",
    "Temporal / `using` may exist in engines as separately shipped features — don’t claim them as ES2015.",
  ],
  intro: "Newest edition at PrepQuest’s 2026 snapshot. Prefer compat tables over reciting a blog.",
  why: "File uploads as base64, API gateways that splice JSON fragments, avoiding UTF-16 `btoa` bugs.",
  concept: "Raw JSON values round-trip through `stringify`. Bytes have a standard codec on `Uint8Array`.",
  how: "Feature-detect `Uint8Array.fromBase64`. Use `JSON.rawJSON` when a library gives you a JSON snippet to nest.",
  usage: "Avatar uploads, signed payloads, high-precision money as JSON strings.",
  extras: [
    {
      key: "engines",
      title: "What might already be in the engine",
      body: "Some runtimes shipped `Error.isError`, `Math.sumPrecise`, or `Map.prototype.getOrInsert` on their own schedule. Treat those as “check MDN,” not as ES6. This topic tracks the 17th edition library surface we can point at in the June 2026 spec TOC (`JSON.rawJSON`, Uint8Array codecs).",
    },
  ],
  practices: "Polyfill or feature-detect 2026 APIs. Never `btoa(String.fromCharCode(...bytes))` for large files.",
  mistakes: "Assuming ES2026 === Temporal in every browser. Mixing Number and base64 length math.",
  code: `const bytes = new Uint8Array(await file.arrayBuffer());
const b64 = bytes.toBase64();

const body = JSON.stringify({
  id: JSON.rawJSON(idJsonSnippet),
  name: user.name,
});
`,
  examples: [
    {
      id: "upload",
      title: "Realtime: file to base64",
      about: "Binary-safe, not `FileReader` string hacks.",
      language: "javascript",
      code: `async function asBase64(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  return buf.toBase64();
}
`,
    },
  ],
});
