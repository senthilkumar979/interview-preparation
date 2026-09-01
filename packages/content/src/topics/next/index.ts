import type { Topic } from "../../types";
import { nextDataTopics } from "./data";
import { nextMutateTopics } from "./mutate";
import { nextProdTopics } from "./prod";
import { nextRenderTopics } from "./render";
import { nextRoutingTopics } from "./routing";

export const nextCurriculumTopics: Topic[] = [
  ...nextRoutingTopics,
  ...nextDataTopics,
  ...nextRenderTopics,
  ...nextMutateTopics,
  ...nextProdTopics,
];
