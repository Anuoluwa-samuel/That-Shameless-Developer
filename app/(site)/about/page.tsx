import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { clean } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name}: a Computer Science student at FUTA building full-stack products and applied ML systems.`,
  path: "/about",
});

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-border border-t py-12">
      <div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12">
        <h2
          id={`${id}-title`}
          className="text-accent font-mono text-xs tracking-widest uppercase"
        >
          {title}
        </h2>
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const paragraphs = site.story
    .split(/\n\s*\n/)
    .map((p) => clean(p.trim()))
    .filter((p): p is string => p !== null);

  return (
    <Container className="py-16 sm:py-24">
      <PageHeader eyebrow="About" title={site.name}>
        <p>
          {site.role}. Based in {site.location}.
        </p>
      </PageHeader>

      <div className="mt-14">
        {paragraphs.length > 0 ? (
          <Block id="story" title="Story">
            <div className="space-y-5 text-lg">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>
        ) : null}

        {site.education.length > 0 ? (
          <Block id="education" title="Education">
            <ul className="space-y-6">
              {site.education.map((e) => {
                const period = clean(e.period);
                const note = clean(e.note);
                return (
                  <li key={e.school}>
                    <h3 className="font-display text-xl">{e.school}</h3>
                    <p className="text-muted mt-1 font-mono text-xs">
                      {e.degree}
                      {period ? ` · ${period}` : ""}
                    </p>
                    {note ? <p className="text-muted mt-3">{note}</p> : null}
                  </li>
                );
              })}
            </ul>
          </Block>
        ) : null}

        {site.leadership.length > 0 ? (
          <Block id="leadership" title="Leadership">
            <ul className="space-y-6">
              {site.leadership.map((l) => {
                const period = clean(l.period);
                const summary = clean(l.summary);
                return (
                  <li key={l.title} className="border-accent border-l-2 pl-5">
                    <h3 className="font-display text-xl">{l.title}</h3>
                    <p className="text-muted mt-1 font-mono text-xs">
                      {l.org}
                      {period ? ` · ${period}` : ""}
                    </p>
                    {summary ? <p className="text-muted mt-3">{summary}</p> : null}
                  </li>
                );
              })}
            </ul>
          </Block>
        ) : null}

        {site.howIWork.length > 0 ? (
          <Block id="how" title="How I work">
            <ol className="space-y-8">
              {site.howIWork.map((h, i) => (
                <li key={h.title} className="flex gap-5">
                  <span className="text-accent font-mono text-xs leading-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{h.title}</h3>
                    <p className="text-muted mt-2">{h.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>
        ) : null}

        <Block id="next" title="Next">
          <p className="text-lg">
            See the{" "}
            <Link href="/work" className="text-accent underline underline-offset-4">
              work
            </Link>
            , read the{" "}
            <Link href="/cv" className="text-accent underline underline-offset-4">
              CV
            </Link>
            , or{" "}
            <Link href="/contact" className="text-accent underline underline-offset-4">
              get in touch
            </Link>
            .
          </p>
        </Block>
      </div>
    </Container>
  );
}
