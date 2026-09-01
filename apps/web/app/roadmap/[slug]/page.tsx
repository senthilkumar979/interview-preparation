import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { TrackIcon } from "@/components/TrackIcon";
import { TrackTopicList } from "@/components/TrackTopicList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { getTrackView } from "@/lib/roadmapView";
import { completedSet, getAppUser, getProgressMap } from "@/lib/session";

interface TrackPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const user = await getAppUser();
  if (!user) redirect("/login");

  const progress = await getProgressMap(user.id);
  const track = getTrackView(slug, completedSet(progress), user.technologySlug);
  if (!track) notFound();

  const continueTopic = track.topics.find((topic) => topic.state === "current") ??
    track.topics.find((topic) => topic.state === "ready");
  const percent =
    track.topicCount === 0 ? 0 : Math.round((track.completedCount / track.topicCount) * 100);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 md:py-12">
        <nav className="text-xs font-bold text-muted-foreground">
          <Link href="/roadmap" className="hover:text-foreground">
            Roadmap
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{track.title}</span>
        </nav>

        <header className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div className="flex items-start gap-4">
              <TrackIcon slug={track.slug} />
              <div className="grid gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Track {String(track.index + 1).padStart(2, "0")}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-primary-dark md:text-4xl">
                  {track.title}
                </h1>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {track.description}
                </p>
              </div>
            </div>
            <div className="grid min-w-[200px] gap-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  In this track
                </span>
                <span className="text-2xl font-semibold tabular-nums">{percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
              </div>
              <p className="text-sm text-muted-foreground">
                {track.completedCount} of {track.topicCount} topics complete
              </p>
              {continueTopic?.href ? (
                <Button asChild size="lg" className="w-full">
                  <Link href={continueTopic.href}>
                    {continueTopic.state === "current" ? "Continue" : "Start"} {continueTopic.title}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </header>

        <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Subtopics
        </p>
        <div className="mt-4">
          <TrackTopicList topics={track.topics} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
