import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Braces,
  CalendarDays,
  Component,
  Droplets,
  Earth,
  FileCode2,
  FileType2,
  FlaskConical,
  Gauge,
  Globe,
  Hexagon,
  Layers,
  Network,
  Palette,
  PanelsTopLeft,
  Server,
  Smartphone,
  Shield,
  LifeBuoy,
} from "lucide-react";

const trackIcons: Record<string, LucideIcon> = {
  web: Earth,
  html: FileCode2,
  css: Palette,
  sass: Droplets,
  javascript: Braces,
  pwa: Smartphone,
  typescript: FileType2,
  ecmascript: CalendarDays,
  react: Component,
  angular: Hexagon,
  vue: Layers,
  next: PanelsTopLeft,
  nuxt: Globe,
  "angular-ssr": Server,
  architecture: Network,
  "best-practices": BadgeCheck,
  testing: FlaskConical,
  performance: Gauge,
  security: Shield,
  "error-handling": LifeBuoy,
};

interface TrackIconProps {
  slug: string;
  size?: "sm" | "md";
}

export const TrackIcon = ({ slug, size = "md" }: TrackIconProps) => {
  const Icon = trackIcons[slug] ?? Component;
  const isSmall = size === "sm";
  return (
    <span
      className={
        isSmall
          ? "grid size-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary"
          : "grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"
      }
    >
      <Icon className={isSmall ? "size-3.5" : "size-5"} strokeWidth={2} />
    </span>
  );
};
