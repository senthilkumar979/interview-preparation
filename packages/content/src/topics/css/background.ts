import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssBackground: Topic = {
  slug: "css-background",
  title: "Background",
  technologySlug: "css",
  module: "CSS",
  order: 22,
  summary: "Color, image, position, size, repeat, attachment, clip, and layers.",
  prerequisites: ["css-box-model"],
  related: ["css-shadows", "html-colors"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`background` layers images over a color. Commas stack layers (first is top). Size (`cover`/`contain`), position, repeat, and `background-clip` control painting. Color is always the bottom-most.",
    beats: [
      "`background-size: cover` fills and crops; `contain` letterboxes. `background-position: center`.",
      "`background-clip: text` with transparent fill for gradient text (prefix in some engines).",
      "Multiple backgrounds: `url(fg), url(bg), #fffdf8`. Shorthand can reset other longhands—set color last.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Color, gradient, and image",
    code: `.hero {
  background-color: #fffdf8;
  background-image: linear-gradient(180deg, rgb(237 174 73 / 0.15), transparent),
    url("/hero.webp");
  background-size: auto, cover;
  background-position: center;
  background-repeat: no-repeat;
}
`,
  },
  workedExamples: [
    {
      id: "clip",
      title: "clip and origin",
      about: "Padding-box vs content-box vs text.",
      language: "css",
      code: `.well {
  padding: 1rem;
  background: #edae49;
  background-clip: content-box;
}
`,
    },
    {
      id: "fixed",
      title: "attachment fixed",
      about: "Parallax-ish; costly and often disabled on mobile.",
      language: "css",
      code: `.parallax {
  background-image: url("/scene.webp");
  background-attachment: fixed;
  background-size: cover;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Backgrounds paint the box. They don’t add layout size (unlike borders).",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`background-origin`. `background-blend-mode`. Gradients are images (`linear-` `radial-` `conic-`). `image-set()` for DPR. SVG `url()`. `background-repeat: round | space`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Contrast of text over photos (overlays). Performance of huge images. Shorthand accidentally clearing `background-color`.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Each comma-separated layer has its own image/position/size/repeat. Color fills what images don’t cover.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Page cream. Card white. Hero cover. Checkered transparency boards. Gradient borders via extra layers or `border-image`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Always set a color under images. Compress WebP. Prefer CSS gradients to image files for simple fills. Respect `prefers-reduced-transparency` when relevant.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`background: url()` wiping color. `cover` on a non-overflow hidden box looking “wrong”. Text on a busy photo without overlay. `fixed` jank.",
    },
  ],
};
