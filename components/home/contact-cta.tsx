import Link from "next/link";
import { Container } from "@/components/layout/container";
import { clean } from "@/lib/format";
import { site } from "@/lib/site";

export function ContactCTA() {
  const email = clean(site.email);
  return (
    <section
      aria-labelledby="cta-title"
      className="border-border border-t py-20 sm:py-28"
    >
      <Container>
        <h2 id="cta-title" className="font-display max-w-3xl text-3xl">
          Hiring, or have something to build?
        </h2>
        <p className="text-muted mt-5 max-w-xl text-lg">
          I&apos;m open to graduate full-stack and ML roles, and to freelance projects.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/contact"
            className="bg-accent text-accent-fg inline-flex h-12 items-center px-7 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-accent font-mono text-sm underline underline-offset-4"
            >
              {email}
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
