import { pwaTopic } from "./factory";

export const pwaInstall = pwaTopic({
  slug: "pwa-install",
  title: "Installability and prompts",
  order: 7,
  summary: "`beforeinstallprompt`, Add to Home Screen, and what Chromium vs iOS actually require.",
  prerequisites: ["pwa-manifest", "pwa-service-worker"],
  related: ["pwa-overview"],
  isHighYield: true,
  oneLiner:
    "Chromium may fire `beforeinstallprompt` when the PWA criteria are met; you `preventDefault`, show your own UI, then `prompt()`. iOS Safari has no that event — users use Share → Add to Home Screen, and web push/install rules are stricter. Standalone is `display-mode: standalone`.",
  beats: [
    "Criteria (Chromium, simplified): HTTPS, manifest with icons/name/start_url/display, SW with fetch handler, user engagement.",
    "Storing the event is required — if you miss it, you cannot prompt later in that visit.",
    "Do not nag on first paint. Installed apps should hide the install button (`getInstalledRelatedApps` / display-mode).",
  ],
  intro: "Install is optional for usefulness (offline still works in the tab) but it is the “app” in PWA for product people.",
  why: "Custom install buttons fail silently if you do not capture `beforeinstallprompt`.",
  concept:
    "`beforeinstallprompt` → user gesture → `prompt()` → `userChoice`. `appinstalled` event. Related apps in the manifest can suppress the mini-infobar.",
  how: "Listen on `window`. Save `deferredPrompt`. On your Install click, `deferredPrompt.prompt()`. On iOS, show a one-time tooltip for the Share sheet.",
  usage: "Marketing sites, tools you want on the home screen.",
  practices: "Detect iOS vs Chromium. Respect dismissal. Check `matchMedia('(display-mode: standalone)')` to avoid asking installed users.",
  mistakes: "Calling `prompt()` without a gesture. Assuming every browser has `beforeinstallprompt`. Requiring install to use the product.",
  code: `let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});
installBtn.onclick = async () => {
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
};
`,
  examples: [
    {
      id: "standalone",
      title: "Already installed?",
      about: "Hide the CTA in standalone.",
      language: "javascript",
      code: `const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
if (isStandalone) installBtn.hidden = true;
`,
    },
  ],
});
