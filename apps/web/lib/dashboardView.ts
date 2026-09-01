import { getTopic } from "@prepquest/content";
import { buildTrackViews, roadmapMeta, type TrackView } from "@/lib/roadmapView";
import type { AppUser, ProgressMap } from "@/lib/session-types";
import { completedSet } from "@/lib/session";

export interface TrackBar {
  slug: string;
  title: string;
  completed: number;
  total: number;
  percent: number;
}

export interface DashboardTopic {
  slug: string;
  title: string;
  summary: string;
  href: string;
  trackTitle: string;
}

export interface DashboardModel {
  greeting: string;
  displayName: string;
  role: string;
  tech: string;
  level: string;
  completed: number;
  inProgress: number;
  remaining: number;
  notStarted: number;
  readyTotal: number;
  percent: number;
  tracksComplete: number;
  tracksTotal: number;
  highYieldDone: number;
  highYieldTotal: number;
  trackBars: TrackBar[];
  nextTopic: DashboardTopic | null;
  inProgressTopics: DashboardTopic[];
}

export function buildDashboardModel(
  user: AppUser,
  progress: ProgressMap,
  hour = new Date().getHours(),
): DashboardModel {
  const completed = completedSet(progress);
  const tracks = buildTrackViews(completed, user.technologySlug);
  const ready = tracks.flatMap((track) =>
    track.topics.filter((topic) => topic.state !== "soon"),
  );
  const readySlugs = new Set(ready.map((topic) => topic.slug));
  const completedCount = ready.filter((topic) => topic.state === "completed").length;
  const inProgress = Object.entries(progress).filter(
    ([slug, status]) => status === "in_progress" && readySlugs.has(slug),
  ).length;
  const remaining = Math.max(0, ready.length - completedCount);
  const notStarted = Math.max(0, ready.length - completedCount - inProgress);
  const current = ready.find((topic) => topic.state === "current");
  const { role, tech, level } = roadmapMeta(user);
  const highYield = ready.filter((topic) => getTopic(topic.slug)?.isHighYield);

  return {
    greeting: greetingForHour(hour),
    displayName: user.displayName,
    role,
    tech,
    level,
    completed: completedCount,
    inProgress,
    remaining,
    notStarted,
    readyTotal: ready.length,
    percent: ready.length === 0 ? 0 : Math.round((completedCount / ready.length) * 100),
    tracksComplete: tracks.filter((track) => track.topicCount > 0 && track.completedCount === track.topicCount)
      .length,
    tracksTotal: tracks.length,
    highYieldDone: highYield.filter((topic) => topic.state === "completed").length,
    highYieldTotal: highYield.length,
    trackBars: tracks.map(toBar),
    nextTopic: current
      ? {
          slug: current.slug,
          title: current.title,
          summary: current.summary,
          href: current.href ?? `/learn/${current.slug}`,
          trackTitle: trackTitleFor(tracks, current.slug),
        }
      : null,
    inProgressTopics: inProgressTopics(tracks, progress),
  };
}

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function toBar(track: TrackView): TrackBar {
  const total = track.topics.filter((topic) => topic.state !== "soon").length;
  const completed = track.topics.filter((topic) => topic.state === "completed").length;
  return {
    slug: track.slug,
    title: track.title,
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

function trackTitleFor(tracks: TrackView[], slug: string): string {
  return tracks.find((track) => track.topics.some((topic) => topic.slug === slug))?.title ?? "Track";
}

function inProgressTopics(tracks: TrackView[], progress: ProgressMap): DashboardTopic[] {
  const items: DashboardTopic[] = [];
  for (const track of tracks) {
    for (const topic of track.topics) {
      if (progress[topic.slug] !== "in_progress") continue;
      if (topic.state === "soon" || topic.state === "completed") continue;
      items.push({
        slug: topic.slug,
        title: topic.title,
        summary: topic.summary,
        href: topic.href ?? `/learn/${topic.slug}`,
        trackTitle: track.title,
      });
    }
  }
  return items.slice(0, 4);
}
