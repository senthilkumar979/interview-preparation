import { pwaTopic } from "./factory";

export const pwaManifest = pwaTopic({
  slug: "pwa-manifest",
  title: "Web app manifest",
  order: 2,
  summary: "JSON that names the app, icons, start URL, display mode, and theme colors for install.",
  prerequisites: ["pwa-overview"],
  related: ["pwa-overview", "pwa-install", "pwa-capabilities"],
  oneLiner:
    "The web app manifest is a JSON file (`manifest.webmanifest`) linked with `rel=\"manifest\"`. Browsers use it for the install surface: `name`, `icons`, `start_url`, `display`, `theme_color`, `background_color`, `id` (when supported).",
  beats: [
    "`display: standalone` hides browser chrome. `scope` limits which URLs belong to the app.",
    "Icons: 192 and 512 PNG; `purpose: \"maskable\"` for adaptive icons on Android.",
    "`id` (Chromium) stabilizes identity across URL changes. `start_url` should be in `scope`.",
  ],
  intro: "Without a valid manifest, Chromium will not offer install even if the SW is perfect.",
  why: "Home-screen name, splash, and window chrome all come from this file.",
  concept:
    "A W3C manifest members map. MIME type `application/manifest+json`. Can include `shortcuts`, `share_target`, `file_handlers`, `protocol_handlers` as progressive extras.",
  how: "Host at `/manifest.webmanifest`. Link from every installable document. Keep `start_url` absolute or root-relative. Match `theme_color` with the document meta for the title bar.",
  usage: "Install prompts, splash screens, related apps (`related_applications`).",
  practices: "Generate maskable icons with safe padding. Don’t put secrets in the manifest (it is public). Bump `id` only when you intend a new app identity.",
  mistakes: "Wrong MIME type. `start_url` 404. Tiny icons only. `display: browser` when you wanted an app window.",
  language: "json",
  code: `{
  "name": "PrepQuest",
  "short_name": "PrepQuest",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#FFFDF8",
  "theme_color": "#EDAE49",
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
`,
  examples: [
    {
      id: "link",
      title: "Link from HTML",
      about: "Also set theme-color meta for the tab while uninstalled.",
      language: "html",
      code: `<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#EDAE49" />
`,
    },
  ],
});
