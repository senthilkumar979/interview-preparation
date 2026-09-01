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
  nextjs: PanelsTopLeft,
  nuxt: Globe,
  "angular-ssr": Server,
  architecture: Network,
  "best-practices": BadgeCheck,
  testing: FlaskConical,
  performance: Gauge,
  security: Shield,
};

interface TrackIconProps {
  slug: string;
}

export const TrackIcon = ({ slug }: TrackIconProps) => {
  const Icon = trackIcons[slug] ?? Component;
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
      <Icon className="size-5" strokeWidth={2} />
    </span>
  );
};
