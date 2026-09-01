import type { WorkedExample } from "@prepquest/content";
import { TopicCodeExample } from "@/components/TopicCodeExample";

interface TopicExamplesCardsProps {
  examples: WorkedExample[];
}

export const TopicExamplesCards = ({ examples }: TopicExamplesCardsProps) => {
  if (examples.length === 0) return null;

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Real-time examples
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each card is a full example—read the setup, then the code.
        </p>
      </div>
      <div className="grid gap-5">
        {examples.map((example) => (
          <article
            key={example.id}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="grid gap-1 border-b border-border px-6 py-4 md:px-7">
              <h3 className="font-bold text-primary-dark">{example.title}</h3>
              <p className="text-sm text-muted-foreground">{example.about}</p>
            </div>
            <div className="p-4 md:p-5">
              <TopicCodeExample
                example={{
                  language: example.language,
                  code: example.code,
                  caption: example.title,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
