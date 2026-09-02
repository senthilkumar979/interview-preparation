import Link from "next/link";
import { ArrowRight, Bug, Code2, ListChecks, ScanSearch, type LucideIcon } from "lucide-react";
import { PracticeHubHero } from "@/components/practice/PracticeHubHero";

interface Challenge {
  title: string;
  href: string;
}

interface PracticeHubProps {
  daily: Challenge;
  weekly: Challenge;
  quizMeta: string;
  bugsMeta: string;
  badMeta: string;
  codingMeta: string;
}

export const PracticeHub = ({
  daily,
  weekly,
  quizMeta,
  bugsMeta,
  badMeta,
  codingMeta,
}: PracticeHubProps) => (
  <>
    <PracticeHubHero daily={daily} weekly={weekly} />
    <ul className="grid gap-4 md:grid-cols-2">
      {moduleCards({ quizMeta, bugsMeta, badMeta, codingMeta }).map((item) => (
        <li key={item.href}>
          <ModuleLink item={item} />
        </li>
      ))}
    </ul>
  </>
);

interface CardModel {
  href: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  body: string;
  meta: string;
  cta: string;
}

function moduleCards(meta: Omit<PracticeHubProps, "daily" | "weekly">): CardModel[] {
  return [
    {
      href: "/practice/quiz",
      title: "Quiz",
      icon: ListChecks,
      accent: "from-primary/25",
      body: "Ten mixed questions: output, definitions, true or false. Junior through Expert.",
      meta: meta.quizMeta,
      cta: "Pick a package",
    },
    {
      href: "/practice/bugs",
      title: "Bug Finder",
      icon: Bug,
      accent: "from-rose-200/70",
      body: "Read a broken function or component. Name every defect, then reveal one bug at a time.",
      meta: meta.bugsMeta,
      cta: "Open packs",
    },
    {
      href: "/practice/bad-practice",
      title: "Bad Practice Finder",
      icon: ScanSearch,
      accent: "from-amber-200/80",
      body: "The code often runs. Flag review issues, then reveal each anti-pattern when you want a check.",
      meta: meta.badMeta,
      cta: "Open files",
    },
    {
      href: "/practice/coding",
      title: "Coding",
      icon: Code2,
      accent: "from-sky-200/70",
      body: "A ten-minute prompt in the editor. Run hidden tests, then compare with Show answer.",
      meta: meta.codingMeta,
      cta: "Start a drill",
    },
  ];
}

const ModuleLink = ({ item }: { item: CardModel }) => (
  <Link
    href={item.href}
    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:shadow-[0_12px_40px_-24px_rgba(237,174,73,0.9)]"
  >
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} via-transparent to-transparent opacity-80`}
    />
    <span className="relative grid size-11 place-items-center rounded-xl border border-border/80 bg-background/80 text-primary">
      <item.icon className="size-5" />
    </span>
    <p className="relative mt-4 text-lg font-semibold">{item.title}</p>
    <p className="relative mt-2 flex-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
    <div className="relative mt-4 flex items-center justify-between gap-3 text-sm">
      <span className="text-xs font-medium text-muted-foreground">{item.meta}</span>
      <span className="inline-flex items-center gap-1 font-bold text-foreground">
        {item.cta}
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </div>
  </Link>
);
