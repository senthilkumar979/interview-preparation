import type { Topic } from "../../types";
import { jsTopic } from "./factory";

export const javascriptAxiosVsFetchTopics: Topic[] = [
  jsTopic({
    slug: "javascript-axios-vs-fetch",
    title: "Axios vs fetch",
    order: 122,
    summary:
      "fetch is the native HTTP API; Axios is a library that filled DX and compatibility gaps — neither is required for the other to work.",
    prerequisites: ["javascript-fetch"],
    related: [
      "javascript-abort-controller",
      "javascript-async-await",
      "javascript-promise",
      "web-ajax",
    ],
    isHighYield: true,
    oneLiner:
      "`fetch` is native, promise-based, and enough for most apps if you add glue. Axios was introduced because XHR was painful and early `fetch` lacked timeouts, interceptors, JSON transforms, HTTP-error rejection, and solid older-browser/Node story.",
    beats: [
      "`fetch` fulfills on HTTP 4xx/5xx; only network/abort/CORS failures reject. JSON is `res.json()`. No built-in timeout or interceptors — use `AbortController` and wrappers.",
      "Axios (XHR in browsers, HTTP adapters in Node) auto-parses JSON, rejects 4xx/5xx by default, has interceptors, `timeout`, upload progress, and historically CancelToken (now `AbortController`).",
      "Pick `fetch` for zero-dep native code and streaming bodies. Pick Axios when you want shared defaults, interceptors, upload progress, or one client across older browsers and Node before native `fetch`.",
    ],
    intro:
      "Interviewers ask why teams added Axios when `fetch` is built in. The honest answer is history plus DX: `fetch` can do the job; Axios packages the glue people kept rewriting.",
    why: "Choosing a client is about error semantics, interceptors, and environment — not “Axios is modern, fetch is old.” Getting this wrong is a common senior-screen trap.",
    concept:
      "`fetch` is a WHATWG Web API (also in Node via undici). It returns a `Response`; you opt into JSON, status checks, cancel, and credentials. Axios is a third-party client: browser default adapter is `XMLHttpRequest`; Node uses its HTTP adapter. It transforms JSON both ways, exposes interceptors, and treats non-2xx as errors unless you change `validateStatus`.",
    how: "XHR era: callbacks, readyState, manual JSON. `fetch` (2015+, WHATWG) made HTTP promise-native but left timeouts, interceptors, and HTTP-error throws to the app. Axios (2014+) sat on XHR with a nicer API and polyfilled the missing pieces, including IE-era browsers and Node before `fetch` landed in Node 18. Cancel: Axios CancelToken (deprecated) then `AbortController` like `fetch`.",
    usage:
      "Thin `getJson` around `fetch` in small apps. Axios (or ky/ofetch) when many calls share base URL, auth headers, and error mapping. Upload bars still lean Axios/`xhr.upload`; `fetch` can stream a request body but has no first-class upload progress event.",
    extras: [
      {
        key: "when-to-pick",
        title: "When you’d pick each",
        body: "`fetch`: no extra bundle, Service Worker–friendly, `ReadableStream` response bodies, `AbortSignal.timeout`, cookies via `credentials`. Axios: request/response interceptors (auth refresh), `timeout` as a number, `onUploadProgress`, `transformRequest`/`transformResponse`, `withCredentials`, consistent isomorphic client. Do not claim `fetch` cannot timeout or cancel — it can, with `AbortController`. Do not claim Axios is required for JSON — it is convenience.",
      },
    ],
    practices:
      "Match error policy to the API: if you use `fetch`, always check `response.ok`. If you use Axios, know `validateStatus` and that interceptors run on every call. Prefer `AbortController` over leftover CancelToken. Don’t add Axios only because a tutorial did.",
    mistakes:
      "Saying `fetch` cannot do the job. Treating Axios 404 as the same as `fetch` 404 (one throws, one doesn’t). Assuming Axios uses `fetch` under the hood in the browser (it uses XHR by default). Forgetting Node needed an adapter/`node-fetch` long before native `fetch`.",
    caption: "Same GET: fetch vs Axios error semantics",
    code: `// fetch: 404 fulfills. JSON is a second await.
const res = await fetch("/api/user");
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const user = await res.json();

// Axios: 404 rejects (default validateStatus). data is already parsed.
const { data } = await axios.get("/api/user");
`,
    examples: [
      {
        id: "timeout",
        title: "Timeout: native vs Axios",
        about: "`fetch` has no timeout field; Axios does. Both can abort.",
        language: "javascript",
        code: `await fetch("/slow", { signal: AbortSignal.timeout(3000) });
await axios.get("/slow", { timeout: 3000, signal: AbortSignal.timeout(3000) });
`,
      },
      {
        id: "intercept",
        title: "Why interceptors exist",
        about: "Axios centralizes auth; fetch needs a wrapper.",
        language: "javascript",
        code: `axios.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${token()}\`;
  return config;
});
async function getJson(url) {
  const res = await fetch(url, { headers: { Authorization: \`Bearer \${token()}\` } });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}
`,
      },
    ],
  }),
];
