import { esTopic } from "./factory";

export const es2019 = esTopic({
  slug: "es2019",
  title: "ES2019",
  order: 6,
  summary: "`flat`/`flatMap`, `Object.fromEntries`, trimStart/End, optional catch binding, stable sort.",
  prerequisites: ["es2018"],
  related: ["es2020"],
  oneLiner:
    "ES2019: `array.flat(depth)` / `flatMap`, `Object.fromEntries(entries)` (inverse of `entries`), `trimStart`/`trimEnd`, `catch { }` without a binding, stable `Array.sort`, well-formed `JSON.stringify`, `Symbol.prototype.description`.",
  beats: [
    "`flat()` is depth 1. `flat(Infinity)` flattens all the way — dangerous on huge trees.",
    "`fromEntries` rebuilds query objects from `URLSearchParams`.",
    "Optional `catch` is for when you only care that it failed.",
  ],
  intro: "The “query string round-trip” edition: entries → fromEntries.",
  why: "Tag chips, nested comments, search params.",
  concept: "`flatMap` is map then flatten one level — good for “one user → many permissions.”",
  how: "`Object.fromEntries(new URLSearchParams(location.search))`.",
  usage: "Filters in the URL, comment threads, CSV cells.",
  practices: "`flatMap` over `map`+`flat`. Don’t `flat(Infinity)` on user HTML-as-arrays.",
  mistakes: "`flat` on a string (it is array-only). Assuming `sort` was always stable before 2019.",
  code: `const params = Object.fromEntries(new URLSearchParams("q=css&sort=new"));
const tags = comments.flatMap((c) => c.tags);
`,
  examples: [
    {
      id: "search",
      title: "Realtime: restore filters from the URL",
      about: "Shareable search links.",
      language: "javascript",
      code: `function filtersFromUrl(search) {
  return Object.fromEntries(new URLSearchParams(search));
}
function urlFromFilters(filters) {
  return new URLSearchParams(Object.entries(filters)).toString();
}
`,
    },
  ],
});

export const es2020 = esTopic({
  slug: "es2020",
  title: "ES2020",
  order: 7,
  summary: "`?.`, `??`, `Promise.allSettled`, `BigInt`, `import()`, `globalThis`, `matchAll`, `import.meta`.",
  prerequisites: ["es2019"],
  related: ["es2021", "javascript-promise-allsettled"],
  isHighYield: true,
  oneLiner:
    "ES2020 is the “nullish” year: `user?.profile?.email`, `port ?? 3000` (`??` only treats `null`/`undefined` as missing — `0` stays). `Promise.allSettled` waits for every fetch. `BigInt` (`10n`) for integers beyond `Number.MAX_SAFE_INTEGER`. Dynamic `import(\`./plugins/\${name}.js\`)`, `globalThis`, `String.matchAll`, `export * as ns`, `import.meta`.",
  beats: [
    "`||` treats `0` and `\"\"` as missing; `??` does not. Forms and prices need `??`.",
    "`allSettled` vs `all`: dashboards that must show every widget’s error.",
    "`import()` returns a Promise of the module namespace — code-split a settings panel.",
  ],
  intro: "If they ask for “modern syntax” after ES6, they mean this edition.",
  why: "APIs return sparse JSON. Widget grids fail independently. Route-based code splitting.",
  concept: "Optional chaining short-circuits. `allSettled` never short-circuits on reject.",
  how: "Replace `user && user.a && user.a.b` with `user?.a?.b`. Feature-detect `BigInt` for money in integer cents… or still use decimal libraries.",
  usage: "User settings, analytics ids, plugin loaders, WASM paths via `import.meta.url`.",
  extras: [
    {
      key: "bigint",
      title: "BigInt",
      body: "Cannot mix with Number (`1n + 1` throws). JSON has no BigInt — stringify yourself. Use for ids from some DBs, not for CSS pixels.",
    },
  ],
  practices: "`??` for defaults on numbers. `allSettled` for independent I/O. Don’t `?.()` on something that must exist (hides bugs).",
  mistakes: "`??` vs `||` on `qty = 0`. `import()` for values that should be static (loses tree-shaking).",
  code: `const email = user?.profile?.email ?? "unknown";
const widgets = await Promise.allSettled([loadChart(), loadTable()]);
const { default: Panel } = await import("./SettingsPanel.js");
`,
  examples: [
    {
      id: "dashboard",
      title: "Realtime: dashboard widgets",
      about: "One failed chart must not blank the page.",
      language: "javascript",
      code: `const results = await Promise.allSettled([
  fetch("/api/mrr").then((r) => r.json()),
  fetch("/api/churn").then((r) => r.json()),
]);
const mrr = results[0].status === "fulfilled" ? results[0].value : null;
`,
    },
    {
      id: "settings",
      title: "Realtime: settings default",
      about: "`0` is a valid volume.",
      language: "javascript",
      code: `const volume = settings?.volume ?? 80;
`,
    },
  ],
});

export const es2021 = esTopic({
  slug: "es2021",
  title: "ES2021",
  order: 8,
  summary: "`replaceAll`, `Promise.any`, `AggregateError`, `??=`/`||=`/`&&=`, numeric separators, WeakRef.",
  prerequisites: ["es2020"],
  related: ["es2022", "javascript-promise-any"],
  isHighYield: true,
  oneLiner:
    "ES2021: `str.replaceAll(\",\", \"\")` (no global-regex requirement for strings), `Promise.any` (first fulfill; all reject → `AggregateError`), logical assignment `x ??= 1`, `1_000_000` numeric separators, `WeakRef` / `FinalizationRegistry` (advanced caches).",
  beats: [
    "`replaceAll` with a string replaces every occurrence. A non-global RegExp throws.",
    "`any` is “first success” (CDN race). `all` is “all success.” `race` is “first settle” including reject.",
    "`flags ||= true` only assigns if current is falsy; `??=` only if nullish.",
  ],
  intro: "Replace-all and first-healthy-replica year.",
  why: "Sanitize thousands separators in amount inputs. Race two image CDNs.",
  concept: "Logical assignment is read + write of the same reference. WeakRef is easy to misuse — skip in UI unless you measure.",
  how: "`amount.replaceAll(\",\", \"\")`. `await Promise.any(mirrors.map(fetchCopy))`.",
  usage: "Money inputs, multi-region fetch, feature-flag init `config.debug ??= false`.",
  practices: "`Promise.any` needs a catch of `AggregateError`. Don’t WeakRef DOM nodes as a memory “fix.”",
  mistakes: "`replace` vs `replaceAll`. Using `||` assignment on `count = 0`.",
  code: `const cents = form.amount.value.replaceAll(",", "");
const asset = await Promise.any([
  fetch("https://cdn-east.example/app.js"),
  fetch("https://cdn-west.example/app.js"),
]);
`,
  examples: [
    {
      id: "flag",
      title: "Realtime: default a flag once",
      about: "`??=` keeps an explicit `false`.",
      language: "javascript",
      code: `function boot(config) {
  config.analytics ??= { enabled: true };
  return config;
}
`,
    },
  ],
});
