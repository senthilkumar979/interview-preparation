"use client";

import dynamic from "next/dynamic";

const PracticeEditor = dynamic(
  () => import("@/components/practice/PracticeEditor").then((mod) => mod.PracticeEditor),
  {
    ssr: false,
    loading: () => <div className="h-52 rounded-xl bg-[#111827]" />,
  },
);

export { PracticeEditor };
