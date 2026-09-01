import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlAria: Topic = {
  slug: "html-aria",
  title: "ARIA attributes",
  technologySlug: "html",
  module: "HTML",
  order: 19,
  summary: "Every aria-* attribute, what it is for, and when HTML already does the job.",
  prerequisites: ["html-semantics", "html-forms"],
  related: ["html-wcag", "html-button"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "First rule of ARIA: don’t use it if a native element already does the job. `role` plus `aria-*` states and properties describe the accessibility tree—they do not add keyboard behavior.",
    beats: [
      "Attributes fall into widget, live region, drag-and-drop, and relationship groups. Many are global (allowed on any element unless the role forbids naming).",
      "Name: `aria-labelledby` (preferred when visible text exists) then `aria-label`. Description: `aria-describedby`, `aria-description`, `aria-details`.",
      "Keep states in sync with the UI (`aria-expanded`, `aria-checked`, `aria-hidden`). Never hide a focused node with `aria-hidden=\"true\"`.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Names, relationships, and a live state",
    code: `<button type="button" aria-expanded="false" aria-controls="filters" aria-haspopup="true">
  Filters
</button>
<div id="filters" hidden>
  <p id="hint">Narrow the HTML track.</p>
  <input type="search" aria-label="Filter topics" aria-describedby="hint" />
</div>
<p role="status" aria-live="polite">3 topics match.</p>
`,
  },
  workedExamples: [
    {
      id: "first-rule",
      title: "Native beats ARIA",
      about: "A real checkbox already has a role and checked state.",
      language: "html",
      code: `<label><input type="checkbox" name="ok" /> I agree</label>

<!-- Avoid unless you implement keyboard + aria-checked yourself -->
<div role="checkbox" aria-checked="false" tabindex="0">I agree</div>
`,
    },
    {
      id: "names",
      title: "labelledby vs label vs description",
      about: "Visible text wins. aria-label overrides visible names—easy to lie.",
      language: "html",
      code: `<div role="dialog" aria-labelledby="title" aria-describedby="blurb">
  <h2 id="title">Delete topic?</h2>
  <p id="blurb">This cannot be undone.</p>
</div>

<button type="button" aria-label="Close">✕</button>
`,
    },
    {
      id: "errors",
      title: "aria-invalid and aria-errormessage",
      about: "The error container is only announced when the field is invalid.",
      language: "html",
      code: `<label for="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-errormessage="email-err"
  aria-required="true"
/>
<p id="email-err">Use a work email, not a nickname.</p>
`,
    },
    {
      id: "live",
      title: "Live regions",
      about: "status is polite; alert is assertive. Don’t live-region the whole app.",
      language: "html",
      code: `<p role="status" aria-live="polite" aria-atomic="true">Saved.</p>
<div role="alert">Session expired.</div>
<div aria-busy="true">Loading topics…</div>
`,
    },
    {
      id: "composite",
      title: "Tabs: selected, controls, activedescendant pattern",
      about: "Roving tabindex or aria-activedescendant—never both half-done.",
      language: "html",
      code: `<div role="tablist" aria-label="HTML sections">
  <button type="button" role="tab" aria-selected="true" aria-controls="panel-aria" id="tab-aria">
    ARIA
  </button>
  <button type="button" role="tab" aria-selected="false" aria-controls="panel-wcag" id="tab-wcag">
    WCAG
  </button>
</div>
<div role="tabpanel" id="panel-aria" aria-labelledby="tab-aria">…</div>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "ARIA is a contract with the accessibility tree. `role` says what the widget is. `aria-*` attributes say how it is named, how it relates to other nodes, and what state it is in right now. JavaScript still has to implement focus and keys.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`role` is not an `aria-*` attribute but it is the other half of ARIA. Prefer implicit roles from HTML (`button`, `nav`, `main`, `dialog`). Use `role=\"presentation\"` / `none` to strip implied semantics (for example on a layout table). Naming is forbidden on presentation/none. Global attributes apply to almost every element; widget attributes only make sense on matching roles.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "WCAG 4.1.2 Name, Role, Value is mostly this topic. Wrong or stale ARIA is worse than no ARIA: the screen reader trusts the lie. Interviews expect the first rule, naming precedence, and a working knowledge of the catalog below.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The browser maps DOM + HTML semantics + ARIA → accessibility tree. Host-language semantics usually win unless ARIA overrides them. `aria-hidden=\"true\"` removes the subtree from that tree; it does not hide pixels. IDREF attributes (`aria-labelledby`, `aria-controls`, `aria-owns`, …) take space-separated ids. Token attributes take a fixed vocabulary (`aria-live=\"polite\"`).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Icon buttons: `aria-label`. Nav current page: `aria-current=\"page\"`. Disclosure: `aria-expanded` + `aria-controls`. Dialog: `aria-labelledby` + `aria-modal`. Toasts: `role=\"status\"` / `aria-live=\"polite\"`. Custom sliders: `aria-valuemin` / `max` / `now`. Virtualized lists: `aria-posinset` + `aria-setsize`.",
    },
    {
      key: "aria-naming",
      title: "Naming and description",
      body: "`aria-label` — Accessible name as a string. Use when there is no visible text (icon-only). Do not copy a visible label here; it overrides what sighted users see.\n\n`aria-labelledby` — Name comes from one or more element ids (order of ids is the name order). Preferred when the name is already on screen (dialog title, group heading).\n\n`aria-describedby` — Extra description from ids (hints, help text). Not the name. Often paired with inputs.\n\n`aria-description` — Description as a raw string when you cannot point at an element. Prefer `aria-describedby` if the text is visible.\n\n`aria-details` — Points at richer related content (a footnote, a chart description) that the user can navigate to—not a short hint.\n\n`aria-roledescription` — Localized replacement for the spoken role (“slide”, “card”). Easy to confuse users; use rarely.\n\n`aria-braillelabel` — Name intended for braille displays.\n\n`aria-brailleroledescription` — Role description intended for braille.",
    },
    {
      key: "aria-widget-states",
      title: "Widget states",
      body: "`aria-checked` — `true` | `false` | `mixed` on checkbox, radio, switch, menuitemcheckbox, treeitem. Native `input` already exposes this.\n\n`aria-pressed` — Toggle button pressed state: `true` | `false` | `mixed`. Distinct from `aria-checked`.\n\n`aria-selected` — Selected option in tabs, listbox, grid, tree. Only one tab `true` in a single-select tablist.\n\n`aria-expanded` — Disclosure, combobox, treeitem, accordion: whether the controlled content is shown. Keep it in sync with `hidden`/CSS.\n\n`aria-invalid` — `false` | `true` | `grammar` | `spelling`. Value failed validation. Pair with an error.\n\n`aria-disabled` — Perceivable but not operable. Unlike HTML `disabled`, it may still be focusable depending on how you implement it—prefer native `disabled` on form controls.\n\n`aria-busy` — Subtree is still updating; ATs may wait. Useful while a live region is being filled.\n\n`aria-current` — This item is the current one in a set: `page` | `step` | `location` | `date` | `time` | `true` | `false`. Pagination and nav use `page`.\n\n`aria-hidden` — `true` hides from the accessibility tree (decorative SVGs, duplicate text). Never on a focused or focusable ancestor of focus.\n\n`aria-modal` — Dialog is modal (inert background). Does not trap focus by itself.\n\n`aria-grabbed` — Deprecated drag state (`true`/`false`). Prefer HTML Drag and Drop + modern patterns.\n\n`aria-dropeffect` — Deprecated. What happens on drop (`copy`, `move`, `link`, `execute`, `popup`, `none`).",
    },
    {
      key: "aria-widget-props",
      title: "Widget properties",
      body: "`aria-autocomplete` — Combobox/search/textbox suggestions: `none` | `inline` | `list` | `both`.\n\n`aria-haspopup` — This control opens a popup: `false` | `true` | `menu` | `listbox` | `tree` | `grid` | `dialog`. `true` means a menu.\n\n`aria-multiline` — Custom `role=\"textbox\"` is multi-line (like `textarea`). Native `textarea` already implies this.\n\n`aria-multiselectable` — More than one descendant can be `aria-selected` (listbox, grid, tree).\n\n`aria-orientation` — `horizontal` | `vertical` | `undefined` for toolbars, sliders, tablists.\n\n`aria-placeholder` — Hint when a custom textbox is empty. Native `placeholder` already exists; don’t use placeholder as the only label.\n\n`aria-readonly` — Operable but not editable. Prefer HTML `readonly` on inputs.\n\n`aria-required` — Must be filled before submit. Prefer HTML `required` on native fields; still useful on custom comboboxes.\n\n`aria-keyshortcuts` — Author-implemented shortcut string for ATs (`Alt+Shift+A`). Document it visually too.\n\n`aria-level` — Heading/treeitem/nested depth (`1`–`6` for headings). Prefer real `h1`–`h6`.\n\n`aria-posinset` — 1-based index in a set when not all items are in the DOM (virtualized lists).\n\n`aria-setsize` — Total size of that set (`-1` if unknown).\n\n`aria-sort` — Column header sort: `ascending` | `descending` | `none` | `other`.",
    },
    {
      key: "aria-range",
      title: "Range values (slider, spinbutton, progress, scrollbar, meter)",
      body: "`aria-valuemin` — Minimum numeric value.\n\n`aria-valuemax` — Maximum numeric value.\n\n`aria-valuenow` — Current numeric value. Required when the range is not indeterminate.\n\n`aria-valuetext` — Spoken substitute when the number is not what you want read (“Monday”, “8 of 10”). Prefer this over forcing users to hear raw numbers.",
    },
    {
      key: "aria-live",
      title: "Live region attributes",
      body: "`aria-live` — `off` | `polite` | `assertive`. Politely wait for a pause; assertive interrupt. Implicit on `role=\"status\"` (polite) and `role=\"alert\"` / `role=\"log\"` variants. Do not mark the whole page live.\n\n`aria-atomic` — `true` reads the entire region on change; `false` (default) reads only what changed.\n\n`aria-relevant` — Which mutations to announce: `additions` | `removals` | `text` | `all` (and combinations). Default is additions + text. Rarely need to change this.\n\n`aria-busy` — Also listed as a widget state: hold announcements until the batch update finishes, then set `false`.",
    },
    {
      key: "aria-relationships",
      title: "Relationship attributes",
      body: "`aria-controls` — This element controls the contents or visibility of the referenced ids (tabs → panels, button → dialog).\n\n`aria-owns` — Parent/child in the accessibility tree when the DOM parent is wrong (portal menus). Easy to break the tree—use only when layout forces it.\n\n`aria-activedescendant` — Focus stays on a container; this id is the active descendant (combobox list, custom listbox). The descendant must be in the tree.\n\n`aria-flowto` — Alternate reading order to the referenced id(s). Almost never used; source order is clearer.\n\n`aria-errormessage` — Ids of the error message. Typically active when `aria-invalid` is not `false`.\n\n`aria-labelledby` / `aria-describedby` / `aria-details` — Also relationships; listed under naming because that is how you use them.",
    },
    {
      key: "aria-tables",
      title: "Grid, table, and treegrid",
      body: "`aria-colcount` — Total columns when the DOM is a slice (virtualized grid).\n\n`aria-colindex` — 1-based column position of this cell or header.\n\n`aria-colindextext` — Human text instead of the numeric index.\n\n`aria-colspan` — Columns this cell spans. Prefer HTML `colspan` on real tables.\n\n`aria-rowcount` — Total rows in the full data set.\n\n`aria-rowindex` — 1-based row position.\n\n`aria-rowindextext` — Human text instead of the numeric index.\n\n`aria-rowspan` — Rows this cell spans. Prefer HTML `rowspan`.\n\nPrefer `<table>`, `<th scope>`, `<thead>` over rebuilding tables with `role=\"grid\"` unless you need spreadsheet keyboard interaction.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "HTML first. If you set a widget role, implement the APG keyboard model. Sync every state attribute with the visual UI. Test with VoiceOver or NVDA, not only axe. One polite live region for toasts. Name icon buttons. Label multiple landmarks.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`role=\"button\"` on a `div` without Enter/Space. `aria-label` disagreeing with visible text. `aria-hidden` on a focused control. `aria-expanded` never flipping. Using `aria-live=\"assertive\"` for every save. `aria-owns` duplicating real DOM children. Assuming ARIA changes click behavior.",
    },
  ],
};
