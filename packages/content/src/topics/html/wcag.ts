import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlWcag: Topic = {
  slug: "html-wcag",
  title: "WCAG",
  technologySlug: "html",
  module: "HTML",
  order: 20,
  summary: "WCAG 2.2 POUR, guidelines, and every success criterion with level and use.",
  prerequisites: ["html-aria", "html-colors"],
  related: ["html-semantics", "html-forms", "html-media"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "WCAG 2.2 is a testable standard under four principles—POUR. Conformance is usually Level AA (all A + AA success criteria). You meet most of it with semantic HTML, visible names, keyboard, contrast, and captions—not a plugin.",
    beats: [
      "Structure: 4 principles → 13 guidelines → success criteria at A / AA / AAA. AAA is rarely a legal target; some AAA SCs conflict with each other.",
      "New in 2.2 (know these in interviews): 2.4.11 focus not obscured, 2.5.7 dragging, 2.5.8 24px targets, 3.2.6 consistent help, 3.3.7 redundant entry, 3.3.8 accessible authentication. 4.1.1 Parsing is obsolete.",
      "Laws map here: EAA / EN 301 549, Section 508, many ADA settlements → 2.1 or 2.2 AA. APG techniques are not WCAG itself.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Markup that already hits several A/AA criteria",
    code: `<html lang="en">
  <body>
    <a href="#main">Skip to content</a>
    <nav aria-label="Primary">
      <a href="/roadmap/html" aria-current="page">HTML</a>
    </nav>
    <main id="main">
      <h1>WCAG</h1>
      <img src="/chart.png" alt="Bar chart: 80% of candidates miss form labels" />
      <form>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" />
        <button type="submit">Continue</button>
      </form>
    </main>
  </body>
</html>
`,
  },
  workedExamples: [
    {
      id: "contrast",
      title: "1.4.3 Contrast (Minimum)",
      about: "AA body text 4.5:1; large text (18pt or 14pt bold) 3:1. UI 3:1 is 1.4.11.",
      language: "html",
      code: `<p style="color: #edae49; background: #fffdf8">Gold on cream often fails 1.4.3</p>
<p style="color: #1f2937; background: #fffdf8">Dark text on cream passes more easily</p>
`,
    },
    {
      id: "focus-order",
      title: "2.4.3 Focus Order and 2.4.7 Focus Visible",
      about: "Source order is the order. Never outline: none without a replacement.",
      language: "html",
      code: `<button type="button">First</button>
<button type="button">Second</button>
<style>
  :focus-visible { outline: 3px solid #1f2937; outline-offset: 2px; }
</style>
`,
    },
    {
      id: "errors",
      title: "3.3.1–3.3.3 Errors and labels",
      about: "Name the field, describe the error in text, suggest a fix when you can.",
      language: "html",
      code: `<label for="email">Email</label>
<input id="email" name="email" type="email" aria-invalid="true" aria-describedby="email-err" />
<p id="email-err">Enter an email like name@company.com.</p>
`,
    },
    {
      id: "auth-22",
      title: "3.3.8 Accessible Authentication (Minimum)",
      about: "Don’t force users to recall a code they must type from memory (cognitive test).",
      language: "html",
      code: `<!-- Bad: paste blocked, no password manager friendly name -->
<input type="text" autocomplete="off" />

<!-- Better: allow paste + autocomplete tokens -->
<label for="otp">One-time code</label>
<input id="otp" name="otp" autocomplete="one-time-code" inputmode="numeric" />
`,
    },
    {
      id: "status",
      title: "4.1.3 Status Messages",
      about: "Toasts must be announced without moving focus.",
      language: "html",
      code: `<p role="status" aria-live="polite">Topic saved.</p>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "WCAG (Web Content Accessibility Guidelines) is the W3C standard interviews, RFPs, and regulators use. Version 2.2 is the current Recommendation. You implement it in HTML, CSS, JS focus management, and media—not by sprinkling ARIA.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Four principles (POUR). Thirteen guidelines (the 1.1, 2.4, … numbers). Success criteria (1.1.1, 2.4.7, …) are the testable statements. Level A is the floor; AA is the usual bar (includes all A); AAA is enhanced. Conformance is claimed per page (or a complete process). 2.0 ⊂ 2.1 ⊂ 2.2: meeting 2.2 AA also meets 2.1 AA and 2.0 AA. 4.1.1 Parsing was removed in 2.2—don’t treat it as a current SC.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "EAA, EN 301 549, Section 508, and many contracts cite WCAG AA. Common lawsuit facts: no alt, no keyboard, no captions, unlabeled buttons, color-only errors. Brand colors still have to pass 1.4.3 / 1.4.11.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Each SC is pass/fail for the page. Techniques (H37, ARIA6, G18, …) are informative ways to pass—not the requirement. Failures (F65, …) are documented anti-patterns. Automation (axe, Lighthouse) finds a minority of issues. You still need keyboard, zoom/reflow, contrast, SR, and captions checks. Conformance exceptions for third-party widgets still need a policy.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Design tokens encode 1.4.3 and 1.4.11. Components encode 2.4.7, 2.5.8, 1.3.1. Forms encode 1.3.5, 3.3.x, 3.3.8. SPAs must not break 2.4.3 (focus after route change) or 4.1.2. Media players implement 1.2.x.",
    },
    {
      key: "wcag-11",
      title: "1.1 Text alternatives",
      body: "`1.1.1 Non-text Content` (A) — Images, icons, canvases, and image buttons need a text alternative that serves the same purpose. Controls need an accessible name. Decorative images: empty `alt=\"\"`. Charts need a short name plus a long description nearby. CAPTCHA needs an alternate modality. Filename `alt` fails.",
    },
    {
      key: "wcag-12",
      title: "1.2 Time-based media",
      body: "`1.2.1 Audio-only and Video-only (Prerecorded)` (A) — Prerecorded audio gets a transcript; video-only gets a transcript or audio description.\n\n`1.2.2 Captions (Prerecorded)` (A) — Synchronized captions for prerecorded video with audio. Use `<track kind=\"captions\">`.\n\n`1.2.3 Audio Description or Media Alternative (Prerecorded)` (A) — Either a full text alternative or audio description of important visuals.\n\n`1.2.4 Captions (Live)` (AA) — Live synchronized captions (webinars, streams).\n\n`1.2.5 Audio Description (Prerecorded)` (AA) — Audio description of video, not only a transcript (stricter than 1.2.3).\n\n`1.2.6 Sign Language (Prerecorded)` (AAA) — Sign language interpretation of audio.\n\n`1.2.7 Extended Audio Description (Prerecorded)` (AAA) — Pause the video when description needs more time.\n\n`1.2.8 Media Alternative (Prerecorded)` (AAA) — A full text alternative for all prerecorded synchronized media.\n\n`1.2.9 Audio-only (Live)` (AAA) — Live audio has a text alternative (live captions/transcript).",
    },
    {
      key: "wcag-13",
      title: "1.3 Adaptable",
      body: "`1.3.1 Info and Relationships` (A) — Structure in markup, not only visuals: headings, lists, tables with `th`/`scope`, `label`/`fieldset`, landmarks. Don’t fake a heading with bold CSS alone.\n\n`1.3.2 Meaningful Sequence` (A) — Reading and focus order match the meaning. CSS visual order that disagrees with the DOM fails.\n\n`1.3.3 Sensory Characteristics` (A) — Don’t instruct “click the round button on the left” as the only cue. Pair with name/text.\n\n`1.3.4 Orientation` (AA) — Don’t lock to portrait or landscape unless essential (e.g. a piano app).\n\n`1.3.5 Identify Input Purpose` (AA) — Use `autocomplete` tokens (`email`, `name`, `current-password`) so browsers and ATs can fill personal fields.\n\n`1.3.6 Identify Purpose` (AAA) — Mark UI purpose with landmarks, `autocomplete`, or semantics so user agents can adapt (e.g. simplify the UI).",
    },
    {
      key: "wcag-14",
      title: "1.4 Distinguishable",
      body: "`1.4.1 Use of Color` (A) — Color is not the only way to show meaning (errors, required, charts). Add text or an icon.\n\n`1.4.2 Audio Control` (A) — If audio plays automatically for more than 3 seconds, provide pause/stop/volume independent of the system.\n\n`1.4.3 Contrast (Minimum)` (AA) — Text 4.5:1 against background; large text 3:1. Incidental/disabled/logotypes have exceptions.\n\n`1.4.4 Resize Text` (AA) — Text can be resized to 200% without loss of content or function. Don’t disable pinch-zoom (`user-scalable=no`).\n\n`1.4.5 Images of Text` (AA) — Prefer real text over pictures of words, except logos or when essential.\n\n`1.4.6 Contrast (Enhanced)` (AAA) — 7:1 text; 4.5:1 large text.\n\n`1.4.7 Low or No Background Audio` (AAA) — Speech foreground; background at least 20 dB quieter or off.\n\n`1.4.8 Visual Presentation` (AAA) — User control of foreground/background, width, line spacing, text alignment, no horizontal scroll of text.\n\n`1.4.9 Images of Text (No Exception)` (AAA) — Images of text only for decoration or where essential (logo).\n\n`1.4.10 Reflow` (AA) — At 320 CSS px width, content reflows without two-dimensional scrolling except for things that need two axes (maps, data tables, toolbars).\n\n`1.4.11 Non-text Contrast` (AA) — UI components and graphical objects needed to understand content: 3:1 against adjacent colors (focus ring, icons, input borders).\n\n`1.4.12 Text Spacing` (AA) — If a user sets line height 1.5×, paragraph spacing 2× font size, letter spacing 0.12 em, word spacing 0.16 em, nothing is clipped or overlapped.\n\n`1.4.13 Content on Hover or Focus` (AA) — Tooltips/popovers that appear on hover or focus are dismissible, hoverable, and persistent until dismissed or focus moves (unless the user triggered it or the message is an error).",
    },
    {
      key: "wcag-21",
      title: "2.1 Keyboard accessible",
      body: "`2.1.1 Keyboard` (A) — All functionality is available from a keyboard, except paths that depend on the path of movement (freehand drawing). Custom widgets need Tab/Enter/Space/arrows as appropriate.\n\n`2.1.2 No Keyboard Trap` (A) — Focus can move away using the keyboard. If you trap in a modal, Escape (or documented keys) must exit.\n\n`2.1.3 Keyboard (No Exception)` (AAA) — Keyboard even for path-dependent input.\n\n`2.1.4 Character Key Shortcuts` (A) — Single-character shortcuts can be turned off, remapped, or only work when the component has focus (so SR browse mode doesn’t fire them).",
    },
    {
      key: "wcag-22",
      title: "2.2 Enough time",
      body: "`2.2.1 Timing Adjustable` (A) — Time limits can be turned off, adjusted (at least 10×), or extended via a warning (at least 20 seconds) unless real-time or essential.\n\n`2.2.2 Pause, Stop, Hide` (A) — Moving, blinking, scrolling, or auto-updating content that lasts more than 5 seconds and is parallel to other content can be paused, stopped, or hidden. Carousels need a pause control.\n\n`2.2.3 No Timing` (AAA) — Timing is not an essential part of the event except for real-time.\n\n`2.2.4 Interruptions` (AAA) — Interruptions can be postponed or suppressed except emergencies.\n\n`2.2.5 Re-authenticating` (AAA) — After a session expires, data is preserved when the user re-authenticates.\n\n`2.2.6 Timeouts` (AAA) — Warn users of inactivity timeouts that could cause data loss, unless the data is preserved for more than 20 hours.",
    },
    {
      key: "wcag-23",
      title: "2.3 Seizures and physical reactions",
      body: "`2.3.1 Three Flashes or Below Threshold` (A) — Nothing flashes more than three times per second, or the flash is below the general/red flash thresholds.\n\n`2.3.2 Three Flashes` (AAA) — No three flashes in any 1-second period, without the threshold exception.\n\n`2.3.3 Animation from Interactions` (AAA) — Motion animation triggered by interaction can be disabled unless essential (`prefers-reduced-motion`).",
    },
    {
      key: "wcag-24",
      title: "2.4 Navigable",
      body: "`2.4.1 Bypass Blocks` (A) — Skip link, landmarks, or headings so users skip repeated chrome.\n\n`2.4.2 Page Titled` (A) — `<title>` describes topic or purpose; unique per route.\n\n`2.4.3 Focus Order` (A) — Tab order preserves meaning and operability. Avoid positive `tabindex`.\n\n`2.4.4 Link Purpose (In Context)` (A) — Link text plus surrounding context (sentence, list item, table cell, heading) describes the destination. Avoid “click here” with no context.\n\n`2.4.5 Multiple Ways` (AA) — More than one way to find a page (nav + search, or sitemap)—except pages that are a step in a process.\n\n`2.4.6 Headings and Labels` (AA) — Headings and labels describe topic or purpose (quality of the text, not just that they exist—existence is 1.3.1).\n\n`2.4.7 Focus Visible` (AA) — Keyboard focus has a visible indicator.\n\n`2.4.8 Location` (AAA) — The user can tell where they are in a set of pages (breadcrumbs, current step).\n\n`2.4.9 Link Purpose (Link Only)` (AAA) — Link text alone is enough, without extra context.\n\n`2.4.10 Section Headings` (AAA) — Sections have headings.\n\n`2.4.11 Focus Not Obscured (Minimum)` (AA, new in 2.2) — When a component receives focus, it is not entirely hidden by author-created content (sticky headers, cookie banners).\n\n`2.4.12 Focus Not Obscured (Enhanced)` (AAA, 2.2) — Focus is not hidden at all by author content.\n\n`2.4.13 Focus Appearance` (AAA, 2.2) — Focus indicator meets minimum size and contrast rules (area and 3:1 against unfocused state).",
    },
    {
      key: "wcag-25",
      title: "2.5 Input modalities",
      body: "`2.5.1 Pointer Gestures` (A) — Multipoint or path-based gestures have a single-pointer equivalent (pinch-zoom can stay if a button also zooms).\n\n`2.5.2 Pointer Cancellation` (A) — Down-event doesn’t complete the action; completion is on up, and it can be aborted (don’t fire on `pointerdown` only).\n\n`2.5.3 Label in Name` (A) — Visible label text is included in the accessible name so voice control works. Don’t `aria-label` a button “Submit form” when it says “Save”.\n\n`2.5.4 Motion Actuation` (A) — Shake/tilt features have a UI alternative and can be disabled.\n\n`2.5.5 Target Size (Enhanced)` (AAA) — Targets at least 44×44 CSS pixels, with exceptions.\n\n`2.5.6 Concurrent Input Mechanisms` (AAA) — Don’t force only touch or only mouse; allow multiple input methods unless essential.\n\n`2.5.7 Dragging Movements` (AA, 2.2) — Functionality that uses dragging has a single-pointer alternative that doesn’t require a path (buttons to reorder, not only drag).\n\n`2.5.8 Target Size (Minimum)` (AA, 2.2) — Targets at least 24×24 CSS pixels, or spaced so a 24px circle on the target doesn’t intersect another, with exceptions (inline links, user-agent control, essential).",
    },
    {
      key: "wcag-31",
      title: "3.1 Readable",
      body: "`3.1.1 Language of Page` (A) — `lang` on `<html>` (e.g. `en`, `en-GB`).\n\n`3.1.2 Language of Parts` (AA) — `lang` on passages in another language.\n\n`3.1.3 Unusual Words` (AAA) — Mechanism for definitions of idioms and jargon (`dfn`, glossary).\n\n`3.1.4 Abbreviations` (AAA) — Expansion of abbreviations (`abbr` with expansion, glossary).\n\n`3.1.5 Reading Level` (AAA) — Supplemental content when text requires more than lower secondary reading ability, or a simpler version.\n\n`3.1.6 Pronunciation` (AAA) — Mechanism for pronunciation when meaning depends on it.",
    },
    {
      key: "wcag-32",
      title: "3.2 Predictable",
      body: "`3.2.1 On Focus` (A) — Focusing a control does not cause a change of context (no auto-submit or new window on Tab).\n\n`3.2.2 On Input` (A) — Changing a setting doesn’t automatically change context unless the user was warned. Don’t navigate away on `change` of a select without a button.\n\n`3.2.3 Consistent Navigation` (AA) — Repeated nav occurs in the same relative order across pages.\n\n`3.2.4 Consistent Identification` (AA) — Same functional icons/controls are named the same way across pages.\n\n`3.2.5 Change on Request` (AAA) — Changes of context only on user request, or a mechanism to turn them off.\n\n`3.2.6 Consistent Help` (A, new in 2.2) — If help (contact, chat, self-help, FAQ) is provided on multiple pages, it is in a consistent relative order.",
    },
    {
      key: "wcag-33",
      title: "3.3 Input assistance",
      body: "`3.3.1 Error Identification` (A) — Errors are identified in text and the item in error is identified. Red border alone fails 1.4.1 + this.\n\n`3.3.2 Labels or Instructions` (A) — Labels or instructions when content requires input. Placeholder is not a label.\n\n`3.3.3 Error Suggestion` (AA) — Suggestions for fixing the error when known, unless it would jeopardize security.\n\n`3.3.4 Error Prevention (Legal, Financial, Data)` (AA) — Submissions that cause legal/financial commitments or modify/delete user data are reversible, checked, or confirmed.\n\n`3.3.5 Help` (AAA) — Context-sensitive help is available.\n\n`3.3.6 Error Prevention (All)` (AAA) — Same as 3.3.4 but for all user submissions.\n\n`3.3.7 Redundant Entry` (A, 2.2) — Don’t ask for information the user already entered in the same process, unless essential, required for security, or previously entered data is still available to select.\n\n`3.3.8 Accessible Authentication (Minimum)` (AA, 2.2) — A cognitive function test (remembering a password) is not the only way, unless you allow paste/password managers (no blocking copy-paste; don’t require transcribing a personal code from an image as the only factor without an alternative).\n\n`3.3.9 Accessible Authentication (Enhanced)` (AAA, 2.2) — No cognitive function test at all (object recognition or personal content transcription not required).",
    },
    {
      key: "wcag-41",
      title: "4.1 Compatible",
      body: "`4.1.1 Parsing` — Obsolete in WCAG 2.2. Old requirement about unique ids and complete tags. Browsers recover from soup; don’t cite this as a current SC.\n\n`4.1.2 Name, Role, Value` (A) — UI components expose name, role, state, and value to AT, and notifications of changes. Native HTML does this; custom widgets need roles + `aria-*` + keyboard.\n\n`4.1.3 Status Messages` (AA) — Status messages can be presented by AT without receiving focus (`role=\"status\"`, `role=\"alert\"`, `aria-live`). Don’t move focus to a toast unless you mean to.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Target WCAG 2.2 AA. Semantic HTML first. Visible, unobstructed focus. Captions for video. Don’t lock zoom or orientation. `lang`, unique `title`, labels, `autocomplete`. Document 2.2-only SCs in the design system (24px targets, no drag-only, auth paste, sticky header vs 2.4.11).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Claiming compliance from Lighthouse alone. `outline: none` with no 2.4.7 replacement. Sticky cookie banners covering focus (2.4.11). Placeholder-only labels. Color-only errors. CAPTCHA with no alternate. Disabling paste on passwords (3.3.8). Assuming AAA is required. Treating 4.1.1 as still in force.",
    },
  ],
};
