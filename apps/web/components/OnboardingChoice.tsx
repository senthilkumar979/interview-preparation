"use client";

interface OnboardingChoiceProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}

export const OnboardingChoice = ({
  selected,
  onSelect,
  title,
  description,
}: OnboardingChoiceProps) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
      selected
        ? "border-primary bg-primary/15 ring-2 ring-primary/40"
        : "border-border bg-surface hover:border-primary/50 hover:bg-muted/60"
    }`}
  >
    <p className="font-medium">{title}</p>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </button>
);
