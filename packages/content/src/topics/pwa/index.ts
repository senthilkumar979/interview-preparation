import type { Topic } from "../../types";
import { pwaAppShell } from "./app-shell";
import { pwaBackgroundSync } from "./background-sync";
import { pwaCacheStrategies } from "./cache-strategies";
import { pwaCapabilities } from "./capabilities";
import { pwaDexie } from "./dexie";
import { pwaIndexeddb } from "./indexeddb";
import { pwaInstall } from "./install";
import { pwaManifest } from "./manifest";
import { pwaOverview } from "./overview";
import { pwaPush } from "./push";
import { pwaServiceWorker } from "./service-worker";
import { pwaUpdates } from "./updates";
import { pwaWorkbox } from "./workbox";

export const pwaCurriculumTopics: Topic[] = [
  pwaOverview,
  pwaManifest,
  pwaServiceWorker,
  pwaAppShell,
  pwaCacheStrategies,
  pwaWorkbox,
  pwaInstall,
  pwaUpdates,
  pwaIndexeddb,
  pwaDexie,
  pwaBackgroundSync,
  pwaPush,
  pwaCapabilities,
];
