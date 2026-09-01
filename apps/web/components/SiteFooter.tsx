import Link from "next/link";
import type { ReactNode } from "react";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/roadmap", label: "Roadmap" },
      { href: "/roadmap/web", label: "How the web works" },
      { href: "/roadmap/sass", label: "Sass" },
      { href: "/roadmap/javascript", label: "JavaScript" },
      { href: "/roadmap/typescript", label: "TypeScript" },
      { href: "/roadmap/ecmascript", label: "ECMAScript" },
      { href: "/roadmap/pwa", label: "PWA" },
    ],
  },
  {
    title: "Practice",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/roadmap", label: "Challenges" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/", label: "About" },
      { href: "/", label: "Contribute" },
    ],
  },
];

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
    <div className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="text-sm font-bold tracking-tight">PrepQuest</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Prepare smarter. Master the concepts. Ace the interview.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {column.title}
              </p>
              <ul className="mt-3 grid gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
        Free. Open. Not-for-profit. © 2026 PrepQuest
      </div>
    </div>
  </footer>
);
