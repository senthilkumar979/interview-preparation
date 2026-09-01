import { webTopic } from "./factory";

export const webBrowserArchitecture = webTopic({
  slug: "web-browser-architecture",
  title: "Browser architecture",
  order: 7,
  summary: "Multi-process browsers: UI, network, GPU, storage, and sandboxed renderers with site isolation.",
  prerequisites: ["web-what-happens-google"],
  related: ["web-rendering-pipeline", "javascript-event-loop"],
  isHighYield: true,
  oneLiner:
    "Modern browsers (Chromium-style) are multi-process: a browser process owns chrome and orchestration; a network process talks to the internet; a GPU process talks to the graphics API; renderer processes run Blink + V8 sandboxed per site; storage and utility processes isolate extra work. They talk over IPC — a tab crash should not kill the browser.",
  beats: [
    "Renderer = DOM, CSS, JS, layout for a site. It must not have raw disk or unrestricted network.",
    "Site Isolation: different sites (scheme+eTLD+1) get different renderer processes so Spectre-class leaks are harder.",
    "Compositor/GPU: layers are rasterized and composited off the main renderer thread when possible.",
  ],
  intro: "“The browser” is not one program loop. Interviews that ask for architecture want this process map, then the rendering pipeline inside a renderer.",
  why: "Explains why one hung tab does not freeze others, why iframes from other sites are isolated, and where DevTools “main thread” lives (the renderer’s main thread).",
  concept:
    "Privilege separation. The browser process is highly trusted. Renderers are sandboxed. Network is centralized so cookies and cache have one policy brain. Extensions may get their own processes.",
  how: "User opens a tab → browser process asks for a renderer (maybe spare/warm) → navigation is coordinated with the network process → bytes stream into the renderer → Blink parses → V8 runs scripts → compositor submits frames to the GPU process → pixels to the screen.",
  usage: "Chrome Task Manager, site isolation, “why is my extension a separate process,” out-of-process iframes (OOPIF).",
  extras: [
    {
      key: "browser-process",
      title: "1. Browser (UI) process",
      body: "Owns the window chrome: tabs strip, address bar, bookmarks, permissions prompts. Coordinates navigations and process spawning. Keeps the profile (cookie database handles via storage). If this dies, the whole browser dies. It must not run arbitrary page JS.",
    },
    {
      key: "network-process",
      title: "2. Network process",
      body: "DNS (with the OS), sockets, TLS, HTTP, HTTP cache, cookie attachment according to policy. Renderers request resources through it (with CORS and mixed-content checks applied). Centralizing network prevents each renderer from holding raw sockets and cookie jars.",
    },
    {
      key: "gpu-process",
      title: "3. GPU process",
      body: "Talks to Metal/Vulkan/D3D/OpenGL. Receives compositor tiles/layers, rasterizes (often via GPU raster), composites the frame, vsync. Isolates GPU driver crashes from tabs. Software fallback exists when GPU is blocked.",
    },
    {
      key: "renderer-process",
      title: "4. Renderer process (Blink + V8)",
      body: "Per-site (ideally) sandboxed process. Threads inside it: main thread (parse, style, layout, JS), compositor thread (scroll, some animations), worker threads, raster threads. This is where “the event loop” and “layout thrashing” live. No DOM access from other processes except via IPC/postMessage-like browser plumbing.",
    },
    {
      key: "storage-utility",
      title: "5. Storage, GPU, and utility processes",
      body: "Storage process: IndexedDB, Cache Storage, cookies persistence. Utility: audio, speech, QR, etc. Plugin/PDF may be separate. Service workers run in a renderer-like process bound to the origin, not in the tab’s UI process.",
    },
    {
      key: "site-isolation",
      title: "6. Site Isolation and OOPIF",
      body: "A site is scheme + registrable domain. `https://a.com` and `https://b.com` should not share a renderer. Cross-site iframes are out-of-process (OOPIF) so `parent.document` is not a shared address space. Trade-off: more memory, more IPC.",
    },
    {
      key: "ipc",
      title: "7. IPC",
      body: "Mojo/IPC messages: “navigate,” “paint this frame,” “here is a cookie.” High frequency between compositor and GPU. Security: renderers cannot send “write this file” without going through privileged brokers.",
    },
  ],
  practices: "When debugging jank, name the thread (renderer main vs compositor). When debugging leaks, name the process (renderer vs GPU).",
  mistakes: "Saying JS runs in the browser UI process. Claiming all tabs share one JS heap. Ignoring that iframes can be other processes.",
  figures: [
    {
      src: "/diagrams/web/web-browser-architecture.png",
      alt: "Browser, network, GPU, storage, and isolated renderer processes",
      caption: "Chromium-style process model",
    },
  ],
  language: "javascript",
  code: `// Page JS runs in a renderer — not in the UI process
console.log(location.origin);
`,
  examples: [
    {
      id: "iframe",
      title: "Cross-site iframe",
      about: "Likely another renderer (OOPIF).",
      language: "html",
      code: `<iframe src="https://other-site.example/widget"></iframe>
`,
    },
  ],
});
