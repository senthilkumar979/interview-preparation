"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { markTopicProgress } from "@/app/actions/progress";
import { recordTopicXp } from "@/app/actions/game";
import { Button } from "@/components/ui/button";

interface CompleteTopicButtonProps {
  topicSlug: string;
  technologySlug: string;
  nextSlug: string | null;
  trackSlug: string | null;
  isCompleted: boolean;
}

export const CompleteTopicButton = ({
  topicSlug,
  technologySlug,
  nextSlug,
  trackSlug,
  isCompleted,
}: CompleteTopicButtonProps) => {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "success">("idle");

  const fallbackHref = trackSlug ? `/roadmap/${trackSlug}` : "/roadmap";

  const goNext = () => {
    router.push(nextSlug ? `/learn/${nextSlug}` : fallbackHref);
    router.refresh();
  };

  const handleComplete = async () => {
    if (phase !== "idle") return;
    setPhase("success");
    await markTopicProgress(topicSlug, "completed");
    await recordTopicXp(topicSlug, technologySlug);
    window.setTimeout(goNext, 1200);
  };

  if (isCompleted && phase === "idle") {
    return (
      <Button type="button" size="lg" onClick={goNext}>
        {nextSlug ? "Continue to next topic" : "Back to track"}
      </Button>
    );
  }

  if (phase === "success") {
    return (
      <div className="complete-burst flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
        <span className="complete-check grid size-5 place-items-center rounded-full bg-primary-foreground text-primary">
          ✓
        </span>
        Topic completed
      </div>
    );
  }

  return (
    <Button type="button" size="lg" onClick={handleComplete}>
      Mark topic as complete
    </Button>
  );
};
