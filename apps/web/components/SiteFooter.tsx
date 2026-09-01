import Link from "next/link";
import type { ReactNode } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FooterColumns } from "@/components/site-footer/FooterColumns";

interface SiteFooterProps {
  action?: ReactNode;
}

export const SiteFooter = ({ action }: SiteFooterProps) => (
  <footer className={action ? "mt-auto pb-20" : "mt-auto"}>
    {action ? (
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl justify-center">{action}</div>
      </div>
    ) : null}

    <div className="relative overflow-hidden border-t border-border bg-[linear-gradient(180deg,#fffdf8_0%,#f7f1e4_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col gap-8 border-b border-border/80 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Compass className="size-5" strokeWidth={2.25} />
              </span>
              <span className="text-lg font-bold tracking-tight">PrepQuest</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Prepare smarter. Master the concepts. Ace the interview. A structured path from
              foundations to production React—not flashcards.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Free", "Open", "Not-for-profit"].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/roadmap">Explore the roadmap</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">Continue learning</Link>
            </Button>
          </div>
        </div>

        <div className="pt-10">
          <FooterColumns />
        </div>
      </div>

      <div className="relative border-t border-border/80 bg-background/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PrepQuest. Built for interview-ready frontend engineers.</p>
          <p>Free. Open. Not-for-profit.</p>
        </div>
      </div>
    </div>
  </footer>
);
