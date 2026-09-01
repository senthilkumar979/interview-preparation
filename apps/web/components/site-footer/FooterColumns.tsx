import Link from "next/link";
import { footerColumns } from "./nav";

export const FooterColumns = () => (
  <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {footerColumns.map((column) => (
      <div key={column.title}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {column.title}
        </p>
        <ul className="mt-4 grid gap-2.5">
          {column.links.map((link) => (
            <li key={`${column.title}-${link.label}`}>
              <Link
                href={link.href}
                className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
);
