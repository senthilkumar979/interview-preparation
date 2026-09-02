import { cssCurriculumTopics } from "../topics/css";
import { htmlCurriculumTopics } from "../topics/html";
import { javascriptCurriculumTopics } from "../topics/javascript";
import { quizPackageFromTopic } from "./quiz-from-topic";
import type { QuizPackage } from "./types";

export const htmlTopicQuizzes: QuizPackage[] = htmlCurriculumTopics.map((topic) =>
  quizPackageFromTopic(topic, htmlCurriculumTopics, "html"),
);

export const cssTopicQuizzes: QuizPackage[] = cssCurriculumTopics.map((topic) =>
  quizPackageFromTopic(topic, cssCurriculumTopics, "css"),
);

export const javascriptTopicQuizzes: QuizPackage[] = javascriptCurriculumTopics.map((topic) =>
  quizPackageFromTopic(topic, javascriptCurriculumTopics, "javascript"),
);
