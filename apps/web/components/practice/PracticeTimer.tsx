"use client";

import { useEffect, useRef, useState } from "react";

interface PracticeTimerProps {
  seconds: number;
  onExpire: () => void;
}

export const PracticeTimer = ({ seconds, onExpire }: PracticeTimerProps) => {
  const [left, setLeft] = useState(seconds);
  const expired = useRef(false);

  useEffect(() => {
    if (left > 0) {
      const id = window.setTimeout(() => setLeft((value) => value - 1), 1000);
      return () => window.clearTimeout(id);
    }
    if (!expired.current) {
      expired.current = true;
      onExpire();
    }
    return undefined;
  }, [left, onExpire]);

  const minutes = Math.floor(left / 60);
  const secs = String(left % 60).padStart(2, "0");

  return (
    <p className="text-sm font-semibold tabular-nums text-foreground">
      Time {minutes}:{secs}
    </p>
  );
};
