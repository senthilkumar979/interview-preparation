import type { CodingChallenge } from "./types";

export const codingChallenges: CodingChallenge[] = [
  {
    id: "unique",
    title: "Remove duplicates",
    minutes: 10,
    language: "javascript",
    prompt: "Implement `unique(list)` returning a new array of first-seen values (`===`). Do not mutate `list`.",
    starter: `export function unique(list) {
}
`,
    tests: [
      "const a = [1, 1, 2]; const b = unique(a); if (a.length !== 3) throw new Error('mutate'); if (b.join() !== '1,2') throw new Error(String(b));",
      "if (unique(['a', 'a', 'b'])[1] !== 'b') throw new Error('strings');",
    ],
    solution: `export function unique(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}
`,
  },
  {
    id: "flatten",
    title: "Flatten one level",
    minutes: 10,
    language: "javascript",
    prompt: "`flatten(list)` one level: `[1,[2,3],4]` → `[1,2,3,4]`. Nested arrays deeper stay nested.",
    starter: `export function flatten(list) {
}
`,
    tests: [
      "const a = flatten([1, [2, 3], 4]); if (a.join() !== '1,2,3,4') throw new Error(String(a));",
      "const b = flatten([1, [2, [3]]]); if (JSON.stringify(b) !== '[1,2,[3]]') throw new Error('depth');",
    ],
    solution: `export function flatten(list) {
  return list.flat(1);
}
`,
  },
  {
    id: "chars",
    title: "Characters of a string",
    minutes: 5,
    language: "javascript",
    prompt: "`chars(s)` returns an array of UTF-16 code units (spread is fine for BMP).",
    starter: `export function chars(s) {
}
`,
    tests: ["if (chars('ab').join('') !== 'ab') throw new Error('chars'); if (chars('').length !== 0) throw new Error('empty');"],
    solution: `export function chars(s) {
  return [...s];
}
`,
  },
  {
    id: "sort-nums",
    title: "Sort numbers",
    minutes: 8,
    language: "javascript",
    prompt: "`sortNums(list)` returns a new array sorted ascending. Do not use the default string sort.",
    starter: `export function sortNums(list) {
}
`,
    tests: [
      "const r = sortNums([10, 2, 3]); if (r.join() !== '2,3,10') throw new Error(String(r));",
      "const a = [3, 1]; sortNums(a); if (a.join() !== '3,1') throw new Error('mutate');",
    ],
    solution: `export function sortNums(list) {
  return [...list].sort((a, b) => a - b);
}
`,
  },
  {
    id: "read-form",
    title: "Read input values",
    minutes: 10,
    language: "javascript",
    prompt: "`readFields(form)` given a mock `{ elements: { email: { value: 'a' }, age: { value: '2' } } }` returns `{ email, age }` from those `.value`s.",
    starter: `export function readFields(form) {
}
`,
    tests: [
      "const f = { elements: { email: { value: 'a@b.c' }, age: { value: '9' } } }; const r = readFields(f); if (r.email !== 'a@b.c' || r.age !== '9') throw new Error('fields');",
    ],
    solution: `export function readFields(form) {
  return {
    email: form.elements.email.value,
    age: form.elements.age.value,
  };
}
`,
  },
  {
    id: "sum",
    title: "Sum numbers",
    minutes: 5,
    language: "javascript",
    prompt: "`sum(list)` returns the total of all numbers. Empty list → `0`.",
    starter: `export function sum(list) {
}
`,
    tests: [
      "if (sum([1, 2, 3]) !== 6) throw new Error('sum');",
      "if (sum([]) !== 0) throw new Error('empty');",
      "if (sum([-2, 2]) !== 0) throw new Error('neg');",
    ],
    solution: `export function sum(list) {
  return list.reduce((acc, n) => acc + n, 0);
}
`,
  },
  {
    id: "clamp",
    title: "Clamp a number",
    minutes: 5,
    language: "javascript",
    prompt: "`clamp(n, min, max)` returns `n` kept in `[min, max]`. Assume `min <= max`.",
    starter: `export function clamp(n, min, max) {
}
`,
    tests: [
      "if (clamp(5, 0, 10) !== 5) throw new Error('mid');",
      "if (clamp(-1, 0, 10) !== 0) throw new Error('low');",
      "if (clamp(99, 0, 10) !== 10) throw new Error('high');",
    ],
    solution: `export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
`,
  },
  {
    id: "last",
    title: "Last item",
    minutes: 5,
    language: "javascript",
    prompt: "`last(list)` returns the last element, or `undefined` if empty.",
    starter: `export function last(list) {
}
`,
    tests: [
      "if (last([1, 2, 9]) !== 9) throw new Error('last');",
      "if (last([]) !== undefined) throw new Error('empty');",
    ],
    solution: `export function last(list) {
  return list[list.length - 1];
}
`,
  },
  {
    id: "take",
    title: "Take first n",
    minutes: 8,
    language: "javascript",
    prompt: "`take(list, n)` returns the first `n` items as a new array. If `n` is larger than length, return a copy of all items. Do not mutate `list`.",
    starter: `export function take(list, n) {
}
`,
    tests: [
      "const a = [1, 2, 3, 4]; const r = take(a, 2); if (r.join() !== '1,2') throw new Error(String(r)); if (a.join() !== '1,2,3,4') throw new Error('mutate');",
      "if (take([1, 2], 9).join() !== '1,2') throw new Error('over');",
      "if (take([1, 2], 0).length !== 0) throw new Error('zero');",
    ],
    solution: `export function take(list, n) {
  return list.slice(0, n);
}
`,
  },
  {
    id: "drop",
    title: "Drop first n",
    minutes: 8,
    language: "javascript",
    prompt: "`drop(list, n)` returns a new array without the first `n` items. If `n` >= length, return `[]`.",
    starter: `export function drop(list, n) {
}
`,
    tests: [
      "if (drop([1, 2, 3, 4], 2).join() !== '3,4') throw new Error('drop');",
      "if (drop([1], 3).length !== 0) throw new Error('all');",
    ],
    solution: `export function drop(list, n) {
  return list.slice(n);
}
`,
  },
  {
    id: "compact",
    title: "Compact falsy",
    minutes: 8,
    language: "javascript",
    prompt: "`compact(list)` returns a new array with falsy values removed (`false`, `0`, `''`, `null`, `undefined`, `NaN`).",
    starter: `export function compact(list) {
}
`,
    tests: [
      "if (compact([0, 1, false, 2, '', 3]).join() !== '1,2,3') throw new Error('compact');",
      "if (compact([null, undefined, NaN]).length !== 0) throw new Error('nullish');",
    ],
    solution: `export function compact(list) {
  return list.filter(Boolean);
}
`,
  },
  {
    id: "chunk",
    title: "Chunk array",
    minutes: 12,
    language: "javascript",
    prompt: "`chunk(list, size)` splits into arrays of length `size`. The last chunk may be shorter. Assume `size >= 1`.",
    starter: `export function chunk(list, size) {
}
`,
    tests: [
      "if (JSON.stringify(chunk([1, 2, 3, 4, 5], 2)) !== '[[1,2],[3,4],[5]]') throw new Error('chunk');",
      "if (JSON.stringify(chunk([], 2)) !== '[]') throw new Error('empty');",
    ],
    solution: `export function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}
`,
  },
  {
    id: "range",
    title: "Integer range",
    minutes: 10,
    language: "javascript",
    prompt: "`range(start, end)` returns integers from `start` inclusive to `end` exclusive. If `start >= end`, return `[]`.",
    starter: `export function range(start, end) {
}
`,
    tests: [
      "if (range(2, 5).join() !== '2,3,4') throw new Error('range');",
      "if (range(3, 3).length !== 0) throw new Error('empty');",
      "if (range(5, 2).length !== 0) throw new Error('rev');",
    ],
    solution: `export function range(start, end) {
  const out = [];
  for (let i = start; i < end; i++) out.push(i);
  return out;
}
`,
  },
  {
    id: "intersection",
    title: "Array intersection",
    minutes: 10,
    language: "javascript",
    prompt: "`intersection(a, b)` returns values in both arrays, in first-seen order from `a`, without duplicates.",
    starter: `export function intersection(a, b) {
}
`,
    tests: [
      "if (intersection([1, 2, 2, 3], [2, 4]).join() !== '2') throw new Error('int');",
      "if (intersection(['a', 'b'], ['c']).length !== 0) throw new Error('none');",
    ],
    solution: `export function intersection(a, b) {
  const other = new Set(b);
  const seen = new Set();
  const out = [];
  for (const item of a) {
    if (!other.has(item) || seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}
`,
  },
  {
    id: "difference",
    title: "Array difference",
    minutes: 10,
    language: "javascript",
    prompt: "`difference(a, b)` returns items in `a` that are not in `b`, first-seen order, no duplicates.",
    starter: `export function difference(a, b) {
}
`,
    tests: [
      "if (difference([1, 2, 2, 3], [2]).join() !== '1,3') throw new Error('diff');",
      "if (difference([1], [1, 2]).length !== 0) throw new Error('none');",
    ],
    solution: `export function difference(a, b) {
  const skip = new Set(b);
  const seen = new Set();
  const out = [];
  for (const item of a) {
    if (skip.has(item) || seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}
`,
  },
  {
    id: "zip",
    title: "Zip two arrays",
    minutes: 10,
    language: "javascript",
    prompt: "`zip(a, b)` pairs items until the shorter array ends: `[[a0,b0], [a1,b1], ...]`.",
    starter: `export function zip(a, b) {
}
`,
    tests: [
      "if (JSON.stringify(zip([1, 2], ['a', 'b', 'c'])) !== '[[1,\"a\"],[2,\"b\"]]') throw new Error('zip');",
      "if (zip([], [1]).length !== 0) throw new Error('empty');",
    ],
    solution: `export function zip(a, b) {
  const n = Math.min(a.length, b.length);
  const out = [];
  for (let i = 0; i < n; i++) out.push([a[i], b[i]]);
  return out;
}
`,
  },
  {
    id: "pick",
    title: "Pick object keys",
    minutes: 10,
    language: "javascript",
    prompt: "`pick(obj, keys)` returns a new object with only those keys that exist on `obj`.",
    starter: `export function pick(obj, keys) {
}
`,
    tests: [
      "const r = pick({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z']); if (r.a !== 1 || r.c !== 3 || 'z' in r || 'b' in r) throw new Error('pick');",
    ],
    solution: `export function pick(obj, keys) {
  const out = {};
  for (const key of keys) {
    if (Object.hasOwn(obj, key)) out[key] = obj[key];
  }
  return out;
}
`,
  },
  {
    id: "omit",
    title: "Omit object keys",
    minutes: 10,
    language: "javascript",
    prompt: "`omit(obj, keys)` returns a shallow copy of `obj` without those keys.",
    starter: `export function omit(obj, keys) {
}
`,
    tests: [
      "const src = { a: 1, b: 2, c: 3 }; const r = omit(src, ['b']); if (r.a !== 1 || r.c !== 3 || 'b' in r) throw new Error('omit'); if (src.b !== 2) throw new Error('mutate');",
    ],
    solution: `export function omit(obj, keys) {
  const skip = new Set(keys);
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!skip.has(key)) out[key] = value;
  }
  return out;
}
`,
  },
  {
    id: "invert",
    title: "Invert object",
    minutes: 10,
    language: "javascript",
    prompt: "`invert(obj)` swaps keys and values as strings. Later keys win on duplicate values.",
    starter: `export function invert(obj) {
}
`,
    tests: [
      "const r = invert({ a: 1, b: 2 }); if (r['1'] !== 'a' || r['2'] !== 'b') throw new Error('invert');",
      "if (invert({ a: 'x', b: 'x' }).x !== 'b') throw new Error('dup');",
    ],
    solution: `export function invert(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) out[String(value)] = key;
  return out;
}
`,
  },
  {
    id: "get-path",
    title: "Get nested path",
    minutes: 12,
    language: "javascript",
    prompt: "`getPath(obj, path)` reads a dotted path like `'user.name'`. Missing path → `undefined`. Do not throw.",
    starter: `export function getPath(obj, path) {
}
`,
    tests: [
      "if (getPath({ user: { name: 'Ada' } }, 'user.name') !== 'Ada') throw new Error('get');",
      "if (getPath({ user: {} }, 'user.name') !== undefined) throw new Error('miss');",
      "if (getPath(null, 'a') !== undefined) throw new Error('null');",
    ],
    solution: `export function getPath(obj, path) {
  if (obj == null) return undefined;
  return path.split('.').reduce((cur, key) => (cur == null ? undefined : cur[key]), obj);
}
`,
  },
  {
    id: "group-by",
    title: "Group by key",
    minutes: 12,
    language: "javascript",
    prompt: "`groupBy(list, key)` groups objects by `item[key]`. Return `{ [value]: items[] }` preserving order.",
    starter: `export function groupBy(list, key) {
}
`,
    tests: [
      "const r = groupBy([{ t: 'a', n: 1 }, { t: 'b', n: 2 }, { t: 'a', n: 3 }], 't'); if (r.a.length !== 2 || r.a[1].n !== 3 || r.b[0].n !== 2) throw new Error('group');",
    ],
    solution: `export function groupBy(list, key) {
  const out = {};
  for (const item of list) {
    const k = String(item[key]);
    if (!out[k]) out[k] = [];
    out[k].push(item);
  }
  return out;
}
`,
  },
  {
    id: "count-by",
    title: "Count by key",
    minutes: 10,
    language: "javascript",
    prompt: "`countBy(list, key)` returns `{ [value]: count }` for `item[key]`.",
    starter: `export function countBy(list, key) {
}
`,
    tests: [
      "const r = countBy([{ k: 'x' }, { k: 'y' }, { k: 'x' }], 'k'); if (r.x !== 2 || r.y !== 1) throw new Error('count');",
    ],
    solution: `export function countBy(list, key) {
  const out = {};
  for (const item of list) {
    const k = String(item[key]);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}
`,
  },
  {
    id: "frequencies",
    title: "Character frequencies",
    minutes: 8,
    language: "javascript",
    prompt: "`frequencies(s)` returns an object mapping each character to how often it appears.",
    starter: `export function frequencies(s) {
}
`,
    tests: [
      "const r = frequencies('aba'); if (r.a !== 2 || r.b !== 1) throw new Error('freq');",
      "if (Object.keys(frequencies('')).length !== 0) throw new Error('empty');",
    ],
    solution: `export function frequencies(s) {
  const out = {};
  for (const ch of s) out[ch] = (out[ch] ?? 0) + 1;
  return out;
}
`,
  },
  {
    id: "is-palindrome",
    title: "Palindrome check",
    minutes: 10,
    language: "javascript",
    prompt: "`isPalindrome(s)` is true if `s` reads the same forwards and backwards. Compare as-is (case-sensitive, keep spaces).",
    starter: `export function isPalindrome(s) {
}
`,
    tests: [
      "if (!isPalindrome('kayak')) throw new Error('kayak');",
      "if (isPalindrome('Kayak')) throw new Error('case');",
      "if (!isPalindrome('')) throw new Error('empty');",
    ],
    solution: `export function isPalindrome(s) {
  return s === [...s].reverse().join('');
}
`,
  },
  {
    id: "reverse-words",
    title: "Reverse word order",
    minutes: 10,
    language: "javascript",
    prompt: "`reverseWords(s)` splits on spaces, drops empty tokens from extra spaces, reverses word order, joins with a single space.",
    starter: `export function reverseWords(s) {
}
`,
    tests: [
      "if (reverseWords('the sky is blue') !== 'blue is sky the') throw new Error('rev');",
      "if (reverseWords('  hello   world  ') !== 'world hello') throw new Error('spaces');",
    ],
    solution: `export function reverseWords(s) {
  return s.trim().split(/\\s+/).filter(Boolean).reverse().join(' ');
}
`,
  },
  {
    id: "capitalize",
    title: "Capitalize words",
    minutes: 8,
    language: "javascript",
    prompt: "`capitalize(s)` uppercases the first letter of each whitespace-separated word; the rest of each word stays as given.",
    starter: `export function capitalize(s) {
}
`,
    tests: [
      "if (capitalize('hello world') !== 'Hello World') throw new Error('cap');",
      "if (capitalize('') !== '') throw new Error('empty');",
    ],
    solution: `export function capitalize(s) {
  if (!s) return s;
  return s
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}
`,
  },
  {
    id: "kebab",
    title: "To kebab-case",
    minutes: 12,
    language: "javascript",
    prompt: "`toKebab(s)` converts `'Hello World'` or `'helloWorld'` to `'hello-world'`. Treat non-letters as separators. Collapse repeats. Lowercase the result.",
    starter: `export function toKebab(s) {
}
`,
    tests: [
      "if (toKebab('Hello World') !== 'hello-world') throw new Error('spaces');",
      "if (toKebab('helloWorld') !== 'hello-world') throw new Error('camel');",
      "if (toKebab('XMLHttp') !== 'xml-http') throw new Error('acronym');",
    ],
    solution: `export function toKebab(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
`,
  },
  {
    id: "once",
    title: "Call once",
    minutes: 10,
    language: "javascript",
    prompt: "`once(fn)` returns a function that runs `fn` only the first time and then always returns that first result.",
    starter: `export function once(fn) {
}
`,
    tests: [
      "let n = 0; const f = once(() => ++n); if (f() !== 1 || f() !== 1 || n !== 1) throw new Error('once');",
    ],
    solution: `export function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
`,
  },
  {
    id: "memoize",
    title: "Memoize one argument",
    minutes: 12,
    language: "javascript",
    prompt: "`memoize(fn)` caches `fn(x)` by `x` using `===` / Map keys. Same argument → do not call `fn` again.",
    starter: `export function memoize(fn) {
}
`,
    tests: [
      "let n = 0; const f = memoize((x) => { n++; return x * 2; }); if (f(3) !== 6 || f(3) !== 6 || n !== 1 || f(4) !== 8 || n !== 2) throw new Error('memo');",
    ],
    solution: `export function memoize(fn) {
  const cache = new Map();
  return (x) => {
    if (cache.has(x)) return cache.get(x);
    const value = fn(x);
    cache.set(x, value);
    return value;
  };
}
`,
  },
  {
    id: "partition",
    title: "Partition by predicate",
    minutes: 10,
    language: "javascript",
    prompt: "`partition(list, pred)` returns `[pass, fail]` arrays. `pred(item)` truthy → pass.",
    starter: `export function partition(list, pred) {
}
`,
    tests: [
      "const [a, b] = partition([1, 2, 3, 4], (n) => n % 2 === 0); if (a.join() !== '2,4' || b.join() !== '1,3') throw new Error('part');",
    ],
    solution: `export function partition(list, pred) {
  const pass = [];
  const fail = [];
  for (const item of list) (pred(item) ? pass : fail).push(item);
  return [pass, fail];
}
`,
  },
  {
    id: "flatten-deep",
    title: "Flatten deep",
    minutes: 12,
    language: "javascript",
    prompt: "`flattenDeep(list)` flattens nested arrays of any depth into one array of non-array values.",
    starter: `export function flattenDeep(list) {
}
`,
    tests: [
      "if (flattenDeep([1, [2, [3, [4]]], 5]).join() !== '1,2,3,4,5') throw new Error('deep');",
      "if (flattenDeep([]).length !== 0) throw new Error('empty');",
    ],
    solution: `export function flattenDeep(list) {
  return list.flat(Infinity);
}
`,
  },
];
