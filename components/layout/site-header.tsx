import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./container";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="bg-bg/85 border-border sticky top-0 z-40 border-b backdrop-blur print:hidden">
      <Container className="flex h-16 items-center justify-between gap-2">
        <Link href="/" className="font-display text-lg tracking-tight">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-6">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
