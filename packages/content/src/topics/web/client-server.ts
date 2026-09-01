import { webTopic } from "./factory";

export const webClientServer = webTopic({
  slug: "web-client-server",
  title: "Clients, servers, and URLs",
  order: 2,
  summary: "The browser is a client. A server waits on a port. A URL names the resource to request.",
  prerequisites: ["web-evolution"],
  related: ["web-dns", "web-http"],
  isHighYield: true,
  oneLiner:
    "A web client (browser, curl, app) opens a connection to a host and port, then sends an HTTP request for a URL path. The server chooses a response (HTML, JSON, redirect, error). The URL is `scheme://host:port/path?query#fragment` — the fragment never leaves the browser.",
  beats: [
    "`https:` implies TLS on port 443 by default; `http:` is 80 and plaintext.",
    "Host is resolved by DNS to an IP. Path and query are for the origin server (or a reverse proxy).",
    "Origin = scheme + host + port. Same-origin policy keys off that tuple.",
  ],
  intro: "Before DNS and TLS, lock this model: who asks, who answers, what the name means.",
  why: "CORS, cookies, and SPA routing all abuse or respect this naming scheme.",
  concept:
    "Stateless request/response at HTTP’s level (cookies and tokens re-attach identity). Reverse proxies, CDNs, and load balancers are still servers from the client’s view — they terminate the TCP/TLS session you opened.",
  how: "User enters a URL or clicks a link. Browser parses it, applies defaults, then starts DNS. After bytes arrive, it may follow `Location` on 3xx.",
  usage: "Reading DevTools; designing REST paths; explaining why `#/dashboard` is not sent to the server.",
  extras: [
    {
      key: "url-parts",
      title: "URL parts",
      body: "`https` — scheme. `www.google.com` — host. omitted port — 443. `/search` — path. `?q=css` — query. `#res` — fragment, client-only. Userinfo (`user:pass@`) is obsolete and dangerous.",
    },
  ],
  practices: "Always think origin, not “domain,” when security is involved. Default to HTTPS.",
  mistakes: "Assuming the fragment is logged server-side. Confusing hostname with origin (port and scheme matter).",
  language: "html",
  code: `https://www.google.com:443/search?q=http#res
`,
  examples: [
    {
      id: "origin",
      title: "Same origin or not",
      about: "Scheme, host, and port must all match.",
      language: "javascript",
      code: `// https://app.example.com vs http://app.example.com → different origins
// https://example.com vs https://www.example.com → different hosts
// https://api.example.com:443 vs :8443 → different ports
`,
    },
  ],
});
