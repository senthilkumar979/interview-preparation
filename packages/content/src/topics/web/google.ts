import { webTopic } from "./factory";

export const webWhatHappensGoogle = webTopic({
  slug: "web-what-happens-google",
  title: "What happens when we Google",
  order: 6,
  summary:
    "End-to-end: keystroke in the address bar or search box → DNS, TCP, TLS, HTTP, HTML, render — plus what Google Search does with a query.",
  prerequisites: ["web-https", "web-dns"],
  related: ["web-rendering-pipeline", "web-browser-architecture", "web-spa"],
  isHighYield: true,
  oneLiner:
    "Typing google.com: parse URL → DNS → TCP → TLS → HTTP GET `/` → HTML/CSS/JS → render. Submitting a search: another GET `/search?q=…` (or the app’s XHR), Google’s front end fans out to the index, ranks results, returns HTML or JSON. “Google” is both a hostname resolution story and a distributed search-engine story — interviews usually want the network+browser path first.",
  beats: [
    "Address bar is not always a search: browsers first decide URL vs search query (omnibox).",
    "Connection path: caches, DNS, Happy Eyeballs, TLS with ALPN (h2/h3), then HTTP.",
    "Search path: query → load balancer → search stack (crawl index is already built) → SERP HTML. Crawling is not done at query time.",
  ],
  intro:
    "This is the classic open-ended interview. Structure it: input → name resolution → transport → application → pixels. Then, if they ask, how Search ranks.",
  why: "It stitches every prior topic. Gaps here show up as hand-waving in performance and SPA talks.",
  concept:
    "Two user actions: navigate to the Google origin, versus submit `q`. Both are HTTP. Search quality (PageRank, crawl, index) is backend and optional unless they probe it.",
  how: "See the numbered extras. After HTML, the rendering pipeline runs. Ads and search widgets may open more connections to other Google hosts (cookies, SameSite, partition).",
  usage: "Whiteboard the first 60 seconds of a frontend interview. Debug “site won’t load” (DNS vs TLS vs HTTP vs JS).",
  extras: [
    {
      key: "omnibox",
      title: "Step 0 — what did the user type?",
      body: "If it looks like a URL (`google.com`, `https://…`), the browser applies scheme https (HSTS, HTTPS-first) and starts navigation. If it looks like a search string, the browser issues a request to the configured search engine (often Google) with `q=`. Autocomplete may have already queried a suggest API.",
    },
    {
      key: "path-nav",
      title: "Steps 1–8 — load https://www.google.com",
      body: "1. Parse URL, fill defaults (https, port 443). 2. Check HSTS and cache. 3. DNS for www.google.com (and maybe HTTPS records). 4. Pick IPv4/IPv6, open TCP or QUIC. 5. TLS (+ ALPN). 6. HTTP GET `/` with `Host`, cookies, `Accept-Language`. 7. Response: HTML, set-cookie, preload links. 8. Parse, fetch CSS/JS/images (each may reuse the connection or open new origins), run the rendering pipeline, first paint.",
    },
    {
      key: "path-search",
      title: "Submitting a query",
      body: "The homepage JS or a plain form navigates to `/search?q=event+loop` (GET, bookmarkable) or posts via fetch. Google’s edge terminates TLS, the request hits a frontend, which queries shards of the inverted index (built earlier by crawling), applies ranking, personalization if signed in, and returns a SERP. Images and ads are extra origins. The crawl/index is not rebuilt per keystroke.",
    },
    {
      key: "engine",
      title: "Search engine (only if they ask)",
      body: "Crawl (discover URLs) → render/index (terms, links, signals) → rank at query time (relevance, freshness, spam). PageRank is a link graph signal, not the whole ranker. This is separate from how the browser paints the SERP.",
    },
  ],
  practices:
    "Tell the story in layers (DNS, TCP, TLS, HTTP, render). Mention caches at each layer. Separate “browser” from “Google’s datacenter.”",
  mistakes:
    "Saying the browser “goes to Google’s DNS first.” Claiming search crawls the live web on each query. Stopping at “the server sends HTML” with no render steps when they asked for a full path.",
  figures: [
    {
      src: "/diagrams/web/web-google-path.png",
      alt: "From typing a URL through DNS, TCP, TLS, HTTP, to rendering",
      caption: "Address bar to pixels",
    },
  ],
  language: "html",
  code: `GET /search?q=event+loop HTTP/2
Host: www.google.com
`,
  examples: [
    {
      id: "form",
      title: "Search as a GET form",
      about: "Shareable URL; the server sees `q`.",
      language: "html",
      code: `<form action="https://www.google.com/search" method="get">
  <input name="q" />
</form>
`,
    },
  ],
});
