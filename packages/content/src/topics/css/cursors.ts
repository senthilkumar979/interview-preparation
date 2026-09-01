import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssCursors: Topic = {
  slug: "css-cursors",
  title: "Cursors & pointers",
  technologySlug: "css",
  module: "CSS",
  order: 29,
  summary: "cursor keywords, URLs, pointer-events, and touch vs mouse.",
  prerequisites: ["css-pseudo-classes"],
  related: ["css-opacity", "html-button"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`cursor` sets the pointing-device glyph (`pointer` for links, `not-allowed` for disabled, `text` for copy). `pointer-events` decides whether hit-testing sees the box. Cursors do not fire on most phones—never use cursor as the only affordance.",
    beats: [
      "`cursor: pointer` on clickable non-link controls. Don’t put it on static text. `grab` / `grabbing` for drag.",
      "`pointer-events: none` lets clicks pass through overlays; restore `auto` on children that must receive clicks.",
      "`touch-action` (manipulation, pan-y) is not cursor but is the pointer/touch partner—prevents browser gestures.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Affordances and a pass-through layer",
    code: `button:disabled,
[aria-disabled="true"] {
  cursor: not-allowed;
}

.hotspot { cursor: pointer; }

.scrim {
  pointer-events: none;
}
.scrim .dialog {
  pointer-events: auto;
}
`,
  },
  workedExamples: [
    {
      id: "url",
      title: "Custom cursor with fallback",
      about: "Hotspot coordinates after the URL.",
      language: "css",
      code: `.canvas {
  cursor: url("/cross.png") 12 12, crosshair;
}
`,
    },
    {
      id: "touch-action",
      title: "touch-action",
      about: "Stop double-tap zoom on a map, keep pan.",
      language: "css",
      code: `.map { touch-action: pan-x pan-y; }
.button { touch-action: manipulation; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Cursor is a desktop hint. Pointer-events is hit-testing. Together they make custom widgets feel native—or broken.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Keywords: `auto` `default` `none` `context-menu` `help` `pointer` `progress` `wait` `cell` `crosshair` `text` `vertical-text` `alias` `copy` `move` `no-drop` `not-allowed` `grab` `grabbing` `all-scroll` `col-resize` `row-resize` `n-resize` `e-resize` `s-resize` `w-resize` `ne-resize` `nw-resize` `se-resize` `sw-resize` `ew-resize` `ns-resize` `nesw-resize` `nwse-resize` `zoom-in` `zoom-out`. `caret-color` is the text insertion caret, not the cursor glyph.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Users learn clickability from `pointer`. Disabled `not-allowed` plus `pointer-events: none` can block tooltips—sometimes you want events for the title. Overlays that swallow clicks.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Hit testing walks the stacking/paint order. `pointer-events: none` skips the box. SVG has its own `pointer-events` values (`stroke`, `fill`).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Buttons, resize handles, maps, loading `progress`/`wait`. Modal scrims that must catch clicks (`auto`) vs decorative (`none`).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`pointer` only on actual controls. Pair disabled cursor with disabled semantics. `touch-action: manipulation` on buttons to remove 300ms-style delays. Don’t hide the cursor (`none`) except kiosk/games.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`cursor: pointer` on the whole card when only the title is a link. `pointer-events: none` on a parent and wondering why the button is dead. Using cursor instead of a real `<button>`.",
    },
  ],
};
