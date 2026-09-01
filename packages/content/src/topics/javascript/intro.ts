import type { Topic } from "../../types";
import { jsTopic } from "./factory";

const scriptLoadingFigure = {
  src: "/diagrams/js/js-script-loading.png",
  alt: "Classic vs defer vs async script loading timelines",
  caption: "Parse, download, execute",
};

export const javascriptIntroTopics: Topic[] = [
  jsTopic({
    slug: "javascript-vanilla",
    title: "Vanilla JS",
    order: 1,
    summary: "Plain JavaScript in the browser or Node—no framework required.",
    related: ["javascript-ecmascript", "javascript-external"],
    oneLiner:
      "Vanilla JS is JavaScript as the language and host APIs provide it: no React, Vue, or jQuery layer.",
    beats: [
      "It is the language plus host objects (`document`, `fetch`, Node `fs`)—not a library.",
      "Frameworks compile or wrap the same runtime; interviews still test the language.",
      "Use it to prove you can reason about the DOM, events, and modules without a bundler abstraction.",
    ],
    intro:
      "Vanilla JavaScript means writing JS that the engine and host already understand. Interviews use it to separate language skill from framework trivia.",
    why: "Most production bugs and interview follow-ups live in the language: closures, this, event loop, types. Frameworks sit on top.",
    concept:
      "JavaScript is a high-level, dynamically typed language specified by ECMAScript and executed by engines (V8, SpiderMonkey, JavaScriptCore). Browsers add Web APIs; Node adds its own. “Vanilla” is that stack without a UI library.",
    how: "A script is parsed, compiled (often JIT), and run in an execution context. Global code, functions, and modules each get their own environment. Host APIs are not part of ECMAScript but are what you call from vanilla code.",
    usage:
      "Small widgets, interview live-coding, understanding what React does under the hood, and shipping pages that do not need a SPA.",
    practices:
      "Prefer modules over globals. Use modern syntax (`let`/`const`, `===`, `??`) even without a framework. Know which APIs are language vs browser.",
    mistakes:
      "Calling jQuery or React “JavaScript.” Assuming vanilla cannot fetch, query the DOM, or use modules. Treating `alert` as the only I/O.",
    code: `document.querySelector("#go")?.addEventListener("click", () => {
  console.log("vanilla: no framework required");
});
`,
    examples: [
      {
        id: "dom-query",
        title: "DOM without a library",
        about: "Selectors and events are host APIs, still vanilla JS.",
        language: "javascript",
        code: `const el = document.getElementById("status");
el?.classList.add("ready");
`,
      },
      {
        id: "fetch",
        title: "Network with fetch",
        about: "`fetch` is a Web API; the code that consumes the Promise is JavaScript.",
        language: "javascript",
        code: `const res = await fetch("/api/health");
const body = await res.json();
console.log(body.ok);
`,
      },
      {
        id: "module",
        title: "ES module",
        about: "Vanilla modules use `import`/`export` without a framework.",
        language: "javascript",
        code: `export function double(n) {
  return n * 2;
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-ecmascript",
    title: "ECMAScript",
    order: 2,
    summary: "The language standard behind JavaScript: editions, engines, and what “ES6” actually means.",
    prerequisites: ["javascript-vanilla"],
    related: ["javascript-var-let-const", "es-overview"],
    oneLiner:
      "ECMAScript (ECMA-262) is the language specification; JavaScript is the common name for implementations of that spec plus host APIs.",
    beats: [
      "TC39 stages proposals (0–4); Stage 4 lands in the yearly edition (ES2015, ES2020, …).",
      "Engines implement editions at different times; transpilers (Babel, TypeScript) downlevel syntax.",
      "“ES6” is ES2015: `let`/`const`, classes, modules, arrows, promises, template literals.",
    ],
    intro:
      "Saying “JavaScript” mixes the ECMAScript language with browser or Node APIs. Interviews want you to know the spec is the language, and `document` is not in ECMA-262.",
    why: "Feature questions (“does this runtime have `??`?”) are edition and engine questions. Polyfills vs syntax transforms follow from that split.",
    concept:
      "ECMAScript defines types, grammar, abstract operations (`ToNumber`, `ToBoolean`), and built-ins (`Array`, `Promise`, `Map`). Host environments inject extra objects. Edition year ≈ what the committee finished; browsers ship independently.",
    how: "A proposal reaches Stage 4, is edited into the spec, then engines implement. Syntax needs a parser change; many APIs can be polyfilled. `core-js` vs Babel plugins is that distinction.",
    usage:
      "Cite editions when discussing modules, optional chaining, or `BigInt`. Check MDN/compat tables, not “Node 14 has all of ES2020.”",
    practices:
      "Name the edition or year. Separate language features from DOM. Target a baseline (browserslist) instead of “latest Chrome only.”",
    mistakes:
      "Treating ES6 as “all modern JS.” Confusing TypeScript types with ECMAScript. Assuming `fetch` is in the language spec.",
    code: `// Language (ECMAScript): Promise, optional chaining, nullish coalescing
const port = config?.server?.port ?? 3000;

// Host (not ECMAScript): document, fetch, process
`,
    examples: [
      {
        id: "es2015",
        title: "ES2015 highlights",
        about: "The edition interviewers still call ES6.",
        language: "javascript",
        code: `const add = (a, b) => a + b;
class Box { constructor(v) { this.v = v; } }
`,
      },
      {
        id: "es2020",
        title: "ES2020 highlights",
        about: "`??`, `?.`, `Promise.allSettled`, `BigInt`, dynamic `import()`.",
        language: "javascript",
        code: `const n = 0 ?? 1; // 0
const m = 0 || 1; // 1
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-inline",
    title: "Inline JS",
    order: 3,
    summary: "Scripts inside HTML: `<script>` bodies and `on*` attributes.",
    prerequisites: ["javascript-vanilla"],
    related: ["javascript-external"],
    oneLiner:
      "Inline JS is source embedded in HTML: a `<script>` block or an event handler attribute like `onclick`.",
    beats: [
      "`<script>` in the document runs as classic script unless `type=\"module\"`.",
      "`onclick=\"...\"` compiles to a function with a weird scope (document/form/element as with).",
      "CSP `script-src` often blocks inline unless hashes/nonces—prefer external files.",
    ],
    intro:
      "Inline scripts are how the first tutorial runs `alert`. Production and interviews treat them as a last resort: caching, CSP, and CSP-friendly event listeners all push you to external files.",
    why: "You still see them in CMS pages and email-adjacent HTML. You must know parse order, `document.write`, and why `onclick` is a security smell.",
    concept:
      "A classic inline `<script>` without `src` is parsed and executed immediately when the HTML parser reaches it, blocking further parse until it finishes. Handler attributes are strings evaluated as functions, not modules.",
    how: "The parser hits `<script>`, pauses HTML construction, runs the script with the current DOM (elements above exist; below may not). `defer`/`async` do not apply to inline classic scripts without `src`.",
    usage:
      "Tiny bootstraps, critical snippets before a file loads, and demos. Prefer `addEventListener` in an external file.",
    practices:
      "Avoid `javascript:` URLs and inline handlers. If you must inline, use a nonce/hash for CSP. Never `document.write` after load.",
    mistakes:
      "Putting a large app in `<script>` tags. Using `onclick` and then wondering why `this` and strict mode feel wrong. Expecting `import` in a classic inline script.",
    code: `<!-- HTML -->
<button onclick="save()">Save</button>
<script>
  function save() {
    console.log("inline handler + inline script");
  }
</script>
`,
    caption: "Inline handler and inline script (avoid in production)",
    examples: [
      {
        id: "inline-script",
        title: "Classic inline script",
        about: "Runs as soon as the parser reaches it.",
        language: "javascript",
        code: `// equivalent of <script>console.log(1)</script>
console.log(1);
`,
      },
      {
        id: "handler-scope",
        title: "Handler attributes",
        about: "Prefer listeners; attributes are harder to CSP and test.",
        language: "javascript",
        code: `button.addEventListener("click", save);
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-external",
    title: "External JS",
    order: 4,
    summary: "`<script src>` files: caching, blocking parse, and modules.",
    prerequisites: ["javascript-inline"],
    related: ["javascript-script-async", "javascript-script-defer"],
    figures: [scriptLoadingFigure],
    oneLiner:
      "External JS is a file loaded with `<script src>` (or `type=\"module\" src`). The browser downloads it separately from HTML.",
    beats: [
      "Classic `<script src>` without `async`/`defer` blocks HTML parsing while the file downloads and runs.",
      "Files cache independently; HTML stays small; CSP can allow `script-src` hosts without `'unsafe-inline'`.",
      "`type=\"module\"` is deferred by default, uses strict mode, and has its own scope.",
    ],
    intro:
      "Almost all real apps load JS from files. Interviews ask when that file runs relative to HTML parse—classic vs `defer` vs `async`.",
    why: "Blocking scripts delay first paint. Wrong order breaks `document.getElementById` for elements below the tag. Modules change both timing and scope.",
    concept:
      "The HTML parser sees `src`, fetches the resource, then (unless async/defer) executes it before continuing parse. Multiple classic scripts run in document order. Modules form a dependency graph.",
    how: "Network → byte stream → parse/compile → execute. `crossorigin` affects error reporting and CORS. `integrity` (SRI) pins a hash.",
    usage:
      "`<script type=\"module\" src=\"/app.js\">` for modern apps. Bundlers still emit files the browser loads this way (or as modules).",
    practices:
      "Put classic blocking scripts at the end of `body`, or use `defer`. Prefer modules. Use SRI for third-party CDNs.",
    mistakes:
      "A `<script src>` in `head` with no `defer` blocking render. Mixing classic globals with modules and expecting shared `var`. Forgetting that modules are CORS-credentialed on some hosts.",
    code: `// index.html: <script src="/app.js"></script>
export function boot() {
  const root = document.getElementById("root");
  root.textContent = "loaded from file";
}
boot();
`,
    examples: [
      {
        id: "classic-src",
        title: "Classic external script",
        about: "Blocks parse at the tag until downloaded and executed.",
        language: "javascript",
        code: `// <script src="app.js"></script>
console.log(document.body); // exists if tag is at end of body
`,
      },
      {
        id: "module-src",
        title: "Module script",
        about: "Deferred by default; `import` works; top-level scope is the module.",
        language: "javascript",
        code: `// <script type="module" src="app.js"></script>
import { boot } from "./boot.js";
boot();
`,
      },
      {
        id: "sri",
        title: "Subresource integrity",
        about: "Pin the bytes you intend to run.",
        language: "javascript",
        code: `// <script src="https://cdn.example/lib.js"
//   integrity="sha384-..." crossorigin="anonymous"></script>
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-script-async",
    title: "Async (script attribute)",
    order: 5,
    summary: "The `async` attribute on classic scripts: download in parallel, execute as soon as ready.",
    prerequisites: ["javascript-external"],
    related: ["javascript-script-defer"],
    figures: [scriptLoadingFigure],
    isHighYield: false,
    oneLiner:
      "`async` on `<script src>` fetches the file in parallel with HTML parse, then executes as soon as it is ready—order among async scripts is not guaranteed.",
    beats: [
      "This is the **script attribute**, not `async`/`await`. Different feature.",
      "Parser does not wait for download; when the file arrives, parse pauses, the script runs, then parse continues.",
      "`async` scripts can run before DOM is complete and in any order vs other `async` files.",
    ],
    intro:
      "Interviewers mix up `async` functions with `<script async>`. This topic is only the HTML attribute: independent download and earliest possible execution.",
    why: "Analytics, ads, and independent widgets use `async`. App bundles that depend on DOM order or each other should not.",
    concept:
      "`async` applies to classic external scripts (and dynamically inserted scripts, which default to async). It does not apply to `type=\"module\"` the same way—modules have `async` as a separate, less common pattern.",
    how: "HTML parse continues while the script downloads. On load, the engine executes immediately (blocking parse for that moment). No document-order guarantee between two `async` scripts.",
    usage:
      "Third-party tags that must not block first paint and do not depend on your app or on sibling scripts.",
    practices:
      "Use `async` only for independent files. If order or DOM-ready matters, use `defer` or modules. Do not put `async` on your main bundle that queries the DOM at top level without waiting.",
    mistakes:
      "Explaining `async`/`await` when asked about script loading. Assuming two `async` scripts run in tag order. Using `async` and then immediately reading a DOM node that is below the tag.",
    code: `// <script async src="tracker.js"></script>
// tracker.js may run before or after later HTML exists
console.log("tracker: DOM may still be incomplete");
`,
    examples: [
      {
        id: "independent",
        title: "Independent third party",
        about: "No dependency on your code or on other async files.",
        language: "javascript",
        code: `window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
`,
      },
      {
        id: "no-order",
        title: "Order is not guaranteed",
        about: "A then B in HTML does not mean A runs first.",
        language: "javascript",
        code: `// a.js and b.js both async — either may run first
window.__flags = window.__flags || {};
`,
      },
      {
        id: "not-await",
        title: "Not async/await",
        about: "The keyword `async` on a function is a different language feature.",
        language: "javascript",
        code: `async function load() {
  return fetch("/x");
}
`,
      },
    ],
  }),

  jsTopic({
    slug: "javascript-script-defer",
    title: "Defer",
    order: 6,
    summary: "`defer` downloads in parallel and runs after document parse, in tag order.",
    prerequisites: ["javascript-script-async"],
    related: ["javascript-external"],
    figures: [scriptLoadingFigure],
    oneLiner:
      "`defer` fetches the script in parallel with HTML parse, then executes after the document is parsed, in the order the tags appear.",
    beats: [
      "Parse is not blocked by download. Execution waits until HTML parsing finishes (before `DOMContentLoaded`).",
      "Multiple `defer` scripts run in document order and see the full DOM.",
      "`type=\"module\"` scripts are deferred by default even without the attribute.",
    ],
    intro:
      "`defer` is the usual answer for “put JS in `head` without blocking parse, but run after the DOM exists, in order.”",
    why: "Classic blocking scripts in `head` hurt LCP. `async` can run too early and out of order. `defer` is the middle path for app code.",
    concept:
      "The parser continues while bytes download. Scripts are queued. After `</html>` parse completes, deferred scripts run in order, then `DOMContentLoaded` fires (after those scripts).",
    how: "Same fetch-in-parallel as `async`, different execute time: after parse, ordered. Inline classic scripts without `src` cannot be deferred.",
    usage:
      "`<script defer src=\"app.js\">` in `head`. Modules: omit `defer`; they already wait.",
    practices:
      "Prefer `defer` or modules for first-party code. Keep `async` for independent third parties. Do not mix `async` and `defer` on the same tag expecting both semantics (HTML says `async` wins if both are set on classic scripts).",
    mistakes:
      "Using `defer` on inline scripts. Expecting `defer` on modules to change much. Assuming `DOMContentLoaded` listeners inside a deferred script might miss the event (they usually still run; the event has not fired yet when deferred scripts run).",
    code: `// <script defer src="app.js"></script> in <head>
document.getElementById("app").textContent = "DOM is complete";
`,
    examples: [
      {
        id: "order",
        title: "Document order",
        about: "`a.js` then `b.js`, both defer: a always before b.",
        language: "javascript",
        code: `// b.js
console.log(window.fromA); // set by a.js
`,
      },
      {
        id: "dom-ready",
        title: "Full DOM",
        about: "Elements below the script tag already exist.",
        language: "javascript",
        code: `const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);
`,
      },
      {
        id: "vs-async",
        title: "Versus async",
        about: "Need order + full DOM → defer. Independent ping → async.",
        language: "javascript",
        code: `// app.js → defer
// ads.js → async
`,
      },
    ],
  }),
];
