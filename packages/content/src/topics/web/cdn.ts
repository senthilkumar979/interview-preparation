import { webTopic } from "./factory";

export const webCdn = webTopic({
  slug: "web-cdn",
  title: "CDNs and HTTP caching",
  order: 12,
  summary: "Edge caches, `Cache-Control`, and how repeat visits skip the origin.",
  prerequisites: ["web-http"],
  related: ["web-critical-rendering-path", "javascript-service-workers"],
  oneLiner:
    "A CDN is a geographically distributed HTTP cache in front of your origin. Browsers also cache. `Cache-Control`, `ETag`/`If-None-Match`, and `Last-Modified` decide freshness. Service workers add another cache on the device. Getting this wrong either hammers origin or serves stale JS forever.",
  beats: [
    "Freshness: `max-age` / `s-maxage` (shared caches). Revalidation: 304 with ETag.",
    "Fingerprinted filenames (`app.a1b2.js`) can be cached “forever”; `index.html` should be short-lived so it can point at new hashes.",
    "CDNs cache GET/HEAD well; they usually must not cache personalized HTML without `Vary` and care.",
  ],
  intro: "After SPA and CRP: how bytes get close to the user and stay there.",
  why: "Deploy “I don’t see my fix” is usually HTML cached too long or JS cached too short.",
  concept:
    "Private vs shared caches. `Vary: Accept-Encoding` (often implicit). Cookie-busting personalized pages. Immutable hashed assets.",
  how: "Browser cache → CDN POP → origin. SW Cache Storage is a separate, programmable layer.",
  usage: "Static sites, SPA bundles, image CDNs.",
  practices: "Hash assets, short-cache HTML. Use `immutable` on hashed files. Purge CDN on emergency, not as the default workflow.",
  mistakes: "`no-store` on everything. Caching HTML with user names at the CDN. Forgetting query strings as cache keys.",
  language: "html",
  code: `Cache-Control: public, max-age=31536000, immutable
`,
  examples: [
    {
      id: "html-vs-js",
      title: "HTML vs hashed JS",
      about: "Different lifetimes.",
      language: "html",
      code: `# index.html
Cache-Control: no-cache

# app.9f3c.js
Cache-Control: public, max-age=31536000, immutable
`,
    },
  ],
});
