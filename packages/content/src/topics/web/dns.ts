import { webTopic } from "./factory";

export const webDns = webTopic({
  slug: "web-dns",
  title: "DNS",
  order: 3,
  summary: "How a hostname becomes an IP address, including caches and the resolver chain.",
  prerequisites: ["web-client-server"],
  related: ["web-http", "web-what-happens-google"],
  isHighYield: true,
  oneLiner:
    "DNS maps a hostname to records (usually A/AAAA IPs, sometimes CNAME). The browser checks its cache, then the OS, then a recursive resolver, which walks root → TLD → authoritative nameserver unless a cache hit stops it earlier.",
  beats: [
    "You rarely talk to Google’s nameservers first — your ISP or 1.1.1.1/8.8.8.8 recurses for you.",
    "TTL on records controls how long caches may reuse an answer. Low TTL helps failovers; it increases lookup traffic.",
    "`CNAME` aliases a name; `A`/`AAAA` are the addresses. HTTPS/SVCB records can steer HTTP/3.",
  ],
  intro: "Every “what happens when you type a URL” answer that skips DNS is incomplete.",
  why: "Slow DNS is slow TTFB. CDN failover and geo-steering are DNS tricks.",
  concept:
    "Hierarchy: `.` root, then `com`, then `google.com`. Stub resolver on the device vs recursive vs authoritative. Privacy: DoH/DoT encrypt DNS to the resolver, not to the authoritative in all setups.",
  how: "Browser cache → OS cache → recursive resolver (UDP/TCP 53 or DoH) → if miss, iterative queries from root. Answer returns IPs. Browser may race IPv6 and IPv4 (Happy Eyeballs).",
  usage: "`dig`, `nslookup`, understanding why a deploy “isn’t live yet” (TTL).",
  extras: [
    {
      key: "steps",
      title: "Lookup steps in order",
      body: "1. Is this already a literal IP? Skip DNS. 2. Browser DNS cache. 3. OS / stub cache (`/etc/hosts` can short-circuit). 4. Configured recursive resolver. 5. Resolver asks a root hint for the TLD nameserver. 6. TLD nameserver points at the zone’s NS. 7. Authoritative server returns A/AAAA (and maybe CNAME chain). 8. Resolver caches per TTL and returns to the OS/browser.",
    },
  ],
  practices: "Set TTLs consciously. Use `www` vs apex CNAMEs as your DNS host allows. Monitor lookup time in RUM.",
  mistakes: "Thinking DNS is “Google.” Forgetting `/etc/hosts`. Ignoring IPv6. Assuming the browser always does a new lookup.",
  figures: [
    {
      src: "/diagrams/web/web-dns.png",
      alt: "DNS chain from browser cache through resolver, root, TLD, to authoritative",
      caption: "Recursive DNS resolution",
    },
  ],
  language: "html",
  code: `www.google.com  →  CNAME / A / AAAA  →  142.250.x.x
`,
  examples: [
    {
      id: "hosts",
      title: "Hosts file wins",
      about: "Before the network resolver.",
      language: "html",
      code: `# /etc/hosts
127.0.0.1 local.prepquest.test
`,
    },
  ],
});
