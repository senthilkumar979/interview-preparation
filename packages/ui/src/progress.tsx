import type { ReactNode } from "react";

interface ProgressBarProps {
  value: number;
  label: string;
}

export const ProgressBar = ({ value, label }: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{clamped}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
};

interface EmptyHintProps {
  children: ReactNode;
}

export const EmptyHint = ({ children }: EmptyHintProps) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);
