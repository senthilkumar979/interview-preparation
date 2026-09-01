import type { Topic } from "../../types";
import { webAjax } from "./ajax";
import { webBrowserArchitecture } from "./architecture";
import { webCdn } from "./cdn";
import { webClientServer } from "./client-server";
import { webCriticalRenderingPath } from "./critical-path";
import { webDns } from "./dns";
import { webEvolution } from "./evolution";
import { webWhatHappensGoogle } from "./google";
import { webHttp } from "./http";
import { webHttps } from "./https";
import { webRenderingPipeline } from "./rendering";
import { webSpa } from "./spa";

export const webCurriculumTopics: Topic[] = [
  webEvolution,
  webClientServer,
  webDns,
  webHttp,
  webHttps,
  webWhatHappensGoogle,
  webBrowserArchitecture,
  webRenderingPipeline,
  webCriticalRenderingPath,
  webAjax,
  webSpa,
  webCdn,
];
