import { webTopic } from "./factory";

export const webSpa = webTopic({
  slug: "web-spa",
  title: "Single-page applications",
  order: 11,
  summary: "One HTML shell, client-side routing, data via APIs — costs and benefits versus MPA.",
  prerequisites: ["web-ajax"],
  related: ["web-evolution", "pwa-overview"],
  isHighYield: true,
  oneLiner:
    "An SPA loads one HTML document (the shell) and then uses JS to swap views. Navigation is `history.pushState`/`replaceState` plus a client router matching the path. Data comes from JSON APIs (`fetch`), not a full HTML round trip. The server must still serve `index.html` for every app path (fallback) or you break refresh.",
  beats: [
    "MPA: each URL is a server-rendered document. SPA: each URL is a client state that must be reconstructible on load.",
    "Hard refresh on `/settings` must not 404 — the host rewrites to the shell, then the router reads `location.pathname`.",
    "Trade-offs: richer UX and less full reload vs larger JS, SEO/hydration work, and more empty states to design.",
  ],
  intro: "End of this track’s story: we kept HTTP and the renderer, and moved the application into the client.",
  why: "React/Vue/Angular interviews assume this model. SSR/Next exists because SPA first-load and SEO hurt.",
  concept:
    "App shell: HTML + JS bundle + CSS. Router: map path → component. Store: client memory (and maybe URL query). Hydration: if HTML was SSR’d, JS attaches to existing DOM instead of painting from zero.",
  how: "Click `<a>` → `preventDefault` → `pushState` → render view → `fetch` data. Back button fires `popstate`. Direct load: server returns shell, JS boots, router runs.",
  usage: "Authenticated dashboards, editors, many PWAs. Marketing homepages often stay MPA/SSR.",
  extras: [
    {
      key: "mpa-vs-spa",
      title: "MPA vs SPA",
      body: "MPA — simple caching of HTML, real URLs for free, full reload resets JS memory, slower transitions. SPA — instant view swaps after load, complex back/forward and scroll restoration, you own titles/focus/announcements, first load waits on JS. Hybrid: SSR or streaming HTML, then hydrate (Next, Nuxt, Remix).",
    },
    {
      key: "hosting",
      title: "Hosting rule",
      body: "Static hosts need a rewrite: `/*` → `/index.html` for unknown paths. APIs live on another origin or `/api`. Hash routing (`#/settings`) avoids server rewrites but is worse for SEO and is a 2010s compromise.",
    },
  ],
  practices:
    "Real URLs (`pushState`), not only hashes. Restore focus on route change. Code-split routes. Provide a no-JS or SSR story if SEO matters. Handle 404 inside the router.",
  mistakes:
    "Client router without server fallback. Fetching on every navigation with no cache. Ignoring `popstate`. Shipping the whole app in one bundle.",
  figures: [
    {
      src: "/diagrams/web/web-spa-mpa.png",
      alt: "Multi-page full reloads versus SPA shell plus client router",
      caption: "MPA vs SPA",
    },
  ],
  language: "javascript",
  code: `document.querySelector("nav").addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || a.origin !== location.origin) return;
  e.preventDefault();
  history.pushState(null, "", a.pathname);
  render(a.pathname);
});
window.addEventListener("popstate", () => render(location.pathname));
`,
  examples: [
    {
      id: "fallback",
      title: "Express fallback for SPA",
      about: "Refresh on /settings still returns the shell.",
      language: "javascript",
      code: `app.get("/api/*", api);
app.get("*", (req, res) => res.sendFile("index.html"));
`,
    },
  ],
});
