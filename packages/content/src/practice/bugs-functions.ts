import type { FinderPackage } from "./types";

export const bugJsPack: FinderPackage = {
  slug: "js-functions",
  title: "JS functions",
  summary: "Single functions. List the bugs; reveal answers one by one.",
  kind: "js-function",
  items: [
    {
      id: "sum-off",
      title: "Inclusive range sum",
      kind: "js-function",
      language: "javascript",
      snippet: `function sumTo(n) {
  let total = 0;
  for (var i = 0; i <= n; i++);
    total += i;
  return total;
}
`,
      answers: [
        "The `for` loop has a trailing semicolon, so the body never runs; `total += i` uses `i` after the loop (`n+1`).",
        "`var i` leaks to the function; `let` would still be wrong because of the empty loop.",
      ],
    },
    {
      id: "unique-mutate",
      title: "Unique",
      kind: "js-function",
      language: "javascript",
      snippet: `function unique(list) {
  for (let i = 0; i < list.length; i++) {
    if (list.indexOf(list[i]) !== i) list.splice(i, 1);
  }
  return list;
}
`,
      answers: [
        "Mutates the input array while iterating, so indexes skip after `splice`.",
        "`indexOf` uses `===` and fails for NaN; also mutates caller data instead of returning a new list.",
      ],
    },
    {
      id: "eq-null",
      title: "Parse count",
      kind: "js-function",
      language: "javascript",
      snippet: `function parseCount(value) {
  if (value == null) return 0;
  return value + 1;
}
`,
      answers: [
        "`value + 1` concatenates if `value` is a numeric string (`\"2\" + 1 === \"21\"`).",
        "`== null` is fine for null/undefined, but there is no `Number`/`parseInt` and no `Number.isFinite` check.",
      ],
    },
    {
      id: "debounce-this",
      title: "Debounce",
      kind: "js-function",
      language: "javascript",
      snippet: `function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
`,
      answers: [
        "Does not forward `this`; callers like `el.addEventListener('click', debounce(handler, 200))` lose the element as `this`.",
        "No `flush`/`cancel`; a trailing call after unmount still fires.",
      ],
    },
    {
      id: "closure-loop",
      title: "Delayed log",
      kind: "js-function",
      language: "javascript",
      snippet: `function scheduleLogs(n) {
  for (var i = 0; i < n; i++) {
    setTimeout(function () {
      console.log(i);
    }, 100);
  }
}
`,
      answers: [
        "`var i` is function-scoped, so every timeout logs `n`, not `0..n-1`.",
        "Fix is `let i` or capture with a factory / `setTimeout(..., i)` argument.",
      ],
    },
    {
      id: "flatten-shallow",
      title: "Flatten",
      kind: "js-function",
      language: "javascript",
      snippet: `function flatten(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) acc.push(...item);
    else acc.push(item);
    return acc;
  }, []);
}
`,
      answers: [
        "Only one level deep; nested arrays stay nested.",
        "Spreading a huge nested array can hit the argument-count limit; recursive concat or an iterative stack is safer.",
      ],
    },
    {
      id: "group-by",
      title: "Group by",
      kind: "js-function",
      language: "javascript",
      snippet: `function groupBy(items, key) {
  const out = {};
  items.forEach((item) => {
    const k = item[key];
    out[k].push(item);
  });
  return out;
}
`,
      answers: [
        "`out[k]` is `undefined` on first insert — need `out[k] ??= []` (or `Object.create(null)`).",
        "`item[key]` as an object key stringifies (`[object Object]`); missing keys become `\"undefined\"`.",
        "Mutates nothing of `items` but uses `forEach` with no guard if `items` is null.",
      ],
    },
    {
      id: "promise-all",
      title: "Fetch all ids",
      kind: "js-function",
      language: "javascript",
      snippet: `async function loadAll(ids) {
  const results = [];
  ids.forEach(async (id) => {
    const res = await fetch('/x/' + id);
    results.push(await res.json());
  });
  return results;
}
`,
      answers: [
        "`forEach` does not await async callbacks, so the function returns `[]` immediately.",
        "No `res.ok` check; failed fetches still `json()`. Use `Promise.all(ids.map(...))`.",
      ],
    },
    {
      id: "sort-numbers",
      title: "Sort scores",
      kind: "js-function",
      language: "javascript",
      snippet: `function topScore(scores) {
  return scores.sort()[scores.length - 1];
}
`,
      answers: [
        "`Array.sort` is lexicographic by default (`10` before `2`).",
        "Mutates the input array; should copy (`[...scores]`) and compare numerically.",
        "Empty array: `sort()[-1]` is `undefined` with no error.",
      ],
    },
    {
      id: "shallow-equal",
      title: "Objects equal",
      kind: "js-function",
      language: "javascript",
      snippet: `function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
`,
      answers: [
        "Key order, `undefined` values, `NaN`, and functions break `JSON.stringify` equality.",
        "Circular objects throw; Dates become ISO strings and lose type.",
      ],
    },
  ],
};

