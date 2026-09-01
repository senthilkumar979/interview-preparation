import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptObjectMethodTopics: Topic[] = [
  jsTopic({
    slug: "javascript-object-assign",
    title: "Object.assign",
    order: 85,
    summary: "Copy enumerable own properties from sources onto a target. Shallow. Mutates the target.",
    prerequisites: ["javascript-object"],
    related: ["javascript-object-create", "javascript-object-defineproperty"],
    isHighYield: true,
    oneLiner:
      "`Object.assign(target, ...sources)` copies enumerable own string/symbol properties into `target` and returns `target`. Nested objects are shared (shallow).",
    beats: [
      "Mutates `target` (often `{}` so you mutate a fresh object). Return is `target`, same reference.",
      "Shallow: `assign({}, { a: { n: 1 } })` shares `a`. Later sources overwrite earlier keys.",
      "Getters on the source are invoked; the result is set as a data property on the target (accessors are not copied as accessors).",
    ],
    intro: "First Object static after the object overview. High-yield shallow merge.",
    why: "“Clone” that is not deep; mutating the merge target by accident.",
    concept: "For each source, copy enumerable own keys onto target, last write wins.",
    how: "`Object.assign({}, a, b)` is a new object. `Object.assign(a, b)` mutates `a`.",
    usage: "Defaults: `assign({}, defaults, overrides)`. Mixing mixins onto a prototype (legacy).",
    practices: "Always pass a new `{}` if you must not mutate. Use spread similarly (also shallow). Deep clone needs `structuredClone` / a library.",
    mistakes: "Thinking assign deep-copies. Copying accessors as getters. Ignoring non-enumerable and inherited keys.",
    code: `const t = { a: 1 };
const r = Object.assign(t, { b: 2 }, { a: 3 });
console.log(t === r, t); // true { a: 3, b: 2 }
const nested = Object.assign({}, { x: { n: 1 } });
nested.x.n = 9;
console.log({ x: { n: 1 } }.x); // still 1 — different object
const src = { x: { n: 1 } };
Object.assign({}, src).x.n = 9;
console.log(src.x.n); // 9 — shallow
`,
    examples: [
      {
        id: "getter",
        title: "Getters become data",
        about: "The getter runs once during assign.",
        language: "javascript",
        code: `const src = {
  get n() { return 1; },
};
const t = Object.assign({}, src);
console.log(Object.getOwnPropertyDescriptor(t, "n"));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-create",
    title: "Object.create",
    order: 86,
    summary: "New object with a chosen [[Prototype]] and optional property descriptors.",
    prerequisites: ["javascript-object-assign"],
    related: ["javascript-object-getprototypeof", "javascript-object-defineproperties"],
    isHighYield: true,
    oneLiner:
      "`Object.create(proto, descriptors?)` allocates an object whose [[Prototype]] is `proto` (`null` allowed). It does not run a constructor.",
    beats: [
      "`create(null)` has no prototype — no `toString`/`hasOwnProperty`. Safe maps vs `__proto__` pollution (prefer `Map`).",
      "Second arg is descriptors, like `defineProperties`, not a data bag like `assign`.",
      "Delegation: missing keys walk `proto`. Own keys override.",
    ],
    intro: "High-yield prototypal construction without `new`.",
    why: "Dictionary objects, test doubles, custom prototype chains.",
    concept: "Set [[Prototype]] then define own properties from the descriptor map.",
    how: "`const p = { hi() {} }; const o = Object.create(p); o.hi()`.",
    usage: "Null-prototype maps. Inherit methods without classes.",
    practices: "Do not `create` then `assign` if you meant descriptors. Use `Map` for arbitrary keys.",
    mistakes: "`Object.create({ a: 1 })` vs literal — inherited `a` is not own. Passing a data object as the second argument.",
    code: `const proto = { kind: "node" };
const n = Object.create(proto);
n.id = 1;
console.log(n.kind, Object.hasOwn(n, "kind")); // "node" false
const map = Object.create(null);
map["__proto__"] = "ok";
console.log(map["__proto__"]);
`,
    examples: [
      {
        id: "descriptors",
        title: "Second argument",
        about: "Must be property descriptors.",
        language: "javascript",
        code: `const o = Object.create(Object.prototype, {
  hidden: { value: 1, enumerable: false },
});
console.log(Object.keys(o)); // []
console.log(o.hidden); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-keys",
    title: "Object.keys",
    order: 87,
    summary: "Array of enumerable own string keys. No symbols. Insertion order for string keys.",
    prerequisites: ["javascript-object-create"],
    related: ["javascript-object-values", "javascript-object-entries"],
    isHighYield: true,
    oneLiner:
      "`Object.keys(obj)` returns enumerable own string keys. Inherited and symbol keys are omitted. Does not mutate.",
    beats: [
      "Strings only. `Object.getOwnPropertySymbols` / `Reflect.ownKeys` for the rest.",
      "Non-enumerable own keys hidden (e.g. many built-in fields).",
      "Arrays: dense indexes as strings; holes skipped.",
    ],
    intro: "High-yield key listing. Pair with values/entries.",
    why: "`for...in` includes inherited; `keys` does not.",
    concept: "Enumerate own enumerable string properties, integer-index keys first then other strings in creation order.",
    how: "`keys(obj)` ToObject — primitives are boxed (`Object.keys(true)` is `[]`).",
    usage: "Iterate config keys. Length of a record. Serialize subset.",
    practices: "Prefer `Object.keys`/`entries` over `for...in`. Use `hasOwn` when you only test one key.",
    mistakes: "Expecting symbols. Expecting inherited enumerable keys. Mutating while iterating keys snapshot — the array is a snapshot.",
    code: `const o = { a: 1, [Symbol("s")]: 2 };
console.log(Object.keys(o)); // ["a"]
const proto = { inherited: 1 };
console.log(Object.keys(Object.create(proto))); // []
`,
    examples: [
      {
        id: "array",
        title: "Array keys skip holes",
        about: "Compare Array.prototype.keys.",
        language: "javascript",
        code: `console.log(Object.keys([, "b"])); // ["1"]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-values",
    title: "Object.values",
    order: 88,
    summary: "Array of values for enumerable own string keys, same order as Object.keys.",
    prerequisites: ["javascript-object-keys"],
    related: ["javascript-object-keys", "javascript-object-entries"],
    isHighYield: true,
    oneLiner:
      "`Object.values(obj)` returns the values that pair with `Object.keys(obj)`. No symbol values. Does not mutate.",
    beats: [
      "Shallow list of current values (object values are references).",
      "Same omissions as keys: inherited, symbols, non-enumerable.",
      "Order matches `keys`.",
    ],
    intro: "High-yield value dump.",
    why: "Summing a map-like object, uniqueness checks.",
    concept: "Map keys → Get each property.",
    how: "ToObject, then collect. Getters run.",
    usage: "`Object.values(counts).reduce(...)`. Presence of a value (`includes`).",
    practices: "If you need keys too, `entries` once. Watch getters with side effects.",
    mistakes: "Assuming Map-like includes symbols. Using values to deep clone.",
    code: `const o = { a: 1, b: 2 };
console.log(Object.values(o)); // [1, 2]
`,
    examples: [
      {
        id: "getter",
        title: "Getters run",
        about: "values invokes getters.",
        language: "javascript",
        code: `let n = 0;
const o = { get a() { n += 1; return n; } };
console.log(Object.values(o), Object.values(o));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-entries",
    title: "Object.entries",
    order: 89,
    summary: "Array of [key, value] pairs for enumerable own string keys.",
    prerequisites: ["javascript-object-values"],
    related: ["javascript-object-fromentries", "javascript-object-keys"],
    isHighYield: true,
    oneLiner:
      "`Object.entries(obj)` is `keys` zipped with `values`: `[key, value][]`. Inverse is `fromEntries`. Does not mutate.",
    beats: [
      "String keys only. Round-trip `fromEntries(entries(o))` drops symbols and non-enumerable.",
      "Pairs are new arrays; values are still shallow references.",
      "Common `for (const [k, v] of Object.entries(o))`.",
    ],
    intro: "High-yield pair listing. Interview: round-trip loss.",
    why: "Transform objects as lists, then rebuild.",
    concept: "Same filter as keys; each pair is a two-element array.",
    how: "Snapshot of enumerable own string properties.",
    usage: "Map/filter an object: `fromEntries(entries(o).filter(...))`.",
    practices: "Prefer this over `keys` + lookup. Know data loss vs `Reflect.ownKeys`.",
    mistakes: "Expecting prototype methods in entries. Mutating pairs expecting to mutate the object.",
    code: `console.log(Object.entries({ a: 1, b: 2 })); // [["a",1],["b",2]]
`,
    examples: [
      {
        id: "roundtrip",
        title: "Symbols dropped",
        about: "fromEntries cannot restore them.",
        language: "javascript",
        code: `const s = Symbol("s");
const o = { a: 1, [s]: 2 };
console.log(Object.fromEntries(Object.entries(o))); // { a: 1 }
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-fromentries",
    title: "Object.fromEntries",
    order: 90,
    summary: "Build a plain object from an iterable of [key, value] pairs. Last duplicate key wins.",
    prerequisites: ["javascript-object-entries"],
    related: ["javascript-object-entries"],
    oneLiner:
      "`Object.fromEntries(iterable)` creates a new object from `[key, value]` pairs. Inverse of `entries` for enumerable string/symbol keys you actually pass.",
    beats: [
      "Does not mutate the iterable. Returns a new object with `Object.prototype`.",
      "Keys are ToString’d unless they are symbols. Duplicate keys: last wins.",
      "Map converts cleanly: `fromEntries(map)` if keys are strings/symbols.",
    ],
    intro: "Rebuild after transforming entries.",
    why: "Object as Map round-trip. Query-string parsing.",
    concept: "For each pair, `define` a data property (enumerable, writable, configurable).",
    how: "`fromEntries([[\"a\",1],[\"a\",2]])` → `{ a: 2 }`.",
    usage: "Filter/map entries then fromEntries. `Map` → object.",
    practices: "Validate pair length. Prefer `Map` if keys are not strings.",
    mistakes: "Passing a plain object (not iterable of pairs). Expecting prototype to be null.",
    code: `console.log(Object.fromEntries([["a", 1], ["b", 2]]));
console.log(Object.fromEntries(new Map([["x", 1]])));
`,
    examples: [
      {
        id: "dup",
        title: "Last key wins",
        about: "No throw.",
        language: "javascript",
        code: `console.log(Object.fromEntries([["a", 1], ["a", 2]])); // { a: 2 }
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-freeze",
    title: "Object.freeze",
    order: 91,
    summary: "Shallow immutability: no add, delete, or change of own properties. Nested objects still mutable.",
    prerequisites: ["javascript-object-fromentries"],
    related: ["javascript-object-seal", "javascript-object-isfrozen"],
    isHighYield: true,
    oneLiner:
      "`Object.freeze(obj)` makes own properties non-writable and non-configurable and prevents extensions. Returns `obj`. Nested objects are not frozen.",
    beats: [
      "Shallow. `freeze({ a: { n: 1 } })` still allows `obj.a.n = 2`.",
      "Stricter than `seal`: values cannot be reassigned. Accessors can still have a setter if it was already there — freeze sets writable false on data properties.",
      "Strict mode: mutations throw; sloppy mode: silent fail.",
    ],
    intro: "High-yield lock. Contrast seal and preventExtensions.",
    why: "Config objects, enum-like maps, accidental mutation tests.",
    concept: "[[PreventExtensions]] + every own property configurable:false, writable:false (data).",
    how: "`const f = Object.freeze(obj); f === obj`.",
    usage: "Export frozen constants. `as const` in TS is compile-time only — freeze is runtime.",
    practices: "Deep freeze only if you own a recursive helper and acyclic data. Document shallow.",
    mistakes: "Assuming deep freeze. Freezing then spreading (spread copies enumerable data — unfrozen clone).",
    code: `const o = { a: 1, nested: { n: 1 } };
Object.freeze(o);
o.nested.n = 9;
console.log(o.nested.n); // 9
try {
  "use strict";
} catch {
  /* freeze throws on o.a = 2 in strict code */
}
`,
    examples: [
      {
        id: "strict",
        title: "Reassignment in strict mode",
        about: "TypeError on frozen data properties.",
        language: "javascript",
        code: `function setA(o) {
  "use strict";
  o.a = 2;
}
const o = Object.freeze({ a: 1 });
try { setA(o); } catch (e) { console.log(e instanceof TypeError); }
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-seal",
    title: "Object.seal",
    order: 92,
    summary: "No add or delete; existing data properties stay writable unless you froze them.",
    prerequisites: ["javascript-object-freeze"],
    related: ["javascript-object-freeze", "javascript-object-preventextensions"],
    oneLiner:
      "`Object.seal(obj)` prevents adding/deleting/reconfiguring own properties but still allows changing writable values. Returns `obj`.",
    beats: [
      "Weaker than freeze: `o.a = 2` works if `a` was writable.",
      "Stronger than preventExtensions: configurable is false, so you cannot delete or redefine.",
      "Shallow: nested objects are not sealed.",
    ],
    intro: "Middle lock. Interview: freeze vs seal vs preventExtensions.",
    why: "Fixed shape, mutable fields.",
    concept: "preventExtensions + configurable:false on own keys; writable unchanged.",
    how: "`delete o.a` fails after seal. `o.a = next` may succeed.",
    usage: "Records with a closed key set.",
    practices: "Prefer freeze for true constants. Seal when values must update.",
    mistakes: "Equating seal with freeze. Expecting deep seal.",
    code: `const o = { a: 1 };
Object.seal(o);
o.a = 2;
console.log(o.a); // 2
console.log(delete o.a); // false in sloppy; throws in strict
o.b = 3;
console.log(o.b); // undefined
`,
    examples: [
      {
        id: "ladder",
        title: "Extensible vs sealed vs frozen",
        about: "add / delete / write.",
        language: "javascript",
        code: `function flags(o) {
  return [Object.isExtensible(o), Object.isSealed(o), Object.isFrozen(o)];
}
const a = {};
const b = Object.seal({ x: 1 });
const c = Object.freeze({ x: 1 });
console.log(flags(a), flags(b), flags(c));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-preventextensions",
    title: "Object.preventExtensions",
    order: 93,
    summary: "Cannot add new own properties. Delete and rewrite of existing keys still allowed.",
    prerequisites: ["javascript-object-seal"],
    related: ["javascript-object-seal", "javascript-object-isextensible"],
    oneLiner:
      "`Object.preventExtensions(obj)` turns off adding own properties. You can still delete and update existing ones. Returns `obj`.",
    beats: [
      "Weakest integrity lock. Prototype can still change unless you also freeze the prototype.",
      "Non-extensible objects reject `defineProperty` of new keys.",
      "Shallow, mutating the object’s capability bits.",
    ],
    intro: "The first step freeze/seal build on.",
    why: "Understand the capability ladder.",
    concept: "[[PreventExtensions]] internal slot only.",
    how: "`o.x = 1` fails for new `x`. `delete o.old` still works.",
    usage: "Rare in apps; appears in interviews and some libraries.",
    practices: "Usually you wanted `seal` or `freeze`.",
    mistakes: "Thinking preventExtensions blocks assignment to existing keys.",
    code: `const o = { a: 1 };
Object.preventExtensions(o);
o.a = 2;
o.b = 3;
console.log(o); // { a: 2 }
console.log(delete o.a); // true
`,
    examples: [
      {
        id: "proto",
        title: "Prototype still writable",
        about: "Unless frozen separately.",
        language: "javascript",
        code: `const o = Object.preventExtensions({ a: 1 });
Object.setPrototypeOf(o, { x: 1 });
console.log(o.x); // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-isfrozen",
    title: "Object.isFrozen",
    order: 94,
    summary: "true if the object is non-extensible and every own property is non-configurable and non-writable (data).",
    prerequisites: ["javascript-object-preventextensions"],
    related: ["javascript-object-freeze", "javascript-object-issealed"],
    oneLiner:
      "`Object.isFrozen(obj)` is true when nothing own can be added, removed, reconfigured, or (for data properties) reassigned.",
    beats: [
      "Does not mutate. Primitives: `isFrozen(1)` is `true` (they cannot be changed as objects).",
      "A sealed object with a writable field is not frozen.",
      "Shallow: nested mutability is irrelevant to this test.",
    ],
    intro: "Predicate for freeze.",
    why: "Tests and assertions on config objects.",
    concept: "isExtensible false AND all own props configurable false AND data writable false.",
    how: "Accessors: no `writable`; freeze requires they are non-configurable (setter may still exist from before freeze — freeze makes them non-configurable).",
    usage: "`assert(Object.isFrozen(CONST))`.",
    practices: "Do not use as a deep-immutable check.",
    mistakes: "`isFrozen({})` is false — empty but still extensible.",
    code: `console.log(Object.isFrozen({})); // false
console.log(Object.isFrozen(Object.freeze({}))); // true
console.log(Object.isFrozen(1)); // true
`,
    examples: [
      {
        id: "seal-not-frozen",
        title: "Sealed is not frozen",
        about: "Writable remains.",
        language: "javascript",
        code: `console.log(Object.isFrozen(Object.seal({ a: 1 }))); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-issealed",
    title: "Object.isSealed",
    order: 95,
    summary: "true if non-extensible and every own property is non-configurable.",
    prerequisites: ["javascript-object-isfrozen"],
    related: ["javascript-object-seal", "javascript-object-isfrozen"],
    oneLiner:
      "`Object.isSealed(obj)` is true when you cannot add/delete/reconfigure own keys. Values may still be writable.",
    beats: [
      "Frozen implies sealed. Sealed does not imply frozen.",
      "Primitives report `true`.",
      "Empty extensible `{}` is not sealed.",
    ],
    intro: "Predicate for seal.",
    why: "Distinguish the middle lock from freeze.",
    concept: "preventExtensions + all own configurable false.",
    how: "Writable is ignored.",
    usage: "Diagnostics. Rare in product code.",
    practices: "Pair with `isFrozen` in explanations, not both in app logic.",
    mistakes: "`isSealed(Object.freeze(o))` is true — freeze is a subset.",
    code: `const s = Object.seal({ a: 1 });
console.log(Object.isSealed(s), Object.isFrozen(s)); // true false
const f = Object.freeze({ a: 1 });
console.log(Object.isSealed(f), Object.isFrozen(f)); // true true
`,
    examples: [
      {
        id: "prevent",
        title: "preventExtensions is not sealed",
        about: "Properties stay configurable.",
        language: "javascript",
        code: `console.log(Object.isSealed(Object.preventExtensions({ a: 1 }))); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-isextensible",
    title: "Object.isExtensible",
    order: 96,
    summary: "true if new own properties may be added. Opposite of preventExtensions succeeding.",
    prerequisites: ["javascript-object-issealed"],
    related: ["javascript-object-preventextensions"],
    oneLiner:
      "`Object.isExtensible(obj)` is false after `preventExtensions` / `seal` / `freeze`. Ordinary objects start true.",
    beats: [
      "Primitives: `isExtensible(1)` is `false`.",
      "Does not tell you about writability of existing keys.",
      "Does not mutate.",
    ],
    intro: "The extensible bit query.",
    why: "Complete the three predicates.",
    concept: "Read [[Extensible]].",
    how: "ToObject for objects; primitives are not extensible.",
    usage: "Feature tests, debug.",
    practices: "Prefer asking isFrozen/isSealed when that is the real question.",
    mistakes: "Assuming non-extensible means frozen.",
    code: `console.log(Object.isExtensible({})); // true
console.log(Object.isExtensible(Object.freeze({}))); // false
console.log(Object.isExtensible(1)); // false
`,
    examples: [
      {
        id: "seal",
        title: "Seal clears extensible",
        about: "isExtensible false, still not frozen.",
        language: "javascript",
        code: `const o = Object.seal({ a: 1 });
console.log(Object.isExtensible(o), Object.isFrozen(o));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-defineproperty",
    title: "Object.defineProperty",
    order: 97,
    summary: "Add or reconfigure one own property via a descriptor. The precise way to set enumerable/writable/get.",
    prerequisites: ["javascript-object-isextensible"],
    related: ["javascript-object-defineproperties", "javascript-object-getownpropertydescriptor"],
    isHighYield: true,
    oneLiner:
      "`Object.defineProperty(obj, key, desc)` defines one own property. Defaults for omitted fields are `false` / no getter — not the same as assignment.",
    beats: [
      "Assignment `o.a = 1` makes enumerable+writable+configurable true. `defineProperty` with `{ value: 1 }` makes all flags false unless you set them.",
      "Data descriptor (`value`/`writable`) vs accessor (`get`/`set`) — cannot mix.",
      "Returns `obj`. Throws if the property is non-configurable and you change it illegally.",
    ],
    intro: "High-yield property control. Interview: default flags.",
    why: "Hidden fields, getters, immutable fields without freeze.",
    concept: "Complete a Property Descriptor and [[DefineOwnProperty]].",
    how: "`enumerable:false` hides from `keys`/`entries`/`for...in`.",
    usage: "API objects, polyfills, `class` fields under the hood.",
    practices: "Set flags explicitly. Use `hasOwn` not `in` after hiding keys.",
    mistakes: "Omitting `enumerable: true` then wondering why JSON.stringify drops it. Mixing get and value.",
    code: `const o = {};
Object.defineProperty(o, "hidden", { value: 1 });
console.log(Object.keys(o), o.hidden); // [] 1
Object.defineProperty(o, "vis", { value: 2, enumerable: true });
console.log(Object.keys(o)); // ["vis"]
`,
    examples: [
      {
        id: "accessor",
        title: "Getter only",
        about: "No writable field.",
        language: "javascript",
        code: `const o = {};
Object.defineProperty(o, "n", { get() { return 1; } });
console.log(o.n);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-defineproperties",
    title: "Object.defineProperties",
    order: 98,
    summary: "defineProperty for many keys at once. Same descriptor defaults.",
    prerequisites: ["javascript-object-defineproperty"],
    related: ["javascript-object-defineproperty", "javascript-object-create"],
    oneLiner:
      "`Object.defineProperties(obj, { key: descriptor, ... })` applies each descriptor. Returns `obj`.",
    beats: [
      "Same traps as defineProperty: omitted flags default false.",
      "`Object.create(proto, props)` uses this shape for the second argument.",
      "Partial failure: if a later define throws, earlier keys may already be set.",
    ],
    intro: "Bulk define. Matches create’s second arg.",
    why: "One call for several hidden fields.",
    concept: "Loop defineProperty.",
    how: "Keys of the props object are the property names to define.",
    usage: "Factory setup. `create(null, { ... })`.",
    practices: "Prefer one `defineProperties` over many `defineProperty` for a known set.",
    mistakes: "Passing values instead of descriptors (`{ a: 1 }` is invalid as a descriptor map value).",
    code: `const o = {};
Object.defineProperties(o, {
  a: { value: 1, enumerable: true },
  b: { value: 2 },
});
console.log(Object.keys(o), o.b); // ["a"] 2
`,
    examples: [
      {
        id: "create",
        title: "Same as create props",
        about: "Second arg is descriptors.",
        language: "javascript",
        code: `const o = Object.create(null, {
  x: { value: 1, enumerable: true },
});
console.log(o.x, Object.getPrototypeOf(o));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-getownpropertydescriptor",
    title: "Object.getOwnPropertyDescriptor",
    order: 99,
    summary: "The descriptor for one own key, or undefined. Does not walk the prototype.",
    prerequisites: ["javascript-object-defineproperties"],
    related: ["javascript-object-defineproperty", "javascript-object-getownpropertynames"],
    oneLiner:
      "`Object.getOwnPropertyDescriptor(obj, key)` returns `{ value, writable, enumerable, configurable }` or `{ get, set, enumerable, configurable }` for an own property, else `undefined`.",
    beats: [
      "Own only — inherited keys return `undefined` even if `in` is true.",
      "Does not mutate. Useful to copy flags (`defineProperty` on a clone).",
      "For all keys, `Object.getOwnPropertyDescriptors` (plural) exists too.",
    ],
    intro: "Read flags you set with defineProperty.",
    why: "Clone accessors correctly (assign cannot).",
    concept: "[[GetOwnProperty]].",
    how: "`desc.enumerable` tells you if `keys` will see it.",
    usage: "Debug hidden props. Faithful clone: `defineProperties({}, getOwnPropertyDescriptors(src))`.",
    practices: "Use plural `getOwnPropertyDescriptors` for full shallow clone of flags.",
    mistakes: "Using this to read inherited methods. Assuming JSON shows getters.",
    code: `const o = { a: 1 };
console.log(Object.getOwnPropertyDescriptor(o, "a"));
console.log(Object.getOwnPropertyDescriptor(o, "toString")); // undefined
`,
    examples: [
      {
        id: "clone",
        title: "Clone with descriptors",
        about: "Keeps non-enumerable.",
        language: "javascript",
        code: `const src = {};
Object.defineProperty(src, "h", { value: 1 });
const copy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(src));
console.log(copy.h, Object.keys(copy));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-getownpropertynames",
    title: "Object.getOwnPropertyNames",
    order: 100,
    summary: "All own string keys, including non-enumerable. No symbols.",
    prerequisites: ["javascript-object-getownpropertydescriptor"],
    related: ["javascript-object-keys", "javascript-object-hasown"],
    oneLiner:
      "`Object.getOwnPropertyNames(obj)` lists every own string key. `Object.keys` is the enumerable subset.",
    beats: [
      "Includes non-enumerable (`length` on functions, hidden fields).",
      "No symbols — use `getOwnPropertySymbols` or `Reflect.ownKeys`.",
      "Does not mutate. Arrays include length as well as indexes."
    ],
    intro: "Full string-key inventory.",
    why: "Finding hidden properties. Contrast keys.",
    concept: "Own string keys regardless of enumerable.",
    how: "Integer indexes then other strings, like keys but including non-enum.",
    usage: "Serialization of hidden state. Debugging.",
    practices: "`Reflect.ownKeys` when you need strings and symbols.",
    mistakes: "Assuming names === keys. Forgetting length on arrays.",
    code: `const o = {};
Object.defineProperty(o, "h", { value: 1 });
console.log(Object.keys(o)); // []
console.log(Object.getOwnPropertyNames(o)); // ["h"]
console.log(Object.getOwnPropertyNames([1])); // ["0", "length"]
`,
    examples: [
      {
        id: "function",
        title: "Function name and length",
        about: "Non-enumerable built-ins.",
        language: "javascript",
        code: `function f(a) {}
console.log(Object.getOwnPropertyNames(f));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-getprototypeof",
    title: "Object.getPrototypeOf",
    order: 101,
    summary: "Read [[Prototype]]. null for Object.create(null) and Object.prototype’s parent.",
    prerequisites: ["javascript-object-getownpropertynames"],
    related: ["javascript-object-setprototypeof", "javascript-object-create"],
    oneLiner:
      "`Object.getPrototypeOf(obj)` returns the internal [[Prototype]], or `null`. Does not mutate.",
    beats: [
      "`obj.__proto__` is an accessor on `Object.prototype` — missing on `create(null)`. Always prefer `getPrototypeOf`.",
      "`getPrototypeOf(Object.prototype)` is `null`.",
      "Primitives are boxed: `getPrototypeOf(1)` is `Number.prototype`.",
    ],
    intro: "Safe prototype read.",
    why: "Inheritance debugging. Null-prototype maps.",
    concept: "[[GetPrototypeOf]].",
    how: "`Object.getPrototypeOf([]) === Array.prototype`.",
    usage: "Walk a chain until `null`. Feature-detect.",
    practices: "Do not use `__proto__`. Stop walks at `null`.",
    mistakes: "`typeof getPrototypeOf` vs `instanceof`. Confusing prototype with `.prototype` on functions.",
    code: `console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.create(null))); // null
console.log(Object.getPrototypeOf(Object.prototype)); // null
`,
    examples: [
      {
        id: "array",
        title: "Array chain",
        about: "Array.prototype then Object.prototype.",
        language: "javascript",
        code: `const p = Object.getPrototypeOf([]);
console.log(p === Array.prototype);
console.log(Object.getPrototypeOf(p) === Object.prototype);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-setprototypeof",
    title: "Object.setPrototypeOf",
    order: 102,
    summary: "Mutate [[Prototype]] at runtime. Slow and discouraged; engines deoptimize.",
    prerequisites: ["javascript-object-getprototypeof"],
    related: ["javascript-object-getprototypeof", "javascript-object-create"],
    oneLiner:
      "`Object.setPrototypeOf(obj, proto)` sets [[Prototype]] to `proto` (`null` allowed) and returns `obj`. Prefer `Object.create` at birth.",
    beats: [
      "Mutating. Breaks hidden class / inline caches — performance trap.",
      "Fails on frozen/non-extensible in the sense of prototype change restrictions (`[[SetPrototypeOf]]` can throw).",
      "`obj.__proto__ =` is the same idea and equally discouraged.",
    ],
    intro: "Change the chain later. Interviews: why not.",
    why: "Legacy mixins. Security (`__proto__` assignment on objects).",
    concept: "[[SetPrototypeOf]]. Cycles throw.",
    how: "`setPrototypeOf(o, Array.prototype)` does not make `o` an array (no exotic array bits).",
    usage: "Almost never in app code. Tests maybe.",
    practices: "`create(proto)` up front. Use composition over live proto swaps.",
    mistakes: "setPrototypeOf to Array.prototype expecting `.map` length magic. Doing this in a hot loop.",
    code: `const o = { a: 1 };
Object.setPrototypeOf(o, { hello() { return this.a; } });
console.log(o.hello());
`,
    examples: [
      {
        id: "cycle",
        title: "Cycle is TypeError",
        about: "Cannot parent yourself.",
        language: "javascript",
        code: `const a = {};
const b = {};
Object.setPrototypeOf(a, b);
try { Object.setPrototypeOf(b, a); } catch (e) { console.log(e instanceof TypeError); }
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-hasown",
    title: "Object.hasOwn",
    order: 103,
    summary: "Own-property test that does not use a possibly overridden hasOwnProperty. ES2022.",
    prerequisites: ["javascript-object-setprototypeof"],
    related: ["javascript-object-keys", "javascript-object-create"],
    isHighYield: true,
    oneLiner:
      "`Object.hasOwn(obj, key)` is true iff `key` is an own property (including non-enumerable and symbols). Safe on `Object.create(null)`.",
    beats: [
      "Does not walk the prototype — `in` does.",
      "`obj.hasOwnProperty` can be missing (`create(null)`) or overridden — `Object.hasOwn` does not call it.",
      "Does not mutate. `hasOwn({ a: undefined }, \"a\")` is true.",
    ],
    intro: "High-yield own-key test. Replaces `Object.prototype.hasOwnProperty.call`.",
    why: "Maps, JSON bags, null-prototype objects.",
    concept: "[[HasOwnProperty]] without invoking user methods.",
    how: "`hasOwn(o, k)` vs `k in o` vs `o[k] != null`.",
    usage: "Guard before read. Iterate keys you already listed.",
    practices: "Always `Object.hasOwn` over `obj.hasOwnProperty`. Pair with `in` only when inheritance is intended.",
    mistakes: "`in` for own-only checks. `hasOwn` on primitives (boxes; usually you wanted a type check first).",
    code: `const o = Object.create({ inherited: 1 });
o.own = 2;
console.log(Object.hasOwn(o, "own")); // true
console.log(Object.hasOwn(o, "inherited")); // false
console.log("inherited" in o); // true
const n = Object.create(null);
n.a = 1;
console.log(Object.hasOwn(n, "a"));
`,
    examples: [
      {
        id: "undefined",
        title: "Present undefined",
        about: "hasOwn is not a nullish check.",
        language: "javascript",
        code: `console.log(Object.hasOwn({ a: undefined }, "a")); // true
console.log(Object.hasOwn({}, "a")); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-is",
    title: "Object.is",
    order: 104,
    summary: "SameValue comparison: like === but NaN equals NaN and +0 does not equal -0.",
    prerequisites: ["javascript-object-hasown"],
    related: ["javascript-object-assign"],
    oneLiner:
      "`Object.is(a, b)` is SameValue: `NaN` matches `NaN`, and `+0` is not `-0`. Everything else matches `===`.",
    beats: [
      "Not deep equality. Objects: identity only.",
      "`===` says `NaN !== NaN` and `+0 === -0`. `Object.is` flips both.",
      "Does not mutate. Useful in React `Object.is` state compare.",
    ],
    intro: "The third equality besides `==` / `===`.",
    why: "Float edge cases and React’s `useState` bail-out.",
    concept: "SameValue abstract op. SameValueZero (used by `Set`/`Map`/`includes`) treats `+0`/`-0` as equal but still matches NaN.",
    how: "`Object.is(NaN, NaN)` true. `Object.is(0, -0)` false.",
    usage: "Custom comparators. Distinguishing signed zero.",
    practices: "Default to `===`. Use `Object.is` when NaN or signed zero matter. Use SameValueZero mentally for collections.",
    mistakes: "Teaching `Object.is` as deep equal. Confusing with `==`.",
    code: `console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false
console.log(Object.is(0, -0)); // false
console.log(0 === -0); // true
`,
    examples: [
      {
        id: "objects",
        title: "Still reference equality",
        about: "Not structural.",
        language: "javascript",
        code: `console.log(Object.is({}, {})); // false
const o = {};
console.log(Object.is(o, o)); // true
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-object-groupby",
    title: "Object.groupBy",
    order: 105,
    summary: "ES2024: group an iterable into a null-prototype object keyed by a callback. Does not mutate the source.",
    prerequisites: ["javascript-object-is"],
    related: ["javascript-object-create", "javascript-object-fromentries"],
    oneLiner:
      "`Object.groupBy(iterable, fn)` returns a new object (`[[Prototype]]` null) whose keys are `fn(item)` and values are arrays of items. The iterable is not mutated.",
    beats: [
      "ES2024 static. Also `Map.groupBy` when keys should not be strings.",
      "Callback return is ToString’d for object keys — objects become `\"[object Object]\"` unless you pick a field.",
      "Result is not a Map; inherited methods are absent (`create(null)` shape).",
    ],
    intro: "Last object-method topic. Modern grouping without reduce.",
    why: "Replace `reduce` into `{}` for buckets. Know the year and Map.groupBy.",
    concept: "For each item, `key = fn(item, index)`; push onto `result[key]`.",
    how: "Insertion order of first-seen keys. Values are new arrays of the original item references (shallow).",
    usage: "`Object.groupBy(users, u => u.role)`. Index available as second arg.",
    practices: "Return a string/symbol-like key. Use `Map.groupBy` for object keys. Do not mutate grouped arrays if they alias source items you care about.",
    mistakes: "Grouping by object identity with Object.groupBy. Assuming the result has Object.prototype. Expecting deep copies of items.",
    code: `const users = [
  { role: "dev", name: "Ada" },
  { role: "ops", name: "Tom" },
  { role: "dev", name: "Al" },
];
const g = Object.groupBy(users, (u) => u.role);
console.log(g.dev.map((u) => u.name)); // ["Ada", "Al"]
console.log(Object.getPrototypeOf(g)); // null
`,
    examples: [
      {
        id: "tostring",
        title: "Object keys stringify",
        about: "Use an id field or Map.groupBy.",
        language: "javascript",
        code: `const a = { id: 1 };
const b = { id: 2 };
console.log(Object.keys(Object.groupBy([a, b], (x) => x)));
`,
      },
    ],
  }),
];
