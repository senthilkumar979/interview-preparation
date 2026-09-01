import Link from "next/link";
import type { Topic } from "@prepquest/content";

interface TopicAsideProps {
  previous: Topic | null;
  next: Topic | null;
  related: Topic[];
  index: number;
  total: number;
  trackSlug: string | null;
  trackTitle: string;
}

export const TopicAside = ({
  previous,
  next,
  related,
  index,
  total,
  trackSlug,
  trackTitle,
}: TopicAsideProps) => (
  <aside className="grid h-fit gap-6 lg:sticky lg:top-6">
    <section className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Path</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">
        {index + 1}
        <span className="text-base font-normal text-muted-foreground"> / {total}</span>
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary"
          style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }}
        />
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        {previous ? (
          <Link href={`/learn/${previous.slug}`} className="hover:text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Previous
            </span>
            {previous.title}
          </Link>
        ) : (
          <p className="text-muted-foreground">This is the first live topic.</p>
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="hover:text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Next
            </span>
            {next.title}
          </Link>
        ) : (
          <p className="text-muted-foreground">You are on the last live topic.</p>
        )}
        {trackSlug ? (
          <Link href={`/roadmap/${trackSlug}`} className="hover:text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              All topics
            </span>
            {trackTitle} track
          </Link>
        ) : null}
      </div>
    </section>
    {related.length > 0 ? (
      <section className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Related</p>
        <ul className="mt-3 grid gap-2">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/learn/${item.slug}`} className="text-sm font-bold hover:underline">
                {item.title}
              </Link>
              <p className="text-xs leading-5 text-muted-foreground">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    ) : null}
  </aside>
);
