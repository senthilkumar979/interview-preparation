import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptObjectTopics: Topic[] = [
  jsTopic({
    slug: "javascript-object",
    title: "Objects",
    order: 22,
    summary: "Unordered collections of properties plus a hidden [[Prototype]] link.",
    prerequisites: ["javascript-non-primitive"],
    related: ["javascript-creating-objects", "javascript-prototypal-inheritance", "javascript-shallow-copy"],
    oneLiner:
      "An object is a map of string/symbol keys to values, plus a hidden [[Prototype]]. Assignment copies the reference, not the contents.",
    beats: [
      "Own properties live on the object; missing keys walk [[Prototype]] until `null`.",
      "`typeof obj === \"object\"` is true for arrays, dates, and `null` — use `Object.hasOwn` / `Array.isArray` to discriminate.",
      "Mutating through two variables that hold the same reference is one object, two names.",
    ],
    intro:
      "Almost everything non-primitive is an object. Interviews probe whether you can separate own vs inherited properties and reference vs copy.",
    why: "Accidental shared config, in-place React/Redux mutations, and `for...in` surprises all start with misunderstanding objects.",
    concept:
      "A property is a key plus a descriptor (`value`/`writable`/`enumerable`/`configurable`, or `get`/`set`). Keys are strings or symbols. The object also has an internal [[Prototype]] used for lookup.",
    how: "`obj.a` and `obj[\"a\"]` start at the object and walk the chain. `Object.hasOwn(obj, key)` tests own keys without calling a possibly overridden `hasOwnProperty`.",
    usage: "Use literals for data, `Map` when keys are not strings, and freeze config in tests when mutation would hide a bug.",
    practices:
      "Treat objects as immutable at the boundary that owns them. Prefer `Object.hasOwn` over `obj.hasOwnProperty`. Do not use objects as maps for arbitrary keys.",
    mistakes:
      "Assuming `{ ...obj }` clones nested objects or bound methods. Using arrays as maps. Trusting `typeof null === \"object\"`.",
    code: `const user = { name: "Ada", role: "engineer" };
const teammate = user;
teammate.role = "staff";
console.log(user.role); // "staff" — same reference

console.log(typeof null); // "object"
console.log(Object.hasOwn(user, "name")); // true
`,
    examples: [
      {
        id: "own-vs-inherited",
        title: "Own vs inherited",
        about: "`kind` is on the prototype, not the instance.",
        language: "javascript",
        code: `const proto = { kind: "person" };
const ada = Object.create(proto);
ada.name = "Ada";
console.log(ada.kind); // "person"
console.log(Object.hasOwn(ada, "kind")); // false
`,
      },
      {
        id: "keys",
        title: "String and symbol keys",
        about: "Number keys become strings. Symbols stay unique.",
        language: "javascript",
        code: `const id = Symbol("id");
const row = { 1: "a", [id]: 42 };
console.log(row["1"]); // "a"
console.log(Object.keys(row)); // ["1"] — no symbol
console.log(row[id]); // 42
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-creating-objects",
    title: "Creating objects",
    order: 23,
    summary: "Every practical way to get a new object: literal, constructor, create, class, factory, assign, clone, JSON.",
    prerequisites: ["javascript-object"],
    related: ["javascript-class", "javascript-shallow-copy", "javascript-json"],
    isHighYield: true,
    oneLiner:
      "Literals are the default. `new C()`, `Object.create(proto)`, factories, `Object.assign`/`spread`, `structuredClone`, and `JSON.parse` all produce objects with different prototypes and copy semantics.",
    beats: [
      "`{}` is `Object.create(Object.prototype)` with own properties. `Object.create(null)` has no prototype.",
      "`new Fn()` sets `this` to a new object whose [[Prototype]] is `Fn.prototype`. Classes are sugar on that.",
      "`Object.assign`/`{...}` copy enumerable own properties one level. `structuredClone` deep-clones many built-ins. `JSON.parse` rebuilds from JSON text (no functions, `undefined`, or symbols).",
    ],
    intro:
      "Interviewers ask “how many ways can you create an object?” They want the list and the prototype each way leaves behind.",
    why: "The wrong constructor or a shallow copy is how you leak state or lose methods across workers and API boundaries.",
    concept:
      "Creation either allocates a new ordinary object and sets [[Prototype]], or copies properties onto an existing/new target. Cloning is creation plus a copy policy (shallow vs structured vs JSON).",
    how: "Literal → ordinary object + `Object.prototype`. Constructor/`class` → `new` + `.prototype`. Factory → any object you return (often a literal). `Object.create(p)` → empty object with `p` as [[Prototype]]. `Object.assign(target, ...sources)` copies enumerable own onto target. `structuredClone(value)` walks a structured-cloneable graph. `JSON.parse(text)` evaluates JSON into plain objects/arrays.",
    usage:
      "Literals for data. Classes for identity and methods. `Object.create(null)` for dictionaries. `structuredClone` for postMessage-safe snapshots. `JSON.parse` for wire format.",
    practices:
      "Prefer literals and composition. Do not use `new Object()`. Mention `structuredClone` before rolling a recursive clone. Know JSON drop rules.",
    mistakes:
      "Calling a constructor without `new` (legacy functions pollute `this`). Thinking `Object.assign` deep-clones. Using `JSON.parse(JSON.stringify(x))` on Maps, Dates you need as Dates, or cyclic graphs.",
    code: `const literal = { x: 1 };
const fromCtor = new Object();
fromCtor.x = 1;
const dict = Object.create(null);
const copy = Object.assign({}, literal, { y: 2 });
const clone = structuredClone({ nested: { z: 3 } });
const fromJson = JSON.parse('{"ok":true}');

class Point {
  constructor(x) { this.x = x; }
}
const p = new Point(4);

function makeUser(name) {
  return { name, greet() { return this.name; } };
}
`,
    examples: [
      {
        id: "create-null",
        title: "Object.create(null)",
        about: "No inherited `toString`/`hasOwnProperty`.",
        language: "javascript",
        code: `const bag = Object.create(null);
bag.ok = true;
console.log("toString" in bag); // false
`,
      },
      {
        id: "assign-vs-clone",
        title: "assign vs structuredClone",
        about: "Nested objects stay shared with assign.",
        language: "javascript",
        code: `const src = { n: { v: 1 } };
const shallow = Object.assign({}, src);
const deep = structuredClone(src);
shallow.n.v = 9;
console.log(src.n.v); // 9
console.log(deep.n.v); // 1
`,
      },
      {
        id: "json-parse",
        title: "JSON.parse as a factory",
        about: "Only JSON types. Reviver can revive Dates.",
        language: "javascript",
        code: `const obj = JSON.parse('{"when":"2020-01-01T00:00:00.000Z"}', (k, v) =>
  k === "when" ? new Date(v) : v
);
console.log(obj.when instanceof Date); // true
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-property-accessors",
    title: "Property accessors",
    order: 24,
    summary: "Dot, bracket, destructuring, getters, and setters.",
    prerequisites: ["javascript-creating-objects"],
    related: ["javascript-optional-chaining", "javascript-this"],
    oneLiner:
      "Read/write with `.name` or `[expr]`. Destructuring unpacks own (and inherited) values. Getters/setters run functions on access.",
    beats: [
      "Dot needs an IdentifierName. Bracket takes any expression (computed keys, symbols, invalid identifiers).",
      "Destructuring `{ a, b: c } = obj` is Get on those keys — inherited values count; missing keys are `undefined` unless defaulted.",
      "`get`/`set` in literals or `Object.defineProperty`. Access looks like a field; it is a call.",
    ],
    intro: "Accessors are how you read the object model. Interviews mix optional chaining, computed keys, and accessor traps.",
    why: "Wrong accessor (`user[id]` vs `user.id`) is a silent `undefined`. Getters that mutate are hard to debug.",
    concept:
      "Ordinary data properties store a value. Accessor properties store get/set functions. Destructuring and `for...in` still go through [[Get]].",
    how: "`obj.key` → ToObject + ToPropertyKey(`\"key\"`). `obj[k]` converts `k` to string/symbol. Optional chaining short-circuits on `null`/`undefined`. Setters receive the assigned value.",
    usage: "Dot for known keys. Bracket for variables and symbols. Destructure at function params. Getters for derived fields that stay in sync.",
    practices: "Keep getters pure. Prefer methods if work is expensive or async. Do not destructure then expect live updates.",
    mistakes:
      "Using `obj[\"0\"]` vs arrays inconsistently. Destructuring `undefined` without a default (`{}` default). Getters with side effects.",
    code: `const user = {
  first: "Ada",
  last: "Lovelace",
  get full() { return \`\${this.first} \${this.last}\`; },
  set full(value) {
    const [first, last] = value.split(" ");
    this.first = first;
    this.last = last;
  },
};
const key = "first";
console.log(user.first, user[key], user.full);
const { first, last: surname } = user;
`,
    examples: [
      {
        id: "bracket",
        title: "Computed keys",
        about: "Any expression can be a key.",
        language: "javascript",
        code: `const k = "role";
const user = { [k]: "engineer" };
console.log(user["role"]);
`,
      },
      {
        id: "destructure-default",
        title: "Destructure defaults",
        about: "Default applies only for `undefined`, not `null`.",
        language: "javascript",
        code: `const { n = 1 } = { n: undefined };
const { m = 1 } = { m: null };
console.log(n, m); // 1, null
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-prototypal-inheritance",
    title: "Prototypal inheritance",
    order: 25,
    summary: "Objects inherit by linking [[Prototype]], not by copying class fields.",
    prerequisites: ["javascript-object"],
    related: ["javascript-prototype-chaining", "javascript-class"],
    oneLiner:
      "JavaScript inheritance is delegating lookups to another object via [[Prototype]]. Methods live once on the prototype; instances hold own data.",
    beats: [
      "`obj.__proto__` is a legacy accessor; prefer `Object.getPrototypeOf` / `Object.setPrototypeOf` (the latter is slow).",
      "`Fn.prototype` is the object assigned as [[Prototype]] of `new Fn()` instances.",
      "Changing a prototype method updates all instances that still delegate to it.",
    ],
    intro: "There is no copy-down of methods at construction unless you put them on `this`. Delegation is the model.",
    why: "Framework internals, `instanceof`, and “why does this method exist on every instance?” all require this picture.",
    concept:
      "An instance has own properties. When a key is missing, the engine reads [[Prototype]] and repeats. `null` ends the chain.",
    how: "`Object.create(proto)` sets the link directly. Constructors set it from `.prototype`. `class` does the same with non-enumerable methods on `.prototype`.",
    usage: "Share methods on prototypes. Keep instance state own. Use `Object.create` for dictionaries or one-off delegation.",
    practices:
      "Do not mutate `Object.prototype`. Prefer composition over deep prototype trees. Avoid `Object.setPrototypeOf` on hot paths.",
    mistakes:
      "Putting large data on the prototype (shared mutable). Shadowing a prototype method with an own property accidentally. Using `__proto__` in production code.",
    code: `function User(name) {
  this.name = name;
}
User.prototype.greet = function () {
  return "hi " + this.name;
};
const ada = new User("Ada");
console.log(ada.greet());
console.log(Object.getPrototypeOf(ada) === User.prototype);
`,
    examples: [
      {
        id: "share-method",
        title: "One function, many instances",
        about: "The method is not copied onto each instance.",
        language: "javascript",
        code: `function C() {}
C.prototype.n = 1;
const a = new C();
const b = new C();
C.prototype.n = 2;
console.log(a.n, b.n); // 2 2
`,
      },
      {
        id: "shadow",
        title: "Own property shadows",
        about: "Assignment creates an own key and hides the prototype.",
        language: "javascript",
        code: `const proto = { n: 1 };
const o = Object.create(proto);
o.n = 3;
console.log(o.n, proto.n); // 3 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-prototype-chaining",
    title: "Prototype chaining",
    order: 26,
    summary: "Property lookup walks [[Prototype]] until the key is found or the chain hits null.",
    prerequisites: ["javascript-prototypal-inheritance"],
    related: ["javascript-class", "javascript-for-in"],
    isHighYield: true,
    oneLiner:
      "A get walks the instance, then its prototype, then that prototype’s prototype, ending at `Object.prototype` then `null`.",
    beats: [
      "`ada.toString` is usually `Object.prototype.toString` unless a nearer prototype defines it.",
      "`instanceof C` tests whether `C.prototype` appears on the chain (not “was constructed by C” in the class sense if the chain was rewired).",
      "`for...in` enumerates enumerable keys on the whole chain; `Object.keys` only own enumerable.",
    ],
    intro: "The chain is the runtime type system for ordinary objects. Draw it in interviews.",
    why: "Explains inherited methods, `for...in` leaks, and why `Object.create(null)` skips `toString`.",
    concept:
      "Each object has one [[Prototype]] (or `null`). Lookup is linear. Set/define usually writes own properties and does not walk (except setters).",
    how: "[[Get]] → own, else [[Prototype]][[Get]]. If a setter exists on the chain, assignment may call it instead of creating own data. `Object.getPrototypeOf` inspects one hop.",
    usage: "Reason about `instanceof`, polyfills on prototypes, and why `hasOwn` is required in `for...in` loops.",
    practices: "Keep chains short. Use `Object.hasOwn` when iterating. Prefer `Object.create(null)` for maps of untrusted keys.",
    mistakes: "Assuming `Object.keys` lists inherited keys. Infinite chains (illegal; engines throw). Mutating `Object.prototype` globally.",
    code: `function Animal() {}
Animal.prototype.kind = "animal";
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function () { return "woof"; };
const d = new Dog();
console.log(d.kind, d.bark());
console.log(d instanceof Dog, d instanceof Animal);
`,
    figures: [
      {
        src: "/diagrams/js/js-prototype-chain.png",
        alt: "Prototype chain from instance to Object.prototype to null",
        caption: "Property lookup walks [[Prototype]]",
      },
    ],
    examples: [
      {
        id: "walk",
        title: "Walk until Object.prototype",
        about: "`toString` is not own on a literal.",
        language: "javascript",
        code: `const o = {};
console.log(Object.hasOwn(o, "toString")); // false
console.log(typeof o.toString); // "function"
console.log(Object.getPrototypeOf(Object.prototype)); // null
`,
      },
      {
        id: "instanceof",
        title: "instanceof and the chain",
        about: "It is a prototype test.",
        language: "javascript",
        code: `function C() {}
const o = Object.create(C.prototype);
console.log(o instanceof C); // true — never called new C
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-class",
    title: "Classes",
    order: 27,
    summary: "class syntax is constructor + prototype methods, with super and extends.",
    prerequisites: ["javascript-prototypal-inheritance"],
    related: ["javascript-this", "javascript-prototype-chaining"],
    isHighYield: true,
    oneLiner:
      "`class C { constructor() {}; method() {} }` is a constructor function whose methods live on `C.prototype` (non-enumerable). `extends` links the prototype chain and `super`.",
    beats: [
      "Classes are not hoisted like `function` declarations; they have a TDZ. Always `new`.",
      "Instance fields (`x = 1`) are own properties per instance. Methods in the class body are on the prototype unless defined as arrows/fields.",
      "`super.method()` in a subclass method uses the super prototype; in the constructor `super()` must run before using `this`.",
    ],
    intro: "Classes are the interview-friendly surface over prototypes. Seniors still explain the desugaring.",
    why: "React class components, Error subclasses, and `extends` bugs (`super` order) show up constantly.",
    concept:
      "The class object is the constructor. Instances get [[Prototype]] = `C.prototype`. Static members live on `C` itself. Subclass `C.prototype.[[Prototype]]` is `Parent.prototype`.",
    how: "`new C()`: create object, set prototype, run constructor with `this`. Derived constructors wait for `super()` which allocates with the derived `new.target`.",
    usage: "Domain types, custom errors, and when you need `instanceof`. Prefer functions/modules for one-off behavior.",
    practices:
      "Keep constructors thin. Prefer composition. Bind methods or use class fields when passing as callbacks. Do not put React state on the prototype.",
    mistakes:
      "Calling class without `new`. Forgetting `super()` in a subclass constructor. Using arrow methods on the prototype when you wanted sharing (fields copy per instance).",
    code: `class User {
  role = "engineer";
  constructor(name) {
    this.name = name;
  }
  greet() {
    return this.name;
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
    this.role = "admin";
  }
}
const ada = new Admin("Ada");
console.log(ada.greet(), ada instanceof User);
`,
    examples: [
      {
        id: "proto-methods",
        title: "Methods are on the prototype",
        about: "Not copied per instance.",
        language: "javascript",
        code: `class C { f() {} }
const a = new C();
console.log(Object.hasOwn(a, "f")); // false
console.log(typeof C.prototype.f); // "function"
`,
      },
      {
        id: "super-order",
        title: "super() before this",
        about: "ReferenceError if you touch this first.",
        language: "javascript",
        code: `class Base { constructor(n) { this.n = n; } }
class Sub extends Base {
  constructor() {
    super(1);
    this.extra = true;
  }
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-array",
    title: "Arrays",
    order: 28,
    summary: "Indexed exotic objects with a length, holes, and Array.prototype — not the method catalog.",
    prerequisites: ["javascript-object"],
    related: ["javascript-typed-arrays", "javascript-for-of", "javascript-keyed-collections"],
    oneLiner:
      "An array is an object with numeric index keys and a special `length`. It is not a primitive. Methods live on `Array.prototype`; this topic is the structure.",
    beats: [
      "`typeof [] === \"object\"`. Discriminate with `Array.isArray`.",
      "`length` is one past the highest index. Setting `length` smaller deletes trailing elements. Holes (`empty`) are not `undefined` slots in the same way for some iteration.",
      "Sparse arrays skip holes in `forEach`/`map`; `for...of` yields `undefined` for holes.",
    ],
    intro: "Treat arrays as ordered lists with a contract: dense indices, `length`, and prototype methods you will study separately.",
    why: "Holes, array-likes (`arguments`, NodeList), and `length` tricks are classic interview traps.",
    concept:
      "Arrays are exotic objects: index properties and `length` stay in sync. Extra named properties are allowed (`arr.foo`) but unusual. Nested arrays are still just objects at each node.",
    how: "`[1,,3]` is sparse. `Array(3)` allocates length 3 with holes. `Array.from(arrayLike)` copies indexed values. Array-likes have `length` and indices but not `Array.prototype`.",
    usage: "Lists, stacks (`push`/`pop` conceptually), queues. Convert array-likes before iterating with array methods.",
    practices: "Prefer dense arrays. Use `Array.isArray`. Do not use arrays as tuples of mixed roles without a type. Avoid sparse arrays.",
    mistakes:
      "Confusing holes with `undefined`. Assuming `for...in` is for arrays (string keys, inherited). Mutating `length` accidentally.",
    code: `const dense = [1, 2, 3];
const sparse = [1, , 3];
console.log(dense.length, sparse.length); // 3 3
console.log(Array.isArray(dense));
console.log(typeof dense); // "object"
const like = { 0: "a", 1: "b", length: 2 };
console.log(Array.from(like)); // ["a", "b"]
`,
    examples: [
      {
        id: "holes",
        title: "Holes vs undefined",
        about: "forEach skips holes; for-of does not skip.",
        language: "javascript",
        code: `const a = [1, , 3];
let n = 0;
a.forEach(() => { n += 1; });
console.log(n); // 2
let m = 0;
for (const _ of a) m += 1;
console.log(m); // 3
`,
      },
      {
        id: "length",
        title: "length is writable",
        about: "Truncation deletes indexes.",
        language: "javascript",
        code: `const a = [1, 2, 3];
a.length = 1;
console.log(a); // [1]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-keyed-collections",
    title: "Map, Set, WeakMap, WeakSet",
    order: 29,
    summary: "Keyed collections with insertion order, any-value keys, and weak GC for objects.",
    prerequisites: ["javascript-object"],
    related: ["javascript-array", "javascript-for-of"],
    isHighYield: true,
    oneLiner:
      "`Map`/`Set` hold arbitrary keys/values with insertion-order iteration. `WeakMap`/`WeakSet` hold object keys weakly so they do not keep objects alive.",
    beats: [
      "Object keys are strings/symbols. `Map` keys are any value (`===` / SameValueZero for NaN).",
      "`Set` unique values; `Map` unique keys. Both are iterable (`for...of`, spread).",
      "Weak collections are not iterable and have no `size`. Keys must be objects or non-registered symbols (WeakMap/WeakSet rules: objects primarily).",
    ],
    intro: "When keys are not strings, or you need identity without leaking, leave `{}` behind.",
    why: "Caches keyed by DOM nodes, uniqueness, and “why can’t I JSON.stringify a Map?” are high-yield.",
    concept:
      "`Map`: key → value. `Set`: unique values. Weak variants: keys are weakly held; when the key object is otherwise unreachable, the entry can disappear.",
    how: "`map.get`/`set`/`has`/`delete`. `set.add`/`has`/`delete`. Iteration: `map.keys()`, `values()`, `entries()`. WeakMap has `get`/`set`/`has`/`delete` only.",
    usage: "Map for dictionaries with object keys. Set for membership. WeakMap for private metadata on objects you do not own.",
    practices: "Do not use objects as maps for user IDs that might collide with `__proto__`. Convert Map to JSON via `Object.fromEntries` only when keys are strings.",
    mistakes:
      "Expecting WeakMap to be enumerable. Using `==` uniqueness in Set (objects compare by reference). Spreading a Map into an object without converting entries.",
    code: `const m = new Map();
const k = { id: 1 };
m.set(k, "ok");
console.log(m.get(k));

const s = new Set([1, 1, 2]);
console.log([...s]); // [1, 2]

const wm = new WeakMap();
wm.set(k, "meta");
`,
    examples: [
      {
        id: "nan-key",
        title: "NaN as a Map key",
        about: "SameValueZero: one NaN key.",
        language: "javascript",
        code: `const m = new Map();
m.set(NaN, "x");
console.log(m.get(NaN)); // "x"
`,
      },
      {
        id: "object-vs-map",
        title: "Object key pitfall",
        about: "Only Map preserves object identity as a key.",
        language: "javascript",
        code: `const a = {};
const b = {};
const o = {};
o[a] = 1;
o[b] = 2;
console.log(o); // { "[object Object]": 2 }
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-typed-arrays",
    title: "Typed arrays",
    order: 30,
    summary: "ArrayBuffer plus views (Uint8Array, Float64Array, DataView) for binary data.",
    prerequisites: ["javascript-array"],
    related: ["javascript-json"],
    oneLiner:
      "A typed array is a view over an `ArrayBuffer`: fixed length, homogeneous numeric elements, no holes, no extra methods like `push`.",
    beats: [
      "`ArrayBuffer` is raw bytes. Typed arrays interpret those bytes (`Uint8Array`, `Int32Array`, `Float64Array`, …).",
      "`DataView` reads mixed endianness at offsets. Multiple views can alias the same buffer.",
      "Not a JS `Array`: `Array.isArray(new Uint8Array())` is false. They still iterate with `for...of`.",
    ],
    intro: "Binary protocols, WASM, canvas pixels, and file bytes use this model — not `{0: x, length}` arrays.",
    why: "Endianness, aliasing views, and “why can’t I push?” appear in systems-flavored JS interviews.",
    concept:
      "Buffer owns memory. A view has `byteOffset`, `byteLength`, and an element type. Overflow wraps (Uint8) or becomes 0/NaN per type rules.",
    how: "`new Uint8Array(4)`, `new Uint8Array(buffer, offset, length)`, `array.buffer` to get the buffer. `set` copies from another typed array.",
    usage: "Network packets, image data, hashing, interop with `fetch` `arrayBuffer()`.",
    practices: "Check endianness with DataView for protocols. Do not assume a view owns unique memory. Copy if you must detach from a shared buffer.",
    mistakes:
      "Using `push`/`splice`. Assuming JSON will serialize typed arrays as numbers (it becomes an object keyed by indexes). Sharing a buffer and mutating unexpectedly.",
    code: `const buf = new ArrayBuffer(8);
const u8 = new Uint8Array(buf);
const f64 = new Float64Array(buf);
u8[0] = 255;
console.log(u8.length); // 8
console.log(Array.isArray(u8)); // false
const view = new DataView(buf);
view.setUint16(0, 0x1234, true); // little-endian
`,
    examples: [
      {
        id: "alias",
        title: "Two views, one buffer",
        about: "Writes through one view are visible to the other.",
        language: "javascript",
        code: `const buf = new ArrayBuffer(2);
const a = new Uint8Array(buf);
const b = new Uint8Array(buf);
a[0] = 7;
console.log(b[0]); // 7
`,
      },
      {
        id: "from-array",
        title: "Copy from a JS array",
        about: "Values are converted to the element type.",
        language: "javascript",
        code: `const t = Uint8Array.from([256, -1]);
console.log(t[0], t[1]); // 0, 255
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-json",
    title: "JSON",
    order: 31,
    summary: "A data format and the JSON.stringify / JSON.parse API — not JavaScript object literals.",
    prerequisites: ["javascript-object"],
    related: ["javascript-deep-copy", "javascript-creating-objects"],
    oneLiner:
      "JSON is a text format: objects, arrays, strings, numbers, booleans, null. `JSON.stringify` serializes a subset of JS values; `JSON.parse` rebuilds plain objects.",
    beats: [
      "Dropped: `undefined`, functions, symbols (in objects they vanish; in arrays `undefined`/`fn` become `null`).",
      "`toJSON` on an object customizes stringify. Replacer and reviver walk the tree.",
      "Dates stringify to ISO strings, not Date objects. `Map`/`Set`/`undefined` at root become `undefined` (stringify returns `undefined`).",
    ],
    intro: "JSON is not JS. Keys are always strings. No comments, no trailing commas, no `undefined`.",
    why: "API payloads, deep-clone hacks, and XSS from `eval` of JSON are interview staples.",
    concept:
      "Parse produces ordinary objects (`Object.prototype`) and arrays. Prototype methods are not restored. Cycles throw on stringify.",
    how: "`JSON.stringify(value, replacer, space)`. `JSON.parse(text, reviver)`. Safe parse only — never `eval`.",
    usage: "REST bodies, localStorage, structured logs. Revive dates in a reviver if you control the schema.",
    practices: "Validate parsed data (Zod). Do not use JSON as a deep clone for Maps, Dates, or `undefined`. Handle stringify of `BigInt` (throws).",
    mistakes:
      "`eval(json)`. Assuming `NaN`/`Infinity` survive (they become `null`). Forgetting `JSON.stringify` of `undefined` is not the string `\"undefined\"`.",
    code: `const text = JSON.stringify({ ok: true, skip: undefined, when: new Date(0) });
console.log(text); // skip omitted; when is ISO string
const data = JSON.parse(text);
console.log(typeof data.when); // "string"
`,
    examples: [
      {
        id: "array-holes",
        title: "Array undefined becomes null",
        about: "Object keys with undefined are omitted.",
        language: "javascript",
        code: `console.log(JSON.stringify({ a: undefined, b: 1 }));
console.log(JSON.stringify([undefined, 1]));
`,
      },
      {
        id: "tojson",
        title: "toJSON",
        about: "Called before serialization.",
        language: "javascript",
        code: `const point = {
  x: 1,
  toJSON() { return { x: this.x, src: "point" }; },
};
console.log(JSON.stringify(point));
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-shallow-copy",
    title: "Shallow copy",
    order: 32,
    summary: "Copy own enumerable fields one level; nested objects stay shared.",
    prerequisites: ["javascript-object"],
    related: ["javascript-deep-copy", "javascript-creating-objects"],
    oneLiner:
      "A shallow copy duplicates the top object (or array) and copies property values as-is. Nested references still point at the same objects.",
    beats: [
      "`{ ...obj }`, `Object.assign({}, obj)`, `arr.slice()`, `[...arr]` are shallow.",
      "Getters are invoked; the result is stored as a data property on the copy.",
      "Prototype is not copied: spread makes an object with `Object.prototype`, not the source’s prototype.",
    ],
    intro: "Most “I cloned it” bugs in UI state are shallow copies of nested trees.",
    why: "React state, Redux reducers, and form drafts all need the right copy depth.",
    concept:
      "Each own enumerable key is read and written onto a new object. Values that are objects remain shared. Arrays copy index slots the same way.",
    how: "Spread uses enumerable own properties (including symbols for object spread in modern engines). `slice` copies indexed elements, not extra named properties on arrays.",
    usage: "Update one top-level field immutably. Combine with nested spreads for one nested path (`{ ...s, user: { ...s.user, name } }`).",
    practices: "Name the copy policy. Do not freeze a shallow copy and assume children are safe. Prefer structuredClone when the graph is data-only and nested.",
    mistakes:
      "Spreading a class instance and expecting methods. Copying then mutating `copy.nested`. Assuming `slice` clones objects inside the array.",
    code: `const user = { name: "Ada", address: { city: "London" } };
const copy = { ...user };
copy.name = "Grace";
copy.address.city = "Oxford";
console.log(user.name); // "Ada"
console.log(user.address.city); // "Oxford" — shared nested
`,
    examples: [
      {
        id: "assign",
        title: "Object.assign",
        about: "Same sharing rule.",
        language: "javascript",
        code: `const src = { n: { v: 1 } };
const c = Object.assign({}, src);
c.n.v = 2;
console.log(src.n.v); // 2
`,
      },
      {
        id: "array-slice",
        title: "Array slice",
        about: "Elements that are objects stay shared.",
        language: "javascript",
        code: `const rows = [{ id: 1 }];
const copy = rows.slice();
copy[0].id = 9;
console.log(rows[0].id); // 9
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-deep-copy",
    title: "Deep copy",
    order: 33,
    summary: "Duplicate the whole tree so nested objects are not shared.",
    prerequisites: ["javascript-shallow-copy"],
    related: ["javascript-json", "javascript-creating-objects"],
    oneLiner:
      "A deep copy recursively clones nested objects. `structuredClone` is the platform API; `JSON.parse(JSON.stringify(x))` is a lossy subset.",
    beats: [
      "`structuredClone` handles many built-ins, Dates, Maps, Sets, ArrayBuffers; it throws on functions and DOM nodes.",
      "JSON clone drops `undefined`/functions/symbols, converts Dates to strings, rejects cycles and BigInt.",
      "Hand-rolled clones must define cycle policy and prototype policy.",
    ],
    intro: "Deep copy is a spec, not a single operator. Say which algorithm you mean.",
    why: "Undo stacks, web workers, and “why did the original Date become a string?” all live here.",
    concept:
      "Walk the graph; for each object allocate a new one and clone children. Shared references in the source can become shared or duplicated depending on the algorithm (`structuredClone` preserves internal sharing / cycles).",
    how: "`structuredClone(value)`. JSON round-trip for JSON-safe trees. Libraries (Lodash `cloneDeep`) for functions/prototypes if you accept their rules.",
    usage: "Snapshot state before mutate. Send data across workers. Do not deep-clone on every React render.",
    practices: "Prefer `structuredClone` over JSON for app state that includes Dates/Maps. Keep domain objects serializable if they cross the network.",
    mistakes:
      "JSON-cloning class instances (methods gone, prototype reset). Cloning then expecting functions. Infinite recursion on cycles with a naive recursive copy.",
    code: `const tree = { n: { v: 1 }, when: new Date(0) };
const deep = structuredClone(tree);
deep.n.v = 9;
console.log(tree.n.v); // 1
console.log(deep.when instanceof Date); // true

const lossy = JSON.parse(JSON.stringify(tree));
console.log(typeof lossy.when); // "string"
`,
    figures: [
      {
        src: "/diagrams/js/js-memory-copy.png",
        alt: "Shallow copy shares nested refs; deep copy duplicates the tree",
        caption: "Shallow vs deep copy",
      },
    ],
    examples: [
      {
        id: "cycle",
        title: "Cycles",
        about: "structuredClone allows cycles; JSON does not.",
        language: "javascript",
        code: `const a = {};
a.self = a;
const b = structuredClone(a);
console.log(b.self === b); // true
`,
      },
      {
        id: "functions",
        title: "Functions cannot clone",
        about: "structuredClone throws.",
        language: "javascript",
        code: `try {
  structuredClone({ f: () => 1 });
} catch (e) {
  console.log(e.name); // DataCloneError
}
`,
      },
    ],
  }),
];
