import type { CodingChallenge } from "./types";

function spec(goal: string, examples: string[], rules: string[] = []): string {
  const exampleBlock = ["## Examples", ...examples.map((line) => `- ${line}`)].join("\n");
  const ruleBlock = rules.length ? ["## Rules", ...rules.map((rule) => `- ${rule}`)].join("\n") : "";
  return [goal, exampleBlock, ruleBlock].filter(Boolean).join("\n\n");
}

export const codingChallenges: CodingChallenge[] = [
  {
    id: "unique",
    title: "Remove duplicates",
    minutes: 10,
    language: "javascript",
    summary: "Return a new array with duplicates removed, keeping the first copy of each value.",
    prompt: spec(
      "Export unique(list). Return a new array that keeps values in the same order, but each value only once (the first time it appears).",
      ["unique([1, 1, 2]) returns [1, 2].", "unique(['a', 'a', 'b']) returns ['a', 'b']."],
      ["Treat two values as the same with ===.", "Do not change the original list."],
    ),
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
    summary: "Unwrap arrays that sit directly inside the list; leave deeper nesting as-is.",
    prompt: spec(
      "Export flatten(list). Unwrap only one level of nested arrays. If an item is not an array, keep it. If an inner array itself contains arrays, leave those inner arrays intact.",
      ["flatten([1, [2, 3], 4]) returns [1, 2, 3, 4].", "flatten([1, [2, [3]]]) returns [1, 2, [3]] — the [3] stays nested."],
    ),
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
    summary: "Turn a string into an array of its characters, including the empty string.",
    prompt: spec(
      "Export chars(s). Return an array of the characters in s, in order.",
      ["chars('ab') returns ['a', 'b'].", "chars('') returns []."],
    ),
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
    summary: "Return a new array of numbers sorted from smallest to largest.",
    prompt: spec(
      "Export sortNums(list). Return a new array with the numbers sorted ascending (smallest first).",
      ["sortNums([10, 2, 3]) returns [2, 3, 10] — not [10, 2, 3], which is how string sort would look."],
      ["Do not change the original list.", "Sort by numeric value (2 before 10), not by text."],
    ),
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
    summary: "Read email and age strings from a mock form’s elements.",
    prompt: spec(
      "Export readFields(form). The form looks like { elements: { email: { value: '...' }, age: { value: '...' } } }. Return { email, age } using those .value strings.",
      ["If email.value is 'a@b.c' and age.value is '9', return { email: 'a@b.c', age: '9' }."],
      ["Keep the values as strings. Do not parse age as a number."],
    ),
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
    summary: "Add every number in a list. An empty list sums to 0.",
    prompt: spec(
      "Export sum(list). Return the total of all numbers in list.",
      ["sum([1, 2, 3]) returns 6.", "sum([]) returns 0.", "sum([-2, 2]) returns 0."],
    ),
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
    summary: "Keep a number inside a min/max range.",
    prompt: spec(
      "Export clamp(n, min, max). Return n, but never below min and never above max. You can assume min is less than or equal to max.",
      ["clamp(5, 0, 10) returns 5.", "clamp(-1, 0, 10) returns 0.", "clamp(99, 0, 10) returns 10."],
    ),
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
    summary: "Return the last item in a list, or undefined if the list is empty.",
    prompt: spec(
      "Export last(list). Return the last element. If the list has no items, return undefined.",
      ["last([1, 2, 9]) returns 9.", "last([]) returns undefined."],
    ),
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
    summary: "Copy the first n items into a new array without changing the original.",
    prompt: spec(
      "Export take(list, n). Return a new array with the first n items. If n is larger than the list, return a copy of the whole list. If n is 0, return [].",
      ["take([1, 2, 3, 4], 2) returns [1, 2].", "take([1, 2], 9) returns [1, 2].", "take([1, 2], 0) returns []."],
      ["Do not change the original list."],
    ),
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
    summary: "Return a new array with the first n items removed.",
    prompt: spec(
      "Export drop(list, n). Return a new array starting after the first n items. If n is at least as large as the list, return [].",
      ["drop([1, 2, 3, 4], 2) returns [3, 4].", "drop([1], 3) returns []."],
    ),
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
    summary: "Return a new array with all falsy values removed.",
    prompt: spec(
      "Export compact(list). Return a new array that keeps only truthy values. Drop false, 0, '', null, undefined, and NaN.",
      ["compact([0, 1, false, 2, '', 3]) returns [1, 2, 3].", "compact([null, undefined, NaN]) returns []."],
    ),
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
    summary: "Split a list into smaller lists of a given size.",
    prompt: spec(
      "Export chunk(list, size). Split list into pieces of length size. The last piece can be shorter if items run out. size is at least 1. An empty list returns [].",
      ["chunk([1, 2, 3, 4, 5], 2) returns [[1, 2], [3, 4], [5]].", "chunk([], 2) returns []."],
    ),
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
    summary: "Build a list of integers from start up to, but not including, end.",
    prompt: spec(
      "Export range(start, end). Return the integers from start (included) to end (not included). If start is greater than or equal to end, return [].",
      ["range(2, 5) returns [2, 3, 4].", "range(3, 3) returns [].", "range(5, 2) returns []."],
    ),
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
    summary: "Return values that appear in both lists, without duplicates.",
    prompt: spec(
      "Export intersection(a, b). Return values that appear in both a and b. Keep the order from a. Each value only once.",
      ["intersection([1, 2, 2, 3], [2, 4]) returns [2].", "intersection(['a', 'b'], ['c']) returns []."],
    ),
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
    summary: "Return values from the first list that are missing in the second.",
    prompt: spec(
      "Export difference(a, b). Return items that are in a but not in b. Keep the order from a. Each value only once.",
      ["difference([1, 2, 2, 3], [2]) returns [1, 3].", "difference([1], [1, 2]) returns []."],
    ),
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
    summary: "Pair items from two lists until the shorter one ends.",
    prompt: spec(
      "Export zip(a, b). Return an array of pairs [a[i], b[i]] for as many items as the shorter list has.",
      ["zip([1, 2], ['a', 'b', 'c']) returns [[1, 'a'], [2, 'b']].", "zip([], [1]) returns []."],
    ),
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
    summary: "Copy only the requested keys that exist on an object.",
    prompt: spec(
      "Export pick(obj, keys). Return a new object that includes a key only if it exists on obj. Skip keys that are missing.",
      ["pick({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z']) returns { a: 1, c: 3 } — no z, and no b."],
    ),
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
    summary: "Copy an object while leaving out a list of keys.",
    prompt: spec(
      "Export omit(obj, keys). Return a new object with the same fields as obj except the listed keys.",
      ["omit({ a: 1, b: 2, c: 3 }, ['b']) returns { a: 1, c: 3 }."],
      ["Do not change the original object."],
    ),
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
    summary: "Swap keys and values. If two keys share a value, the later key wins.",
    prompt: spec(
      "Export invert(obj). Return a new object where each value becomes a string key, and the original key becomes the value. If two keys share the same value, keep the later key.",
      ["invert({ a: 1, b: 2 }) returns { '1': 'a', '2': 'b' }.", "invert({ a: 'x', b: 'x' }) returns { x: 'b' }."],
    ),
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
    summary: "Read a dotted path like user.name. Missing data should be undefined, not a throw.",
    prompt: spec(
      "Export getPath(obj, path). Walk a dotted path such as 'user.name'. If anything along the way is missing (including obj itself being null), return undefined. Do not throw.",
      ["getPath({ user: { name: 'Ada' } }, 'user.name') returns 'Ada'.", "getPath({ user: {} }, 'user.name') returns undefined.", "getPath(null, 'a') returns undefined."],
    ),
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
    summary: "Group objects into arrays by one field, keeping their original order.",
    prompt: spec(
      "Export groupBy(list, key). Split objects into buckets by item[key]. Return an object whose keys are those values (as strings) and whose values are arrays of the original items, in the order they appeared.",
      ["groupBy([{ t: 'a', n: 1 }, { t: 'b', n: 2 }, { t: 'a', n: 3 }], 't') returns { a: [{ t: 'a', n: 1 }, { t: 'a', n: 3 }], b: [{ t: 'b', n: 2 }] }."],
    ),
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
    summary: "Count how many objects share the same value for a field.",
    prompt: spec(
      "Export countBy(list, key). Return an object mapping each item[key] (as a string) to how many times it appears.",
      ["countBy([{ k: 'x' }, { k: 'y' }, { k: 'x' }], 'k') returns { x: 2, y: 1 }."],
    ),
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
    summary: "Count how often each character appears in a string.",
    prompt: spec(
      "Export frequencies(s). Return an object whose keys are characters and whose values are how many times they appear.",
      ["frequencies('aba') returns { a: 2, b: 1 }.", "frequencies('') returns {}."],
    ),
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
    summary: "Check whether a string is the same forwards and backwards, including case.",
    prompt: spec(
      "Export isPalindrome(s). Return true if s reads the same forwards and backwards. Compare the string as-is: case matters, and spaces count as characters. An empty string is a palindrome.",
      ["isPalindrome('kayak') is true.", "isPalindrome('Kayak') is false because K and k differ.", "isPalindrome('') is true."],
    ),
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
    summary: "Reverse the words in a sentence and collapse extra spaces.",
    prompt: spec(
      "Export reverseWords(s). Split on spaces, drop empty pieces from extra spaces, reverse the word order, then join with a single space.",
      ["reverseWords('the sky is blue') returns 'blue is sky the'.", "reverseWords('  hello   world  ') returns 'world hello'."],
    ),
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
    summary: "Uppercase the first letter of each word; leave the rest of the word unchanged.",
    prompt: spec(
      "Export capitalize(s). Split on single spaces. For each word, uppercase only the first character and leave the rest as written. Empty string stays empty.",
      ["capitalize('hello world') returns 'Hello World'.", "capitalize('') returns ''."],
    ),
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
    summary: "Turn a phrase or camelCase name into lowercase words separated by hyphens.",
    prompt: spec(
      "Export toKebab(s). Return a lowercase kebab-case string. Treat spaces and other non-letters as separators. Split camelCase and acronyms so a capital letter starts a new word. Collapse repeated separators. Do not leave a hyphen at the start or end.",
      ["toKebab('Hello World') returns 'hello-world'.", "toKebab('helloWorld') returns 'hello-world'.", "toKebab('XMLHttp') returns 'xml-http'."],
    ),
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
    summary: "Wrap a function so it runs only the first time you call it.",
    prompt: spec(
      "Export once(fn). Return a new function. The first time you call it, it runs fn and remembers that result. Later calls skip fn and return the same remembered result.",
      ["If fn adds 1 to a counter, the first call returns 1 and later calls still return 1 while the counter stays at 1."],
    ),
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
    summary: "Cache a function’s result for each argument so the same input is not computed twice.",
    prompt: spec(
      "Export memoize(fn). Return a function that takes one argument x. The first time you see x, call fn(x) and store the result. The next time the same x is passed (same value, === / Map key), return the stored result and do not call fn again.",
      ["For fn that doubles a number, calling with 3 twice only runs fn once and both calls return 6. Calling with 4 runs fn again and returns 8."],
    ),
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
    summary: "Split a list into items that pass a test and items that fail it.",
    prompt: spec(
      "Export partition(list, pred). Return [pass, fail]. Put an item in pass when pred(item) is truthy, otherwise in fail. Keep the original order inside each array.",
      ["partition([1, 2, 3, 4], (n) => n % 2 === 0) returns [[2, 4], [1, 3]]."],
    ),
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
    summary: "Unwrap nested arrays of any depth into one flat list of values.",
    prompt: spec(
      "Export flattenDeep(list). Flatten nested arrays no matter how deep, until every remaining item is not an array.",
      ["flattenDeep([1, [2, [3, [4]]], 5]) returns [1, 2, 3, 4, 5].", "flattenDeep([]) returns []."],
    ),
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
  {
    id: "use-toggle",
    title: "Custom hook: useToggle",
    minutes: 12,
    language: "javascript",
    summary: "Write a small hook that stores an on/off flag and a stable toggle function.",
    prompt: `## What you export
useToggle(initial)

## Already in scope
Do not import React. You can call useState and useCallback directly.

## Return value
- on: boolean, starts as initial
- toggle: function that flips on (false → true, true → false)

## How to write it
- Store on with useState
- Create toggle with useCallback and [] so it is the same function after a rerender

## Examples
- useToggle(false) starts with on = false. First toggle() → true. Second toggle() → false.
- After a rerender (no toggle), on is unchanged and toggle is the same function.
`,
    starter: `export function useToggle(initial) {
}
`,
    tests: [
      "const t1 = renderHook(() => useToggle(false)); if (t1.result.on !== false) throw new Error('init'); t1.result.toggle(); if (t1.result.on !== true) throw new Error('toggle'); t1.result.toggle(); if (t1.result.on !== false) throw new Error('back');",
      "const t2 = renderHook(() => useToggle(true)); const tog = t2.result.toggle; t2.rerender(); if (t2.result.toggle !== tog) throw new Error('stable'); if (t2.result.on !== true) throw new Error('keep');",
    ],
    solution: `export function useToggle(initial) {
  const [on, setOn] = useState(Boolean(initial));
  const toggle = useCallback(() => setOn((value) => !value), []);
  return { on, toggle };
}
`,
  },
  {
    id: "use-topic-route",
    title: "Router hook: topic slug",
    minutes: 12,
    language: "javascript",
    summary: "Read /topics/:slug from the current path and navigate with a stable open() helper.",
    prompt: `## What you export
useTopicRoute()

## Already in scope
Do not import a router. You can call usePathname, useRouter, and useCallback directly.

## Return value
- slug: string
- open: function

### slug
- Read the current pathname
- If it looks like /topics/hooks, slug is "hooks" (the second piece)
- If it is not /topics/..., slug is ""

### open(next)
- Call router.push('/topics/' + next)
- The path becomes /topics/next and slug updates
- Wrap open in useCallback with [router.push] so the function stays the same after a rerender

## Examples
- Path /topics/hooks → slug is "hooks"
- Path /practice → slug is ""
- From /topics/css, open('javascript') → slug is "javascript"
`,
    starter: `export function useTopicRoute() {
}
`,
    tests: [
      "navigate('/topics/hooks'); const r1 = renderHook(() => useTopicRoute()); if (r1.result.slug !== 'hooks') throw new Error('slug');",
      "navigate('/practice'); const r2 = renderHook(() => useTopicRoute()); if (r2.result.slug !== '') throw new Error('empty');",
      "navigate('/topics/css'); const r3 = renderHook(() => useTopicRoute()); const open = r3.result.open; r3.result.open('javascript'); if (r3.result.slug !== 'javascript') throw new Error('push'); r3.rerender(); if (r3.result.open !== open) throw new Error('stable');",
    ],
    solution: `export function useTopicRoute() {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname.split('/').filter(Boolean);
  const slug = parts[0] === 'topics' ? (parts[1] ?? '') : '';
  const open = useCallback((next) => {
    router.push('/topics/' + next);
  }, [router.push]);
  return { slug, open };
}
`,
  },
  {
    id: "use-catalog",
    title: "Memo + callback catalog",
    minutes: 12,
    language: "javascript",
    summary: "Filter a list with useMemo, look up an item with useCallback, and skip extra row renders with memo.",
    prompt: `## What you export
Two functions: useCatalog(items, query) and createRow({ onRender }).

## Already in scope
Do not import React. You can call useMemo, useCallback, and memo directly.

## Part 1 — useCatalog(items, query)
Return { visible, pick }.

### visible
- A filtered copy of items
- Keep an item if item.name contains the query
- Ignore case ("HO" matches "Hooks")
- Trim the query first
- If the query is "" or only spaces, keep every item
- Create this array with useMemo([items, query]) so it is reused when items and query did not change

### pick(id)
- Search inside visible (the filtered list), not the original items
- Return that item, or null if it is not in visible
- Wrap pick in useCallback([visible]) so it is the same function until visible changes

## Part 2 — createRow({ onRender })
- Return a component wrapped in memo(...)
- The component receives props { id, label }
- When it really renders: call onRender() once, then return the string id + ':' + label
- Same id and label again: skip render (do not call onRender)
- If id or label changes: render again

## Examples
- items = [{ id: '1', name: 'Hooks' }, { id: '2', name: 'Router' }], query = 'ho' → visible is only Hooks. pick('1') is that item. pick('2') is null.
- Same items and query after a rerender → visible and pick are the same references (not new copies).
- query = '' → visible has both items.
- Row({ id: 1, label: 'a' }) twice → onRender ran once, return value is "1:a". Then Row({ id: 1, label: 'b' }) calls onRender again.
`,
    starter: `export function useCatalog(items, query) {
}

export function createRow({ onRender }) {
}
`,
    tests: [
      "const items = [{ id: '1', name: 'Hooks' }, { id: '2', name: 'Router' }]; const box = { query: 'ho' }; const h = renderHook(() => useCatalog(items, box.query)); if (h.result.visible.length !== 1 || h.result.visible[0].id !== '1') throw new Error('filter'); const v = h.result.visible; const p = h.result.pick; h.rerender(); if (h.result.visible !== v) throw new Error('memo'); if (h.result.pick !== p) throw new Error('callback'); if (p('2') !== null || p('1').name !== 'Hooks') throw new Error('pick'); box.query = ''; h.rerender(); if (h.result.visible.length !== 2) throw new Error('recompute'); if (h.result.visible === v) throw new Error('new');",
      "let n = 0; const Row = createRow({ onRender: () => n++ }); if (Row({ id: 1, label: 'a' }) !== '1:a') throw new Error('out'); Row({ id: 1, label: 'a' }); if (n !== 1) throw new Error('memo'); Row({ id: 1, label: 'b' }); if (n !== 2) throw new Error('update');",
    ],
    solution: `export function useCatalog(items, query) {
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => item.name.toLowerCase().includes(needle));
  }, [items, query]);
  const pick = useCallback((id) => visible.find((item) => item.id === id) ?? null, [visible]);
  return { visible, pick };
}

export function createRow({ onRender }) {
  return memo(function Row({ id, label }) {
    onRender();
    return id + ':' + label;
  });
}
`,
  },
];
