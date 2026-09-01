import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@prepquest/auth",
    "@prepquest/content",
    "@prepquest/database",
    "@prepquest/ui",
    "@uiw/react-codemirror",
    "@codemirror/lang-javascript",
    "@codemirror/lang-html",
    "@codemirror/lang-css",
  ],
};

export default nextConfig;
