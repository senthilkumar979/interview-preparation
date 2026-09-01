"use client";

import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import type { TopicCodeExample } from "@prepquest/content";

function languageExtension(language: TopicCodeExample["language"]) {
  if (language === "html") return html();
  if (language === "css") return css();
  return javascript({ typescript: language === "typescript" });
}

interface TopicCodeExampleViewProps {
  example: TopicCodeExample;
}

export const TopicCodeExampleView = ({ example }: TopicCodeExampleViewProps) => (
  <figure className="overflow-hidden rounded-2xl border border-border bg-[#111827]">
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#f87171]" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]" />
        <span className="size-2.5 rounded-full bg-[#34d399]" />
      </div>
      <figcaption className="text-xs font-bold text-white/70">
        {example.caption ?? "Example"}
      </figcaption>
      <span className="text-xs font-bold uppercase tracking-wide text-white/40">
        {example.language}
      </span>
    </div>
    <CodeMirror
      value={example.code.trimEnd()}
      height="auto"
      editable={false}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
      }}
      extensions={[languageExtension(example.language)]}
      theme="dark"
      className="text-sm"
    />
  </figure>
);
