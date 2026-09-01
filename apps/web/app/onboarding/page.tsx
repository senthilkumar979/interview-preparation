import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { OnboardingForm } from "@/components/OnboardingForm";
import { getAppUser } from "@/lib/session";

export default async function OnboardingPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-12">
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Three questions. Then we build your path.
        </p>
        <OnboardingForm />
      </main>
      <SiteFooter />
    </div>
  );
}
