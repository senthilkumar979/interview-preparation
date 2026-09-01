import { esTopic } from "./factory";

export const es2016 = esTopic({
  slug: "es2016",
  title: "ES2016",
  order: 3,
  summary: "`Array.prototype.includes` and the exponentiation operator `**`.",
  prerequisites: ["es2015"],
  related: ["es2017"],
  oneLiner:
    "ES2016 (7th edition) is tiny: `arr.includes(x)` (unlike `indexOf`, it finds `NaN`) and `a ** b` (`Math.pow`). `includes` also takes `fromIndex`.",
  beats: [
    "`[NaN].includes(NaN)` is `true`; `indexOf` is `-1`.",
    "`**` is right-associative: `2 ** 3 ** 2` is `2 ** 9`.",
    "String `includes` was already ES2015; this is Array (and TypedArray).",
  ],
  intro: "First yearly drop after ES6. Interviews use it to see if you know `includes` vs `indexOf`.",
  why: "Feature flags and tag lists: “is this sku already in the cart ids?”",
  concept: "`SameValueZero` equality for `includes` (like `Set`).",
  how: "Prefer `includes` for membership. Use `**` for scores/exponents, not for integers that belong in `BigInt` later.",
  usage: "Permissions: `roles.includes(\"admin\")`. Pricing: `base ** surge`.",
  practices: "`includes` for primitives. For objects, `Set` or an id list.",
  mistakes: "`users.includes(user)` by object identity. `2 ** 3 ** 2` without parens.",
  code: `const tags = ["js", "css", "html"];
if (tags.includes("js")) passQuiz("javascript");

const area = side ** 2;
`,
  examples: [
    {
      id: "sku",
      title: "Realtime: already in cart?",
      about: "Sku list membership.",
      language: "javascript",
      code: `function canAdd(sku, cartSkus) {
  return !cartSkus.includes(sku);
}
`,
    },
  ],
});

export const es2017 = esTopic({
  slug: "es2017",
  title: "ES2017",
  order: 4,
  summary: "`async`/`await`, `Object.values`/`entries`, string padding, trailing commas, Atomics.",
  prerequisites: ["es2016"],
  related: ["es2018", "javascript-async-await"],
  isHighYield: true,
  oneLiner:
    "ES2017 introduced `async function` / `await` (Promise syntax), `Object.values`/`Object.entries`/`Object.getOwnPropertyDescriptors`, `padStart`/`padEnd`, trailing commas in params, and SharedArrayBuffer + `Atomics` for workers.",
  beats: [
    "`await` pauses an async function until a Promise settles. Errors become `throw` from `await`.",
    "`Object.entries` is the loop form that later `fromEntries` (2019) inverts.",
    "`padStart` is for invoices (`\"42\".padStart(6, \"0\")`), not security.",
  ],
  intro: "This is when callback-hell questions officially lost. Everything async after this is still Promises.",
  why: "Every `loadUser` in a product is `async`/`await` plus `entries` for maps-to-UI.",
  concept: "`async` always returns a Promise. `await` on a non-Promise wraps it. Atomics are for `SharedArrayBuffer`, not UI code.",
  how: "Mark the function `async`. `try/catch` around `await fetch`.",
  usage: "Checkout submit, profile load, invoice numbers.",
  extras: [
    {
      key: "object",
      title: "`values` / `entries` / descriptors",
      body: "`Object.values(user)` for a summary list. `Object.entries(errors)` to render field errors. `getOwnPropertyDescriptors` is how you copy accessors (`Object.assign` copies values, not getters).",
    },
  ],
  practices: "Don’t mix `.then` pyramids with `await` in the same function. `Promise.all` for independent awaits.",
  mistakes: "Forgetting `await`. `Object.values` on a `Map` (use `[...map.values()]`). Padding credit-card numbers as a “security” measure.",
  code: `async function placeOrder(cartId) {
  const res = await fetch(\`/api/carts/\${cartId}/checkout\`, { method: "POST" });
  if (!res.ok) throw new Error("checkout_failed");
  return res.json();
}
`,
  examples: [
    {
      id: "errors",
      title: "Realtime: field errors",
      about: "`Object.entries` → list in the UI.",
      language: "javascript",
      code: `function errorList(errors) {
  return Object.entries(errors).map(
    ([field, message]) => \`\${field}: \${message}\`,
  );
}
`,
    },
    {
      id: "invoice",
      title: "Realtime: invoice number",
      about: "`padStart` for display ids.",
      language: "javascript",
      code: `const invoiceNo = String(42).padStart(6, "0"); // "000042"
`,
    },
  ],
});

export const es2018 = esTopic({
  slug: "es2018",
  title: "ES2018",
  order: 5,
  summary: "Object rest/spread, `for await…of`, `Promise.finally`, RegExp named groups and lookbehind.",
  prerequisites: ["es2017"],
  related: ["es2019"],
  isHighYield: true,
  oneLiner:
    "ES2018 added `{ ...user, role: \"admin\" }` and `const { password, ...publicUser } = user`, `for await (const chunk of stream)`, `promise.finally(cleanup)`, and RegExp: named groups `(?<year>\\d{4})`, lookbehind, `s` (dotAll), Unicode property escapes `\\p{L}`.",
  beats: [
    "Object spread is shallow and last-write-wins. It skips `null`/`undefined` sources.",
    "`finally` runs on fulfill and reject; its return does not replace a rejection unless it throws.",
    "`for await` needs an async iterable (fetch body streams, async generators).",
  ],
  intro: "Object spread is how every React `setState` patch looks, even if React isn’t in ECMA-262.",
  why: "Strip secrets from a user object before `JSON.stringify`. Clean up spinners in `finally`.",
  concept: "Rest in objects is omit-by-destructure. Async iteration is the iterator protocol with Promises.",
  how: "Prefer spread over `Object.assign` for copies. Use named groups for date parsers.",
  usage: "Profile updates, NDJSON streams, analytics cleanup.",
  practices: "Don’t spread untrusted JSON onto a privileged object (`{ ...admin, ...body }`). Always `finally` the loading flag.",
  mistakes: "Deep-merge expectations. `finally` returning a value to “reset” a failed fetch (it doesn’t swallow).",
  code: `async function saveProfile(user, patch) {
  setLoading(true);
  try {
    const { password, ...safe } = { ...user, ...patch };
    await fetch("/api/me", { method: "PUT", body: JSON.stringify(safe) });
  } finally {
    setLoading(false);
  }
}
`,
  examples: [
    {
      id: "date",
      title: "Realtime: parse ISO date bits",
      about: "Named capture groups.",
      language: "javascript",
      code: `const re = /(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})/;
const { y, m, d } = "2026-08-31".match(re).groups;
`,
    },
    {
      id: "stream",
      title: "Realtime: log stream",
      about: "`for await` of an async generator.",
      language: "javascript",
      code: `async function consume(logs) {
  for await (const line of logs) appendLog(line);
}
`,
    },
  ],
});
