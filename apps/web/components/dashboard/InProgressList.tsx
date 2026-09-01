import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardTopic } from "@/lib/dashboardView";

interface InProgressListProps {
  topics: DashboardTopic[];
}

export const InProgressList = ({ topics }: InProgressListProps) => (
  <Card className="h-full">
    <CardHeader className="border-b">
      <CardTitle>In progress</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      {topics.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No topics marked in progress yet. Open a lesson and it will show here.
        </p>
      ) : (
        <ul className="grid gap-3">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={topic.href}
                className="block rounded-xl border border-border bg-muted/40 px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {topic.trackTitle}
                </p>
                <p className="mt-0.5 text-sm font-medium">{topic.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
