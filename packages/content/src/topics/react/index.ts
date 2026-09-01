import type { Topic } from "../../types";
import { reactCompare } from "./compare";
import { reactConcurrentTopics } from "./concurrent-rsc";
import { reactCustomHookTopic } from "./custom-hooks";
import { reactErrorTopics } from "./errors";
import { reactHookTopics } from "./hooks-core";
import { reactHookMoreTopics } from "./hooks-more";
import { reactIntroTopics } from "./intro";
import { react19Topics } from "./react19";
import { reactStateTopics } from "./state";
import { reactUiTopics } from "./ui-patterns";
import { reactVdomTopics } from "./vdom";

export const reactCurriculumTopics: Topic[] = [
  ...reactIntroTopics,
  ...reactVdomTopics,
  ...reactStateTopics,
  reactCompare,
  ...reactHookTopics,
  ...reactHookMoreTopics,
  reactCustomHookTopic,
  ...reactUiTopics,
  ...reactErrorTopics,
  ...reactConcurrentTopics,
  ...react19Topics,
];
