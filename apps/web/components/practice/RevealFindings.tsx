interface RevealFindingsProps {
  noun: string;
  shown: number;
  total: number;
  earlier: string[];
  latest: string | undefined;
}

export const RevealFindings = ({
  noun,
  shown,
  total,
  earlier,
  latest,
}: RevealFindingsProps) => (
  <section className="flex min-h-[280px] flex-col rounded-2xl border border-border bg-background/70 p-4 md:p-5">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold">Findings</h3>
      <p className="text-xs tabular-nums text-muted-foreground">
        {shown} / {total}
      </p>
    </div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-[width]"
        style={{ width: `${total === 0 ? 0 : (shown / total) * 100}%` }}
      />
    </div>
    {shown === 0 ? (
      <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border px-4 py-8 text-center">
        <p className="text-sm font-medium">Nothing is highlighted yet</p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
          Inspect the snippet, write your list, then reveal each {noun} to compare.
        </p>
      </div>
    ) : (
      <ul className="mt-4 grid flex-1 content-start gap-2">
        {earlier.map((answer, i) => (
          <li key={answer} className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              {noun} {i + 1}
            </p>
            <p className="mt-1 leading-6 text-muted-foreground">{answer}</p>
          </li>
        ))}
        {latest ? (
          <li className="rounded-xl border border-primary/45 bg-primary/10 px-4 py-3 text-sm shadow-[0_0_0_1px_rgba(237,174,73,0.12)]">
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
              {noun} {shown} · just revealed
            </p>
            <p className="mt-1 leading-6 text-foreground">{latest}</p>
          </li>
        ) : null}
      </ul>
    )}
  </section>
);
