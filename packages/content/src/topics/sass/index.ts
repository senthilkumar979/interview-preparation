import type { Topic } from "../../types";
import { sassBuiltIn } from "./built-in";
import { sassControl } from "./control";
import { sassFunctions } from "./functions";
import { sassInheritance } from "./inheritance";
import { sassInterpolation } from "./interpolation";
import { sassMaps } from "./maps";
import { sassMixins } from "./mixins";
import { sassModules } from "./modules";
import { sassNesting } from "./nesting";
import { sassOperators } from "./operators";
import { sassParentSelector } from "./parent-selector";
import { sassPartials } from "./partials";
import { sassPreprocessing } from "./preprocessing";
import { sassScssVsSass } from "./scss-vs-sass";
import { sassVariables } from "./variables";

export const sassCurriculumTopics: Topic[] = [
  sassPreprocessing,
  sassScssVsSass,
  sassVariables,
  sassNesting,
  sassParentSelector,
  sassInterpolation,
  sassPartials,
  sassModules,
  sassMixins,
  sassFunctions,
  sassInheritance,
  sassOperators,
  sassControl,
  sassMaps,
  sassBuiltIn,
];
