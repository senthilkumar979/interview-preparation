"use client";

import { useState } from "react";
import type { HtmlCssExercise } from "@prepquest/content";
import { PracticeEditor } from "@/components/practice/PracticeEditorLazy";
import { Button } from "@/components/ui/button";

interface HtmlPreviewProps {
  exercise: HtmlCssExercise;
}

export const HtmlPreview = ({ exercise }: HtmlPreviewProps) => {
  const [html, setHtml] = useState(exercise.html);
  const [css, setCss] = useState(exercise.css);
  const [js, setJs] = useState(exercise.js);
  const [srcDoc, setSrcDoc] = useState(buildSrcDoc(exercise.html, exercise.css, exercise.js));

  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{exercise.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{exercise.prompt}</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="grid gap-2">
          <p className="text-xs font-semibold text-muted-foreground">HTML</p>
          <PracticeEditor value={html} language="html" onChange={setHtml} height="140px" />
          <p className="text-xs font-semibold text-muted-foreground">CSS</p>
          <PracticeEditor value={css} language="css" onChange={setCss} height="120px" />
          <p className="text-xs font-semibold text-muted-foreground">JS</p>
          <PracticeEditor value={js} language="javascript" onChange={setJs} height="100px" />
          <Button size="sm" onClick={() => setSrcDoc(buildSrcDoc(html, css, js))}>
            Run preview
          </Button>
        </div>
        <iframe
          title="Sandboxed preview"
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className="min-h-72 w-full rounded-xl border border-border bg-white"
        />
      </div>
    </article>
  );
};

function buildSrcDoc(html: string, css: string, js: string): string {
  return `<!doctype html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
}
