import type { TopicFigure } from "@prepquest/content";

interface TopicFigureCardProps {
  figure: TopicFigure;
}

export const TopicFigureCard = ({ figure }: TopicFigureCardProps) => (
  <figure className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="border-b border-border bg-muted/40 px-5 py-3">
      <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-primary-dark">
        {figure.caption}
      </figcaption>
    </div>
    <img
      src={figure.src}
      alt={figure.alt}
      width={1600}
      height={900}
      className="h-auto w-full bg-[#fffdf8] object-cover"
    />
  </figure>
);
