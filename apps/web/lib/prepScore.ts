import { getCurriculumTracks, getTopic, countPracticeActivities } from "@prepquest/content";
import type { GameState } from "@/lib/game";
import type { DashboardTopic } from "@/lib/dashboardView";

export function countPracticeDone(completedIds: string[]): number {
  return completedIds.filter((id) => id.startsWith("quiz:") || id.startsWith("code:")).length;
}

export function compositePrepPercent(input: {
  topicPercent: number;
  highYieldPercent: number;
  game: GameState;
}): number {
  const total = countPracticeActivities();
  const practicePercent =
    total === 0 ? 0 : Math.round((countPracticeDone(input.game.completedIds) / total) * 100);
  return Math.round(input.topicPercent * 0.5 + practicePercent * 0.3 + input.highYieldPercent * 0.2);
}

export function nextStudyTopic(
  fallback: DashboardTopic | null,
  completedTopicSlugs: Set<string>,
  frameworkSlug?: string | null,
): DashboardTopic | null {
  const ready = getCurriculumTracks(frameworkSlug).flatMap((track) =>
    track.topics.filter((topic) => topic.isContentReady),
  );
  const highYield = ready
    .map((item) => getTopic(item.slug))
    .find((topic) => topic?.isHighYield && !completedTopicSlugs.has(topic.slug));
  if (highYield) {
    return {
      slug: highYield.slug,
      title: highYield.title,
      summary: highYield.summary,
      href: `/learn/${highYield.slug}`,
      trackTitle: highYield.module,
    };
  }
  return fallback;
}
