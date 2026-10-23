import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./container";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="bg-bg/85 border-border sticky top-0 z-40 border-b backdrop-blur print:hidden">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
        <Link href="/" className="font-display text-lg tracking-tight whitespace-nowrap">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6"
        >
          <NavLinks />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
