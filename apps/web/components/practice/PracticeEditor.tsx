"use client";

import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { codeMirrorChrome } from "@/lib/codeMirrorChrome";

type EditorLanguage = "javascript" | "typescript" | "html" | "css";

function extension(language: EditorLanguage) {
  if (language === "html") return html();
  if (language === "css") return css();
  return javascript({ typescript: language === "typescript" });
}

interface PracticeEditorProps {
  value: string;
  language: EditorLanguage;
  onChange: (value: string) => void;
  height?: string;
}

export const PracticeEditor = ({
  value,
  language,
  onChange,
  height = "220px",
}: PracticeEditorProps) => (
  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111827]">
    <CodeMirror
      value={value}
      height={height}
      theme="dark"
      extensions={[extension(language), codeMirrorChrome]}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: false }}
    />
  </div>
);
