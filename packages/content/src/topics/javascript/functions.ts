import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptFunctionTopics: Topic[] = [
  jsTopic({
    slug: "javascript-control-flow",
    title: "Control flow",
    order: 34,
    summary: "if, else, switch, try/catch, and how statements choose the next instruction.",
    prerequisites: ["javascript-comparison"],
    related: ["javascript-loops", "javascript-return"],
    oneLiner:
      "Control flow is which statement runs next: branching (`if`/`switch`), jumps (`return`/`break`/`continue`/`throw`), and `try`/`catch`/`finally`.",
    beats: [
      "`if` uses ToBoolean. `switch` uses strict equality (`===`) against the discriminant.",
      "`try`/`catch` only catch throw completions. `finally` runs on the way out, including return.",
      "No block → only the next statement is gated. Always use braces in interviews.",
    ],
    intro: "Interviews start with truthiness and `switch` fall-through before they ask about loops.",
    why: "Off-by-boolean bugs and swallowed errors in `catch` hide real failures.",
    concept:
      "Statements complete normally or abruptly (`return`, `throw`, `break`). Abrupt completion skips the rest of the block unless `finally` intervenes.",
    how: "`if (cond) A else B`. `switch (x) { case a: ...; break; default: }`. Without `break`, cases fall through. `catch` binds the thrown value.",
    usage: "Guards at the top of functions. `switch` for enums. `try` around boundaries (JSON.parse, await).",
    practices: "Prefer early return over deep nesting. Do not catch only to rethrow without adding context unless you must. Exhaust `switch` with `default`.",
    mistakes: "`switch` with `==` expectations. `catch (e) {}` empty. Assigning in `if (x = y)`.",
    code: `function label(n) {
  if (n < 0) return "neg";
  switch (n) {
    case 0:
      return "zero";
    case 1:
    case 2:
      return "small";
    default:
      return "big";
  }
}
try {
  JSON.parse("{");
} catch {
  console.log("bad json");
}
`,
    examples: [
      {
        id: "truthiness",
        title: "if uses truthiness",
        about: "`0`, `\"\"`, `null`, `undefined`, `NaN` are falsy.",
        language: "javascript",
        code: `if (0) console.log("no");
if ("0") console.log("yes");
`,
      },
      {
        id: "finally-return",
        title: "finally can override return",
        about: "A return in finally wins.",
        language: "javascript",
        code: `function f() {
  try { return 1; }
  finally { return 2; }
}
console.log(f()); // 2
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-loops",
    title: "Loops",
    order: 35,
    summary: "while, do...while, for — the classic iteration statements.",
    prerequisites: ["javascript-control-flow"],
    related: ["javascript-for-of", "javascript-for-in"],
    oneLiner:
      "`while`/`do...while`/`for` repeat a body until a condition is false. `break` exits; `continue` skips to the next iteration.",
    beats: [
      "`for (init; test; update)` runs init once, then test → body → update.",
      "`do...while` runs the body at least once.",
      "`let` in the `for` head is per-iteration binding — classic closure interview with `var` vs `let`.",
    ],
    intro: "Know the three classic loops before `for...of`. Interviewers still use `var` in a `for` to trap you.",
    why: "Off-by-one, infinite loops, and capturing the loop index in callbacks.",
    concept:
      "A loop is a test plus a body plus an optional update. Labels allow `break outer`.",
    how: "`while (t) s`. `do s while (t)`. `for (;;)` is infinite. `continue` in `for` still runs the update.",
    usage: "Index-based work, retry until condition, numeric ranges when you need the index.",
    practices: "Prefer `for...of` for arrays unless you need the index. Bound your loops. Do not mutate the list you iterate without a plan.",
    mistakes: "`var i` shared across iterations in async callbacks. Forgetting `i++`. `continue` skipping the update in `while` (you must increment yourself).",
    code: `for (let i = 0; i < 3; i += 1) {
  console.log(i);
}
let n = 3;
while (n) {
  n -= 1;
}
do {
  n += 1;
} while (n < 1);
`,
    examples: [
      {
        id: "let-vs-var",
        title: "let per iteration vs var",
        about: "Closures over `var i` see the final value.",
        language: "javascript",
        code: `const fns = [];
for (var i = 0; i < 3; i += 1) fns.push(() => i);
console.log(fns[0]()); // 3

const gs = [];
for (let j = 0; j < 3; j += 1) gs.push(() => j);
console.log(gs[0]()); // 0
`,
      },
      {
        id: "continue-for",
        title: "continue still updates",
        about: "The third clause of for runs after continue.",
        language: "javascript",
        code: `let seen = "";
for (let i = 0; i < 3; i += 1) {
  if (i === 1) continue;
  seen += i;
}
console.log(seen); // "02"
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-for-of",
    title: "for...of",
    order: 36,
    summary: "Iterate values of an iterable (Array, String, Map, Set, generators).",
    prerequisites: ["javascript-loops"],
    related: ["javascript-array", "javascript-keyed-collections"],
    oneLiner:
      "`for (const x of iterable)` pulls values via `iterable[Symbol.iterator]()`. Arrays yield elements; Maps yield `[key, value]` pairs.",
    beats: [
      "Works on anything implementing the iterable protocol — not on plain objects unless you add an iterator.",
      "Array holes yield `undefined`. Strings yield Unicode code points (via the string iterator).",
      "`for await...of` is for async iterables — different topic; do not confuse with `for...of`.",
    ],
    intro: "This is the default loop for collections in modern JS.",
    why: "Interviewers contrast it with `for...in` (keys vs values, inherited vs iterator).",
    concept:
      "An iterator is `{ next() { return { value, done } } }`. `for...of` calls `next` until `done`.",
    how: "Get iterator, loop: if `done` break, else bind `value` and run body. `break` calls `return` on the iterator if present (cleanup).",
    usage: "Arrays, Sets, Maps, NodeList (modern), arguments (array-like but not iterable in sloppy `arguments` — ES2015 arguments is iterable).",
    practices: "Use `const` in the binding. Destructure Map entries `for (const [k, v] of map)`.",
    mistakes: "`for...of` on a plain `{}` throws. Using `for...of` when you needed indexes (`entries()`).",
    code: `for (const n of [10, 20]) console.log(n);
for (const ch of "hi") console.log(ch);
const m = new Map([["a", 1]]);
for (const [k, v] of m) console.log(k, v);
`,
    examples: [
      {
        id: "plain-object",
        title: "Plain objects are not iterable",
        about: "TypeError unless you define Symbol.iterator.",
        language: "javascript",
        code: `try {
  for (const x of { a: 1 }) {}
} catch (e) {
  console.log(e.name); // TypeError
}
`,
      },
      {
        id: "array-holes",
        title: "Holes become undefined",
        about: "Unlike forEach, for-of visits holes.",
        language: "javascript",
        code: `const out = [];
for (const x of [1, , 3]) out.push(x);
console.log(out); // [1, undefined, 3]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-for-in",
    title: "for...in",
    order: 37,
    summary: "Enumerate enumerable string keys on an object and its prototype chain.",
    prerequisites: ["javascript-loops", "javascript-prototypal-inheritance"],
    related: ["javascript-prototype-chaining", "javascript-object"],
    oneLiner:
      "`for (const k in obj)` visits enumerable string keys, including inherited ones. It does not visit symbols. Filter with `Object.hasOwn` if you want own keys only.",
    beats: [
      "Order is not fully specified historically; do not use `for...in` for arrays.",
      "Inherited enumerable properties appear unless you skip them with `Object.hasOwn(obj, k)` (or `Object.keys` instead).",
      "`Object.keys` / `Object.entries` are own enumerable only — usually what you wanted.",
    ],
    intro: "This loop is about keys on the prototype chain, not array indexes.",
    why: "The classic bug: iterating an array and picking up `Array.prototype` junk if someone made it enumerable — or inherited model fields.",
    concept:
      "Enumerability is a property attribute. Prototype methods are usually non-enumerable. Data you assign on a prototype as a plain field is enumerable by default.",
    how: "Walk the chain, for each enumerable string key, run the body. `hasOwn` tests the current object only.",
    usage: "Rare. Prefer `Object.keys`/`entries`. Use `for...in` only when inherited enumerable keys are intentional.",
    practices: "Never `for...in` arrays. Always `hasOwn` if you must use it. Prefer `Object.keys`.",
    mistakes: "Assuming it skips prototypes. Using it for Maps. Depending on key order.",
    code: `const proto = { inherited: 1 };
const obj = Object.create(proto);
obj.own = 2;
for (const k in obj) {
  console.log(k, Object.hasOwn(obj, k));
}
// "own" true, "inherited" false
`,
    examples: [
      {
        id: "hasown",
        title: "Filter inherited keys",
        about: "Same loop, own only.",
        language: "javascript",
        code: `const proto = { a: 1 };
const o = Object.create(proto);
o.b = 2;
const own = [];
for (const k in o) {
  if (Object.hasOwn(o, k)) own.push(k);
}
console.log(own); // ["b"]
`,
      },
      {
        id: "object-keys",
        title: "Object.keys vs for-in",
        about: "keys is own enumerable only.",
        language: "javascript",
        code: `const proto = { a: 1 };
const o = Object.create(proto);
o.b = 2;
console.log(Object.keys(o)); // ["b"]
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-functions",
    title: "Functions",
    order: 38,
    summary: "Declarations, first-class values, parameters, and the callable object model.",
    prerequisites: ["javascript-control-flow"],
    related: ["javascript-function-expressions", "javascript-this", "javascript-closures"],
    isHighYield: true,
    oneLiner:
      "Functions are objects you can call. A declaration `function f() {}` is hoisted (the binding exists for the whole scope). Parameters are local bindings.",
    beats: [
      "Functions are first-class: pass them, return them, store them.",
      "Declarations hoist; `const f = function () {}` does not (TDZ).",
      "`arguments` is array-like on non-arrow functions; prefer rest `...args`.",
    ],
    intro: "Everything else in this module is a specialization of “functions are values with a call protocol”.",
    why: "Callbacks, methods, and modules are all functions. Interviews test hoisting and parameter defaults.",
    concept:
      "A function has a body, a parameter list, and an environment. Calling creates an execution context and binds arguments.",
    how: "`function f(a, b = 1, ...rest) {}`. Defaults apply when the arg is `undefined` (including omitted). Extra args are ignored unless rest/arguments.",
    usage: "Named utilities, event handlers, module exports. Keep them small and explicit.",
    practices: "Name functions for stack traces. Prefer rest over `arguments`. Default only for `undefined`.",
    mistakes: "Relying on hoisting of `const fn = ...`. Mutating `arguments` in sloppy mode. Forgetting defaults do not run for `null`.",
    code: `function add(a, b = 0) {
  return a + b;
}
console.log(add(1)); // 1
const ops = { add };
console.log(ops.add(2, 3));
`,
    examples: [
      {
        id: "hoist",
        title: "Declaration hoist",
        about: "You can call before the line.",
        language: "javascript",
        code: `console.log(f());
function f() { return 1; }
`,
      },
      {
        id: "default-undefined",
        title: "Defaults and undefined",
        about: "null does not trigger the default.",
        language: "javascript",
        code: `function f(x = 1) { return x; }
console.log(f(undefined), f(null)); // 1, null
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-function-expressions",
    title: "Function expressions",
    order: 39,
    summary: "Functions as values: anonymous or named expressions, not hoisted declarations.",
    prerequisites: ["javascript-functions"],
    related: ["javascript-anonymous", "javascript-iife", "javascript-arrow-functions"],
    oneLiner:
      "A function expression is `function` (optional name) used as a value. The binding is not hoisted like a declaration.",
    beats: [
      "`const f = function () {}` — `f` is in TDZ until the line runs.",
      "Named expression `function foo() {}` as a value: `foo` is local to the function (recursion, stack name).",
      "Not `new`-able in the same casual way as declarations when you later switch to arrows.",
    ],
    intro: "Expressions are how you pass callbacks and lazily define functions.",
    why: "“Cannot access before initialization” vs declaration hoist is a junior filter.",
    concept:
      "The `function` keyword in expression position produces a function object. An optional name is not added to the outer scope.",
    how: "Evaluate the expression, get a function, assign or pass it. Named expressions help recursion without outer binding.",
    usage: "Callbacks, conditional function choice, methods as values, IIFE.",
    practices: "Use names on expressions for stack traces. Prefer declarations for top-level utilities.",
    mistakes: "Calling the expression binding before init. Assuming the inner name leaks out.",
    code: `const greet = function greet(name) {
  return "hi " + name;
};
const fns = [function () { return 1; }];
console.log(greet("Ada"), fns[0]());
`,
    examples: [
      {
        id: "tdz",
        title: "Expression TDZ",
        about: "Unlike declarations.",
        language: "javascript",
        code: `try {
  f();
} catch (e) {
  console.log(e.name);
}
const f = function () { return 1; };
`,
      },
      {
        id: "inner-name",
        title: "Inner name does not leak",
        about: "Useful for recursion.",
        language: "javascript",
        code: `const fact = function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
};
console.log(fact(4));
console.log(typeof f); // "undefined" in this scope
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-return",
    title: "return",
    order: 40,
    summary: "Completion that exits the function with a value (or undefined).",
    prerequisites: ["javascript-functions"],
    related: ["javascript-control-flow", "javascript-arrow-functions"],
    oneLiner:
      "`return expr` leaves the current function with that value. Bare `return` or falling off the end yields `undefined`.",
    beats: [
      "ASI: `return` newline `obj` returns `undefined` — the object is a separate statement.",
      "Arrow concise body `() => value` is an implicit return. Block body needs `return`.",
      "`finally` can replace a pending return value.",
    ],
    intro: "Return is the function’s output channel. Interviewers love the newline ASI trap.",
    why: "Silent `undefined` from ASI or missing return in a map callback.",
    concept:
      "Return is an abrupt completion. Nested functions return only from the inner function, not the outer.",
    how: "Evaluate `expr`, pop the call, yield the value to the caller. Generators use `return` to close; that is a later topic.",
    usage: "Guard clauses. Map/filter callbacks. Explicit `undefined` when documenting “no value”.",
    practices: "Never break `return` from `{` across lines without wrapping in parens. Prefer early returns.",
    mistakes: "`return\\n{ ok: true }` → undefined. Forgetting return in `array.map`. Returning inside `forEach` does not stop the outer function unless you return from a nested function — `forEach` ignores callback returns.",
    code: `function ok() {
  return { ok: true };
}
function broken() {
  return
  { ok: true };
}
console.log(ok(), broken()); // {ok:true}, undefined
`,
    examples: [
      {
        id: "implicit-undefined",
        title: "Fall off the end",
        about: "No return → undefined.",
        language: "javascript",
        code: `function f() { 1 + 1; }
console.log(f()); // undefined
`,
      },
      {
        id: "arrow-return",
        title: "Arrow block vs concise",
        about: "Braces require return.",
        language: "javascript",
        code: `const a = () => 1;
const b = () => { 1; };
console.log(a(), b()); // 1, undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-this",
    title: "this",
    order: 41,
    summary: "How this is bound: default, implicit, explicit, new — not the function’s definition site (except arrows).",
    prerequisites: ["javascript-functions"],
    related: ["javascript-arrow-functions", "javascript-call-bind-apply", "javascript-method-vs-function"],
    isHighYield: true,
    oneLiner:
      "For ordinary functions, `this` is set by the call site: `fn()` default, `obj.fn()` implicit, `fn.call(obj)` explicit, `new Fn()` the new instance. Arrows use lexical `this`.",
    beats: [
      "Default: `undefined` in strict mode (modules are strict), `globalThis` in sloppy non-strict scripts.",
      "Implicit: the object left of the dot at the call. Extracting `const f = obj.fn; f()` loses it.",
      "Explicit: `call`/`apply`/`bind` override (except arrows). `new` binds `this` to the constructed object.",
    ],
    intro: "`this` is not “the object the function was defined on”. It is a binding filled at call time — unless the function is an arrow.",
    why: "Detached methods, React handlers, and `setTimeout(obj.method)` are the most common production `this` bugs.",
    concept:
      "Ordinary functions have a `this` slot. The caller fills it. Bound functions (`bind`) store a `this` and ignore later implicit/explicit (except `new` on bound functions has special rules).",
    how: "`obj.method()` → this = obj. `obj.method.call(other)` → this = other. `new C()` → this = newly allocated object. `fn()` → undefined/global.",
    usage: "Methods that read instance fields. Avoid `this` in modules; use closures or explicit arguments.",
    practices: "Pass `this` explicitly or `.bind` when giving methods as callbacks. Prefer arrows for lexical capture. Use class fields for bound methods if needed.",
    mistakes: "Assuming `this` in a callback is the outer object. Using `this` in a module top-level expecting `window`. Combining arrow methods when you needed dynamic `this`.",
    code: `const api = {
  token: "abc",
  read() { return this.token; },
};
console.log(api.read()); // "abc"
const detached = api.read;
console.log(detached()); // undefined (strict)
console.log(api.read.call({ token: "x" })); // "x"
`,
    examples: [
      {
        id: "new-this",
        title: "new binds this",
        about: "Constructor this is the instance.",
        language: "javascript",
        code: `function User(name) {
  this.name = name;
}
const u = new User("Ada");
console.log(u.name);
`,
      },
      {
        id: "nested-function",
        title: "Inner function loses this",
        about: "Call site of the inner fn is default.",
        language: "javascript",
        code: `"use strict";
const obj = {
  n: 1,
  outer() {
    function inner() { return this; }
    return inner();
  },
};
console.log(obj.outer()); // undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-arrow-functions",
    title: "Arrow functions",
    order: 42,
    summary: "Lexical this, no arguments, no prototype, not constructable.",
    prerequisites: ["javascript-this", "javascript-function-expressions"],
    related: ["javascript-callbacks", "javascript-return"],
    isHighYield: true,
    oneLiner:
      "Arrows close over `this` (and `arguments`/`new.target`) from the enclosing scope. They cannot be used with `new` and have no `prototype`.",
    beats: [
      "`this` is lexical — `call`/`apply`/`bind` cannot rebind `this` (bind still works for arguments).",
      "No own `arguments`; use rest. Concise body returns the expression; block body does not.",
      "Bad as dynamic object methods that need the receiver; good as callbacks inside methods.",
    ],
    intro: "Arrows exist to fix `this` in nested functions and to shorten callbacks — not to replace all `function`.",
    why: "Choosing arrow vs method is a standard interview. Wrong choice either loses `this` or captures the wrong `this`.",
    concept:
      "An arrow function does not define a `this` binding. Evaluating `this` inside it is looking up the enclosing environment.",
    how: "`(a, b) => a + b`. `async` arrows exist. You cannot put `yield` in an arrow (not generators).",
    usage: "Array methods, promises, inline handlers that should see the outer `this`.",
    practices: "Use `function` for constructors and prototype methods. Use arrows for short callbacks. Wrap objects in parens `() => ({ ok: true })`.",
    mistakes: "`new (() => {})()`. Object method as arrow when you needed the receiver. `() => { ok: true }` labeled statement, not an object.",
    code: `const api = {
  token: "abc",
  read() {
    const delayed = () => this.token;
    return delayed();
  },
};
console.log(api.read()); // "abc"
const unbound = () => this;
console.log(unbound.call({ x: 1 })); // still outer this
`,
    examples: [
      {
        id: "object-arrow",
        title: "Arrow as object method",
        about: "this is not the object.",
        language: "javascript",
        code: `"use strict";
const obj = {
  n: 1,
  f: () => this,
};
console.log(obj.f()); // undefined (module/strict outer)
`,
      },
      {
        id: "implicit-object",
        title: "Return an object",
        about: "Parentheses required.",
        language: "javascript",
        code: `const ok = () => ({ ok: true });
const nope = () => { ok: true };
console.log(ok(), nope()); // {ok:true}, undefined
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-anonymous",
    title: "Anonymous functions",
    order: 43,
    summary: "Functions without a name — stack traces, recursion, and inferred names.",
    prerequisites: ["javascript-function-expressions"],
    related: ["javascript-arrow-functions", "javascript-callbacks"],
    oneLiner:
      "An anonymous function has no binding name. Engines often infer a name from the assigned variable (`const f = function () {}` → name `\"f\"`).",
    beats: [
      "True anonymity: `arr.map(function () {})` may show as `anonymous` on the stack.",
      "Named expressions are better for recursion and debugging.",
      "Arrows are always anonymous in syntax; they still get inferred names from assignment.",
    ],
    intro: "Anonymous is a naming property, not a different runtime type.",
    why: "Unreadable stack traces and “how does this recurse?”",
    concept: "`Function.prototype.name` is often inferred. It is not a reliable security boundary.",
    how: "Omit the identifier after `function`. Or use an arrow. Assign to a const to infer a name.",
    usage: "One-off callbacks. Prefer names once the callback grows.",
    practices: "Name anything that can throw. Use named expressions for recursive helpers.",
    mistakes: "Assuming `name` is empty after `const f = function () {}`. Recursing an anonymous function without a binding.",
    code: `const named = function () {};
console.log(named.name); // "named"
console.log((function () {}).name); // ""
console.log((() => {}).name); // ""
`,
    examples: [
      {
        id: "map-anon",
        title: "Callback without a name",
        about: "Harder stacks.",
        language: "javascript",
        code: `[1].map(function (n) { return n; });
[1].map(function double(n) { return n * 2; });
`,
      },
      {
        id: "infer",
        title: "Inferred name",
        about: "Assignment infers.",
        language: "javascript",
        code: `const handler = () => {};
console.log(handler.name); // "handler"
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-iife",
    title: "IIFE",
    order: 44,
    summary: "Immediately Invoked Function Expression — a function that runs as soon as it is defined.",
    prerequisites: ["javascript-function-expressions"],
    related: ["javascript-scopes", "javascript-closures"],
    oneLiner:
      "An IIFE is `(function () { /* scope */ })()` (or `(() => {})()`): define and call in one expression to get a private scope.",
    beats: [
      "Parentheses make it an expression, not a declaration. `function () {}()` is a syntax error without grouping.",
      "Classic pre-module pattern for privacy and a snapshot of `var` loop variables.",
      "Still useful for a one-time init block with its own `let`/`const` or `await` in modules (`await` at top level exists; IIFE async is `void (async () => { await ... })()`.",
    ],
    intro: "Before ES modules and `let`, IIFE was how you avoided globals. Interviews still ask you to write one.",
    why: "Legacy libraries, bookmarklets, and “create a scope here” in a script without a module.",
    concept:
      "A function expression produces a function; the trailing `()` calls it. The inner scope is discarded after unless it returns or closes over values.",
    how: "`(function (x) { ... })(arg)`. Unary prefix `!function () {}()` also forces expression context. Arrow IIFE: `(() => 1)()`.",
    usage: "Isolate polyfills, create a module-like object `{ public }` returned from the IIFE, run async startup.",
    practices: "Prefer real modules today. Use IIFE when you must in a classic script. Name the function if it can throw.",
    mistakes: "Missing wrapping parens. Expecting an IIFE declaration to hoist as a named function in outer scope. Forgetting to invoke (`()`).",
    code: `const api = (function () {
  const secret = 42;
  return { get: () => secret };
})();
console.log(api.get()); // 42
console.log(typeof secret); // "undefined"
(() => { console.log("arrow iife"); })();
`,
    examples: [
      {
        id: "grouped",
        title: "Grouping is required",
        about: "Declaration cannot be called in place that way.",
        language: "javascript",
        code: `(function () {
  return "ok";
})();
`,
      },
      {
        id: "loop-var",
        title: "Capture var with IIFE",
        about: "Historical fix for var in loops.",
        language: "javascript",
        code: `const fns = [];
for (var i = 0; i < 3; i += 1) {
  fns.push((function (j) {
    return function () { return j; };
  })(i));
}
console.log(fns[0]()); // 0
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-method-vs-function",
    title: "Method vs function",
    order: 45,
    summary: "A method is a function stored as a property and (usually) called with a receiver.",
    prerequisites: ["javascript-this"],
    related: ["javascript-call-bind-apply", "javascript-class"],
    oneLiner:
      "A function is callable. A method is a function on an object, typically invoked as `obj.fn()` so `this` is `obj`. The same function can be both depending on how you call it.",
    beats: [
      "Call site decides `this`, not the fact that it was defined in an object literal — unless it is an arrow.",
      "ES2015 method syntax `fn() {}` in literals/classes is not constructable (`new obj.fn` throws) and has no `prototype`.",
      "Extracting a method (`const f = obj.fn`) makes the next `f()` a plain function call.",
    ],
    intro: "The distinction is about how you call and where the function lives, not two different primitive types.",
    why: "Passing `obj.method` to `addEventListener` or `setTimeout` is the standard trap.",
    concept:
      "Method-definition syntax also has a home object for `super`. Ordinary function properties do not.",
    how: "`obj.fn()` = method call. `fn()` = function call. `new Fn()` = constructor call. `fn.call(obj)` = explicit method-like.",
    usage: "Keep behavior that needs instance state as methods. Keep pure utilities as functions.",
    practices: "Do not extract methods without bind/arrow wrapper. Use method syntax in class bodies.",
    mistakes: "`new` on a concise method. Treating TypeScript `this` types as runtime. Arrow “methods” that never see the object.",
    code: `const obj = {
  n: 1,
  method() { return this.n; },
  fn: function () { return this.n; },
};
console.log(obj.method(), obj.fn());
const lost = obj.method;
console.log(lost()); // undefined (strict)
`,
    examples: [
      {
        id: "not-constructable",
        title: "Method syntax is not a constructor",
        about: "TypeError on new.",
        language: "javascript",
        code: `const o = { m() {} };
try { new o.m(); } catch (e) { console.log(e.name); }
`,
      },
      {
        id: "same-function",
        title: "Same function, two call styles",
        about: "It is still one object.",
        language: "javascript",
        code: `function greet() { return this.who; }
const a = { who: "A", greet };
const b = { who: "B", greet };
console.log(a.greet(), b.greet());
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-callbacks",
    title: "Callbacks",
    order: 46,
    summary: "Functions passed to be called later — including callback hell.",
    prerequisites: ["javascript-functions"],
    related: ["javascript-arrow-functions", "javascript-closures", "javascript-this"],
    isHighYield: true,
    oneLiner:
      "A callback is a function you pass so the callee can invoke it later with a result or event. Nesting callbacks for sequential async work is callback hell.",
    beats: [
      "Sync callbacks (`array.map(fn)`) run before the caller returns. Async callbacks (`setTimeout`, I/O) run later on a turn of the event loop.",
      "`this` in a callback is the callee’s call site unless you bind or use an arrow.",
      "Callback hell: deeply nested error-first callbacks (`(err, data) =>`) that are hard to reason about — flatten with named functions, Promises, or async/await.",
    ],
    intro: "JS is callback-heavy because the runtime is evented. The pattern is older than Promises.",
    why: "Every API from `addEventListener` to Node-style `(err, value)` still shows up. Interviewers ask you to recognize hell and unwind it.",
    concept:
      "Inversion of control: you provide the continuation. Error-first Node style: first argument is `Error | null`.",
    how: "Callee stores the function and calls it with arguments. Nested async: second callback inside the first’s success path — indent pyramid.",
    usage: "Events, timers, `array` methods, requestAnimationFrame, legacy XHR.",
    practices: "Name nested functions. Handle errors at each level. Prefer Promises for sequences. Do not swallow `err`.",
    mistakes: "Calling the callback twice. Forgetting `return` after `if (err) return cb(err)`. Assuming map callbacks are async. Pyramid of doom without flattening.",
    code: `function load(cb) {
  setTimeout(() => cb(null, "file"), 0);
}
load((err, file) => {
  if (err) return console.error(err);
  load((err2, other) => {
    if (err2) return console.error(err2);
    console.log(file, other); // nested — start of hell
  });
});
[1, 2].map((n) => n * 2); // sync callback
`,
    examples: [
      {
        id: "hell",
        title: "Callback hell shape",
        about: "Sequential async nests inward.",
        language: "javascript",
        code: `step1((e, a) => {
  if (e) return fail(e);
  step2(a, (e2, b) => {
    if (e2) return fail(e2);
    step3(b, (e3, c) => {
      if (e3) return fail(e3);
      done(c);
    });
  });
});
function step1(cb) { cb(null, 1); }
function step2(_a, cb) { cb(null, 2); }
function step3(_b, cb) { cb(null, 3); }
function fail(e) { console.error(e); }
function done(c) { console.log(c); }
`,
      },
      {
        id: "this-callback",
        title: "this in a callback",
        about: "Bind or arrow.",
        language: "javascript",
        code: `const obj = {
  n: 1,
  later() {
    setTimeout(function () { console.log(this); }, 0);
    setTimeout(() => { console.log(this.n); }, 0);
  },
};
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-call-bind-apply",
    title: "call, apply, and bind",
    order: 47,
    summary: "Explicit this and partial application on ordinary functions.",
    prerequisites: ["javascript-this"],
    related: ["javascript-arrow-functions", "javascript-method-vs-function"],
    oneLiner:
      "`fn.call(thisArg, ...args)` and `fn.apply(thisArg, argsArray)` invoke immediately with a chosen `this`. `fn.bind(thisArg, ...args)` returns a new function with `this` (and optional prefix args) fixed.",
    beats: [
      "Arrows ignore `thisArg` from call/apply/bind (this stays lexical).",
      "`apply` is the historic spread; today `fn.call(t, ...arr)` is the same idea.",
      "`bind` is not a second call — it returns a wrapper. Bound functions still have a `name` prefix `bound `.",
    ],
    intro: "These three are how you fix `this` without rewriting the function as an arrow.",
    why: "Function borrowing (`[].slice.call(arguments)`), partial application, and event handlers.",
    concept:
      "`call`/`apply` set `this` for one invocation. `bind` creates an exotic bound function whose `this` is permanently that `thisArg` for ordinary calls.",
    how: "`math.max.apply(null, nums)` vs `Math.max(...nums)`. `handler.bind(obj)` for listeners. `bind` with leading args is partial application.",
    usage: "Borrow array methods on array-likes. Bind React class handlers. Adapter arity.",
    practices: "Prefer spread over apply. Bind once, store the bound function to unsubscribe the same reference. Do not bind arrows expecting a new this.",
    mistakes: "`bind` on every render creating new identities. `apply` with a non-array (use `Reflect.apply`). Forgetting bind returns a new function.",
    code: `function greet(punc) {
  return this.name + punc;
}
const user = { name: "Ada" };
console.log(greet.call(user, "!"));
console.log(greet.apply(user, ["?"]));
const hi = greet.bind(user, ".");
console.log(hi());
`,
    examples: [
      {
        id: "borrow",
        title: "Borrowing a method",
        about: "call with a different this.",
        language: "javascript",
        code: `const has = Object.prototype.hasOwnProperty;
const o = Object.create(null);
o.x = 1;
console.log(has.call(o, "x"));
`,
      },
      {
        id: "partial",
        title: "Partial apply with bind",
        about: "Prefix arguments are locked.",
        language: "javascript",
        code: `function add(a, b) { return a + b; }
const add1 = add.bind(null, 1);
console.log(add1(2)); // 3
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-closures",
    title: "Closures",
    order: 48,
    summary: "A function plus the lexical environment it was created in.",
    prerequisites: ["javascript-functions", "javascript-scopes"],
    related: ["javascript-iife", "javascript-callbacks", "javascript-this"],
    isHighYield: true,
    oneLiner:
      "A closure is a function that remembers variables from the scope where it was created, even after that scope’s code has returned.",
    beats: [
      "The inner function keeps a live binding, not a snapshot — unless you copy the value into a const per iteration (`let` in `for`).",
      "Private state: factory returns inner functions that close over `secret`.",
      "Closures retain memory: a large object closed over cannot be GC’d until the function is unreachable.",
    ],
    intro: "Closures are how JS does privacy, partial configuration, and callbacks with context — without `this`.",
    why: "Module patterns, React hooks conceptually, and the `var` loop bug are all closures.",
    concept:
      "Creating a function captures its enclosing environment record. Those bindings outlive the stack frame if the function escapes.",
    how: "Outer runs, binds `count`. Inner `inc` references `count`. Return `inc`. Later calls still mutate the same `count`.",
    usage: "Factories, event handlers, memoization, currying, encapsulating caches.",
    practices: "Close over the smallest data you need. Be aware of retained DOM nodes. Use `let` in loops.",
    mistakes: "Thinking closure copies values at creation for `var` loops. Accidental capture of the whole `props` object. Creating closures in a tight loop without need.",
    code: `function makeCounter() {
  let n = 0;
  return function inc() {
    n += 1;
    return n;
  };
}
const c = makeCounter();
console.log(c(), c()); // 1 2
`,
    examples: [
      {
        id: "live-binding",
        title: "Live bindings",
        about: "Not a copy of the number at create time.",
        language: "javascript",
        code: `let x = 1;
const read = () => x;
x = 2;
console.log(read()); // 2
`,
      },
      {
        id: "private",
        title: "Private field via closure",
        about: "Outer locals are not on the returned object.",
        language: "javascript",
        code: `function bank(start) {
  let bal = start;
  return {
    deposit(n) { bal += n; },
    amount() { return bal; },
  };
}
const b = bank(10);
b.deposit(5);
console.log(b.amount()); // 15
console.log(b.bal); // undefined
`,
      },
    ],
  }),
];
