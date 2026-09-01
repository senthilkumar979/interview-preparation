import { MessageSquareQuote } from "lucide-react";
import type { InterviewAnswer } from "@prepquest/content";
import { TopicProse } from "@/components/TopicProse";

interface TopicConceptCardProps {
  interviewAnswer?: InterviewAnswer;
  fallbackBody?: string;
}

export const TopicConceptCard = ({ interviewAnswer, fallbackBody }: TopicConceptCardProps) => {
  if (!interviewAnswer && !fallbackBody) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-primary/40 bg-primary/8">
      <div className="flex items-center gap-2 border-b border-primary/20 px-6 py-3 md:px-8">
        <MessageSquareQuote className="size-4 text-primary-dark" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-dark">
          Interview answer
        </p>
      </div>
      <div className="grid gap-5 px-6 py-6 md:px-8 md:py-7">
        {interviewAnswer ? (
          <>
            <TopicProse
              className="text-lg font-medium leading-8 text-foreground"
              text={interviewAnswer.oneLiner}
            />
            <ol className="grid gap-3">
              {interviewAnswer.beats.map((beat, index) => (
                <li key={beat} className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <span className="mt-0.5 grid size-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <TopicProse text={beat} />
                </li>
              ))}
            </ol>
          </>
        ) : (
          <TopicProse className="text-lg leading-8" text={fallbackBody ?? ""} />
        )}
      </div>
    </section>
  );
};
