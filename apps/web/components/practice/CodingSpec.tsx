interface HeadingBlock {
  type: "h";
  level: 2 | 3;
  text: string;
}

interface ParagraphBlock {
  type: "p";
  text: string;
}

interface ListBlock {
  type: "ul" | "examples";
  items: string[];
}

type SpecBlock = HeadingBlock | ParagraphBlock | ListBlock;

function parseSpec(text: string): SpecBlock[] {
  const blocks: SpecBlock[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];
  let listType: "ul" | "examples" = "ul";

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "p", text: paragraph.join(" ") });
    paragraph = [];
  };

  const flushList = () => {
    if (!items.length) return;
    blocks.push({ type: listType, items });
    items = [];
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      const title = line.slice(3);
      listType = /^examples$/i.test(title) ? "examples" : "ul";
      blocks.push({ type: "h", level: 2, text: title });
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h", level: 3, text: line.slice(4) });
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      flushParagraph();
      items.push(line.slice(2));
      continue;
    }
    if (/^example:/i.test(line)) {
      flushParagraph();
      listType = "examples";
      items.push(line.replace(/^example:\s*/i, ""));
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export const CodingSpec = ({ text }: { text: string }) => (
  <div className="mt-3 grid max-w-3xl gap-4 text-sm leading-6">
    {parseSpec(text).map((block, index) => (
      <SpecBlockView key={index} block={block} />
    ))}
  </div>
);

const SpecBlockView = ({ block }: { block: SpecBlock }) => {
  if (block.type === "h") {
    const className =
      block.level === 2
        ? "text-sm font-semibold tracking-tight"
        : "text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";
    return <h3 className={className}>{block.text}</h3>;
  }
  if (block.type === "p") return <p>{block.text}</p>;
  if (block.type === "examples") {
    return (
      <ol className="grid gap-2">
        {block.items.map((item, index) => (
          <li key={item} className="rounded-xl border border-border bg-muted/40 px-3 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Example {index + 1}
            </p>
            <p className="mt-1">{item}</p>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="grid list-disc gap-1 pl-5">
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
