import { nextTopic } from "./factory";

export const nextProdTopics = [
nextTopic({
  slug: "next-metadata",
  title: "Metadata and SEO",
  order: 15,
  summary: "generateMetadata, streaming metadata, Open Graph, and JSON-LD.",
  prerequisites: ["next-app-router"],
  related: ["next-image-font"],
  isHighYield: true,
  oneLiner: "The Metadata API merges from layouts down to pages. Static metadata is an object; dynamic uses generateMetadata({ params }). Titles can use a template in the root. Open Graph and Twitter cards are first-class. For JSON-LD, render a <script type=\"application/ld+json\"> in a Server Component. Streaming metadata ships when the promise resolves.",
  beats: ["Merge order: parent to child.", "Absolute canonical URLs.", "Don't block the shell on slow metadata if you can stream it."],
  intro: "SEO is still a Next interview topic because SSR is the point.",
  why: "Share cards and search snippets are product features.",
  concept: "metadata export vs generateMetadata. metadataBase for OG URLs.",
  how: "export const metadata = { title: { default: 'App', template: '%s · App' } }",
  usage: "Docs, ecommerce, blogs.",
  practices: "One h1. Unique titles. sitemap.ts and robots.ts.",
  mistakes: "Client-only titles. Relative OG image URLs.",
  language: "typescript",
  caption: "Metadata and SEO",
  code: "import type { Metadata } from \"next\";\nexport async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {\n  const { slug } = await params;\n  const post = await getPost(slug);\n  return { title: post.title, description: post.excerpt, openGraph: { images: [post.og] } };\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-metadata.svg",
      alt: "metadata merging from layout to page",
      caption: "Metadata merges down the tree",
    },
  ],
  examples: [
    {
      id: "jsonld",
      title: "JSON-LD",
      about: "Structured data in RSC.",
      language: "typescript",
      code: "<script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />\n",
    }
  ],
}),

nextTopic({
  slug: "next-image-font",
  title: "Image and font optimization",
  order: 16,
  summary: "next/image and next/font: CLS-safe assets on the Next server.",
  prerequisites: ["next-app-router"],
  related: ["perf-images", "perf-fonts"],
  isHighYield: false,
  oneLiner: "next/image serves resized, modern-format images with size attributes to prevent CLS, plus lazy loading by default. next/font self-hosts Google/local fonts, injects metrics, and avoids a render-blocking third-party CSS request. Both are Next features, not generic React.",
  beats: ["Always width/height or fill + sizes.", "Remote images need remotePatterns in next.config.", "Font subsetting and display: swap / optional."],
  intro: "CWV fixes that are one import away—still trip seniors who use <img>.",
  why: "LCP and CLS are often images and fonts.",
  concept: "The image optimizer is a server endpoint. Fonts become local @font-face.",
  how: "import Image from 'next/image'; import { Inter } from 'next/font/google'.",
  usage: "Heroes, avatars, marketing pages.",
  practices: "priority on LCP image. sizes matching your layout. Don't wrap every icon in next/image.",
  mistakes: "Unconfigured remote hosts. Huge unoptimized public/ dumps.",
  language: "typescript",
  caption: "Image and font optimization",
  code: "import Image from \"next/image\";\nimport { Inter } from \"next/font/google\";\nconst inter = Inter({ subsets: [\"latin\"] });\nexport default function Hero() {\n  return (\n    <div className={inter.className}>\n      <Image src=\"/hero.webp\" alt=\"\" width={1200} height={600} priority />\n    </div>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-assets.svg",
      alt: "image optimizer and self-hosted fonts",
      caption: "Optimizer + self-hosted fonts",
    },
  ],
  examples: [
    {
      id: "remote",
      title: "remotePatterns",
      about: "Allowlist hosts.",
      language: "typescript",
      code: "images: { remotePatterns: [{ protocol: \"https\", hostname: \"cdn.example.com\" }] }\n",
    }
  ],
}),

nextTopic({
  slug: "next-env",
  title: "Environment and runtime",
  order: 17,
  summary: "NEXT_PUBLIC_ vs server env, Edge vs Node, and secret boundaries.",
  prerequisites: ["next-rsc-islands"],
  related: ["next-deploy", "sec-secrets"],
  isHighYield: true,
  oneLiner: "Only NEXT_PUBLIC_* is inlined into the client bundle. Everything else is server-only. Edge runtime cannot use all Node APIs. Mixing them leaks secrets or breaks builds. Interviews: how would a secret reach the browser?",
  beats: ["NEXT_PUBLIC_ is not secret.", "Don't read process.env in Client Components for private keys.", "Edge: no native Node fs/net."],
  intro: "The security boundary is the bundler.",
  why: "Leaked keys are a common Next CVE class in apps, not the framework.",
  concept: "Inlined public env at build. Server env at runtime on the server.",
  how: "Put STRIPE_SECRET_KEY in the host. Read it only in actions/route handlers.",
  usage: "API keys, feature URLs, runtime=edge for middleware.",
  practices: "Validate env at boot with Zod. Separate preview vs prod.",
  mistakes: "Importing a server module from a Client Component 'just for a constant'.",
  language: "typescript",
  caption: "Environment and runtime",
  code: "const Schema = z.object({\n  DATABASE_URL: z.string().url(),\n  NEXT_PUBLIC_APP_URL: z.string().url(),\n});\nexport const env = Schema.parse(process.env);\n",
  figures: [
    {
      src: "/diagrams/next/next-env.svg",
      alt: "public env in bundle vs server secrets",
      caption: "Public vs server environment",
    },
  ],
  examples: [
    {
      id: "runtime",
      title: "Segment runtime",
      about: "Node is the default for most app routes.",
      language: "typescript",
      code: "export const runtime = \"nodejs\";\n",
    }
  ],
}),

nextTopic({
  slug: "next-deploy",
  title: "Deployment and output",
  order: 18,
  summary: "Node server, standalone output, Edge, ISR, and host differences (Vercel vs Node).",
  prerequisites: ["next-env", "next-caching"],
  related: ["next-middleware"],
  isHighYield: false,
  oneLiner: "next build produces a Node server (or standalone output) plus static assets. Hosts differ: Vercel maps Route Handlers and ISR natively; a Docker Node host needs the standalone output and a persistent cache story. Edge functions have CPU/time limits. Interviews: what happens to revalidateTag on a single-node vs multi-instance deploy?",
  beats: ["Standalone for Docker.", "ISR needs a shared cache or it is per-instance.", "Preview deployments get their own env."],
  intro: "Rendering mode meets operations.",
  why: "A cache that works locally can be wrong in a replica set.",
  concept: "CDN for static/_next/static; origin for dynamic. Tags need a cache handler in self-host.",
  how: "output: 'standalone'. Set cacheHandler for Redis if you scale out.",
  usage: "Vercel, containers, edge middleware at the CDN.",
  practices: "Health checks on a Route Handler. Don't store uploads on local disk.",
  mistakes: "Assuming filesystem ISR works across 10 pods.",
  language: "typescript",
  caption: "Deployment and output",
  code: "import type { NextConfig } from \"next\";\nconst nextConfig: NextConfig = { output: \"standalone\" };\nexport default nextConfig;\n",
  figures: [
    {
      src: "/diagrams/next/next-deploy.svg",
      alt: "CDN, origin, edge middleware",
      caption: "CDN, origin, and Edge",
    },
  ],
  examples: [
    {
      id: "isr",
      title: "Time-based revalidate",
      about: "Stale-while-revalidate on the Data Cache.",
      language: "typescript",
      code: "export const revalidate = 60;\n",
    }
  ],
}),
];
