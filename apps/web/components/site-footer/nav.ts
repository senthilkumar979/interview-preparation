export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Foundations",
    links: [
      { href: "/roadmap/web", label: "How the web works" },
      { href: "/roadmap/html", label: "HTML" },
      { href: "/roadmap/css", label: "CSS" },
      { href: "/roadmap/sass", label: "Sass" },
      { href: "/roadmap/javascript", label: "JavaScript" },
      { href: "/roadmap/typescript", label: "TypeScript" },
      { href: "/roadmap/ecmascript", label: "ECMAScript" },
      { href: "/roadmap/pwa", label: "PWA" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { href: "/roadmap/react", label: "React" },
      { href: "/roadmap/next", label: "Next.js" },
      { href: "/roadmap/architecture", label: "Architecture" },
    ],
  },
  {
    title: "Craft",
    links: [
      { href: "/roadmap/best-practices", label: "Best practices" },
      { href: "/roadmap/testing", label: "Testing" },
      { href: "/roadmap/performance", label: "Performance" },
      { href: "/roadmap/security", label: "Security" },
      { href: "/roadmap/error-handling", label: "Error handling" },
    ],
  },
  {
    title: "Practice",
    links: [
      { href: "/practice", label: "Practice" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/login", label: "Sign in" },
      { href: "/", label: "About" },
    ],
  },
];
