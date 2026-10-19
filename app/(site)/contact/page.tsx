import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { clean } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about graduate full-stack or ML roles, or a freelance project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = clean(site.email);
  const links = [
    { label: "GitHub", href: clean(site.links.github) },
    { label: "LinkedIn", href: clean(site.links.linkedin) },
  ].filter((l): l is { label: string; href: string } => l.href !== null);

  return (
    <Container className="py-16 sm:py-24">
      <PageHeader eyebrow="Contact" title="Let's talk">
        <p>
          Hiring for a graduate full-stack or ML role, or have something to build? Tell me
          what you need and I&apos;ll reply.
        </p>
      </PageHeader>
      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="max-w-2xl">
          <ContactForm email={email} />
        </div>
        <aside aria-label="Other ways to reach me" className="space-y-6 text-sm">
          {email ? (
            <div>
              <p className="text-muted font-mono text-xs tracking-widest uppercase">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="text-accent mt-2 inline-block underline underline-offset-4"
              >
                {email}
              </a>
            </div>
          ) : null}
          {links.map((l) => (
            <div key={l.label}>
              <p className="text-muted font-mono text-xs tracking-widest uppercase">
                {l.label}
              </p>
              <a
                href={l.href}
                rel="noopener noreferrer"
                className="text-accent mt-2 inline-block underline underline-offset-4"
              >
                {l.href.replace(/^https?:\/\//, "")}
              </a>
            </div>
          ))}
          <div>
            <p className="text-muted font-mono text-xs tracking-widest uppercase">
              Based in
            </p>
            <p className="mt-2">{site.location}</p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
