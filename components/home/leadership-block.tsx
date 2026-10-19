import Link from "next/link";
import { clean } from "@/lib/format";
import type { SiteConfig } from "@/lib/schema";
import { Section } from "./section";

export function LeadershipBlock({
  leadership,
}: {
  leadership: SiteConfig["leadership"];
}) {
  if (leadership.length === 0) return null;
  return (
    <Section
      id="leadership"
      eyebrow="Leadership"
      title="I also run things"
      action={
        <Link href="/about" className="text-accent text-sm underline underline-offset-4">
          More about me
        </Link>
      }
    >
      <ul className="grid gap-8 md:grid-cols-2">
        {leadership.map((l) => {
          const period = clean(l.period);
          const summary = clean(l.summary);
          return (
            <li key={l.title} className="border-accent border-l-2 pl-5">
              <h3 className="font-display text-xl">{l.title}</h3>
              <p className="text-muted mt-1 font-mono text-xs">
                {l.org}
                {period ? ` · ${period}` : ""}
              </p>
              {summary ? <p className="text-muted mt-3 text-sm">{summary}</p> : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
