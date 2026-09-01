interface DonutSlice {
  value: number;
  color: string;
  label: string;
}

interface StatusDonutProps {
  slices: DonutSlice[];
  centerLabel: string;
  centerValue: string;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const StatusDonut = ({ slices, centerLabel, centerValue }: StatusDonutProps) => {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <div className="relative size-40 shrink-0">
        <svg viewBox="0 0 140 140" className="size-full -rotate-90" aria-hidden>
          <circle cx="70" cy="70" r={RADIUS} fill="none" className="stroke-muted" strokeWidth="16" />
          {slices.map((slice) => {
            const length = (slice.value / total) * CIRCUMFERENCE;
            const dash = `${length} ${CIRCUMFERENCE - length}`;
            const circle = (
              <circle
                key={slice.label}
                cx="70"
                cy="70"
                r={RADIUS}
                fill="none"
                stroke={slice.color}
                strokeWidth="16"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += length;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-2xl font-semibold tabular-nums leading-none">{centerValue}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {centerLabel}
          </p>
        </div>
      </div>
      <ul className="grid gap-2 text-sm">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: slice.color }} />
            <span className="text-muted-foreground">{slice.label}</span>
            <span className="ml-auto font-semibold tabular-nums">{slice.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
