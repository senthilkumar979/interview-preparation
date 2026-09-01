import type { FrameworkSlug, Role, Technology } from "./types";

export const roles: Role[] = [
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    description: "Prepare for UI, JavaScript, and web-platform interviews.",
  },
];

export const technologies: Technology[] = [
  {
    slug: "react",
    name: "React",
    roleSlug: "frontend-developer",
    description: "Components, hooks, rendering, and the React interview loop.",
  },
  {
    slug: "angular",
    name: "Angular",
    roleSlug: "frontend-developer",
    description: "Components, DI, RxJS, and change detection.",
  },
  {
    slug: "vue",
    name: "Vue",
    roleSlug: "frontend-developer",
    description: "Reactivity, composition API, and Vue ecosystem interviews.",
  },
];

export const experienceLevels = [
  { slug: "junior", name: "Junior", description: "Understand, recall, implement, debug basics." },
  { slug: "medior", name: "Medior", description: "Explain, implement, choose between approaches." },
  { slug: "senior", name: "Senior", description: "Design, optimize, trade-offs, review." },
  { slug: "expert", name: "Expert", description: "Architecture, systemic issues, mentoring." },
] as const;

export function resolveFramework(slug: string | null | undefined): FrameworkSlug {
  if (slug === "angular" || slug === "vue" || slug === "react") return slug;
  return "react";
}
