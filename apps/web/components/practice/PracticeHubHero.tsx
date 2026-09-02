import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Challenge {
  title: string;
  href: string;
}

interface PracticeHubHeroProps {
  daily: Challenge;
  weekly: Challenge;
}

export const PracticeHubHero = ({ daily, weekly }: PracticeHubHeroProps) => (
  <>
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="relative grid gap-4 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Frontend practice
        </p>
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          Train the skills you will be asked to prove
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Four modes, one stack: HTML, CSS, JavaScript, TypeScript, and React. Quizzes score you. The
          other three are reading and writing drills — no architecture essays.
        </p>
        <div className="flex flex-wrap gap-2">
          {["HTML", "CSS", "JavaScript", "TypeScript", "React"].map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-bold"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
    <div className="grid gap-3 md:grid-cols-2">
      <ChallengeTile eyebrow="Today" label="Daily quiz" challenge={daily} />
      <ChallengeTile eyebrow="This week" label="Weekly coding" challenge={weekly} />
    </div>
  </>
);

const ChallengeTile = ({
  eyebrow,
  label,
  challenge,
}: {
  eyebrow: string;
  label: string;
  challenge: Challenge;
}) => (
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 md:p-5">
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{challenge.title}</p>
    </div>
    <Button asChild>
      <Link href={challenge.href}>
        Go
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </div>
);
