import type { ElementType, ReactNode } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { GlobeSlot } from "./globe-slot";

function FormDots({ className }: { className?: string }) {
  return (
    <SeparatorPrimitive.Root
      decorative
      orientation="horizontal"
      className={cn(
        "flex w-full shrink-0 items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="relative h-4 w-full">
        <div
          className="text-control absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
            backgroundSize: "6px 100%",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />
      </div>
    </SeparatorPrimitive.Root>
  );
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span className="border-control text-muted flex h-9 w-9 shrink-0 items-center justify-center border">
        {icon}
      </span>
      {children}
    </li>
  );
}

interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  /** Use "h1" when this section is the main heading of its page. */
  titleAs?: "h1" | "h2";
  /** id for the title, so a dialog can point aria-labelledby at it. */
  titleId?: string;
  /** Wrap in the page container (default). Pass false inside a dialog that already has padding. */
  contained?: boolean;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  location?: string | null;
  className?: string;
}

export default function ContactWithGlobe({
  title = "Contact us",
  subtitle = "Contact",
  description = "Tell me what you need and I'll reply.",
  titleAs = "h2",
  titleId,
  contained = true,
  email = null,
  github = null,
  linkedin = null,
  location = null,
  className,
}: ContactWithGlobeProps) {
  const Title = titleAs;
  const Frame: ElementType = contained ? Container : "div";
  const Sub = titleAs === "h1" ? "h2" : "h3";
  const external = [
    { label: "GitHub", href: github },
    { label: "LinkedIn", href: linkedin },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <section className={cn("relative w-full overflow-hidden py-16 sm:py-24", className)}>
      <Frame>
        <header className="max-w-3xl">
          <p className="text-accent font-mono text-xs tracking-widest uppercase">
            {subtitle}
          </p>
          <Title id={titleId} className="font-display mt-4 text-3xl">
            {title}
          </Title>
          <p className="text-muted mt-5 text-lg">{description}</p>
        </header>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-6">
            <div>
              <Sub className="font-display text-xl">Get in touch</Sub>
              <p className="text-muted mt-1 max-w-xs text-sm">
                Reach out through any channel below, or use the form.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {email ? (
                <ContactRow icon={<Mail className="h-4 w-4" aria-hidden="true" />}>
                  <a
                    href={`mailto:${email}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {email}
                  </a>
                </ContactRow>
              ) : null}
              {external.map(({ label, href }) => (
                <ContactRow
                  key={label}
                  icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                >
                  <a
                    href={href}
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-4"
                  >
                    {label}
                  </a>
                </ContactRow>
              ))}
              {location ? (
                <ContactRow icon={<MapPin className="h-4 w-4" aria-hidden="true" />}>
                  <span className="text-muted">{location}</span>
                </ContactRow>
              ) : null}
            </ul>

            <GlobeSlot />
          </div>

          <div className="border-border bg-surface flex min-w-0 flex-col gap-5 border p-6 sm:p-8">
            <div>
              <Sub className="font-display text-xl">Send a message</Sub>
              <p className="text-muted mt-1 text-sm">
                Fill out the form and I&apos;ll reply to the email you give.
              </p>
            </div>
            <FormDots />
            <ContactForm email={email} />
          </div>
        </div>
      </Frame>
    </section>
  );
}
