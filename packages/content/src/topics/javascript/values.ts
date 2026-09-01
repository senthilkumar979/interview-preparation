import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptValueTopics: Topic[] = [
  jsTopic({
    slug: "javascript-primitives",
    title: "Primitive data types",
    order: 7,
    summary: "The seven primitives: string, number, bigint, boolean, undefined, symbol, null.",
    prerequisites: ["javascript-vanilla"],
    related: ["javascript-non-primitive", "javascript-mutable"],
    isHighYield: true,
    oneLiner:
      "Primitives are immutable values: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`. They are copied by value, not by reference.",
    beats: [
      "Seven types. `typeof null` is `\"object\"` (legacy bug); `typeof` of the others matches the name except `null`.",
      "No properties of their own; wrapping (`new String`) is a different, object type.",
      "Assignment copies the bit pattern; mutating through an alias is impossible because there is nothing to mutate.",
    ],
    intro:
      "Interviews start with “what are the primitives?” Get the list right, then `typeof null`, then copy-by-value vs objects.",
    why: "Equality, React state, and “why didn’t my function change the number?” all collapse to this distinction.",
    concept:
      "ECMAScript types: Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object. The first seven are primitives. `null` is a primitive whose `typeof` lies. Symbols are unique keys. BigInt is arbitrary-precision integers (no mixed math with Number without conversion).",
    how: "Literals produce primitives. Property access on a primitive temporarily boxes it (`\"hi\".length`) then throws the box away—the string is still immutable.",
    usage:
      "IDs as strings or numbers, flags as booleans, absence as `null`/`undefined`, unique keys as `Symbol`.",
    practices:
      "Prefer primitives for values that should not share identity. Use `typeof` plus an explicit `=== null` check. Do not `new Boolean` / `new Number` / `new String`.",
    mistakes:
      "Listing `object` or `array` as primitives. Forgetting `symbol` and `bigint`. Using `typeof x === \"null\"` (never true).",
    code: `typeof "a";        // "string"
typeof 1;          // "number"
typeof 1n;         // "bigint"
typeof true;       // "boolean"
typeof undefined;  // "undefined"
typeof Symbol();   // "symbol"
typeof null;       // "object"  ← exception
`,
    examples: [
      {
        id: "copy-value",
        title: "Copy by value",
        about: "Reassigning `b` does not change `a`.",
        language: "javascript",
        code: `let a = 1;
let b = a;
b = 2;
console.log(a); // 1
`,
      },
      {
        id: "boxing",
        title: "Temporary boxing",
        about: "Methods work; the primitive is not an object you keep.",
        language: "javascript",
        code: `const s = "hi";
console.log(s.toUpperCase()); // "HI"
console.log(typeof s); // "string"
`,
      },
      {
        id: "typeof-null",
        title: "typeof null",
        about: "Always pair `typeof` with `x === null` when you care about null.",
        language: "javascript",
        code: `function isObject(x) {
  return x !== null && typeof x === "object";
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-non-primitive",
    title: "Non-primitive data types",
    order: 8,
    summary: "Objects: plain objects, arrays, functions, dates—compared and copied by reference.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-mutable"],
    oneLiner:
      "Everything that is not a primitive is an object: a reference to a mutable heap value. Arrays and functions are objects.",
    beats: [
      "`typeof [] === \"object\"`, `typeof (() => {}) === \"function\"` (functions are objects with a special typeof).",
      "Assignment copies the reference; two variables can alias the same object.",
      "`===` on objects is identity, not deep equality.",
    ],
    intro:
      "Non-primitives are the object type in the spec: records with properties, including arrays (indexed properties + `length`) and functions (callable objects).",
    why: "Shared mutation, React “new object every render,” and `const obj` still being mutable all live here.",
    concept:
      "An object is a collection of properties plus a prototype. Arrays are objects. Functions are objects. `null` is not an object despite `typeof`. Host objects (`document`) are still objects.",
    how: "Literals `{ }` / `[ ]` allocate. Variables hold a pointer. Property get/set go through that pointer. Garbage collection reclaims unreachable objects.",
    usage:
      "Domain models, maps of config, arrays of rows, callbacks. Prefer `Object.create(null)` only when you need a pure dictionary.",
    practices:
      "Treat objects as shared unless you copy (`structuredClone`, spread for shallow). Check arrays with `Array.isArray`, not `typeof`.",
    mistakes:
      "`typeof [] === \"array\"`. Deep-comparing with `===`. Spreading and thinking you cloned nested objects.",
    code: `const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n); // 2 — same object

console.log(typeof []); // "object"
console.log(Array.isArray([])); // true
console.log(typeof function f() {}); // "function"
`,
    examples: [
      {
        id: "identity",
        title: "Identity equality",
        about: "Same shape is not the same reference.",
        language: "javascript",
        code: `console.log({} === {}); // false
console.log([] === []); // false
`,
      },
      {
        id: "shallow-copy",
        title: "Shallow copy",
        about: "Spread copies one level.",
        language: "javascript",
        code: `const orig = { nested: { x: 1 } };
const copy = { ...orig };
copy.nested.x = 2;
console.log(orig.nested.x); // 2
`,
      },
      {
        id: "isarray",
        title: "Array.isArray",
        about: "The reliable array check.",
        language: "javascript",
        code: `Array.isArray([]); // true
Array.isArray({ length: 0 }); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-mutable",
    title: "Mutable & immutable",
    order: 9,
    summary: "Primitives cannot change in place; objects can. `const` does not freeze objects.",
    prerequisites: ["javascript-non-primitive"],
    related: ["javascript-var-let-const"],
    isHighYield: true,
    oneLiner:
      "Primitives are immutable: operations return new values. Objects are mutable unless frozen. `const` binds the reference, it does not freeze the object.",
    beats: [
      "`\"ab\".toUpperCase()` returns a new string; the original is unchanged.",
      "`arr.push` mutates; `[...arr, x]` allocates a new array.",
      "`Object.freeze` is shallow; `const` only prevents reassignment.",
    ],
    intro:
      "Interviewers ask whether `const user` can have `user.name = \"x\"`. Yes. Binding vs value mutability are different axes.",
    why: "Accidental shared state, React purity, and Redux “never mutate” all depend on this.",
    concept:
      "Immutability of primitives is a language guarantee. Object mutability is the default. Frozen objects throw in strict mode on writes. Frozen is shallow: nested objects remain mutable.",
    how: "String/number operations allocate new primitives. Object property set writes the same record. `const` stores a pointer that cannot be retargeted.",
    usage:
      "Update React state with new objects. Use `push` when you own the array. Freeze config at the boundary if you need runtime guards.",
    practices:
      "Do not confuse `const` with immutable. Document whether a function mutates its argument. Prefer copy-on-write for shared state.",
    mistakes:
      "`const` means the object cannot change. Mutating a frozen nested property and thinking freeze is deep. Using `sort`/`reverse`/`splice` on an array you did not intend to mutate.",
    code: `const n = 1;
// n = 2; // TypeError — binding

const user = { name: "Ada" };
user.name = "Grace"; // ok — object mutated

const frozen = Object.freeze({ name: "Ada" });
// frozen.name = "x"; // TypeError in strict mode
`,
    examples: [
      {
        id: "string-new",
        title: "Strings return new values",
        about: "Methods do not mutate the original.",
        language: "javascript",
        code: `const s = "ada";
s.toUpperCase();
console.log(s); // "ada"
`,
      },
      {
        id: "array-mutate",
        title: "Array mutation vs copy",
        about: "`push` vs spread.",
        language: "javascript",
        code: `const a = [1];
a.push(2); // mutates
const b = [...a, 3]; // new array
`,
      },
      {
        id: "shallow-freeze",
        title: "Shallow freeze",
        about: "Nested objects are still writable.",
        language: "javascript",
        code: `const o = Object.freeze({ inner: { n: 1 } });
o.inner.n = 2; // succeeds
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-number",
    title: "Number",
    order: 10,
    summary: "IEEE-754 double: integers, floats, NaN, Infinity, and why 0.1 + 0.2 ≠ 0.3.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-type-coercion"],
    oneLiner:
      "JS `Number` is a 64-bit IEEE-754 float. Integers are safe only through `Number.MAX_SAFE_INTEGER` (2^53 − 1). `NaN` is a number that is not equal to itself.",
    beats: [
      "`typeof NaN === \"number\"`. Use `Number.isNaN` (not global `isNaN`, which coerces).",
      "`0.1 + 0.2 === 0.3` is false. Compare floats with a tolerance or use integers/cents.",
      "`Number.isInteger`, `Number.isSafeInteger`. `BigInt` for larger integers—no implicit mix with Number.",
    ],
    intro:
      "There is one number type for decimals and most integers. Interviews hit `NaN`, `-0`, and floating-point surprise.",
    why: "Money bugs, `parseInt` vs `Number`, and `===` checks that fail on `NaN` show up in production.",
    concept:
      "Every Number is a double. Special values: `NaN`, `Infinity`, `-Infinity`, `+0` / `-0` (`Object.is` distinguishes zeros). `NaN` is the result of invalid math (`0/0`, `Number(\"x\")`).",
    how: "Bitwise ops coerce to 32-bit signed ints then back. `ToNumber` is used by `==` and unary `+`. `parseInt` parses prefixes; `Number(\"\")` is `0`.",
    usage:
      "Counts, pixels, timestamps (`Date.now()`). Money: integers or `BigInt`/decimal libraries. IDs larger than 2^53: string or `BigInt`.",
    practices:
      "`Number.isNaN` / `Number.isFinite`. Avoid global `isNaN`. Do not use `==` with numbers and strings. Prefer `Number.parseInt(s, 10)`.",
    mistakes:
      "`NaN === NaN`. `parseInt(\"08\")` without radix in old engines. Using `Math.max()` with no args (`-Infinity`). Mixing `1n + 1`.",
    code: `console.log(0.1 + 0.2 === 0.3); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("foo")); // false
console.log(isNaN("foo")); // true — coerces first

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.isSafeInteger(2 ** 53)); // false
`,
    examples: [
      {
        id: "isnan",
        title: "Number.isNaN vs isNaN",
        about: "Global `isNaN` runs ToNumber.",
        language: "javascript",
        code: `isNaN(undefined); // true
Number.isNaN(undefined); // false
`,
      },
      {
        id: "parse",
        title: "Number vs parseInt",
        about: "`Number` is all-or-nothing; `parseInt` reads a prefix.",
        language: "javascript",
        code: `Number("10px"); // NaN
parseInt("10px", 10); // 10
`,
      },
      {
        id: "neg-zero",
        title: "Object.is and -0",
        about: "`===` treats +0 and -0 as equal; `Object.is` does not.",
        language: "javascript",
        code: `console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-string",
    title: "String",
    order: 11,
    summary: "Immutable UTF-16 sequences: literals, templates, and indexing vs code points.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-type-coercion"],
    oneLiner:
      "Strings are immutable primitive sequences of UTF-16 code units. Methods return new strings; `length` counts code units, not always visual characters.",
    beats: [
      "Quotes `'`, `\"`, backticks (templates, interpolation, tagged templates).",
      "`s[0]` and `length` are UTF-16 units; emoji may be two units—use `for...of` or `Intl.Segmenter` for graphemes.",
      "Concat with `+` or templates. `==` with numbers coerces; prefer `===`.",
    ],
    intro:
      "Strings look simple until surrogate pairs, `==` coercion, and `split`/`slice` vs code points appear.",
    why: "Validation, URLs, and UI copy are strings. Off-by-one `length` on emoji is a classic senior follow-up.",
    concept:
      "A string is a primitive. Template literals can nest expressions and tagged functions. Normalization (`NFC`/`NFD`) matters for comparison of accented text.",
    how: "Indexing uses code units. `codePointAt` / `String.fromCodePoint` handle full Unicode. Regex `u` flag changes `.` and escapes.",
    usage:
      "Messages, keys, serialization. Templates for HTML only with sanitization. `JSON.stringify` for structured data, not ad-hoc concat of objects.",
    practices:
      "Templates over `+` chains. `startsWith`/`includes` over `indexOf !== -1`. Compare with `===`. Be explicit about locale (`toLocaleLowerCase`).",
    mistakes:
      "Mutating by index (`s[0] = \"X\"` does nothing in sloppy mode, throws in strict on some wrappers). `typeof new String(\"a\") === \"object\"`. Assuming `\"🙂\".length === 1`.",
    code: `const name = "Ada";
const msg = \`Hello, \${name}\`;

console.log("🙂".length); // 2 (surrogate pair)
console.log([..."🙂"].length); // 1 code point
`,
    examples: [
      {
        id: "immutable",
        title: "Index assign is not mutation",
        about: "Primitives do not update in place.",
        language: "javascript",
        code: `"hi"[0]; // "h"
const s = "hi";
// s[0] = "x"; // no effect on primitive
`,
      },
      {
        id: "template",
        title: "Template interpolation",
        about: "Expressions inside `${}`.",
        language: "javascript",
        code: `const n = 2;
console.log(\`count: \${n * 2}\`);
`,
      },
      {
        id: "coercion-plus",
        title: "+ concatenates",
        about: "If either side is a string, `+` concatenates.",
        language: "javascript",
        code: `console.log("1" + 1); // "11"
console.log("1" - 1); // 0
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-boolean",
    title: "Boolean",
    order: 12,
    summary: "`true`/`false` and ToBoolean: which values are falsy.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-type-coercion", "javascript-nullish"],
    oneLiner:
      "Booleans are `true` and `false`. In boolean context, ToBoolean maps a short falsy list to `false`; everything else is truthy.",
    beats: [
      "Falsy: `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, `NaN`.",
      "Truthy surprises: `[]`, `{}`, `\"0\"`, `\"false\"`, `new Boolean(false)` (object).",
      "`Boolean(x)` / `!!x` coerce; `??` does not use truthiness.",
    ],
    intro:
      "`if (value)` is ToBoolean, not “has a value.” That gap is why `??` exists and why `if (count)` drops `0`.",
    why: "Form validation, optional props, and `&&` short-circuit for rendering all depend on the falsy table.",
    concept:
      "The Boolean type has two values. Objects wrapping booleans are truthy even when they wrap `false`. Document.cookie empty string is falsy; empty array is not.",
    how: "`if`, `while`, `?:`, `&&`, `||` all ToBoolean the relevant operand. `||` returns the operand, not a Boolean.",
    usage:
      "Flags, feature toggles. Convert explicitly at API boundaries. Use `??` when `0` and `\"\"` are valid.",
    practices:
      "Do not use `== true`. Prefer `Boolean(x)` when you need an actual boolean. Never `new Boolean`.",
    mistakes:
      "`if (arr)` to mean “has items” (`[]` is truthy). `if (count)` skipping zero. `||` defaulting over `??`.",
    code: `const falsy = [false, 0, -0, 0n, "", null, undefined, NaN];
falsy.forEach((v) => console.log(Boolean(v))); // all false

console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean("0")); // true
`,
    examples: [
      {
        id: "or-operand",
        title: "|| returns an operand",
        about: "Not necessarily true/false.",
        language: "javascript",
        code: `console.log("" || "fallback"); // "fallback"
console.log(0 || 5); // 5
`,
      },
      {
        id: "empty-array",
        title: "Empty array is truthy",
        about: "Check `.length` for emptiness.",
        language: "javascript",
        code: `if ([].length === 0) console.log("empty");
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-null-undefined",
    title: "Null & undefined",
    order: 13,
    summary: "Two empty values: `undefined` (uninitialized / missing) vs `null` (intentional empty).",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-nullish", "javascript-optional-chaining"],
    oneLiner:
      "`undefined` means “no value assigned.” `null` is an assigned empty object-ish sentinel. They are distinct primitives; `==` treats them as equal to each other only.",
    beats: [
      "Uninitialized `let`, missing params, missing properties → `undefined`. JSON `null` stays `null`.",
      "`typeof undefined === \"undefined\"`; `typeof null === \"object\"`.",
      "`null == undefined` is `true`; `null === undefined` is `false`.",
    ],
    intro:
      "APIs mix both. Interviews want a policy: use `undefined` for “not provided,” `null` for “known empty,” and never mix them in `==` checks.",
    why: "Default parameters skip only `undefined`, not `null`. `JSON.stringify` omits `undefined` in objects but emits `null`.",
    concept:
      "`undefined` is the value of the Undefined type. `null` is the Null type—intentional absence of an object. Optional chaining and `??` treat both as nullish.",
    how: "Reading a missing property returns `undefined` (or throws with `?.` no—`?.` returns `undefined`). `void 0` is an old `undefined` idiom. Parameters default when the argument is `undefined`.",
    usage:
      "`null` in JSON and DB “no row.” `undefined` in JS APIs for optional fields. DOM: `getElementById` returns `null`.",
    practices:
      "Pick one empty for your domain and convert at boundaries. Check with `== null` only when you mean both (and know it). Prefer `===` plus explicit cases.",
    mistakes:
      "Default params with `null` still “provided.” `typeof x === \"null\"`. Assuming `JSON.stringify({ a: undefined })` includes `a`.",
    code: `let x;
console.log(x); // undefined

const user = { name: null };
console.log(user.age); // undefined
console.log(null == undefined); // true
console.log(null === undefined); // false
`,
    examples: [
      {
        id: "defaults",
        title: "Default parameters",
        about: "Only `undefined` triggers the default.",
        language: "javascript",
        code: `function f(n = 1) { return n; }
f(); // 1
f(undefined); // 1
f(null); // null
`,
      },
      {
        id: "json",
        title: "JSON drops undefined",
        about: "`null` is kept; `undefined` properties are omitted.",
        language: "javascript",
        code: `JSON.stringify({ a: undefined, b: null });
// '{"b":null}'
`,
      },
      {
        id: "void",
        title: "void 0",
        about: "Always `undefined`, even if someone shadowed the identifier.",
        language: "javascript",
        code: `void 0 === undefined; // true
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-type-coercion",
    title: "Type coercion",
    order: 14,
    summary: "Implicit ToPrimitive / ToNumber / ToString / ToBoolean in operators and `==`.",
    prerequisites: ["javascript-boolean", "javascript-null-undefined"],
    related: ["javascript-equality"],
    isHighYield: true,
    oneLiner:
      "Coercion is the engine converting values to another type for an operator. Prefer explicit conversions; know `==`, `+`, and truthiness tables.",
    beats: [
      "`+` prefers string concat if either side is a string; `-` `*` `/` go to number.",
      "`==` uses Abstract Equality (coercion); `===` does not.",
      "`Boolean`, `Number`, `String`, `!!`, unary `+`, `??` vs `||` are the controls you actually want.",
    ],
    intro:
      "JS is weakly typed at the operator level. Interviews write `[] + {}` and `\"\" == false` to see if you have a model, not a memorized parlor trick.",
    why: "Hidden coercions hide bugs at API boundaries (`\"0\"` vs `0`, `[]` vs `\"\"`).",
    concept:
      "Abstract operations: ToBoolean, ToNumber, ToString, ToPrimitive (valueOf then toString, or the reverse for dates). Objects coerce via those methods. `Symbol` and `BigInt` refuse many mixed operations.",
    how: "`if (x)` → ToBoolean. `x == y` → spec table (null/undefined, then ToNumber, etc.). `x + y` → ToPrimitive both, then string if either is string.",
    usage:
      "Unary `+form.value` is a smell; `Number.parseFloat` is clearer. Template strings stringify. `Boolean(x)` at boundaries.",
    practices:
      "Explicit conversions. `===` by default. Enable ESLint `eqeqeq`. Never rely on `[] == false`.",
    mistakes:
      "`==` with mixed types. `+` for numbers when a string might sneak in. `valueOf` returning another object and surprising ToPrimitive.",
    code: `console.log("5" - 2); // 3
console.log("5" + 2); // "52"
console.log(true + 1); // 2
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
`,
    examples: [
      {
        id: "to-number",
        title: "ToNumber highlights",
        about: "Empty string and null become 0; undefined becomes NaN.",
        language: "javascript",
        code: `Number(""); // 0
Number(null); // 0
Number(undefined); // NaN
Number(false); // 0
`,
      },
      {
        id: "object-hint",
        title: "Object to primitive",
        about: "`valueOf` / `toString` participate.",
        language: "javascript",
        code: `const n = { valueOf() { return 3; } };
console.log(n * 2); // 6
`,
      },
      {
        id: "explicit",
        title: "Prefer explicit",
        about: "Readers should not consult the spec.",
        language: "javascript",
        code: `const n = Number.parseInt(input, 10);
const on = Boolean(flag);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-variables",
    title: "Variables",
    order: 15,
    summary: "Bindings: names that hold values, declared before use in modern JS.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-var-let-const", "javascript-scopes"],
    oneLiner:
      "A variable is a binding: a name mapped to a value in an environment record. You declare it (`let`/`const`/`var`) then assign.",
    beats: [
      "Declaration creates the binding; initialization stores the first value (`const` requires it).",
      "Assignment (`=`) retargets a `let`/`var` binding; `const` forbids it.",
      "Undeclared assignment in sloppy mode creates a global; strict mode throws.",
    ],
    intro:
      "Before `var` vs `let`, interviews check that you know a name is not the value—especially with objects.",
    why: "Shadowing, globals, and “is this declared?” TDZ errors all start from bindings.",
    concept:
      "Environment records live on lexical environments (scope). Bindings are mutable or immutable (`const`). The value may still be a mutable object.",
    how: "At runtime, resolving an identifier walks the scope chain. Modules and functions get their own records. `globalThis` is the global object.",
    usage:
      "Name values you reuse. Destructure to create several bindings at once. Avoid implied globals.",
    practices:
      "Always declare. Prefer `const`, then `let`. Use modules (strict by default) or `'use strict'`.",
    mistakes:
      "Using a name before `let`/`const` (TDZ). Assigning to an undeclared identifier. Thinking two names with the same value share an object when they are primitives.",
    code: `const pi = 3.14;
let count = 0;
count = 1;

const user = { role: "dev" };
user.role = "lead"; // binding unchanged
`,
    examples: [
      {
        id: "declare-assign",
        title: "Declare then assign",
        about: "`let` can start empty; `const` cannot.",
        language: "javascript",
        code: `let x;
x = 1;
const y = 2;
`,
      },
      {
        id: "destructure",
        title: "Destructuring bindings",
        about: "Creates new names from an object or array.",
        language: "javascript",
        code: `const { id, name } = user;
const [first] = list;
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-var-let-const",
    title: "Containers — var, let, const",
    order: 16,
    summary: "Function vs block scope, hoisting, TDZ, and why `const` is the default.",
    prerequisites: ["javascript-variables"],
    related: ["javascript-scopes"],
    isHighYield: true,
    oneLiner:
      "`var` is function-scoped and hoisted as `undefined`. `let`/`const` are block-scoped and exist in the temporal dead zone until initialized. `const` cannot be reassigned.",
    beats: [
      "`var` ignores block `{}` except functions; `let`/`const` honor blocks (for, if, {}).",
      "TDZ: access before `let`/`const` initialization throws `ReferenceError`.",
      "`const` is a constant binding, not a frozen value. Redeclaring `let`/`const` in the same scope throws.",
    ],
    intro:
      "This is one of the highest-yield JS interview clusters. Answer with scope, hoisting, TDZ, and reassignment—then mention loops and closures.",
    why: "`var` in loops with `setTimeout` shares one binding. `let` in `for` creates a binding per iteration.",
    concept:
      "Hoisting: `var` declarations are instantiated at the top of the function with `undefined`. `let`/`const` are instantiated at the top of the block but uninitialized until the line runs. `const` requires an initializer.",
    how: "Engine creates bindings while instantiating the scope. For `var`, assignment later updates the same binding. For `let` in `for (let i = 0; ...)`, each iteration gets a new `i`.",
    usage:
      "`const` by default. `let` when you reassign. Never `var` in new code. `var` still appears in old bundles and interview questions.",
    practices:
      "One declaration style per file. Do not rely on hoisted `var`. Use block scope to limit lifetime.",
    mistakes:
      "`const` means immutable object. Using `var` and expecting block scope. Reading `let` above its declaration. Redeclaring `let` in the same block.",
    code: `function demo() {
  console.log(a); // undefined — var hoisted
  // console.log(b); // ReferenceError — TDZ
  var a = 1;
  let b = 2;
  const c = 3;
}
`,
    examples: [
      {
        id: "tdz",
        title: "Temporal dead zone",
        about: "The binding exists but is unusable until initialized.",
        language: "javascript",
        code: `{
  // console.log(x); // ReferenceError
  let x = 1;
}
`,
      },
      {
        id: "block-var",
        title: "var leaks from blocks",
        about: "`if` does not scope `var`.",
        language: "javascript",
        code: `if (true) {
  var leaked = 1;
}
console.log(leaked); // 1
`,
      },
      {
        id: "for-let",
        title: "let in for loops",
        about: "Each iteration has its own binding—closures capture the right `i`.",
        language: "javascript",
        code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2  — with var, 3 3 3
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-scopes",
    title: "Variable scopes",
    order: 17,
    summary: "Global, function, block, and module lexical environments; scope chain.",
    prerequisites: ["javascript-var-let-const"],
    related: ["javascript-variables"],
    isHighYield: true,
    oneLiner:
      "Scope is where a binding is visible. JS is lexically scoped: nested functions see outer bindings via the scope chain, determined by where the function is written, not where it is called.",
    beats: [
      "Kinds: global, function (`var`/params), block (`let`/`const`/`class`), module (top-level `import`/`const`).",
      "Inner scopes can read outer bindings; shadowing hides the outer name.",
      "Not dynamic scope: `this` is a separate rule; closures close over lexical scope.",
    ],
    intro:
      "If you can draw the scope chain for a nested function, closures and modules follow. Interviews draw boxes around `{}` and functions.",
    why: "Leaked `var`, accidental globals, and “why is this `undefined`” in callbacks are scope bugs.",
    concept:
      "Lexical environment = environment record + outer pointer. Identifier resolution walks outward until global (or ReferenceError). Modules do not put top-level bindings on `globalThis`.",
    how: "At call time, a function’s environment is already closed over. Eval and `with` (sloppy) can add dynamic bindings—avoid both.",
    usage:
      "IIFE for old `var` isolation. Blocks for `let`. Modules for file-level privacy. Closures for factories and hooks.",
    practices:
      "Minimize global bindings. Shadow on purpose, not by accident. Prefer modules over attaching to `window`.",
    mistakes:
      "Confusing scope with `this`. Expecting block scope from `var`. Looking up a name on `globalThis` that was declared in a module.",
    code: `const outer = 1;
function f() {
  const inner = 2;
  function g() {
    return outer + inner;
  }
  return g;
}
console.log(f()()); // 3
`,
    examples: [
      {
        id: "shadow",
        title: "Shadowing",
        about: "Inner `const x` hides outer `x`.",
        language: "javascript",
        code: `const x = 1;
{
  const x = 2;
  console.log(x); // 2
}
console.log(x); // 1
`,
      },
      {
        id: "module-global",
        title: "Module vs global",
        about: "Top-level `const` in a module is not `window.x`.",
        language: "javascript",
        code: `const x = 1;
console.log(globalThis.x); // undefined in a module
`,
      },
      {
        id: "lexical",
        title: "Lexical, not call-site",
        about: "Where `h` is defined decides `x`, not who calls `h`.",
        language: "javascript",
        code: `function make() {
  const x = "inner";
  return function h() { return x; };
}
const h = make();
const x = "outer";
console.log(h()); // "inner"
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-comparison",
    title: "Comparison operators",
    order: 18,
    summary: "`<` `>` `<=` `>=` and how strings vs numbers compare.",
    prerequisites: ["javascript-primitives"],
    related: ["javascript-equality"],
    oneLiner:
      "Relational operators (`<`, `>`, `<=`, `>=`) coerce with ToPrimitive/ToNumber unless both sides are strings, in which case they compare UTF-16 in lexicographic order.",
    beats: [
      "`\"10\" < \"9\"` is true (string compare: `\"1\"` vs `\"9\"`). `\"10\" < 9` is false (numeric).",
      "`NaN` compared with anything (including itself) is false for `<`/`>`.",
      "`localeCompare` for human language order; relational `<` is not locale-aware.",
    ],
    intro:
      "Sorting and range checks look like math until a string sneaks in. Know the string vs number fork.",
    why: "Table sort bugs and `min`/`max` on mixed types come from this coercion.",
    concept:
      "If both values are strings, compare by code units. Otherwise ToNumber both (after ToPrimitive). `undefined` becomes `NaN`, so `undefined < 1` is false.",
    how: "Abstract Relational Comparison in the spec. `<=` is `!(>)` with a NaN caveat—do not over-memorize; know NaN and strings.",
    usage:
      "Numbers for magnitudes. `localeCompare` or `Intl.Collator` for names. Explicit `Number()` before comparing user input.",
    practices:
      "Coerce once at the edge. Do not compare objects with `<` (ToPrimitive can surprise). Use `Number.isNaN` before ordering.",
    mistakes:
      "Sorting strings that look like numbers. Assuming `null < 1` is false (`null` becomes `0`). Comparing dates as objects without `getTime`.",
    code: `console.log("10" < "9"); // true  — lexicographic
console.log("10" < 9); // false — numeric 10 < 9
console.log(null < 1); // true  — 0 < 1
console.log(NaN < 1); // false
`,
    examples: [
      {
        id: "lex",
        title: "Lexicographic strings",
        about: "Dictionary order, not numeric.",
        language: "javascript",
        code: `["10", "9", "2"].sort();
// ["10", "2", "9"]
`,
      },
      {
        id: "numeric-sort",
        title: "Numeric sort",
        about: "Pass a comparator.",
        language: "javascript",
        code: `[10, 9, 2].sort((a, b) => a - b);
`,
      },
      {
        id: "locale",
        title: "localeCompare",
        about: "Language-aware order.",
        language: "javascript",
        code: `"ä".localeCompare("z", "de");
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-equality",
    title: "Strict equal vs loose equal",
    order: 19,
    summary: "`===` / `!==` vs `==` / `!=`: identity of type vs Abstract Equality.",
    prerequisites: ["javascript-comparison", "javascript-type-coercion"],
    related: ["javascript-nullish"],
    isHighYield: true,
    oneLiner:
      "`===` is SameValueNonNumeric except that `NaN !== NaN` and `+0 === -0`. `==` coerces using the Abstract Equality table—avoid it except `== null` for nullish.",
    beats: [
      "Same type: `===` compares values (`Object` identity for objects). Different types: `===` is false; `==` may coerce.",
      "Highlights: `null == undefined`; `0 == false`; `\"\" == false`; `\"0\" == false` (both ToNumber to 0). Objects: `[] == false` and `[] == \"\"`.",
      "`Object.is` distinguishes `NaN` and `-0`. Use `===` in code; recite `==` only to explain bugs.",
    ],
    intro:
      "If you remember one table, remember loose equality’s coercions. Production code should almost never need it.",
    why: "`if (x == false)` and `if (x == 0)` swallow more than you think. Interviewers pick three rows from the table.",
    concept:
      "Strict Equality Comparison: if types differ, false; else compare. Abstract Equality: if types differ, ToNumber/ToPrimitive per spec (null/undefined special-cased). Document `== null` as “null or undefined.”",
    how: "Engine follows ECMA-262. You do not need every row live; you need null/undefined, boolean/number/string, and object-vs-primitive (`valueOf`).",
    usage:
      "`===` everywhere. `== null` as a concise nullish check if the team agrees. `Object.is` for NaN maps/keys.",
    practices:
      "ESLint `eqeqeq: always` with optional `null` exception. Never `== true`. Test both `null` and `undefined` if you did not use `== null`.",
    mistakes:
      "`NaN === NaN`. `[] == ![]` parlor tricks without explaining ToNumber. Using `==` with `document.all` (legacy object).",
    code: `console.log(0 === false); // false
console.log(0 == false); // true
console.log("" == false); // true
console.log("0" == false); // true
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
`,
    examples: [
      {
        id: "array-loose",
        title: "Arrays and ==",
        about: "`[]` ToPrimitive is `\"\"`; `==` then ToNumber.",
        language: "javascript",
        code: `[] == false; // true
[] == ""; // true
[] == 0; // true
[1] == 1; // true
`,
      },
      {
        id: "object-is",
        title: "Object.is",
        about: "SameValue: NaN equals NaN; +0 is not -0.",
        language: "javascript",
        code: `Object.is(NaN, NaN); // true
Object.is(0, -0); // false
`,
      },
      {
        id: "nullish-eq",
        title: "x == null",
        about: "True only for `null` and `undefined`.",
        language: "javascript",
        code: `function missing(x) {
  return x == null;
}
missing(0); // false
missing(""); // false
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-nullish",
    title: "Nullish coalescing",
    order: 20,
    summary: "`??` defaults only for `null` and `undefined`, unlike `||`.",
    prerequisites: ["javascript-null-undefined", "javascript-boolean"],
    related: ["javascript-optional-chaining", "javascript-equality"],
    isHighYield: true,
    oneLiner:
      "`a ?? b` evaluates to `a` unless `a` is `null` or `undefined`, in which case it is `b`. `||` uses truthiness and will skip `0` and `\"\"`.",
    beats: [
      "Nullish = `null` or `undefined` only—not `0`, `\"\"`, `false`, `NaN`.",
      "Cannot mix `??` with `&&`/`||` without parentheses (syntax error).",
      "Often paired with `?.`: `opts?.port ?? 3000`.",
    ],
    intro:
      "`||` as a default is the classic bug: port `0` or count `0` becomes the fallback. `??` is the fix.",
    why: "Config objects, form fields, and API responses use `0` and empty string as real values.",
    concept:
      "Short-circuit: if left is not nullish, right is not evaluated. Assignment `??=` writes only when the left is nullish.",
    how: "Runtime check is `=== null || === undefined` (SameValue as nullish), then return the other operand.",
    usage:
      "Default arguments when `null` might be passed (defaults only catch `undefined`). Merge options: `timeout ?? 5000`.",
    practices:
      "Prefer `??` for defaults. Keep `||` when you truly want “any falsy → fallback.” Parenthesize mixed logicals.",
    mistakes:
      "Using `||` for numbers that can be 0. Mixing `??` and `||` without `()`. Thinking `??` treats `NaN` as nullish (it does not).",
    code: `const port = 0;
console.log(port || 3000); // 3000 — wrong if 0 is valid
console.log(port ?? 3000); // 0

console.log("" || "n/a"); // "n/a"
console.log("" ?? "n/a"); // ""

console.log(NaN ?? 1); // NaN
`,
    examples: [
      {
        id: "assign",
        title: "??=",
        about: "Assign only if nullish.",
        language: "javascript",
        code: `const opts = { n: 0 };
opts.n ??= 10;
console.log(opts.n); // 0
opts.m ??= 10;
console.log(opts.m); // 10
`,
      },
      {
        id: "parens",
        title: "Parentheses required",
        about: "`a ?? b || c` is a SyntaxError.",
        language: "javascript",
        code: `const x = (a ?? b) || c;
const y = a ?? (b || c);
`,
      },
      {
        id: "with-optional",
        title: "With optional chaining",
        about: "Missing path becomes undefined, then `??` defaults.",
        language: "javascript",
        code: `const host = config?.db?.host ?? "localhost";
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-optional-chaining",
    title: "Optional chaining",
    order: 21,
    summary: "`?.` short-circuits to `undefined` when the base is nullish.",
    prerequisites: ["javascript-nullish"],
    related: ["javascript-null-undefined"],
    isHighYield: true,
    oneLiner:
      "`obj?.prop`, `obj?.[key]`, and `fn?.()` access or call only if the base is not `null`/`undefined`; otherwise the expression is `undefined` (the rest of the chain is skipped).",
    beats: [
      "Stops only on `null`/`undefined`, not on `0` or `\"\"`. Those still get properties.",
      "`a?.b.c` still throws if `a.b` is nullish—you need `a?.b?.c`.",
      "`delete obj?.prop` is allowed; assigning to `obj?.prop = x` is a SyntaxError.",
    ],
    intro:
      "Deep graphs and optional callbacks used to need `&&` ladders. `?.` is the readable version—and a frequent live-coding ask.",
    why: "API JSON, DOM (`el?.textContent`), and optional plugin functions (`hooks.onSave?.()`).",
    concept:
      "If the value before `?.` is nullish, return `undefined` and do not evaluate further. Otherwise perform normal property get, index, or call. `?.()` still throws if the value is non-nullish but not callable.",
    how: "Desugars roughly to a nullish check plus GetValue/Call. Short-circuit does not evaluate arguments of a skipped call.",
    usage:
      "User-shaped JSON. Feature detection on objects. Array index `arr?.[0]`. Methods `user.getName?.()`.",
    practices:
      "Chain `?.` at every uncertain link. Combine with `??` for defaults. Do not hide programming errors—if `user` must exist, do not write `user?.id` and ignore undefined.",
    mistakes:
      "`data?.items[0]` when `items` can be missing (need `data?.items?.[0]`). `obj?.prop = 1`. Calling `?.` on a non-function number. Using `?.` so much that typos become silent `undefined`.",
    code: `const user = { profile: null };
console.log(user.profile?.city); // undefined — no throw
console.log(user.profile?.city ?? "n/a"); // "n/a"

const cb = undefined;
cb?.(); // no throw

const n = 1;
// n?.(); // TypeError — 1 is not nullish, not callable
`,
    examples: [
      {
        id: "deep",
        title: "Every link",
        about: "One `?.` only guards that one base.",
        language: "javascript",
        code: `order?.customer?.address?.zip;
`,
      },
      {
        id: "call",
        title: "Optional call",
        about: "Skip if missing; still TypeError if present but not a function.",
        language: "javascript",
        code: `logger?.info?.("boot");
`,
      },
      {
        id: "index",
        title: "Optional index",
        about: "Useful for maybe-arrays.",
        language: "javascript",
        code: `rows?.[0]?.id ?? null;
`,
      },
    ],
  }),
];
