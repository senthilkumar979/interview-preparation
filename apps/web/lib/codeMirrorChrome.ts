import { EditorView } from "@codemirror/view";

export const codeMirrorChrome = EditorView.theme({
  "&": {
    fontSize: "16px",
  },
  ".cm-scroller": {
    overflow: "auto",
    padding: "14px 16px 16px 8px",
  },
  ".cm-content": {
    padding: "4px 8px 8px 8px",
  },
  ".cm-gutters": {
    padding: "4px 8px 8px 4px",
    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
  },
  ".cm-line": {
    padding: "0 4px",
  },
});
