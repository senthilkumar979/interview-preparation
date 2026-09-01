import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlImages: Topic = {
  slug: "html-images",
  title: "Images",
  technologySlug: "html",
  module: "HTML",
  order: 9,
  summary: "img, alt, srcset, sizes, picture, figure, and performance attributes.",
  prerequisites: ["html-inline"],
  related: ["html-media", "html-wcag"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-images.png",
      alt: "img with srcset and sizes, plus picture with source elements for format and art direction",
      caption: "src, srcset, and picture",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "`img` embeds an image. `alt` is required: describe the image if it informs, or use `alt=\"\"` if it is decorative. Never omit `alt`.",
    beats: [
      "Decorative: `alt=\"\"` so SRs skip it. Informative: concise description, not “image of…”. Linked image: alt describes the destination.",
      "`srcset` + `sizes` pick resolution. `picture` + `source` pick format (AVIF/WebP) or art direction (crop).",
      "`width` and `height` attributes reduce CLS. `loading=\"lazy\"` for below-the-fold. `decoding=\"async\"`. `fetchpriority=\"high\"` for LCP image.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Responsive image with dimensions",
    code: `<img
  src="/hero-800.webp"
  srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
  width="800"
  height="450"
  alt="Student reviewing an HTML roadmap"
  loading="eager"
  fetchpriority="high"
/>
`,
  },
  workedExamples: [
    {
      id: "picture",
      title: "picture for format and crop",
      about: "Art direction vs density descriptors.",
      language: "html",
      code: `<picture>
  <source type="image/avif" srcset="/hero.avif" />
  <source type="image/webp" srcset="/hero.webp" />
  <source media="(max-width: 600px)" srcset="/hero-mobile.jpg" />
  <img src="/hero.jpg" width="1200" height="675" alt="Workshop" />
</picture>
`,
    },
    {
      id: "figure",
      title: "figure and figcaption",
      about: "When the caption is part of the content.",
      language: "html",
      code: `<figure>
  <img src="/chart.svg" width="400" height="240" alt="Bar chart: 71% React prep complete" />
  <figcaption>Figure 1. Completion by track.</figcaption>
</figure>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Images are a WCAG, performance, and SEO topic in one tag. `alt` is non-negotiable.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`src` is required for `img`. SVG can be `img src` (no CSS internals) or inline `svg` (styleable). `object`/`embed` are legacy. CSS `background-image` is not content—no `alt`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Missing `alt` fails WCAG 1.1.1. Missing width/height shifts layout (CLS). Giant PNGs destroy LCP.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The browser picks a candidate from `srcset` using `sizes` and DPR. `picture` uses the first matching `source`. Broken `src` fires `error`; always have a fallback `img`.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Content photos with descriptive alt. Icons: inline SVG with `aria-hidden` if adjacent text exists, or `img` with alt. Avatars: alt with the person’s name.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Prefer modern formats. Don’t lazy-load the LCP image. Don’t put critical text only in an image. `alt` length: a phrase, not an essay.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Omitting `alt`. `alt=\"image\"`. Lazy-loading hero. Using `title` instead of `alt`. Empty `src`. Tracking pixels without `alt=\"\"`.",
    },
  ],
};
