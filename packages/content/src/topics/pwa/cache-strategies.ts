import { pwaTopic } from "./factory";

export const pwaCacheStrategies = pwaTopic({
  slug: "pwa-cache-strategies",
  title: "Cache strategies",
  order: 5,
  summary: "Cache-first, network-first, stale-while-revalidate, and when not to cache.",
  prerequisites: ["pwa-app-shell"],
  related: ["pwa-workbox", "javascript-service-workers"],
  isHighYield: true,
  oneLiner:
    "A strategy is how `fetch` chooses Cache Storage vs network. Cache-first for versioned static assets. Network-first for APIs and HTML that must be fresh. Stale-while-revalidate when showing old data immediately is OK. Never cache POST, auth errors, or opaque 5xx as success.",
  beats: [
    "`respondWith` must be called synchronously in the `fetch` listener; the promise can resolve later.",
    "Clone responses before `put` — a body can be read once.",
    "Cache names are your deploy versions. Activate deletes the rest.",
  ],
  intro: "Interviews pick a URL and ask which strategy. Wrong choice is stale checkout or a blank offline app.",
  why: "The SW is a proxy. Strategy is product policy, not a default.",
  concept:
    "Cache-only (precached, no network). Network-only (analytics). Cache, falling back to network. Network, falling back to cache. SWR. Race (cache vs network, first wins) is rare.",
  how: "Match by destination (`document`, `script`, `image`) or path prefix `/api`. Skip `chrome-extension:` and Range requests unless you know how.",
  usage: "Hashed `/assets/*` cache-first. `/api/feed` network-first with IDB optional. Avatars SWR.",
  extras: [
    {
      key: "matrix",
      title: "Pick a strategy",
      body: "Hashed JS/CSS/fonts/icons — cache-first (or cache-only after precache). App shell HTML — cache-first with network update on next SW. API GET of user data — network-first + IDB. News feed — SWR. Checkout POST — network-only. Auth cookies — do not put Set-Cookie responses in a shared cache blindly.",
    },
  ],
  practices: "Version caches. Cap runtime cache size. Do not cache 4xx/5xx. Vary by Authorization only if you intend per-user caches (usually you do not).",
  mistakes: "One strategy for the whole origin. Caching POST. Forgetting `clone()`. Serving a cached login HTML to the wrong user.",
  figures: [
    {
      src: "/diagrams/pwa/pwa-cache-strategies.png",
      alt: "Cache-first, network-first, stale-while-revalidate, network-only",
      caption: "Common fetch strategies",
    },
  ],
  code: `event.respondWith(
  caches.match(event.request).then((hit) => hit || fetch(event.request)),
);
`,
  examples: [
    {
      id: "network-first",
      title: "Network-first GET",
      about: "Fresh when online; cache when the network fails.",
      language: "javascript",
      code: `if (event.request.method !== "GET") return;
event.respondWith(
  fetch(event.request)
    .then((res) => {
      const copy = res.clone();
      caches.open("api-v1").then((c) => c.put(event.request, copy));
      return res;
    })
    .catch(() => caches.match(event.request)),
);
`,
    },
    {
      id: "swr",
      title: "Stale-while-revalidate",
      about: "Paint cache now; refresh in the background.",
      language: "javascript",
      code: `event.respondWith((async () => {
  const cache = await caches.open("swr-v1");
  const cached = await cache.match(event.request);
  const network = fetch(event.request).then((res) => {
    cache.put(event.request, res.clone());
    return res;
  });
  return cached || network;
})());
`,
    },
  ],
});
