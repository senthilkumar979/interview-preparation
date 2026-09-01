import { notFound, redirect } from "next/navigation";
import { findTrackForTopicSlug, getNextTopicSlug } from "@prepquest/content";
import { CompleteTopicButton } from "@/components/CompleteTopicButton";
import { TopicAside } from "@/components/TopicAside";
import { TopicHero } from "@/components/TopicHero";
import { TopicReader } from "@/components/TopicReader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getLearnContext } from "@/lib/learnView";
import { getAppUser, getProgressMap } from "@/lib/session";

interface LearnPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const context = getLearnContext(slug);
  if (!context) notFound();

  const user = await getAppUser();
  if (!user) redirect("/login");

  const progress = await getProgressMap(user.id);
  const status = progress[slug] ?? "not_started";
  const { topic, index, total, previous, next, related } = context;
  const track = findTrackForTopicSlug(topic.slug, user.technologySlug);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:py-10">
        <TopicHero
          topic={topic}
          isCompleted={status === "completed"}
          userLevel={user.experienceLevel}
          trackSlug={track?.slug ?? null}
          trackTitle={track?.title ?? topic.module}
        />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
          <TopicReader topic={topic} />
          <TopicAside
            previous={previous}
            next={next}
            related={related}
            index={index}
            total={total}
            trackSlug={track?.slug ?? null}
            trackTitle={track?.title ?? "Track"}
          />
        </div>
      </main>
      <SiteFooter
        action={
          <CompleteTopicButton
            topicSlug={topic.slug}
            nextSlug={getNextTopicSlug(topic.slug)}
            trackSlug={track?.slug ?? null}
            isCompleted={status === "completed"}
          />
        }
      />
    </div>
  );
}
