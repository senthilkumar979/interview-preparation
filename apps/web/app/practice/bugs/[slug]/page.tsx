import { notFound, redirect } from "next/navigation";
import { getBugPackage } from "@prepquest/content";
import { FinderSessionHero } from "@/components/practice/FinderSessionHero";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { RevealPlayer } from "@/components/practice/RevealPlayer";
import { getAppUser } from "@/lib/session";

interface BugPackagePageProps {
  params: Promise<{ slug: string }>;
}

const kindCopy = {
  "js-function": "JavaScript function pack",
  "ts-function": "TypeScript function pack",
  component: "Component pack",
} as const;

export default async function BugPackagePage({ params }: BugPackagePageProps) {
  const { slug } = await params;
  const pack = getBugPackage(slug);
  if (!pack) notFound();
  const user = await getAppUser();
  if (!user) redirect("/login");

  const defects = pack.items.reduce((sum, item) => sum + item.answers.length, 0);
  const language = pack.kind === "js-function" ? "JavaScript" : pack.kind === "ts-function" ? "TypeScript" : "TSX";

  return (
    <PracticeShell user={user}>
      <FinderSessionHero
        crumbs={[
          { href: "/practice", label: "Practice" },
          { href: "/practice/bugs", label: "Bug Finder" },
        ]}
        current={pack.title}
        kicker={kindCopy[pack.kind]}
        title={pack.title}
        summary={pack.summary}
        stats={[
          { label: "Snippets", value: String(pack.items.length) },
          { label: "Defects", value: String(defects) },
          { label: "Language", value: language },
        ]}
        steps={[
          "Read the function with no highlights.",
          "Name every defect yourself.",
          "Reveal answers one at a time.",
        ]}
      />
      <RevealPlayer pack={pack} reveal="bug" />
    </PracticeShell>
  );
}
