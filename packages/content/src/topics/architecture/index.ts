import type { Topic } from "../../types";
import { architectureApiAuthObsTopics } from "./api-auth-obs";
import { architectureAtomicAndStateTopics } from "./atomic-state";
import { architectureOtherTopics } from "./other";
import { architecturePatternTopicsA } from "./patterns-a";
import { architecturePatternTopicsB } from "./patterns-b";
import { architecturePatternTopicsC } from "./patterns-c";
import { architectureRenderingTopicsA } from "./rendering-a";
import { architectureRenderingTopicsB } from "./rendering-b";
import { architectureStyleTopics } from "./styles";

export const architectureCurriculumTopics: Topic[] = [
  ...architecturePatternTopicsA,
  ...architecturePatternTopicsB,
  ...architecturePatternTopicsC,
  ...architectureStyleTopics,
  ...architectureAtomicAndStateTopics,
  ...architectureRenderingTopicsA,
  ...architectureRenderingTopicsB,
  ...architectureApiAuthObsTopics,
  ...architectureOtherTopics,
];