export const bugTsPack: FinderPackage = {
  slug: "ts-functions",
  title: "TS functions",
  summary: "Typed functions with real type and logic bugs.",
  kind: "ts-function",
  items: [
    {
      id: "user-any",
      title: "Load user",
      kind: "ts-function",
      language: "typescript",
      snippet: `async function loadUser(id: string): Promise<User> {
  const res: any = await fetch('/api/users/' + id);
  return res.json();
}
`,
      answers: [
        "`res` is typed `any`, so `json()` is not checked; `fetch` returns `Response`, not the JSON body.",
        "No `res.ok` check; HTTP errors still parse. Return type `User` is a lie without validation.",
        "String concat for URL does not encode `id`.",
      ],
    },
    {
      id: "narrow",
      title: "Pick name",
      kind: "ts-function",
      language: "typescript",
      snippet: `function nameOf(value: string | null): string {
  return value.toUpperCase();
}
`,
      answers: [
        "`value` can be `null`; calling `toUpperCase` is an unchecked null access.",
        "No narrowing (`if (!value)`) before use.",
      ],
    },
    {
      id: "assert-user",
      title: "Parse user",
      kind: "ts-function",
      language: "typescript",
      snippet: `function parseUser(raw: unknown): User {
  return raw as User;
}
`,
      answers: [
        "`as User` is a compile-time lie — no runtime check of `id`/`email`/shape.",
        "`unknown` is correct input; should narrow with a type guard or a schema (Zod).",
      ],
    },
    {
      id: "partial-update",
      title: "Patch user",
      kind: "ts-function",
      language: "typescript",
      snippet: `function patch(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}
`,
      answers: [
        "`Partial<User>` allows `email: undefined`, which overwrites a required field via spread.",
        "Nested objects are replaced wholesale, not merged; readonly arrays on `User` can be mutated later.",
      ],
    },
    {
      id: "generic-id",
      title: "Find by id",
      kind: "ts-function",
      language: "typescript",
      snippet: `function findById<T>(items: T[], id: string): T {
  return items.find((item) => (item as any).id === id);
}
`,
      answers: [
        "`find` can return `undefined`; the return type `T` is wrong — should be `T | undefined`.",
        "`as any` drops the constraint; `T extends { id: string }` is the typed version.",
      ],
    },
    {
      id: "enum-status",
      title: "Is open",
      kind: "ts-function",
      language: "typescript",
      snippet: `enum Status {
  Open = 'open',
  Closed = 'closed',
}

function isOpen(value: string): boolean {
  return value === Status.Open;
}
`,
      answers: [
        "`value: string` accepts any string; a union `'open' | 'closed'` (or `Status`) would be checked at the call site.",
        "Numeric enums would make `=== Status.Open` fail for the reverse mapping; string enums are OK here but still overused.",
      ],
    },
    {
      id: "readonly-push",
      title: "Add tag",
      kind: "ts-function",
      language: "typescript",
      snippet: `function addTag(tags: readonly string[], tag: string): string[] {
  tags.push(tag);
  return tags;
}
`,
      answers: [
        "`readonly string[]` forbids `push` at the type level — this should not compile; mutating would also change the caller's array.",
        "Return type should be a new array: `return [...tags, tag]`.",
      ],
    },
    {
      id: "promise-unwrap",
      title: "First result",
      kind: "ts-function",
      language: "typescript",
      snippet: `async function first<T>(tasks: Promise<T>[]): Promise<T> {
  const [head] = tasks;
  return head;
}
`,
      answers: [
        "Empty `tasks` makes `head` `undefined`, but the return type is `Promise<T>`.",
        "Returning `head` is a Promise; `async` wraps it again (harmless) but never `await`s, so later tasks are ignored — likely meant `Promise.race` or `tasks[0]` after a length check.",
      ],
    },
  ],
};
