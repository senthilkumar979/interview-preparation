import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlFormatting: Topic = {
  slug: "html-formatting",
  title: "Formatting",
  technologySlug: "html",
  module: "HTML",
  order: 7,
  summary: "strong vs b, em vs i, mark, small, del/ins, sub/sup—meaning first.",
  prerequisites: ["html-inline"],
  related: ["html-styling", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "Formatting tags are semantic when the living standard gives them meaning: `strong` is importance, `em` is stress emphasis, `b`/`i` are stylistic offsets without extra importance.",
    beats: [
      "`strong` ≠ bold CSS. `em` ≠ italic CSS. Voice browsers change announcement for `em`/`strong`.",
      "`mark` is a highlight relevant to the user (search hit). `small` is side comments, not “make it 12px”.",
      "`del`/`ins` are edits. `s` is no longer accurate. `u` is misspelling/proper name annotation—usually avoid for underline.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Meaning, not just font",
    code: `<p>
  <strong>Warning:</strong> never store passwords in
  <code>localStorage</code>.
  Search matched <mark>closure</mark>.
</p>
<p><del>var</del> <ins>let</ins> in loops.</p>
`,
  },
  workedExamples: [
    {
      id: "strong-em",
      title: "strong/em vs b/i",
      about: "The sentence you should say in an interview.",
      language: "html",
      code: `<p><strong>Required</strong> fields are marked with *.</p>
<p>I <em>did</em> close over the latest state.</p>
<p>The ship was named <i lang="la">Erebus</i>.</p>
<p>Product name in docs: <b>PrepQuest</b> (offset, not urgent).</p>
`,
    },
    {
      id: "code-kbd",
      title: "code, kbd, pre",
      about: "Computer output vs user input vs blocks of code.",
      language: "html",
      code: `<p>Press <kbd>Ctrl</kbd>+<kbd>C</kbd>.</p>
<p>The function is <code>getUser()</code>.</p>
<pre><code>const x = 1;</code></pre>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Presentational HTML (`font`, `center`, `big`) is obsolete. Use elements with meaning, then CSS.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`abbr` needs `title` for expansion. `time` uses `datetime`. `data` uses `value`. `q` is an inline quote (browsers add quotation marks). `cite` is the title of a work.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Translation, TTS, and default UA styles all key off these tags. CSS-only bold loses importance for SRs.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "These are phrasing elements. Nested `em` can invert stress. `ruby`/`rt`/`rp` annotate East Asian pronunciation.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Docs: `code` + `pre`. Changelog: `ins`/`del`. Search UI: `mark`. Legal: `small` for disclaimers (still readable).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Don’t fake headings with `bold`. Don’t underline non-links. Expand abbreviations on first use.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<b>` for every title. `<u>` for links. `<i>` for icons without `aria-hidden` and a real text alternative. Empty `<em>` for spacing.",
    },
  ],
};
