export type ExperienceLevel = "junior" | "medior" | "senior" | "expert";

export type TopicStatus = "not_started" | "in_progress" | "completed" | "locked";

export interface Role {
  slug: string;
  name: string;
  description: string;
}

export interface Technology {
  slug: string;
  name: string;
  roleSlug: string;
  description: string;
}

export interface TopicSection {
  key: string;
  title: string;
  body: string;
}

export interface TopicCodeExample {
  language: "javascript" | "typescript" | "json" | "html" | "css";
  code: string;
  caption?: string;
}

export interface InterviewAnswer {
  oneLiner: string;
  beats: string[];
}

export interface WorkedExample {
  id: string;
  title: string;
  about: string;
  language: "javascript" | "typescript" | "html" | "css";
  code: string;
}

export interface TopicFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface Topic {
  slug: string;
  title: string;
  technologySlug: string;
  module: string;
  order: number;
  summary: string;
  prerequisites: string[];
  related: string[];
  levels: ExperienceLevel[];
  isHighYield: boolean;
  interviewAnswer?: InterviewAnswer;
  workedExamples?: WorkedExample[];
  sections: TopicSection[];
  codeExample?: TopicCodeExample;
  figures?: TopicFigure[];
}

export interface RoadmapNode {
  slug: string;
  title: string;
  isContentReady: boolean;
  prerequisites: string[];
}

export type FrameworkSlug = "react" | "angular" | "vue";

export interface CurriculumTopic {
  slug: string;
  title: string;
  summary: string;
  isContentReady: boolean;
}

export interface CurriculumTrack {
  slug: string;
  title: string;
  description: string;
  framework?: FrameworkSlug;
  topics: CurriculumTopic[];
}
