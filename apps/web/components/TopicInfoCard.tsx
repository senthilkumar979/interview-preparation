import { TopicProse } from "@/components/TopicProse";

interface TopicInfoCardProps {
  title?: string;
  body: string;
  tone?: "default" | "practice" | "mistake";
}

const toneClass = {
  default: "border-border",
  practice: "border-border",
  mistake: "border-border",
};

export const TopicInfoCard = ({ title, body, tone = "default" }: TopicInfoCardProps) => (
  <section className={`h-full rounded-2xl border bg-card p-6 md:p-7 ${toneClass[tone]}`}>
    {title ? (
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`h-5 w-1 rounded-full ${tone === "mistake" ? "bg-foreground/40" : "bg-primary"}`}
        />
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-primary-dark">{title}</h2>
      </div>
    ) : null}
    <TopicProse text={body} />
  </section>
);
