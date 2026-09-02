interface QuizChoice {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface QuizChoicesProps {
  choices: QuizChoice[];
  picked: string | null;
  revealed: boolean;
  onPick: (id: string) => void;
}

export const QuizChoices = ({ choices, picked, revealed, onPick }: QuizChoicesProps) => (
  <ul className="grid gap-2">
    {choices.map((choice, index) => (
      <li key={choice.id}>
        <button
          type="button"
          disabled={revealed}
          onClick={() => onPick(choice.id)}
          className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm leading-6 transition ${choiceClass(choice, picked, revealed)}`}
        >
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-current/20 text-[11px] font-bold">
            {String.fromCharCode(65 + index)}
          </span>
          <span className="flex-1">{choice.label}</span>
          {revealed ? <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide">{choiceHint(choice, picked)}</span> : null}
        </button>
      </li>
    ))}
  </ul>
);

function choiceClass(choice: QuizChoice, picked: string | null, revealed: boolean): string {
  if (!revealed) {
    return picked === choice.id
      ? "border-primary bg-primary/15"
      : "border-border bg-background hover:border-primary/40";
  }
  if (choice.isCorrect) return "border-primary bg-primary/15";
  if (picked === choice.id) return "border-destructive/40 bg-destructive/10";
  return "border-border bg-muted/30 text-muted-foreground";
}

function choiceHint(choice: QuizChoice, picked: string | null): string {
  if (choice.isCorrect) return "Correct";
  if (picked === choice.id) return "Your pick";
  return "";
}
