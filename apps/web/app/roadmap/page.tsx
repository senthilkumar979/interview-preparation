import { redirect } from "next/navigation";
import { RoadmapHero } from "@/components/RoadmapHero";
import { RoadmapPath } from "@/components/RoadmapPath";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildTrackViews, roadmapMeta } from "@/lib/roadmapView";
import { completedSet, getAppUser, getProgressMap } from "@/lib/session";

export default async function RoadmapPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  const progress = await getProgressMap(user.id);
  const completed = completedSet(progress);
  const tracks = buildTrackViews(completed, user.technologySlug);
  const readyTopics = tracks.flatMap((track) => track.topics).filter((topic) => topic.state !== "soon");
  const completedCount = readyTopics.filter((topic) => topic.state === "completed").length;
  const percent =
    readyTopics.length === 0 ? 0 : Math.round((completedCount / readyTopics.length) * 100);
  const current = readyTopics.find((topic) => topic.state === "current");
  const { role, tech, level } = roadmapMeta(user);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 md:py-12">
        <RoadmapHero
          role={role}
          tech={tech}
          level={level}
          percent={percent}
          completedCount={completedCount}
          readyCount={readyTopics.length}
          continueHref={current?.href ?? null}
        />
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Tracks
        </p>
        <RoadmapPath tracks={tracks} />
      </main>
      <SiteFooter />
    </div>
  );
}
