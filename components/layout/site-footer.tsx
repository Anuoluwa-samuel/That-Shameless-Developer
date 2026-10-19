import { isTodo, site } from "@/lib/site";
import { Container } from "./container";

export function SiteFooter() {
  const links = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
  ].filter((l) => !isTodo(l.href));

  return (
    <footer className="border-border mt-24 border-t py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted font-mono text-xs">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                rel="noopener noreferrer"
                className="text-muted hover:text-fg text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
