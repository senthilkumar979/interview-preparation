import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlMedia: Topic = {
  slug: "html-media",
  title: "Media",
  technologySlug: "html",
  module: "HTML",
  order: 18,
  summary: "audio, video, source, track, picture, iframe, and captions.",
  prerequisites: ["html-images"],
  related: ["html-semantics", "html-wcag"],
  levels: htmlLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`audio` and `video` are native players with `src` or nested `source` elements. Captions use `track kind=\"captions\"`. Don’t autoplay with sound.",
    beats: [
      "`controls` exposes the UA UI. `preload`, `loop`, `muted`, `playsinline` (iOS). `poster` on video.",
      "Multiple `source` with `type` let the browser pick WebM vs MP4. `track` WebVTT for captions/subtitles/descriptions.",
      "`iframe` embeds documents—sandbox, `allow`, `referrerpolicy`, `title`. `picture` still belongs with images.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Video with captions",
    code: `<video controls poster="/intro.jpg" width="640" height="360">
  <source src="/intro.webm" type="video/webm" />
  <source src="/intro.mp4" type="video/mp4" />
  <track kind="captions" src="/intro-en.vtt" srclang="en" label="English" default />
  Download the <a href="/intro.mp4">MP4</a>.
</video>
`,
  },
  workedExamples: [
    {
      id: "audio",
      title: "Audio with fallback",
      about: "Same source-stacking pattern as video.",
      language: "html",
      code: `<audio controls>
  <source src="/briefing.ogg" type="audio/ogg" />
  <source src="/briefing.mp3" type="audio/mpeg" />
</audio>
`,
    },
    {
      id: "iframe-sandbox",
      title: "iframe sandbox and title",
      about: "Untrusted embeds need a name and a tight sandbox.",
      language: "html",
      code: `<iframe
  title="PrepQuest trailer on YouTube"
  src="https://www.youtube-nocookie.com/embed/dQw4w9wg"
  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin allow-presentation"
  loading="lazy"
></iframe>
`,
    },
    {
      id: "autoplay",
      title: "Muted autoplay policy",
      about: "Browsers block unmuted autoplay; interviews expect this.",
      language: "html",
      code: `<video autoplay muted playsinline loop>
  <source src="/bg.mp4" type="video/mp4" />
</video>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Media elements replace plugin-era Flash. Accessibility and autoplay policy are the interview meat.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`MediaError` codes, `canPlayType`. `crossorigin` for canvas-tainted video. `controlslist` (non-standard-ish) hides download. `object`/`embed` are legacy. SVG can be inline or `img`/`object`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "WCAG 1.2 requires captions for prerecorded video with audio. Autoplay with sound is hostile and often blocked. Iframes without `title` fail 4.1.2.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The UA picks the first playable `source`. `track` cues render in a shadow-like overlay. Fullscreen and PiP are separate APIs. Lazy iframes defer network until near viewport.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Course trailers, podcast players, YouTube embeds, background loops (muted). Prefer native controls; custom players must reimplement keyboard and captions.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Always offer captions. Don’t autoplay sound. `title` every iframe. Prefer `youtube-nocookie`. Provide a download fallback in the element’s content.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`autoplay` without `muted`. Captions as burned-in-only with no track. Sandbox so tight the embed cannot play. Missing width/height causing layout shift on video.",
    },
  ],
};
