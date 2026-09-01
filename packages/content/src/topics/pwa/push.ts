import { pwaTopic } from "./factory";

export const pwaPush = pwaTopic({
  slug: "pwa-push",
  title: "Push notifications",
  order: 12,
  summary: "Web Push: permission, Push API subscription, VAPID, and a service worker that shows the notification.",
  prerequisites: ["pwa-overview", "javascript-service-workers"],
  related: ["pwa-background-sync", "javascript-storage"],
  isHighYield: true,
  oneLiner:
    "The page asks Notification permission, then `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })`. The browser talks to a push service. Your backend stores the subscription and later sends a payload signed with VAPID. The service worker receives `push` and must `showNotification` (user-visible on most browsers).",
  beats: [
    "Requires a service worker. No DOM in the SW — use `registration.showNotification`.",
    "iOS: Add to Home Screen + permission; web push is limited compared with Android Chrome.",
    "Never send push from the client to other users — the server holds the subscription endpoint (a secret).",
  ],
  intro: "Push is why a PWA can re-engage like a native app. It is a three-party protocol: your origin, the browser’s push service, the user’s device.",
  why: "Interviewers want permission UX, the SW `push` handler, and why silent background push is restricted (`userVisibleOnly`).",
  concept:
    "Notification API (local, no server) vs Push API (server-originated). VAPID keys identify your server. Payload encryption (web-push libraries). Clicks: `notificationclick` → `clients.openWindow`. Closing: `notificationclose`.",
  how: "Generate VAPID keys on the server. Subscribe in the page after a user gesture. POST the subscription JSON to your API. On `push`, parse `event.data.json()` and `event.waitUntil(self.registration.showNotification(...))`.",
  usage: "Breaking news, chat, “your report is ready.” Not for analytics pings.",
  extras: [
    {
      key: "sw-events",
      title: "Service worker events for push",
      body: "`push` — incoming message; you must show a notification in Chromium when `userVisibleOnly` is true. `notificationclick` — focus an existing client or `openWindow`. `pushsubscriptionchange` — resubscribe if the browser rotates the endpoint. Combine with Background Sync if you need to fetch extra data after a tap.",
    },
  ],
  practices:
    "Ask permission in context, not on first paint. Store subscriptions per user and device. Respect quiet hours. Keep payloads small. Handle denied permission without loops.",
  mistakes:
    "Calling `Notification.requestPermission` on load. Putting VAPID private keys in the frontend. Assuming Safari iOS matches Chrome. Forgetting `waitUntil` so the SW dies before `showNotification`.",
  code: `const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
});
await fetch("/api/push/subscribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(sub),
});
`,
  examples: [
    {
      id: "sw-push",
      title: "SW `push` handler",
      about: "User-visible notification from the payload.",
      language: "javascript",
      code: `self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? { title: "PrepQuest", body: "New item" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/192.png",
      data: { url: data.url ?? "/" },
    }),
  );
});
`,
    },
    {
      id: "click",
      title: "`notificationclick`",
      about: "Focus a tab or open one.",
      language: "javascript",
      code: `self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    }),
  );
});
`,
    },
    {
      id: "local",
      title: "Local notification (no push server)",
      about: "Still needs permission; not remote.",
      language: "javascript",
      code: `await Notification.requestPermission();
new Notification("Saved offline", { body: "We will sync when you are online." });
`,
    },
  ],
});
