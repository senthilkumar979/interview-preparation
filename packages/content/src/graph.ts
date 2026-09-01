import { cssCurriculumTopics } from "./topics/css";
import { htmlCurriculumTopics } from "./topics/html";
import { javascriptCurriculumTopics } from "./topics/javascript";
import { pwaCurriculumTopics } from "./topics/pwa";
import { sassCurriculumTopics } from "./topics/sass";
import { typescriptCurriculumTopics } from "./topics/typescript";
import { ecmascriptCurriculumTopics } from "./topics/ecmascript";
import { webCurriculumTopics } from "./topics/web";
import type { RoadmapNode, Topic } from "./types";

export const topics: Topic[] = [
  ...webCurriculumTopics,
  ...htmlCurriculumTopics,
  ...cssCurriculumTopics,
  ...sassCurriculumTopics,
  ...javascriptCurriculumTopics,
  ...pwaCurriculumTopics,
  ...typescriptCurriculumTopics,
  ...ecmascriptCurriculumTopics,
];

const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string): Topic | undefined {
  return topicBySlug.get(slug);
}

export function getTopicsByTechnology(technologySlug: string): Topic[] {
  return topics
    .filter((topic) => topic.technologySlug === technologySlug)
    .sort((a, b) => a.order - b.order);
}

function orderedSiblings(currentSlug: string): Topic[] | null {
  const current = topicBySlug.get(currentSlug);
  if (!current) return null;
  return getTopicsByTechnology(current.technologySlug);
}

export function getNextTopicSlug(currentSlug: string): string | null {
  const ordered = orderedSiblings(currentSlug);
  if (!ordered) return null;
  const index = ordered.findIndex((topic) => topic.slug === currentSlug);
  if (index < 0 || index === ordered.length - 1) return null;
  return ordered[index + 1]?.slug ?? null;
}

export function getPreviousTopicSlug(currentSlug: string): string | null {
  const ordered = orderedSiblings(currentSlug);
  if (!ordered) return null;
  const index = ordered.findIndex((topic) => topic.slug === currentSlug);
  if (index <= 0) return null;
  return ordered[index - 1]?.slug ?? null;
}

export const placeholderRoadmapNodes: RoadmapNode[] = [];

export function getRoadmap(): RoadmapNode[] {
  const fromTopics: RoadmapNode[] = topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    isContentReady: true,
    prerequisites: topic.prerequisites,
  }));

  return [...placeholderRoadmapNodes, ...fromTopics];
}

export function topologicalRoadmap(): RoadmapNode[] {
  const nodes = getRoadmap();
  const remaining = new Map(nodes.map((node) => [node.slug, node]));
  const ordered: RoadmapNode[] = [];

  while (remaining.size > 0) {
    const ready = [...remaining.values()].filter((node) =>
      node.prerequisites.every((prereq) => !remaining.has(prereq)),
    );

    if (ready.length === 0) {
      ordered.push(...remaining.values());
      break;
    }

    ready.sort((a, b) => a.title.localeCompare(b.title));
    for (const node of ready) {
      ordered.push(node);
      remaining.delete(node.slug);
    }
  }

  return ordered;
}

export function isTopicUnlocked(
  slug: string,
  completedSlugs: ReadonlySet<string>,
): boolean {
  const node = getRoadmap().find((item) => item.slug === slug);
  if (!node) return false;
  if (!node.isContentReady) return false;
  return node.prerequisites.every((prereq) => {
    const prereqNode = getRoadmap().find((item) => item.slug === prereq);
    if (!prereqNode) return true;
    if (!prereqNode.isContentReady) return true;
    return completedSlugs.has(prereq);
  });
}
