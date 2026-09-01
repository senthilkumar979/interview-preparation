import { pwaTopic } from "./factory";

export const pwaCapabilities = pwaTopic({
  slug: "pwa-capabilities",
  title: "PWA capabilities",
  order: 13,
  summary: "Shortcuts, Web Share, badges, file handlers — progressive APIs on top of install.",
  prerequisites: ["pwa-manifest", "pwa-install"],
  related: ["pwa-push"],
  oneLiner:
    "After install, a PWA can declare `shortcuts` (home-screen long-press), `share_target` / Web Share, `file_handlers`, protocol handlers, and app badges (`navigator.setAppBadge`). Each is optional and capability-detected. They do not replace the core trio of HTTPS, manifest, and service worker.",
  beats: [
    "`navigator.share({ title, url })` is outbound share; `share_target` in the manifest is inbound.",
    "Badges are not notifications — they are a numeric or flag on the icon, and need permission on some platforms.",
    "File/protocol handlers are Chromium-heavy; always provide an in-app fallback.",
  ],
  intro: "Product interviews wander here: “can it receive a share from Photos?” Know the names and the fallback.",
  why: "Shows you know PWA is a platform surface, not only a cache.",
  concept:
    "Progressive enhancement. Manifest members vs JS APIs. Permissions and OS UI differ by desktop vs Android vs iOS.",
  how: "Add `shortcuts` arrays to the manifest. Feature-detect `navigator.share` and `navigator.setAppBadge`. Register file handlers only if you handle the MIME types you claim.",
  usage: "Notes apps (share target), unread counts (badge), “New quest” shortcut.",
  practices: "Keep shortcuts to 3–4. Never rely on badge for critical info. Test uninstall/reinstall.",
  mistakes: "Assuming iOS has the full Chromium capability set. Using share without a user gesture.",
  language: "json",
  code: `{
  "shortcuts": [
    {
      "name": "New note",
      "url": "/notes/new",
      "icons": [{ "src": "/icons/shortcut.png", "sizes": "96x96" }]
    }
  ]
}
`,
  examples: [
    {
      id: "share",
      title: "Web Share",
      about: "User-gesture outbound share.",
      language: "javascript",
      code: `if (navigator.share) {
  await navigator.share({ title: "PrepQuest", url: location.href });
}
`,
    },
    {
      id: "badge",
      title: "App badge",
      about: "Unread count on the icon.",
      language: "javascript",
      code: `if ("setAppBadge" in navigator) await navigator.setAppBadge(3);
`,
    },
  ],
});
