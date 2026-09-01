import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptArrayMethodTopics: Topic[] = [
  jsTopic({
    slug: "javascript-array-foreach",
    title: "Array.prototype.forEach",
    order: 49,
    summary: "Run a callback for each existing index. Always returns undefined. Mutates nothing by itself.",
    prerequisites: ["javascript-array"],
    related: ["javascript-array-map"],
    oneLiner:
      "`forEach` visits each present element and returns `undefined`. It is for side effects, not transformation.",
    beats: [
      "Return value is always `undefined` — you cannot chain a result.",
      "Sparse arrays: holes are skipped. Explicit `undefined` is visited.",
      "`break`/`return` in the callback only exits that invocation, not the loop. Use `some`/`every`/`for` to stop early.",
    ],
    intro: "First method after the array overview. Interviews use it to separate iteration-for-effects from `map`.",
    why: "People `return` from `forEach` expecting a new array, or try to `break` out.",
    concept: "Callback `(value, index, array)`. `thisArg` optional. Does not mutate the array unless your callback does.",
    how: "Walks `0 .. length-1`, skips missing properties. Length is captured up front; later appends are not visited.",
    usage: "Logging, dispatching, accumulating into an outer variable when `reduce` is overkill for the team.",
    practices: "Prefer `map`/`filter`/`reduce` when you need a value. Prefer `for...of` when you need `break`.",
    mistakes: "`const x = arr.forEach(...)`. Treating holes like `undefined`. Mutating the array while iterating.",
    code: `const logs = [];
[1, , 3].forEach((n) => logs.push(n));
console.log(logs); // [1, 3]
console.log([1, 2].forEach((n) => n * 2)); // undefined
`,
    examples: [
      {
        id: "no-break",
        title: "return does not stop forEach",
        about: "The callback return is ignored.",
        language: "javascript",
        code: `let n = 0;
[1, 2, 3].forEach((x) => {
  n += 1;
  return;
});
console.log(n); // 3
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-map",
    title: "Array.prototype.map",
    order: 50,
    summary: "Build a new array of the same length by transforming each present element.",
    prerequisites: ["javascript-array-foreach"],
    related: ["javascript-array-filter", "javascript-array-flatmap"],
    isHighYield: true,
    oneLiner:
      "`map` returns a new array: each present index is `callback(value)`. Holes stay holes. The source is not mutated.",
    beats: [
      "Copy, not mutate. Same `length`. Sparse holes are preserved (not filled).",
      "Callback return becomes the new element. Forgetting `return` yields `undefined` slots.",
      "Do not `map` for side effects — that is `forEach`. Nested arrays are not flattened.",
    ],
    intro: "Highest-yield transform. Interviewers look for unused return and sparse-array behavior.",
    why: "React lists, DTO mapping, and accidental `undefined` arrays from missing returns.",
    concept: "Pure projection: `A → B` per index. Generic: `array.map(fn)` length equals source length.",
    how: "New array allocated. For each present index, set mapped value. Missing indexes stay missing.",
    usage: "`users.map(u => u.id)`. Format dates. Wrap nodes.",
    practices: "Always return from the callback. Prefer `flatMap` when one item becomes many. Keep callbacks pure.",
    mistakes: "`map` then ignoring the result. `map` + `filter` when `flatMap` is clearer. Mutating items in place and also mapping.",
    code: `const a = [1, , 3];
console.log(a.map((n) => n * 2)); // [2, empty, 6]
console.log([1, 2].map((n) => { n * 2; })); // [undefined, undefined]
`,
    examples: [
      {
        id: "identity-holes",
        title: "Holes survive map",
        about: "Not the same as mapping undefined.",
        language: "javascript",
        code: `console.log([, 1].map((x) => x));
console.log([undefined, 1].map((x) => x));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-filter",
    title: "Array.prototype.filter",
    order: 51,
    summary: "New array of elements for which the predicate is truthy. Skips holes.",
    prerequisites: ["javascript-array-map"],
    related: ["javascript-array-find", "javascript-array-some"],
    isHighYield: true,
    oneLiner:
      "`filter` copies elements whose callback is truthy. Source unchanged. Holes are skipped (they never appear in the result).",
    beats: [
      "Result is dense even if the source was sparse — holes are dropped, not copied.",
      "Predicate uses ToBoolean: `0`, `\"\"`, `null` are removed if you return the value itself.",
      "Does not mutate. Combine with `map` or use `flatMap` / `reduce` for map-filter in one pass.",
    ],
    intro: "Selection without mutation. Trap: filtering with a value instead of a boolean.",
    why: "Search UIs, removing nulls, and accidentally dropping `0`.",
    concept: "Keep-if-true. Length of result ≤ source present-element count.",
    how: "Iterate present indexes; `push` when `ToBoolean(callback(...))` is true.",
    usage: "`items.filter(Boolean)` to drop falsy. `filter(x => x.id !== id)`.",
    practices: "Return a real boolean. Do not `filter` for the first match — use `find`.",
    mistakes: "`filter(n => n)` dropping zeros. Expecting holes to become `undefined` in the output.",
    code: `console.log([0, 1, 2].filter((n) => n)); // [1, 2]
console.log([1, , 3].filter(() => true)); // [1, 3]
`,
    examples: [
      {
        id: "boolean",
        title: "filter(Boolean)",
        about: "Removes falsy, including 0.",
        language: "javascript",
        code: `console.log([0, "", 2].filter(Boolean)); // [2]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-reduce",
    title: "Array.prototype.reduce",
    order: 52,
    summary: "Fold left-to-right into one value. Initial value optional — and dangerous when omitted.",
    prerequisites: ["javascript-array-filter"],
    related: ["javascript-array-reduceright", "javascript-array-map"],
    isHighYield: true,
    oneLiner:
      "`reduce` walks present elements left to right, threading an accumulator. Always pass an initial value unless you can name the empty-array crash.",
    beats: [
      "Copy as far as the array: reduce does not mutate. Return is the last accumulator.",
      "No initial value: first present element is the seed; empty array throws `TypeError`.",
      "Holes skipped. `reduce` can implement map/filter/group — interviews still prefer the dedicated methods when they fit.",
    ],
    intro: "The fold. High-yield: empty array, omitted init, and using reduce for everything.",
    why: "Sums, grouping, and “why did empty throw?”",
    concept: "`(acc, value, index, array) => nextAcc`. Init is `acc` for the first call if provided.",
    how: "If init omitted, skip to first present element as acc, then fold the rest. Sparse: holes never become acc.",
    usage: "Sum, product, flatten one level, build a map of counts.",
    practices: "Always pass `init` (`0`, `[]`, `{}`). Keep the reducer pure. Split complex folds.",
    mistakes: "Omitted init on possibly empty arrays. Mutating `acc` that is a shared object. Right-fold needs `reduceRight`.",
    code: `console.log([1, 2, 3].reduce((a, n) => a + n, 0)); // 6
console.log([1, , 3].reduce((a, n) => a + n, 0)); // 4
try {
  [].reduce((a, n) => a + n);
} catch (e) {
  console.log(e instanceof TypeError); // true
}
`,
    examples: [
      {
        id: "no-init",
        title: "First element as seed",
        about: "Callback starts at the second present item.",
        language: "javascript",
        code: `const calls = [];
[10, 20].reduce((a, n) => {
  calls.push([a, n]);
  return a + n;
});
console.log(calls); // [[10, 20]]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-reduceright",
    title: "Array.prototype.reduceRight",
    order: 53,
    summary: "Fold from the last present index toward index 0. Same init/empty rules as reduce.",
    prerequisites: ["javascript-array-reduce"],
    related: ["javascript-array-reduce"],
    oneLiner:
      "`reduceRight` is `reduce` in reverse index order. Empty array without an initial value still throws.",
    beats: [
      "Does not mutate. Return is the final accumulator.",
      "Holes skipped, walking high indices first.",
      "Function composition (`compose(f,g,h)`) is the classic use; most sums should stay `reduce`.",
    ],
    intro: "Same machine as reduce, opposite direction.",
    why: "Right-associative operations and “is it just reversed then reduce?” (not quite: holes and index arguments differ).",
    concept: "Start at the rightmost present index. Init optional with the same TypeError on empty.",
    how: "If no init, seed is the last present element; then walk left.",
    usage: "Compose functions. Nested binary ops that associate right.",
    practices: "Prefer `reduce` unless order is semantically right-to-left. Always pass init.",
    mistakes: "`arr.slice().reverse().reduce` as a substitute without thinking about indexes in the callback.",
    code: `console.log(["a", "b", "c"].reduceRight((acc, ch) => acc + ch, "")); // "cba"
`,
    examples: [
      {
        id: "compose",
        title: "Right fold composition",
        about: "h then g then f.",
        language: "javascript",
        code: `const f = (x) => x + 1;
const g = (x) => x * 2;
console.log([f, g].reduceRight((x, fn) => fn(x), 3)); // f(g(3)) = 7
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-find",
    title: "Array.prototype.find",
    order: 54,
    summary: "First present element whose predicate is truthy, or undefined. Does not copy the array.",
    prerequisites: ["javascript-array-reduceright"],
    related: ["javascript-array-findindex", "javascript-array-filter"],
    isHighYield: true,
    oneLiner:
      "`find` returns the first matching element (or `undefined`). Stops early. Source is not mutated.",
    beats: [
      "Not a copy of the array. Objects returned are the same references as in the source.",
      "Holes are skipped. You cannot find a hole.",
      "`find` vs `filter()[0]`: find stops; filter builds a whole array. `find` cannot tell missing from `undefined` values.",
    ],
    intro: "Search for a value. High-yield vs `filter` and vs `indexOf`.",
    why: "Lookup by predicate. Trap: `find` of `undefined` vs no match.",
    concept: "Short-circuiting search. Predicate `(value, index, array)`.",
    how: "Ascending indexes, skip holes, return first truthy predicate value (the element).",
    usage: "`users.find(u => u.id === id)`. Optional chaining on the result.",
    practices: "If you need the index, use `findIndex`. If you need all matches, `filter`.",
    mistakes: "Assuming no match vs element `undefined` are distinguishable. Mutating during find.",
    code: `const users = [{ id: 1 }, { id: 2 }];
console.log(users.find((u) => u.id === 2));
console.log([, 1].find((n) => n === undefined)); // undefined — hole skipped
console.log([undefined].find((n) => n === undefined)); // undefined — found
`,
    examples: [
      {
        id: "same-ref",
        title: "Same object reference",
        about: "Mutating the find result mutates the array item.",
        language: "javascript",
        code: `const a = [{ n: 1 }];
a.find((x) => x.n === 1).n = 2;
console.log(a[0].n); // 2
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-findindex",
    title: "Array.prototype.findIndex",
    order: 55,
    summary: "Index of the first match, or -1. Same skip-holes and short-circuit as find.",
    prerequisites: ["javascript-array-find"],
    related: ["javascript-array-findlastindex", "javascript-array-indexof"],
    oneLiner:
      "`findIndex` returns the first index where the predicate is truthy, else `-1`. Does not mutate.",
    beats: [
      "Use when you need the position for `splice`/`with`.",
      "Holes skipped, so you never get the index of a hole.",
      "`indexOf` is `===` only; `findIndex` is any predicate (NaN-friendly).",
    ],
    intro: "Index companion to `find`.",
    why: "Update-in-place by index without a manual loop.",
    concept: "Same walk as `find`, return index not element.",
    how: "On match return `i`; after last present index return `-1`.",
    usage: "`const i = arr.findIndex(pred); if (i !== -1) ...`",
    practices: "Check `-1`. Prefer `find` when you only need the element.",
    mistakes: "Confusing `-1` with `0`. Using `indexOf(NaN)` instead of `findIndex(Number.isNaN)`.",
    code: `console.log([1, NaN].findIndex(Number.isNaN)); // 1
console.log([1, NaN].indexOf(NaN)); // -1
`,
    examples: [
      {
        id: "holes",
        title: "Holes are not found",
        about: "empty slots are skipped.",
        language: "javascript",
        code: `console.log([, "a"].findIndex((x) => x === undefined)); // -1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-findlast",
    title: "Array.prototype.findLast",
    order: 56,
    summary: "Last matching present element, or undefined. ES2023. Does not mutate.",
    prerequisites: ["javascript-array-findindex"],
    related: ["javascript-array-find", "javascript-array-findlastindex"],
    oneLiner:
      "`findLast` is `find` from the end. Same hole-skipping and `undefined` ambiguity.",
    beats: [
      "Copy? No — returns the element reference. Array unchanged.",
      "Walks high indexes first; skips holes.",
      "Polyfill era: people used `[...arr].reverse().find` which mutates if you reverse in place.",
    ],
    intro: "Newest of the find family. Know the reverse-in-place trap.",
    why: "Last matching log line, last enabled flag.",
    concept: "Predicate search descending.",
    how: "From `length-1` down, skip holes, first (from the right) truthy predicate.",
    usage: "`events.findLast(e => e.type === \"click\")`.",
    practices: "Do not `reverse()` just to find last — it mutates.",
    mistakes: "`arr.reverse().find(...)` mutating the UI list.",
    code: `console.log([1, 2, 1].findLast((n) => n === 1)); // 1 (the last 1)
`,
    examples: [
      {
        id: "from-end",
        title: "Rightmost match",
        about: "Not the same object as find.",
        language: "javascript",
        code: `const a = [{ k: 1 }, { k: 1 }];
console.log(a.find((x) => x.k) === a.findLast((x) => x.k)); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-findlastindex",
    title: "Array.prototype.findLastIndex",
    order: 57,
    summary: "Index of the last match, or -1. ES2023. Does not mutate.",
    prerequisites: ["javascript-array-findlast"],
    related: ["javascript-array-findindex", "javascript-array-lastindexof"],
    oneLiner:
      "`findLastIndex` returns the greatest index whose predicate is truthy, else `-1`.",
    beats: [
      "Non-mutating. Predicate, so it can find `NaN`.",
      "Holes skipped.",
      "`lastIndexOf` is strict equality from the right; this is the predicate form.",
    ],
    intro: "Index form of `findLast`.",
    why: "Splice/replace from the tail without reversing.",
    concept: "Descending `findIndex`.",
    how: "Return first descending match index or `-1`.",
    usage: "Remove last matching item via `toSpliced` / `splice`.",
    practices: "Guard `-1` before using as an index.",
    mistakes: "Mixing up with `lastIndexOf` for objects (`===` identity).",
    code: `console.log([1, 2, 1].findLastIndex((n) => n === 1)); // 2
`,
    examples: [
      {
        id: "nan",
        title: "NaN from the right",
        about: "lastIndexOf cannot see NaN.",
        language: "javascript",
        code: `console.log([NaN, 1, NaN].findLastIndex(Number.isNaN)); // 2
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-some",
    title: "Array.prototype.some",
    order: 58,
    summary: "true if any present element matches. Empty array is false. Short-circuits.",
    prerequisites: ["javascript-array-findlastindex"],
    related: ["javascript-array-every", "javascript-array-find"],
    isHighYield: true,
    oneLiner:
      "`some` is existential: true if one present element satisfies the predicate. Empty → `false`. Does not mutate.",
    beats: [
      "Stops on first truthy. Return is boolean, not the element (`find` for that).",
      "Holes skipped. Empty array: `false` (vacuous — no witness).",
      "Use as a forEach-with-break.",
    ],
    intro: "High-yield boolean search. Pair with `every` in interviews.",
    why: "Permission checks, “is any invalid?”",
    concept: "∃x P(x) over present elements.",
    how: "Ascending, skip holes; return true on first match, else false.",
    usage: "`items.some(i => i.id === id)`. Feature flags.",
    practices: "Prefer `some` over `filter().length`. Keep predicates side-effect free if you rely on short-circuit.",
    mistakes: "Expecting `true` on empty. Confusing with `find` (truthy element vs boolean).",
    code: `console.log([1, 2].some((n) => n > 1)); // true
console.log([].some(() => true)); // false
console.log([, 2].some((n) => n === undefined)); // false
`,
    examples: [
      {
        id: "break",
        title: "Early exit",
        about: "Later callbacks never run.",
        language: "javascript",
        code: `let n = 0;
[1, 2, 3].some((x) => {
  n += 1;
  return x === 1;
});
console.log(n); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-every",
    title: "Array.prototype.every",
    order: 59,
    summary: "true if all present elements match. Empty array is true. Short-circuits on failure.",
    prerequisites: ["javascript-array-some"],
    related: ["javascript-array-some"],
    isHighYield: true,
    oneLiner:
      "`every` is universal: true if every present element passes. Empty → `true`. Does not mutate.",
    beats: [
      "Vacuous truth: `[].every(anything)` is `true`. Interview classic.",
      "Holes skipped — a hole does not fail the test.",
      "Stops on first falsy predicate.",
    ],
    intro: "The dual of `some`. Empty-array `true` is the trap.",
    why: "Validation. Accidental pass on empty lists.",
    concept: "∀x P(x) over present elements; no elements ⇒ true.",
    how: "Ascending; return false on first failure; true if none fail.",
    usage: "`rows.every(r => r.valid)`. Form completeness.",
    practices: "If empty should fail, check `length` first. Do not use `every` to iterate for effects.",
    mistakes: "Assuming empty is false. Treating holes as failing elements.",
    code: `console.log([2, 4].every((n) => n % 2 === 0)); // true
console.log([].every(() => false)); // true
console.log([, 2].every((n) => n === 2)); // true — hole skipped
`,
    examples: [
      {
        id: "vacuous",
        title: "Empty is true",
        about: "Gate with length when needed.",
        language: "javascript",
        code: `function allPositive(xs) {
  return xs.length > 0 && xs.every((n) => n > 0);
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-includes",
    title: "Array.prototype.includes",
    order: 60,
    summary: "SameValueZero search. Sees NaN. Holes count as undefined. Does not mutate.",
    prerequisites: ["javascript-array-every"],
    related: ["javascript-array-indexof", "javascript-array-some"],
    oneLiner:
      "`includes(value, fromIndex?)` is true if some index matches with SameValueZero (`NaN` equals `NaN`). Does not mutate.",
    beats: [
      "Unlike `indexOf`, `includes(NaN)` is true.",
      "Holes: `includes(undefined)` is true for a hole (treats missing as undefined).",
      "fromIndex can be negative (from the end).",
    ],
    intro: "Membership. Know NaN and holes vs indexOf.",
    why: "Feature detection, selected-id sets (prefer `Set` for large lists).",
    concept: "SameValueZero: like `===` but `NaN` matches `NaN`, and `+0` equals `-0`.",
    how: "Scan from `fromIndex` (clamped). Holes participate as `undefined`.",
    usage: "`allowed.includes(role)`. Optional fromIndex to skip a prefix.",
    practices: "Use `Set.has` for repeated lookups. Use `some` for object predicates.",
    mistakes: "`indexOf(x) !== -1` cargo-cult when `includes` exists; missing NaN.",
    code: `console.log([NaN].includes(NaN)); // true
console.log([,].includes(undefined)); // true
console.log([1, 2, 3].includes(2, 2)); // false
`,
    examples: [
      {
        id: "from-end",
        title: "Negative fromIndex",
        about: "Counted from length.",
        language: "javascript",
        code: `console.log([1, 2, 3].includes(1, -2)); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-indexof",
    title: "Array.prototype.indexOf",
    order: 61,
    summary: "First index with === match, or -1. Cannot find NaN. Holes are not undefined for ===.",
    prerequisites: ["javascript-array-includes"],
    related: ["javascript-array-lastindexof", "javascript-array-findindex"],
    oneLiner:
      "`indexOf` uses strict equality. Returns `-1` if missing. Does not mutate. `NaN` is never found.",
    beats: [
      "`indexOf(NaN)` is always `-1`. Use `includes` or `findIndex`.",
      "A hole is not `=== undefined`, so `indexOf(undefined)` skips holes.",
      "fromIndex optional; negative from the end.",
    ],
    intro: "Legacy search. Interview: NaN and holes vs includes.",
    why: "Still everywhere in old code; know the traps.",
    concept: "`===` scan. Return first index or `-1`.",
    how: "Start at fromIndex. Compare with `===`.",
    usage: "Primitives. Avoid for objects unless you mean identity.",
    practices: "Prefer `includes` for boolean membership. Prefer `findIndex` for predicates.",
    mistakes: "`~arr.indexOf` bit hack in interviews — explain it or skip it.",
    code: `console.log(["a", "b"].indexOf("b")); // 1
console.log([NaN].indexOf(NaN)); // -1
console.log([, undefined].indexOf(undefined)); // 1
`,
    examples: [
      {
        id: "hole",
        title: "Hole vs undefined",
        about: "indexOf skips empty slots.",
        language: "javascript",
        code: `console.log([,].indexOf(undefined)); // -1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-lastindexof",
    title: "Array.prototype.lastIndexOf",
    order: 62,
    summary: "Last === match, or -1. Same NaN and hole rules as indexOf. Does not mutate.",
    prerequisites: ["javascript-array-indexof"],
    related: ["javascript-array-findlastindex"],
    oneLiner:
      "`lastIndexOf` scans from the right with `===`. `NaN` still never matches. Does not mutate.",
    beats: [
      "fromIndex defaults to `length - 1`; negative from the end.",
      "Holes skipped for `undefined` search.",
      "Objects: last identical reference, not deep equal.",
    ],
    intro: "Rightward indexOf.",
    why: "Duplicate detection from the tail.",
    concept: "Strict equality, descending.",
    how: "Clamp fromIndex, walk down, `===`.",
    usage: "Last occurrence of a primitive token.",
    practices: "`findLastIndex` when you need a predicate or NaN.",
    mistakes: "Expecting NaN. Passing fromIndex `0` and wondering why only index 0 is searched.",
    code: `console.log([1, 2, 1].lastIndexOf(1)); // 2
console.log([1, 2, 1].lastIndexOf(1, 1)); // 0
`,
    examples: [
      {
        id: "nan",
        title: "NaN still invisible",
        about: "Same as indexOf.",
        language: "javascript",
        code: `console.log([NaN].lastIndexOf(NaN)); // -1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-at",
    title: "Array.prototype.at",
    order: 63,
    summary: "Element at index, with negative indexes from the end. Does not mutate. Holes yield undefined.",
    prerequisites: ["javascript-array-lastindexof"],
    related: ["javascript-array-slice"],
    oneLiner:
      "`at(i)` returns the element at `i`, or from the end if `i` is negative. Out of range → `undefined`. Does not mutate.",
    beats: [
      "`arr.at(-1)` is the last element — the reason this exists vs `arr[arr.length - 1]`.",
      "A hole reads as `undefined`, same as bracket access.",
      "Not a copy; objects are the same references.",
    ],
    intro: "Indexing with negatives. ES2022.",
    why: "Off-by-one on `length - 1`.",
    concept: "Relative index: negative wraps from length.",
    how: "`i < 0` → `i + length`. Then ordinary get. No throw on OOB.",
    usage: "`stack.at(-1)`. Last item in a pipeline.",
    practices: "Prefer `at(-1)` over fragile length math. Guard undefined.",
    mistakes: "`arr[-1]` is a string key `\"-1\"`, not the last element.",
    code: `const a = ["a", "b", "c"];
console.log(a.at(-1)); // "c"
console.log(a[-1]); // undefined (property "-1")
console.log([,].at(0)); // undefined
`,
    examples: [
      {
        id: "oob",
        title: "Out of range",
        about: "undefined, not throw.",
        language: "javascript",
        code: `console.log([1].at(5)); // undefined
console.log([1].at(-2)); // undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-slice",
    title: "Array.prototype.slice",
    order: 64,
    summary: "Shallow copy of a half-open index range. Does not mutate. Holes copied as holes.",
    prerequisites: ["javascript-array-at"],
    related: ["javascript-array-splice", "javascript-array-concat"],
    isHighYield: true,
    oneLiner:
      "`slice(start?, end?)` returns a new array of `[start, end)`. Source unchanged. Nested objects are shared (shallow).",
    beats: [
      "Copy, not mutate. `slice()` clones the array one level.",
      "Negative start/end count from the end. `end` omitted means `length`.",
      "Sparse: holes in the range stay holes. Array-likes: `Array.prototype.slice.call(arguments)`.",
    ],
    intro: "High-yield copy and subarray. Contrast with `splice`.",
    why: "Immutable updates, pagination, copying before mutate.",
    concept: "Half-open interval, shallow copy of indexed properties.",
    how: "Clamp indexes. Copy present indexes in range into a new array.",
    usage: "`arr.slice()` copy. `arr.slice(1, -1)` drop ends. Convert array-likes.",
    practices: "Use `slice` not `splice` when you must not mutate. For deep clone, not this.",
    mistakes: "Assuming deep copy. Confusing `slice` with `splice`. Passing end inclusive.",
    code: `const a = [0, 1, { n: 2 }, 3];
const b = a.slice(1, 3);
b[1].n = 9;
console.log(a[2].n); // 9 — shallow
console.log(a.slice()); // copy, a unchanged
`,
    examples: [
      {
        id: "neg",
        title: "Negative indexes",
        about: "end is exclusive.",
        language: "javascript",
        code: `console.log([0, 1, 2, 3].slice(-2)); // [2, 3]
console.log([0, 1, 2, 3].slice(1, -1)); // [1, 2]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-splice",
    title: "Array.prototype.splice",
    order: 65,
    summary: "In-place delete and/or insert. Returns the removed elements. Mutating.",
    prerequisites: ["javascript-array-slice"],
    related: ["javascript-array-tospliced", "javascript-array-slice"],
    isHighYield: true,
    oneLiner:
      "`splice(start, deleteCount?, ...items)` mutates the array: removes `deleteCount` items at `start`, inserts `items`, returns the removed array.",
    beats: [
      "Mutating. Return value is the deleted elements (new array), not the original.",
      "Omit `deleteCount` → delete through the end. `splice(i, 0, x)` inserts.",
      "Contrast `slice` (copy) and `toSpliced` (copy with splice semantics).",
    ],
    intro: "The mutating Swiss army knife. High-yield vs slice.",
    why: "React state bugs from splicing a shared array.",
    concept: "Shift later indexes to close gaps or make room.",
    how: "Normalize start (negative from end). Remove, then insert, update length.",
    usage: "Remove at index, replace range, insert in the middle.",
    practices: "In UI state, prefer `toSpliced` / `filter` / copy-then-splice. Do not splice while `forEach`ing.",
    mistakes: "`const next = arr.splice(...)` expecting the kept array. Passing no deleteCount accidentally wiping the tail.",
    code: `const a = [0, 1, 2, 3];
console.log(a.splice(1, 2, "x")); // [1, 2]
console.log(a); // [0, "x", 3]
const b = [0, 1, 2];
b.splice(1);
console.log(b); // [0]
`,
    examples: [
      {
        id: "insert",
        title: "Insert without delete",
        about: "deleteCount 0.",
        language: "javascript",
        code: `const a = ["a", "c"];
a.splice(1, 0, "b");
console.log(a); // ["a", "b", "c"]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-concat",
    title: "Array.prototype.concat",
    order: 66,
    summary: "New array: this plus arguments. Arrays are flattened one level. Does not mutate.",
    prerequisites: ["javascript-array-splice"],
    related: ["javascript-array-flat", "javascript-array-push"],
    oneLiner:
      "`concat(...items)` returns a new array. Array arguments are spread one level; non-arrays appended as single elements. Source unchanged.",
    beats: [
      "Shallow copy / one-level flatten of array args. Nested arrays stay nested.",
      "`concat` does not flatten array-likes unless they are real arrays (or `Symbol.isConcatSpreadable`).",
      "Holes in sources can remain holes in the result.",
    ],
    intro: "Join lists without mutate. Contrast `push` and `flat`.",
    why: "Immutable append. Spread `[...a, ...b]` is the modern cousin (holes become `undefined`).",
    concept: "If an argument is spreadable array, copy its indexes; else append the argument.",
    how: "New array; copy this; for each arg, spread or append.",
    usage: "`head.concat(tail)`. `arr.concat(x)` append one item if `x` is not an array.",
    practices: "To append one array as a single element, wrap it or use `push`. Prefer spread when you want holes filled.",
    mistakes: "`concat` mutating belief. Accidental flatten of an array you meant as one item.",
    code: `console.log([1].concat([2, 3], 4)); // [1, 2, 3, 4]
console.log([1].concat([[2]])); // [1, [2]]
const a = [1];
a.concat([2]);
console.log(a); // [1]
`,
    examples: [
      {
        id: "spreadable",
        title: "Non-array is one slot",
        about: "array-like is not flattened by default.",
        language: "javascript",
        code: `console.log([0].concat({ 0: "a", length: 1 }));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-join",
    title: "Array.prototype.join",
    order: 67,
    summary: "String from elements separated by a glue. Does not mutate. Holes and undefined become empty.",
    prerequisites: ["javascript-array-concat"],
    related: ["javascript-array-tospliced"],
    oneLiner:
      "`join(separator = \",\")` returns a string. `null`/`undefined`/holes become `\"\"`. Does not mutate the array.",
    beats: [
      "Return is a string, not an array. Array unchanged.",
      "Nested arrays stringify via `toString` (comma-join), which can surprise.",
      "Default separator is comma, same as `Array.prototype.toString`.",
    ],
    intro: "Serialize a list. Trap: holes vs empty string.",
    why: "CSV-ish output, URL paths, className lists.",
    concept: "Map each element with ToString, skip nullish as empty, interleave separator.",
    how: "Walk `0 .. length-1`; holes contribute empty between separators.",
    usage: "`parts.join(\"/\")`. `words.join(\" \")`.",
    practices: "Map to strings first if you need custom null handling. Do not `join` for summing numbers.",
    mistakes: "Expecting `join` to skip holes without extra commas. Forgetting default comma.",
    code: `console.log(["a", "b"].join("-")); // "a-b"
console.log([1, , 3].join(",")); // "1,,3"
console.log([null, undefined].join("-")); // "-"
`,
    examples: [
      {
        id: "nested",
        title: "Nested array toString",
        about: "Inner commas, no extra brackets.",
        language: "javascript",
        code: `console.log([[1, 2], 3].join("|")); // "1,2|3"
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-push",
    title: "Array.prototype.push",
    order: 68,
    summary: "Append in place. Returns the new length, not the array.",
    prerequisites: ["javascript-array-join"],
    related: ["javascript-array-pop", "javascript-array-concat"],
    oneLiner:
      "`push(...items)` mutates: appends to the end. Return value is the new `length`.",
    beats: [
      "Mutating. Return is a number — chaining `push` into `map` is a bug.",
      "`arr.push(x, y)` appends both. Spreading a huge array can hit argument limits; use a loop.",
      "Contrast `concat` / `[...arr, x]` for copies.",
    ],
    intro: "Stack/queue producer. Interview: return value.",
    why: "`const a = arr.push(x)` then `a.map` explodes.",
    concept: "Write at `length`, increment length per item.",
    how: "For each arg, set `arr[length]` then `length++`. Return length.",
    usage: "Builders, stacks, collecting in a loop.",
    practices: "Immutable style: `toSpliced`/`concat`. Check return if you thought you got the array.",
    mistakes: "Using the return as the array. `push` an array without spread (nested).",
    code: `const a = [1];
console.log(a.push(2, 3)); // 3
console.log(a); // [1, 2, 3]
`,
    examples: [
      {
        id: "nested",
        title: "Push array as one item",
        about: "No flatten.",
        language: "javascript",
        code: `const a = [1];
a.push([2]);
console.log(a); // [1, [2]]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-pop",
    title: "Array.prototype.pop",
    order: 69,
    summary: "Remove the last element in place. Returns that element or undefined.",
    prerequisites: ["javascript-array-push"],
    related: ["javascript-array-push", "javascript-array-shift"],
    oneLiner:
      "`pop()` mutates: deletes the last index and decrements `length`. Returns the removed value (`undefined` if empty).",
    beats: [
      "Mutating. Empty pop is `undefined` — same as popping an `undefined` last slot.",
      "O(1) at the end vs `shift` which is O(n).",
      "Holes: popping a hole returns `undefined` and shortens.",
    ],
    intro: "Stack pop. Pair with push.",
    why: "Empty-stack vs stored undefined.",
    concept: "Read `arr[length-1]`, delete it, `length--`.",
    how: "If length 0, return undefined. Else take last, shrink.",
    usage: "Undo stacks, DFS.",
    practices: "Copy-on-write: `slice(0, -1)` / `toSpliced(-1, 1)` if you must not mutate.",
    mistakes: "Assuming pop on empty throws. Using pop to peek (`at(-1)` peeks).",
    code: `const a = [1, 2];
console.log(a.pop()); // 2
console.log(a); // [1]
console.log([].pop()); // undefined
`,
    examples: [
      {
        id: "hole",
        title: "Pop a hole",
        about: "undefined, length drops.",
        language: "javascript",
        code: `const a = [1, ,];
console.log(a.pop()); // undefined
console.log(a.length); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-shift",
    title: "Array.prototype.shift",
    order: 70,
    summary: "Remove the first element in place, reindex the rest. Returns the removed value. O(n).",
    prerequisites: ["javascript-array-pop"],
    related: ["javascript-array-unshift", "javascript-array-pop"],
    oneLiner:
      "`shift()` mutates: takes index 0 and slides every later index down. Return is the old first element.",
    beats: [
      "Mutating and expensive on large arrays. Queue-front vs `pop` at the back.",
      "Empty → `undefined`.",
      "Non-mutating alternative: `slice(1)` / `toSpliced(0, 1)`.",
    ],
    intro: "Queue dequeue. Know the cost.",
    why: "Accidental O(n²) when shifting in a loop.",
    concept: "Remove `[0]`, copy `i+1 → i`, decrement length.",
    how: "Same empty behavior as pop.",
    usage: "Small queues. Prefer `Deque`/index pointer for hot paths.",
    practices: "Do not shift in a tight loop on big arrays. Prefer indexes.",
    mistakes: "Using shift as if it were O(1). Confusing return with the remaining array.",
    code: `const a = ["a", "b", "c"];
console.log(a.shift()); // "a"
console.log(a); // ["b", "c"]
`,
    examples: [
      {
        id: "empty",
        title: "Empty shift",
        about: "undefined, still empty.",
        language: "javascript",
        code: `console.log([].shift()); // undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-unshift",
    title: "Array.prototype.unshift",
    order: 71,
    summary: "Insert at the front in place. Returns the new length. O(n).",
    prerequisites: ["javascript-array-shift"],
    related: ["javascript-array-shift", "javascript-array-push"],
    oneLiner:
      "`unshift(...items)` mutates: prepends items (leftmost arg becomes index 0). Return is the new `length`.",
    beats: [
      "Mutating. Return is length, like `push`.",
      "Must move every existing index — O(n + k).",
      "Copy alternative: `[...items, ...arr]`.",
    ],
    intro: "Queue enqueue at front. Same return-value trap as push.",
    why: "`const x = arr.unshift(y)` is a number.",
    concept: "Make room at 0, write items, increase length.",
    how: "Multiple args preserve order: `unshift(a,b)` → `[a,b,...old]`.",
    usage: "Small lists, LRU-ish prepends.",
    practices: "Prefer push+reverse or a deque for performance.",
    mistakes: "Return as array. Unshifting one array without spread.",
    code: `const a = [3];
console.log(a.unshift(1, 2)); // 3
console.log(a); // [1, 2, 3]
`,
    examples: [
      {
        id: "order",
        title: "Argument order",
        about: "First arg is new index 0.",
        language: "javascript",
        code: `const a = ["z"];
a.unshift("x", "y");
console.log(a); // ["x", "y", "z"]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-reverse",
    title: "Array.prototype.reverse",
    order: 72,
    summary: "Reverse in place. Returns the same array reference.",
    prerequisites: ["javascript-array-unshift"],
    related: ["javascript-array-toreversed", "javascript-array-sort"],
    oneLiner:
      "`reverse()` mutates the array and returns `this`. Use `toReversed()` when you need a copy.",
    beats: [
      "Mutating. Return is the same object — chaining hides the mutation.",
      "Sparse: holes move with their indexes.",
      "`[...arr].reverse()` still mutates the copy, not the original — `toReversed` is clearer.",
    ],
    intro: "In-place reverse. Interview: does it copy?",
    why: "Shared arrays reverse in React/Redux by accident.",
    concept: "Swap `i` with `length-1-i`.",
    how: "Works on array-likes too if you call it via borrow.",
    usage: "In-place algorithms. Display newest-first when you own the array.",
    practices: "Prefer `toReversed` at module boundaries. Never reverse a prop array.",
    mistakes: "Thinking reverse returns a new array. Reversing then wondering why the source changed.",
    code: `const a = [1, 2, 3];
const b = a.reverse();
console.log(a, b, a === b); // [3,2,1] [3,2,1] true
`,
    examples: [
      {
        id: "holes",
        title: "Holes move",
        about: "Empty slots reverse too.",
        language: "javascript",
        code: `console.log([1, , 3].reverse()); // [3, empty, 1]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-toreversed",
    title: "Array.prototype.toReversed",
    order: 73,
    summary: "New array in reverse order. Does not mutate. ES2023.",
    prerequisites: ["javascript-array-reverse"],
    related: ["javascript-array-reverse", "javascript-array-tosorted"],
    oneLiner:
      "`toReversed()` returns a reversed copy. The original array is unchanged.",
    beats: [
      "Copy, not mutate. Shallow: nested objects shared.",
      "Holes become holes in the copy at reversed indexes.",
      "The immutable twin of `reverse`.",
    ],
    intro: "Change-by-copy reverse.",
    why: "State updates without mutating props.",
    concept: "Allocate length, copy `source[i]` to `dest[length-1-i]`.",
    how: "Present indexes copied; holes preserved.",
    usage: "`items.toReversed()` in render.",
    practices: "Use this instead of `slice().reverse()`.",
    mistakes: "Assuming deep clone. Calling `reverse` by habit.",
    code: `const a = [1, 2, 3];
console.log(a.toReversed()); // [3, 2, 1]
console.log(a); // [1, 2, 3]
`,
    examples: [
      {
        id: "shallow",
        title: "Shallow copy",
        about: "Nested mutation is shared.",
        language: "javascript",
        code: `const a = [{ n: 1 }, { n: 2 }];
a.toReversed()[0].n = 9;
console.log(a[1].n); // 9
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-sort",
    title: "Array.prototype.sort",
    order: 74,
    summary: "Sort in place. Default is UTF-16 string order. Returns the same array.",
    prerequisites: ["javascript-array-toreversed"],
    related: ["javascript-array-tosorted"],
    isHighYield: true,
    oneLiner:
      "`sort(compareFn?)` mutates and returns `this`. Default compare is string order, so `[10, 2]` becomes `[10, 2]` as `\"10\"` vs `\"2\"`.",
    beats: [
      "Mutating. Default: `String(a)` lexicographic — numbers are wrong without `(a,b) => a-b`.",
      "`undefined` sorts to the end. Holes also pack to the end (implementation defined as empty slots after defined).",
      "Compare must return negative / zero / positive. Returning boolean is a trap.",
    ],
    intro: "Highest-yield mutating method after splice. Default sort is the classic trap.",
    why: "`[10, 2, 1].sort()` → `[1, 10, 2]`.",
    concept: "In-place reorder. Compare `compareFn(a,b) < 0` means a before b.",
    how: "ToString default. Stability: modern JS sort is stable.",
    usage: "`nums.sort((a,b) => a - b)`. Objects: compare keys.",
    practices: "`toSorted` for copies. Always pass a numeric comparator for numbers. Handle `NaN`.",
    mistakes: "`sort()` on numbers. `sort((a,b) => a > b)` booleans. Sorting then mutating shared state.",
    code: `console.log([10, 2, 1].sort()); // [1, 10, 2]
console.log([10, 2, 1].sort((a, b) => a - b)); // [1, 2, 10]
const a = [3, 1];
a.sort((x, y) => x - y);
console.log(a); // [1, 3]
`,
    examples: [
      {
        id: "bool",
        title: "Boolean comparator is wrong",
        about: "true/false are not -1/1 consistently.",
        language: "javascript",
        code: `console.log([3, 1, 2].sort((a, b) => a > b));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-tosorted",
    title: "Array.prototype.toSorted",
    order: 75,
    summary: "Sorted copy. Same compare rules as sort. Does not mutate. ES2023.",
    prerequisites: ["javascript-array-sort"],
    related: ["javascript-array-sort", "javascript-array-toreversed"],
    oneLiner:
      "`toSorted(compareFn?)` returns a new sorted array. Original unchanged. Default is still string order.",
    beats: [
      "Copy, then sort that copy. Shallow.",
      "Same default lexicographic trap as `sort`.",
      "Prefer this in React/Redux reducers.",
    ],
    intro: "Immutable sort.",
    why: "Fix shared-array sort bugs without changing compare knowledge.",
    concept: "Clone indexed values, sort the clone.",
    how: "Same comparator contract as `sort`.",
    usage: "`[...rows].` era replaced by `rows.toSorted(cmp)`.",
    practices: "Always pass comparator for numbers. Do not assume deep copy.",
    mistakes: "`toSorted()` on numeric data without `a-b`.",
    code: `const a = [10, 2];
console.log(a.toSorted((x, y) => x - y)); // [2, 10]
console.log(a); // [10, 2]
`,
    examples: [
      {
        id: "default",
        title: "Default still strings",
        about: "Copy does not fix the compare.",
        language: "javascript",
        code: `console.log([10, 2].toSorted()); // [10, 2]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-flat",
    title: "Array.prototype.flat",
    order: 76,
    summary: "New array with nested arrays concatenated. depth default 1. Does not mutate.",
    prerequisites: ["javascript-array-tosorted"],
    related: ["javascript-array-flatmap", "javascript-array-concat"],
    oneLiner:
      "`flat(depth = 1)` returns a flattened copy. `Infinity` flattens all the way. Source not mutated. Holes removed while flattening.",
    beats: [
      "Copy. Only nested arrays flatten; other objects stay as elements.",
      "Default depth 1 — `[[1,[2]]].flat()` is `[1,[2]]`.",
      "Holes are dropped (flattening skips empty slots).",
    ],
    intro: "Un-nest arrays. Pair with `flatMap`.",
    why: "`flat()` not flattening deep enough.",
    concept: "depth counts how many array layers to concat.",
    how: "Recurse into arrays while depth > 0; skip holes.",
    usage: "`matrix.flat()`. `flat(Infinity)` for unknown depth (watch cycles — arrays usually trees).",
    practices: "Know your depth. `flatMap` when you map then flatten one level.",
    mistakes: "Expecting objects with numeric keys to flatten. Mutating belief.",
    code: `console.log([1, [2, [3]]].flat()); // [1, 2, [3]]
console.log([1, [2, [3]]].flat(Infinity)); // [1, 2, 3]
console.log([1, , 3].flat()); // [1, 3]
`,
    examples: [
      {
        id: "non-array",
        title: "Array-likes stay",
        about: "Only Array (or spreadable) nests flatten.",
        language: "javascript",
        code: `console.log([{ 0: "a", length: 1 }].flat());
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-flatmap",
    title: "Array.prototype.flatMap",
    order: 77,
    summary: "map then flatten one level. One new array. Does not mutate.",
    prerequisites: ["javascript-array-flat"],
    related: ["javascript-array-map", "javascript-array-flat"],
    isHighYield: true,
    oneLiner:
      "`flatMap(fn)` is `map(fn)` then `flat(1)` in one pass: return an array from the callback to splice items in; return a non-array to keep one item.",
    beats: [
      "Copy. Depth is exactly 1 — nested arrays inside the mapped array stay nested.",
      "Better than `map`+`filter` when some inputs become zero or many items (`[]` to drop).",
      "Holes skipped like `map`. Returning `[]` omits; returning `[x,y]` inserts two.",
    ],
    intro: "High-yield map-to-many. Interview: depth 1 and vs filter.",
    why: "Tokenize, expand, drop in one pipeline.",
    concept: "For each present element, concat the mapped value if it is an array, else append it.",
    how: "Equivalent to `arr.map(fn).flat(1)` but typically one allocation.",
    usage: "`words.flatMap(w => w.split(\"\"))`. Optional child lists.",
    practices: "Return `[]` to drop. Do not `flatMap` expecting deep flatten.",
    mistakes: "`flatMap(x => [[x]])` still nested. Using `map`+`flat` with depth 2 by accident.",
    code: `console.log([1, 2].flatMap((n) => [n, n * 10])); // [1, 10, 2, 20]
console.log([1, 2].flatMap((n) => (n === 1 ? [] : [n]))); // [2]
console.log([[1]].flatMap((x) => x)); // [1]
console.log([[1]].flatMap((x) => [x])); // [[1]] — only one flatten
`,
    examples: [
      {
        id: "vs-map",
        title: "map does not flatten",
        about: "Same callback, different structure.",
        language: "javascript",
        code: `const fn = (n) => [n, n];
console.log([1].map(fn)); // [[1, 1]]
console.log([1].flatMap(fn)); // [1, 1]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-fill",
    title: "Array.prototype.fill",
    order: 78,
    summary: "Write the same value into a range in place. Returns the array. Shared reference if value is an object.",
    prerequisites: ["javascript-array-flatmap"],
    related: ["javascript-array-copywithin"],
    oneLiner:
      "`fill(value, start?, end?)` mutates a half-open range to `value` and returns `this`. Object values are one shared reference.",
    beats: [
      "Mutating. `Array(3).fill([])` is three aliases of one array — classic trap.",
      "Holes become filled (defined) slots.",
      "Negative start/end like slice.",
    ],
    intro: "Initialize or overwrite ranges.",
    why: "The shared-object fill bug.",
    concept: "For i in [start,end), `arr[i] = value`.",
    how: "Same index clamping as slice.",
    usage: "`new Array(n).fill(0)` for a dense numeric buffer.",
    practices: "Fill primitives, or `Array.from({length}, () => [])` for distinct objects.",
    mistakes: "`fill({})` then mutating one cell. Assuming fill copies objects.",
    code: `const a = [1, 2, 3];
a.fill(0, 1, 3);
console.log(a); // [1, 0, 0]
const b = Array(2).fill({ n: 1 });
b[0].n = 9;
console.log(b[1].n); // 9
`,
    examples: [
      {
        id: "from",
        title: "Distinct objects",
        about: "Factory per index.",
        language: "javascript",
        code: `const a = Array.from({ length: 2 }, () => ({ n: 1 }));
a[0].n = 9;
console.log(a[1].n); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-copywithin",
    title: "Array.prototype.copyWithin",
    order: 79,
    summary: "Copy a slice onto another index in the same array, in place. Handles overlap.",
    prerequisites: ["javascript-array-fill"],
    related: ["javascript-array-fill", "javascript-array-slice"],
    oneLiner:
      "`copyWithin(target, start, end?)` mutates: copies `[start,end)` to `target`. Returns `this`. Like `memmove`.",
    beats: [
      "Mutating. Shallow copy of values (object refs).",
      "Overlap is safe (direction chosen so data is not clobbered incorrectly).",
      "Holes are copied as holes.",
    ],
    intro: "Rare in apps, asked as “does it allocate?”",
    why: "TypedArray-style APIs on ordinary arrays.",
    concept: "Internal slice copy onto the same length (length unchanged).",
    how: "Clamp indexes; copy sequence to target; extra tail not truncated.",
    usage: "Compact buffers, drop a gap without splice (advanced).",
    practices: "Prefer `slice`/`splice` unless you are optimizing in place.",
    mistakes: "Expecting a new array. Expecting length to grow.",
    code: `const a = [0, 1, 2, 3, 4];
a.copyWithin(0, 3);
console.log(a); // [3, 4, 2, 3, 4]
`,
    examples: [
      {
        id: "overlap",
        title: "Overlapping copy",
        about: "Length stays 5.",
        language: "javascript",
        code: `const a = [1, 2, 3, 4];
a.copyWithin(1, 0);
console.log(a); // [1, 1, 2, 3]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-entries",
    title: "Array.prototype.entries",
    order: 80,
    summary: "Iterator of [index, value] pairs. Does not mutate. Holes yield [i, undefined].",
    prerequisites: ["javascript-array-copywithin"],
    related: ["javascript-array-keys", "javascript-array-values"],
    oneLiner:
      "`entries()` returns an iterator of `[index, value]`. The array is not copied or mutated. Holes appear as `undefined` values.",
    beats: [
      "Not an array — use `for...of` or `Array.from`.",
      "Unlike `forEach`/`map`, holes are visited as `undefined`.",
      "Indexes are numbers in the pair, not strings (`for...in`).",
    ],
    intro: "The iterator trio starts here.",
    why: "Need index + value without `forEach` and without `for...in`.",
    concept: "Array iterator protocol. Live view of indexes as you iterate (typical caveats if you mutate while iterating).",
    how: "`for (const [i, v] of arr.entries())`.",
    usage: "Enumerate with index in `for...of`.",
    practices: "Do not `for...in` arrays. Prefer entries over manual `i++` when it reads clearer.",
    mistakes: "`arr.entries().map` — iterators have no map. Spread to array first.",
    code: `const a = ["a", , "c"];
console.log([...a.entries()]); // [[0,"a"],[1,undefined],[2,"c"]]
`,
    examples: [
      {
        id: "for-of",
        title: "for...of entries",
        about: "Index is a number.",
        language: "javascript",
        code: `for (const [i, v] of ["x"].entries()) {
  console.log(typeof i, v);
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-keys",
    title: "Array.prototype.keys",
    order: 81,
    summary: "Iterator of indexes 0 .. length-1, including holes. Does not mutate.",
    prerequisites: ["javascript-array-entries"],
    related: ["javascript-array-values", "javascript-object-keys"],
    oneLiner:
      "`keys()` iterates indexes, not values. Sparse arrays still yield the hole indexes. Does not mutate.",
    beats: [
      "This is not `Object.keys` — `Object.keys` skips holes and returns strings.",
      "`[...arr.keys()]` is `[0,1,...,length-1]` even if sparse.",
      "Iterator, not an array.",
    ],
    intro: "Index iterator. Contrast Object.keys.",
    why: "Interview: holes and string vs number keys.",
    concept: "Yield `0`, `1`, … `length-1`.",
    how: "Independent of whether the slot is present.",
    usage: "Need all indexes including empty slots.",
    practices: "Use `Object.keys` only when you want present string keys.",
    mistakes: "Assuming keys() skips holes like forEach.",
    code: `const a = [, "b"];
console.log([...a.keys()]); // [0, 1]
console.log(Object.keys(a)); // ["1"]
`,
    examples: [
      {
        id: "length",
        title: "Keys follow length",
        about: "Empty length 3 still has 0,1,2.",
        language: "javascript",
        code: `console.log([...Array(3).keys()]); // [0, 1, 2]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-values",
    title: "Array.prototype.values",
    order: 82,
    summary: "Iterator of values in index order. Default array iterator. Holes are undefined. Does not mutate.",
    prerequisites: ["javascript-array-keys"],
    related: ["javascript-array-entries", "javascript-array-keys"],
    oneLiner:
      "`values()` (and `arr[Symbol.iterator]`) yields each index’s value. Holes → `undefined`. Does not mutate.",
    beats: [
      "`for...of` on an array uses this iterator — holes are not skipped.",
      "`forEach` skips holes; `for...of` does not.",
      "Shallow: yields the element references.",
    ],
    intro: "Closes the iterator trio. Ties back to the array overview hole trap.",
    why: "`for...of` vs `forEach` on sparse arrays.",
    concept: "The default `@@iterator`.",
    how: "`for (const v of arr)` ≡ `for (const v of arr.values())`.",
    usage: "Generic iteration. `Array.from(arr.values())` dense-with-undefined copy of holes.",
    practices: "Pick forEach vs for-of intentionally on sparse data.",
    mistakes: "Assuming values() skips holes.",
    code: `const a = [1, , 3];
console.log([...a.values()]); // [1, undefined, 3]
`,
    examples: [
      {
        id: "same-iter",
        title: "Default iterator",
        about: "values is what for-of uses.",
        language: "javascript",
        code: `console.log(Array.prototype.values === Array.prototype[Symbol.iterator]);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-with",
    title: "Array.prototype.with",
    order: 83,
    summary: "Copy with one index replaced. Does not mutate. ES2023. Negative indexes allowed.",
    prerequisites: ["javascript-array-values"],
    related: ["javascript-array-tospliced", "javascript-array-at"],
    oneLiner:
      "`with(index, value)` returns a shallow copy whose `index` is `value`. Original unchanged. Out-of-range throws `RangeError`.",
    beats: [
      "Copy, not mutate. One slot updated.",
      "`arr[i] = x` mutates; `arr.with(i, x)` does not.",
      "Negative index from the end, like `at`. Unlike `at`, bad indexes throw.",
    ],
    intro: "Immutable update at an index.",
    why: "React list item replace without splice.",
    concept: "Clone then set one index (dense copy of holes as holes except the replaced slot).",
    how: "Normalize index; if OOB, RangeError; else copy and assign.",
    usage: "`rows.with(i, nextRow)`.",
    practices: "Prefer `with` over copy+assign in reducers. Catch OOB or check length.",
    mistakes: "`with` as in `with (obj)` statement — different feature. Assuming no throw on OOB.",
    code: `const a = [1, 2, 3];
console.log(a.with(1, 9)); // [1, 9, 3]
console.log(a); // [1, 2, 3]
console.log(a.with(-1, 0)); // [1, 2, 0]
`,
    examples: [
      {
        id: "oob",
        title: "RangeError",
        about: "at would return undefined.",
        language: "javascript",
        code: `try {
  [1].with(5, 0);
} catch (e) {
  console.log(e instanceof RangeError);
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array-tospliced",
    title: "Array.prototype.toSpliced",
    order: 84,
    summary: "Non-mutating splice: new array with deletes/inserts. ES2023. Original unchanged.",
    prerequisites: ["javascript-array-with"],
    related: ["javascript-array-splice", "javascript-array-toReversed"],
    oneLiner:
      "`toSpliced(start, skipCount?, ...items)` returns a new array as if `splice` had run. The source is not mutated. Return is the kept+inserted array, not the deleted segment.",
    beats: [
      "Copy. Opposite return of `splice`: you get the new full array, not the removed items.",
      "Same start / deleteCount / insert semantics as `splice`.",
      "With `toSorted` / `toReversed` / `with`, the copy suite for arrays.",
    ],
    intro: "Last array method topic. Immutable splice — interview contrast with splice’s return value.",
    why: "People assign `toSpliced` like `splice` and expect deleted items.",
    concept: "slice before + items + slice after.",
    how: "Normalize start and skipCount; allocate; copy parts and inserts.",
    usage: "Remove at index in state: `arr.toSpliced(i, 1)`. Insert: `toSpliced(i, 0, x)`.",
    practices: "Use this in reducers. Use `splice` only when you own a local buffer and want deleted items.",
    mistakes: "Reading the return as deleted elements. Forgetting it is shallow.",
    code: `const a = [0, 1, 2, 3];
console.log(a.toSpliced(1, 2, "x")); // [0, "x", 3]
console.log(a); // [0, 1, 2, 3]
console.log(a.splice(1, 2, "x")); // [1, 2] — mutating, different return
`,
    examples: [
      {
        id: "delete-one",
        title: "Remove without mutate",
        about: "skipCount 1.",
        language: "javascript",
        code: `console.log(["a", "b", "c"].toSpliced(1, 1)); // ["a", "c"]
`,
      },
    ],
  }),
];
