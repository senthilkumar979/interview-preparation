import { cn } from "@/lib/utils";

interface TopicProseProps {
  text: string;
  className?: string;
}

export const TopicProse = ({ text, className }: TopicProseProps) => {
  const paragraphs = text.split(/\n\n+/).map((item) => item.trim()).filter(Boolean);

  return (
    <div className={cn("grid gap-3", className)}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="text-[0.98rem] leading-7 text-foreground/90">
          {paragraph.split(/(`[^`]+`)/g).map((part, index) =>
            part.startsWith("`") && part.endsWith("`") ? (
              <code
                key={`${paragraphIndex}-${index}`}
                className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.86em]"
              >
                {part.slice(1, -1)}
              </code>
            ) : (
              <span key={`${paragraphIndex}-${index}`}>{part}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
};
