import type { Topic } from "../../types";
import { htmlAria } from "./aria";
import { htmlAttributes } from "./attributes";
import { htmlBlock } from "./block";
import { htmlButton } from "./button";
import { htmlColors } from "./colors";
import { htmlElements } from "./elements";
import { htmlFormatting } from "./formatting";
import { htmlForms } from "./forms";
import { htmlHeadings } from "./headings";
import { htmlImages } from "./images";
import { htmlInline } from "./inline";
import { htmlInputAttributes } from "./input-attributes";
import { htmlInputTypes } from "./input-types";
import { htmlLinks } from "./links";
import { htmlMedia } from "./media";
import { htmlMeta } from "./meta";
import { htmlParagraphs } from "./paragraphs";
import { htmlSemantics } from "./semantics";
import { htmlStyling } from "./styling";
import { htmlWcag } from "./wcag";

export const htmlCurriculumTopics: Topic[] = [
  htmlElements,
  htmlAttributes,
  htmlHeadings,
  htmlParagraphs,
  htmlBlock,
  htmlInline,
  htmlFormatting,
  htmlLinks,
  htmlImages,
  htmlButton,
  htmlStyling,
  htmlColors,
  htmlMeta,
  htmlSemantics,
  htmlForms,
  htmlInputTypes,
  htmlInputAttributes,
  htmlMedia,
  htmlAria,
  htmlWcag,
];
