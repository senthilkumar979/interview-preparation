import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { AppUser } from "@/lib/session-types";
import type { ReactNode } from "react";

interface PracticeShellProps {
  user: AppUser;
  children: ReactNode;
}

export const PracticeShell = ({ user, children }: PracticeShellProps) => (
  <div className="flex min-h-full flex-col">
    <SiteHeader user={user} />
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-10">{children}</main>
    <SiteFooter />
  </div>
);

export const PracticeBack = () => (
  <p className="text-sm">
    <Link href="/practice" className="text-muted-foreground hover:text-foreground">
      Practice
    </Link>
  </p>
);
