import { esTopic } from "./factory";

export const es2015 = esTopic({
  slug: "es2015",
  title: "ES2015 (ES6)",
  order: 2,
  summary: "The big jump: let/const, arrows, classes, modules, promises, destructuring, Map/Set, and more.",
  prerequisites: ["es-overview"],
  related: ["es2016", "javascript-modules", "javascript-promise"],
  isHighYield: true,
  oneLiner:
    "ES2015 is still “modern JavaScript” in interviews: block scope (`let`/`const`), arrows, classes, `import`/`export`, template literals, default/rest/spread, destructuring, `for…of`, `Promise`, `Map`/`Set`/`WeakMap`/`WeakSet`, `Symbol`, iterators/generators, enhanced object literals, `Proxy`/`Reflect`, and new Array/String/Number/Math methods.",
  beats: [
    "`var` function-scopes; `let`/`const` block-scope and are TDZ until initialized. `const` is binding-immutable, not deep-freeze.",
    "Modules are static and live-bind exports. Promises are the async primitive later `async/await` desugars to.",
    "Spread copies enumerable own properties (shallow). `Proxy` intercepts operations — not a deep clone.",
  ],
  intro: "If you can only memorize one edition, this is it. Later years are smaller deltas.",
  why: "Every SPA, every bundler, every “convert this callback to a promise” question sits here.",
  concept:
    "ES2015 made JS usable for large apps: real modules, classes as syntax over prototypes, and a standard async value (`Promise`).",
  how: "Engines parse new syntax. Old browsers needed Babel. Today you write ES2015 natively except when targeting ancient WebViews.",
  usage: "Checkout carts, dashboards, Node CLIs — all of it.",
  extras: [
    {
      key: "bindings",
      title: "`let`, `const`, arrows, defaults, rest, spread",
      body: "`const` for bindings you won’t reassign. Arrows inherit `this` (lexically) — wrong for DOM `addEventListener` if you needed the element as `this`. Default params run when the arg is `undefined`, not when it’s `null`. Rest is `...args` in parameters; spread is `...` in calls and arrays.",
    },
    {
      key: "objects",
      title: "Objects, classes, destructuring, templates",
      body: "Shorthand `{ user }`, computed `{ [id]: row }`, methods `save() {}`. Classes: `constructor`, `extends`, `super`. Destructuring: `const { email } = user`, `const [first, ...rest] = items`. Templates: `` `Hello ${name}` `` and tagged templates for sanitization.",
    },
    {
      key: "async-iter",
      title: "Promises, iterators, modules, collections",
      body: "`new Promise`, `then`/`catch`. `for…of` uses `[Symbol.iterator]`. Generators `function*` yield. `import`/`export` (static). `Map` for arbitrary keys (user objects as keys), `Set` for unique ids, Weak* for GC-friendly caches. `Symbol` for unique keys. `Proxy` for logging/validation.",
    },
    {
      key: "lib",
      title: "Library extras",
      body: "`Array.from`, `Array.of`, `find`/`findIndex`, `fill`, `copyWithin`. `String` `includes`/`startsWith`/`endsWith`/`repeat`/`codePointAt`. `Object.assign`, `Object.is` (`NaN` is `NaN`). `Number.isNaN` (doesn’t coerce). `Math.trunc`/`sign`/`hypot`/`imul`. Typed arrays were standardized here for binary data.",
    },
  ],
  practices: "`const` by default. Named exports. Don’t use arrows as object methods that need `this`. Shallow-copy with spread; deep-clone with `structuredClone` (later host/HTML).",
  mistakes: "`const user = {}; user.name = 'a'` is legal. `Promise` without `catch`. Circular `import`. Using `Map` when a plain object of string keys is enough — or the reverse for `user` keys.",
  code: `import { formatMoney } from "./money.js";

export function lineTotal({ price, qty = 1, discount = 0 }) {
  const next = { ...{ price, qty }, discount };
  return formatMoney(next.price * next.qty * (1 - next.discount));
}
`,
  examples: [
    {
      id: "cart",
      title: "Realtime: shopping cart line",
      about: "Destructure the payload, default qty, spread a patch, Map of sku → count.",
      language: "javascript",
      code: `const cart = new Map();

function addToCart({ sku, qty = 1 }) {
  cart.set(sku, (cart.get(sku) || 0) + qty);
}

function checkout(items) {
  return items.map(({ sku, price, qty = 1 }) => ({
    sku,
    total: price * qty,
  }));
}
`,
    },
    {
      id: "feed",
      title: "Realtime: activity feed",
      about: "`for…of` + template + Promise for one page of a feed.",
      language: "javascript",
      code: `function renderFeed(events) {
  const html = [];
  for (const { author, text } of events) {
    html.push(\`<li><strong>\${author}</strong> \${text}</li>\`);
  }
  return html.join("");
}

function loadFeed(url) {
  return fetch(url).then((r) => r.json());
}
`,
    },
    {
      id: "class",
      title: "Realtime: form model",
      about: "Class + computed property for field errors.",
      language: "javascript",
      code: `class SignupForm {
  constructor() {
    this.errors = {};
  }
  setError(field, message) {
    this.errors = { ...this.errors, [field]: message };
  }
}
`,
    },
  ],
});
