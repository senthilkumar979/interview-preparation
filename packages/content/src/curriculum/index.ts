import { resolveFramework } from "../catalog";
import type { CurriculumTrack, FrameworkSlug } from "../types";
import {
  architectureTopics,
  bestPracticeTopics,
  performanceTopics,
  securityTopics,
  testingTopics,
} from "./advanced";
import { cssTopics, htmlTopics, javascriptTopics, pwaTopics, sassTopics, typescriptTopics, ecmascriptTopics, webTopics } from "./foundations";
import {
  angularTopics,
  nextTopics,
  reactTopics,
  vueTopics,
} from "./frameworks";

export function getCurriculumTracks(frameworkInput?: string | null): CurriculumTrack[] {
  const framework = resolveFramework(frameworkInput);
  const frameworkTrack = frameworkTrackFor(framework);

  return [
    {
      slug: "web",
      title: "How the web works",
      description: "Evolution, browsers, rendering, Google’s path, and SPAs.",
      topics: webTopics,
    },
    {
      slug: "html",
      title: "HTML",
      description: "Semantic markup every frontend interview still assumes.",
      topics: htmlTopics,
    },
    {
      slug: "css",
      title: "CSS",
      description: "From cascade to grid: how the browser paints UI.",
      topics: cssTopics,
    },
    {
      slug: "sass",
      title: "Sass",
      description: "Preprocessor, modules, mixins, and SCSS vs indented syntax.",
      topics: sassTopics,
    },
    {
      slug: "javascript",
      title: "JavaScript",
      description: "Language, runtime, DOM, and async—the interview core.",
      topics: javascriptTopics,
    },
    {
      slug: "pwa",
      title: "PWA",
      description: "Install, offline, caching, IndexedDB, sync, and push.",
      topics: pwaTopics,
    },
    {
      slug: "typescript",
      title: "TypeScript",
      description: "Types, generics, narrowing, and tsconfig — a compiler-checked JS.",
      topics: typescriptTopics,
    },
    {
      slug: "ecmascript",
      title: "ECMAScript",
      description: "ES2015 through ES2026, edition by edition, with product examples.",
      topics: ecmascriptTopics,
    },
    frameworkTrack,
    ...ssrTrack(framework),
    {
      slug: "architecture",
      title: "Architecture",
      description: "How the app is structured when the codebase is large.",
      topics: architectureTopics,
    },
    {
      slug: "best-practices",
      title: "Best practices",
      description: "Engineering judgment interviewers listen for.",
      topics: bestPracticeTopics,
    },
    {
      slug: "testing",
      title: "Testing",
      description: "Confidence without a brittle suite.",
      topics: testingTopics,
    },
    {
      slug: "performance",
      title: "Performance",
      description: "Load, runtime, and how you prove it.",
      topics: performanceTopics,
    },
    {
      slug: "security",
      title: "Security",
      description: "The frontend attack surface, plainly.",
      topics: securityTopics,
    },
  ];
}

function frameworkTrackFor(framework: FrameworkSlug): CurriculumTrack {
  if (framework === "angular") {
    return {
      slug: "angular",
      title: "Angular",
      description: "Your selected framework track.",
      framework,
      topics: angularTopics,
    };
  }
  if (framework === "vue") {
    return {
      slug: "vue",
      title: "Vue",
      description: "Your selected framework track.",
      framework,
      topics: vueTopics,
    };
  }
  return {
    slug: "react",
    title: "React",
    description: "JSX, Virtual DOM, Hooks, errors, Compiler, RSC, and React 19.",
    framework: "react",
    topics: reactTopics,
  };
}

function ssrTrack(framework: FrameworkSlug): CurriculumTrack[] {
  if (framework === "vue") {
    return [
      {
        slug: "nuxt",
        title: "Nuxt",
        description: "Production Vue: routing, data, and SSR.",
        framework: "vue",
        topics: [
          {
            slug: "nuxt-app",
            title: "Nuxt fundamentals",
            summary: "File-based routing, data fetching, and universal rendering.",
            isContentReady: false,
          },
          {
            slug: "nuxt-data",
            title: "Nuxt data layer",
            summary: "useAsyncData, cached payloads, and hydration.",
            isContentReady: false,
          },
        ],
      },
    ];
  }
  if (framework === "angular") {
    return [
      {
        slug: "angular-ssr",
        title: "Angular SSR",
        description: "Universal Angular and hydration.",
        framework: "angular",
        topics: [
          {
            slug: "angular-universal",
            title: "Angular SSR & hydration",
            summary: "Server render, transfer state, and event replay.",
            isContentReady: false,
          },
        ],
      },
    ];
  }
  return [
    {
      slug: "nextjs",
      title: "Next.js",
      description: "Production React: routing, data, and the server.",
      framework: "react",
      topics: nextTopics,
    },
  ];
}

export function findCurriculumTrack(
  slug: string,
  frameworkInput?: string | null,
): CurriculumTrack | undefined {
  return getCurriculumTracks(frameworkInput).find((track) => track.slug === slug);
}

export function findTrackForTopicSlug(
  topicSlug: string,
  frameworkInput?: string | null,
): CurriculumTrack | undefined {
  return getCurriculumTracks(frameworkInput).find((track) =>
    track.topics.some((topic) => topic.slug === topicSlug),
  );
}
