import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { InProgressList } from "@/components/dashboard/InProgressList";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { StatusDonut } from "@/components/dashboard/StatusDonut";
import { TrackBars } from "@/components/dashboard/TrackBars";
import { TrackSnapshot } from "@/components/dashboard/TrackSnapshot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildDashboardModel } from "@/lib/dashboardView";
import { getAppUser, getProgressMap } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");
  if (!user.roleSlug || !user.technologySlug) redirect("/onboarding");

  const progress = await getProgressMap(user.id);
  const model = buildDashboardModel(user, progress);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-10 md:py-12">
        <DashboardHero
          greeting={model.greeting}
          displayName={model.displayName}
          role={model.role}
          tech={model.tech}
          level={model.level}
          percent={model.percent}
          nextTopic={model.nextTopic}
        />
        <StatGrid
          completed={model.completed}
          remaining={model.remaining}
          inProgress={model.inProgress}
          tracksComplete={model.tracksComplete}
          tracksTotal={model.tracksTotal}
          highYieldDone={model.highYieldDone}
          highYieldTotal={model.highYieldTotal}
        />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Progress by track</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <TrackBars bars={model.trackBars} />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Topic mix</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <StatusDonut
                  centerLabel="complete"
                  centerValue={`${model.percent}%`}
                  slices={[
                    { value: model.completed, color: "#EDAE49", label: "Completed" },
                    { value: model.inProgress, color: "#d89a32", label: "In progress" },
                    { value: model.notStarted, color: "#e8e0d0", label: "Not started" },
                  ]}
                />
              </CardContent>
            </Card>
            <InProgressList topics={model.inProgressTopics} />
          </div>
        </div>
        <section className="grid gap-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Focus next
              </p>
              <h2 className="mt-1 text-lg font-semibold">Tracks that still need work</h2>
            </div>
            <Link href="/roadmap" className="text-sm font-medium text-foreground underline">
              Full roadmap
            </Link>
          </div>
          <TrackSnapshot bars={model.trackBars} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
