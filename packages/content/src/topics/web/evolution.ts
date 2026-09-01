import { webTopic } from "./factory";

export const webEvolution = webTopic({
  slug: "web-evolution",
  title: "Evolution of the web",
  order: 1,
  summary: "From static documents and CGI to Ajax, SPAs, and PWAs — why each model existed.",
  related: ["web-client-server", "web-ajax", "web-spa"],
  isHighYield: true,
  oneLiner:
    "The web started as linked documents (HTTP + HTML). Servers then generated HTML (CGI, PHP, JSP). Ajax added partial updates without a full reload. SPAs moved routing and rendering to the client. PWAs add install, offline, and push on the same stack.",
  beats: [
    "Web 1.0: read mostly, full page loads, server owns the HTML.",
    "Web 2.0: user-generated content + XMLHttpRequest/fetch — the page stays, data changes.",
    "SPA/PWA: one shell, client router, APIs as JSON. Trade-off: first load, SEO, and complexity vs native-like UX.",
  ],
  intro:
    "Interviewers use this as a map. If you cannot place MPA, Ajax, SPA, and SSR on that map, later answers about React or Next.js float.",
  why: "Every later topic (rendering, Google’s path, SPA) is a reaction to a previous bottleneck: latency, interactivity, or install.",
  concept:
    "Documents vs applications. The URL was a document id; in SPAs it became app state. HTTP stayed request/response; we layered REST, GraphQL, and HTML streaming on top.",
  how: "1991 HTTP/HTML. Mid-90s CGI. Late-90s cookies and JS. 1999–2005 Ajax. 2000s REST. 2010s client routers + virtual DOM. HTTP/2 multiplexing. Service workers ~2015. HTTP/3 over QUIC.",
  usage: "Explain why a marketing site can be MPA/SSR and a dashboard an SPA without calling either obsolete.",
  extras: [
    {
      key: "eras",
      title: "Eras in interview language",
      body: "Static — files on disk, no personalization. Server-rendered MPA — each click is a new HTML document (forms POST, redirects). Ajax era — same document, XHR updates a region (jQuery, then fetch). SPA — JS owns the view tree; the server is an API. Universal/SSR — send HTML first, hydrate into an SPA. PWA — that app, installable and offline. None replaced HTTP.",
    },
  ],
  practices: "Name the constraint you are optimizing (SEO, TTI, offline, team skill) before picking an era’s architecture.",
  mistakes: "Calling SPA “the modern web” as if MPA died. Mixing Web 3.0 marketing with how browsers actually work.",
  figures: [
    {
      src: "/diagrams/web/web-evolution.png",
      alt: "Timeline from static HTML through CGI, Ajax, SPA, to PWA",
      caption: "How application models stacked on HTTP",
    },
  ],
  code: `<!-- Static document: the whole next view is another HTML file -->
<a href="/about.html">About</a>
`,
  examples: [
    {
      id: "mpa-form",
      title: "Classic MPA submit",
      about: "Full navigation; the server returns a new document.",
      language: "html",
      code: `<form method="get" action="https://www.google.com/search">
  <input name="q" value="event loop" />
  <button type="submit">Search</button>
</form>
`,
    },
  ],
});
