import { webTopic } from "./factory";

export const webAjax = webTopic({
  slug: "web-ajax",
  title: "Ajax and fetch",
  order: 10,
  summary: "Updating part of a page without a full navigation — the bridge from MPA to SPA.",
  prerequisites: ["web-critical-rendering-path"],
  related: ["web-spa", "javascript-fetch", "javascript-axios-vs-fetch"],
  oneLiner:
    "Ajax (Asynchronous JavaScript and XML — today usually JSON + `fetch`) means the document stays loaded while JS requests more data and patches the DOM. The URL may stay the same unless you also call `history.pushState`.",
  beats: [
    "It is still HTTP. You must handle errors, abort, and CORS.",
    "Unlike MPA, the browser will not automatically show a new document title or add history unless you do it.",
    "This is the model of “widgets,” not yet a client-side router.",
  ],
  intro: "Evolution’s Web 2.0 layer. SPAs are Ajax plus a router and a view library.",
  why: "Interviewers ask how Google Maps avoided reloads in 2005. Same idea as your `fetch` today.",
  concept:
    "XHR then `fetch`. JSON replaced XML for most APIs. Partial HTML (`innerHTML`) is also Ajax. Same-origin by default; CORS for other origins.",
  how: "User action → `fetch` → parse JSON → update DOM. Optionally update `history` and `document.title`.",
  usage: "Autocomplete, infinite scroll, “like” buttons, dashboards that poll.",
  practices: "Abort in-flight requests on new input. Don’t `innerHTML` untrusted strings. Show loading and failure states.",
  mistakes: "Forgetting CORS. Treating fetch failures as success. Not updating accessibility live regions.",
  language: "javascript",
  code: `const res = await fetch("/api/suggest?q=css");
const data = await res.json();
list.replaceChildren(...data.map(toItem));
`,
  examples: [
    {
      id: "xhr-era",
      title: "Same idea with XHR",
      about: "What “Ajax” originally looked like.",
      language: "javascript",
      code: `const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/suggest?q=css");
xhr.onload = () => console.log(JSON.parse(xhr.responseText));
xhr.send();
`,
    },
  ],
});
