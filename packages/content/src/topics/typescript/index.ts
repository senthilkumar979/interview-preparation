import type { Topic } from "../../types";
import { typescriptAdvancedTopics } from "./advanced";
import { typescriptAliasTopics } from "./aliases";
import { typescriptClassTopics } from "./classes";
import { typescriptCollectionTopics } from "./collections";
import { typescriptGenericTopics } from "./generics";
import { typescriptIntroTopics } from "./intro";
import { typescriptOperatorTopics } from "./operators";
import { typescriptToolingTopics } from "./tooling";
import { typescriptTypeTopics } from "./types";
import { typescriptUnionTopics } from "./unions";

export const typescriptCurriculumTopics: Topic[] = [
  ...typescriptIntroTopics,
  ...typescriptTypeTopics,
  ...typescriptAliasTopics,
  ...typescriptUnionTopics,
  ...typescriptOperatorTopics,
  ...typescriptGenericTopics,
  ...typescriptAdvancedTopics,
  ...typescriptCollectionTopics,
  ...typescriptClassTopics,
  ...typescriptToolingTopics,
];
