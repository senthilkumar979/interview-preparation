import { webTopic } from "./factory";

export const webHttp = webTopic({
  slug: "web-http",
  title: "HTTP",
  order: 4,
  summary: "Request line, headers, body, methods, and status codes — the language of the web.",
  prerequisites: ["web-dns"],
  related: ["web-https", "web-what-happens-google"],
  isHighYield: true,
  oneLiner:
    "HTTP is a text-framed (HTTP/1.1) or binary-framed (HTTP/2, HTTP/3) protocol: a method and path, headers, optional body. The server answers with a status (1xx–5xx), headers, and optional body. Connections may be reused; HTTP/2 multiplexes streams; HTTP/3 runs on QUIC/UDP.",
  beats: [
    "Safe methods (GET, HEAD) should not change server state. POST/PUT/PATCH/DELETE can.",
    "Headers are metadata: `Host`, `Accept`, `Cookie`, `Cache-Control`, `Content-Type`.",
    "Status: 2xx success, 3xx redirect, 4xx client, 5xx server. 304 is cache revalidation, not “empty success.”",
  ],
  intro: "Browsers speak HTTP even when the UI is a React tree. APIs are the same verbs.",
  why: "Caching, CORS, cookies, and REST interviews are HTTP interviews.",
  concept:
    "HTTP/1.1: one request at a time per connection unless pipelining (rarely used). Keep-alive reuses TCP. HTTP/2: one TLS connection, many streams, HPACK headers. HTTP/3: QUIC, no head-of-line blocking at TCP.",
  how: "After TCP (and TLS), the client writes a request. Proxies may add `X-Forwarded-For`. The server streams a response. Redirects start a new request to `Location`.",
  usage: "Page navigations, `fetch`, form GET/POST, file downloads.",
  extras: [
    {
      key: "methods",
      title: "Methods you must know",
      body: "GET — retrieve, cacheable. HEAD — headers only. POST — process (often create), not idempotent by default. PUT — replace a resource (idempotent). PATCH — partial update. DELETE — remove. OPTIONS — CORS preflight. TRACE/CONNECT — rarely used from pages.",
    },
    {
      key: "status",
      title: "Status codes worth naming",
      body: "200 OK, 201 Created, 204 No Content, 301/302/307/308 redirects (know which preserve method), 304 Not Modified, 400 Bad Request, 401 vs 403, 404, 429, 500, 502, 503.",
    },
  ],
  practices: "Use GET for reads. Don’t put secrets in query strings. Set cache headers on purpose. Prefer 404 over 200-with-error-HTML for APIs.",
  mistakes: "Using GET to delete. Treating 301 and 308 as interchangeable. Ignoring `Host` on virtual hosts.",
  language: "html",
  code: `GET /search?q=css HTTP/1.1
Host: www.google.com
Accept: text/html
`,
  examples: [
    {
      id: "fetch-get",
      title: "Same request from JS",
      about: "Still HTTP GET.",
      language: "javascript",
      code: `const res = await fetch("https://example.com/search?q=css");
console.log(res.status, res.headers.get("content-type"));
`,
    },
  ],
});
