"use client";

import dynamic from "next/dynamic";
import type { TopicCodeExample as TopicCodeExampleData } from "@prepquest/content";

const TopicCodeExampleView = dynamic(
  () =>
    import("@/components/TopicCodeExampleView").then((mod) => mod.TopicCodeExampleView),
  {
    ssr: false,
    loading: () => <div className="h-64 rounded-xl bg-[#1f2937]" />,
  },
);

interface TopicCodeExampleProps {
  example: TopicCodeExampleData;
}

export const TopicCodeExample = ({ example }: TopicCodeExampleProps) => (
  <TopicCodeExampleView example={example} />
);
