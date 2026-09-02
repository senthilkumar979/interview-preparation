import {
  experienceLevels,
  getCurriculumTracks,
  getTopic,
  resolveFramework,
  roles,
  technologies,
  type CurriculumTopic,
  type CurriculumTrack,
  type ExperienceLevel,
} from "@prepquest/content";
import type { AppUser } from "@/lib/session-types";

export type TopicChipState = "completed" | "current" | "ready" | "soon";

export interface TrackTopicView {
  slug: string;
  title: string;
  summary: string;
  state: TopicChipState;
  href: string | null;
  levels: ExperienceLevel[];
  isHighYield: boolean;
}

export interface TrackView {
  slug: string;
  title: string;
  description: string;
  index: number;
  completedCount: number;
  topicCount: number;
  topics: TrackTopicView[];
}

export function buildTrackViews(completed: Set<string>, frameworkSlug?: string | null): TrackView[] {
  const tracks = getCurriculumTracks(frameworkSlug);
  const ready = tracks.flatMap((track) => track.topics).filter((topic) => topic.isContentReady);
  const currentSlug = ready.find((topic) => !completed.has(topic.slug))?.slug;

  return tracks.map((track, index) => toTrackView(track, index, completed, currentSlug));
}

export function getTrackView(
  slug: string,
  completed: Set<string>,
  frameworkSlug?: string | null,
): TrackView | null {
  const tracks = getCurriculumTracks(frameworkSlug);
  const index = tracks.findIndex((track) => track.slug === slug);
  if (index < 0) return null;
  const track = tracks[index];
  if (!track) return null;
  const ready = track.topics.filter((topic) => topic.isContentReady);
  const currentSlug = ready.find((topic) => !completed.has(topic.slug))?.slug;
  return toTrackView(track, index, completed, currentSlug);
}

function toTrackView(
  track: CurriculumTrack,
  index: number,
  completed: Set<string>,
  currentSlug: string | undefined,
): TrackView {
  const total = track.topics.length;
  const topics = track.topics.map((topic, topicIndex) =>
    toTopicView(topic, completed, currentSlug, topicIndex, total),
  );
  return {
    slug: track.slug,
    title: track.title,
    description: track.description,
    index,
    completedCount: topics.filter((topic) => topic.state === "completed").length,
    topicCount: topics.length,
    topics,
  };
}

function toTopicView(
  topic: CurriculumTopic,
  completed: Set<string>,
  currentSlug: string | undefined,
  topicIndex: number,
  topicCount: number,
): TrackTopicView {
  const state: TopicChipState = !topic.isContentReady
    ? "soon"
    : completed.has(topic.slug)
      ? "completed"
      : topic.slug === currentSlug
        ? "current"
        : "ready";

  const content = getTopic(topic.slug);

  return {
    slug: topic.slug,
    title: topic.title,
    summary: topic.summary,
    state,
    href: topic.isContentReady ? `/learn/${topic.slug}` : null,
    levels: resolveTopicLevels(content?.levels, topicIndex, topicCount),
    isHighYield: content?.isHighYield ?? false,
  };
}

function resolveTopicLevels(
  levels: ExperienceLevel[] | undefined,
  topicIndex: number,
  topicCount: number,
): ExperienceLevel[] {
  if (levels && levels.length > 0 && levels.length < 4) return levels;
  return [bandDifficulty(topicIndex, topicCount)];
}

function bandDifficulty(topicIndex: number, topicCount: number): ExperienceLevel {
  const ratio = topicCount <= 1 ? 0 : topicIndex / (topicCount - 1);
  if (ratio < 0.25) return "junior";
  if (ratio < 0.5) return "medior";
  if (ratio < 0.75) return "senior";
  return "expert";
}

export function roadmapMeta(user: AppUser) {
  const role = roles.find((item) => item.slug === user.roleSlug)?.name ?? "Frontend Developer";
  const framework = resolveFramework(user.technologySlug);
  const tech = technologies.find((item) => item.slug === framework)?.name ?? "React";
  const level =
    experienceLevels.find((item) => item.slug === user.experienceLevel)?.name ?? "Junior";
  return { role, tech, level };
}
