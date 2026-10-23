import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { getProjects } from "@/lib/content";
import { clean, formatMonth, statusLabel } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description: `Résumé of ${site.name}: education, projects, leadership and skills.`,
  path: "/cv",
});

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-accent mb-5 font-mono text-xs tracking-widest uppercase print:text-black">
      {children}
    </h2>
  );
}

function Row({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <li>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-display text-lg">{title}</h3>
        {meta ? <span className="text-muted font-mono text-xs">{meta}</span> : null}
      </div>
      {children}
    </li>
  );
}

export default async function CvPage() {
  const projects = await getProjects();
  const email = clean(site.email);
  const github = clean(site.links.github);
  const linkedin = clean(site.links.linkedin);
  const contact = [site.location, email, github, linkedin].filter(Boolean);

  return (
    <Container className="py-16 sm:py-24 print:py-0">
      <div className="flex flex-wrap items-end justify-between gap-6 print:hidden">
        <div>
          <p className="text-accent font-mono text-xs tracking-widest uppercase">CV</p>
          <h1 className="font-display mt-4 text-3xl">Résumé</h1>
        </div>
        <a
          href="/cv.pdf"
          download
          className="bg-accent text-accent-fg inline-flex h-12 items-center px-7 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Download PDF
        </a>
      </div>

      <article className="mt-12 max-w-3xl space-y-12 print:mt-0">
        <header>
          <p className="font-display text-2xl">{site.name}</p>
          <p className="text-muted mt-1">{site.role}</p>
          <p className="text-muted mt-3 font-mono text-xs">{contact.join("  ·  ")}</p>
        </header>

        <section aria-label="Summary">
          <p>{site.positioning}</p>
        </section>

        {site.education.length > 0 ? (
          <section aria-labelledby="cv-edu">
            <Heading>
              <span id="cv-edu">Education</span>
            </Heading>
            <ul className="space-y-6">
              {site.education.map((e) => (
                <Row key={e.school} title={e.school} meta={clean(e.period)}>
                  <p className="text-muted text-sm">{e.degree}</p>
                  {clean(e.note) ? <p className="mt-2 text-sm">{clean(e.note)}</p> : null}
                </Row>
              ))}
            </ul>
          </section>
        ) : null}

        {site.experience.length > 0 ? (
          <section aria-labelledby="cv-exp">
            <Heading>
              <span id="cv-exp">Experience</span>
            </Heading>
            <ul className="space-y-6">
              {site.experience.map((x) => (
                <Row key={x.role + x.org} title={x.role} meta={clean(x.period)}>
                  <p className="text-muted text-sm">{x.org}</p>
                  {clean(x.summary) ? (
                    <p className="mt-2 text-sm">{clean(x.summary)}</p>
                  ) : null}
                </Row>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="cv-projects">
          <Heading>
            <span id="cv-projects">Projects</span>
          </Heading>
          <ul className="space-y-7">
            {projects.map((p) => (
              <Row
                key={p.slug}
                title={p.title}
                meta={[statusLabel(p.status), formatMonth(p.date)]
                  .filter(Boolean)
                  .join(" · ")}
              >
                <p className="mt-2 text-sm">{p.summary}</p>
                {p.metrics.length > 0 ? (
                  <p className="text-muted mt-1 text-sm">
                    {p.metrics.map((m) => `${m.label}: ${m.value}`).join(" · ")}
                  </p>
                ) : null}
                <p className="text-muted mt-1 font-mono text-xs">{p.stack.join(" · ")}</p>
              </Row>
            ))}
          </ul>
        </section>

        {site.leadership.length > 0 ? (
          <section aria-labelledby="cv-lead">
            <Heading>
              <span id="cv-lead">Leadership</span>
            </Heading>
            <ul className="space-y-6">
              {site.leadership.map((l) => (
                <Row key={l.title} title={l.title} meta={clean(l.period)}>
                  <p className="text-muted text-sm">{l.org}</p>
                  {clean(l.summary) ? (
                    <p className="mt-2 text-sm">{clean(l.summary)}</p>
                  ) : null}
                </Row>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="cv-skills">
          <Heading>
            <span id="cv-skills">Skills</span>
          </Heading>
          <dl className="space-y-3 text-sm">
            {site.skills.map((g) => (
              <div
                key={g.group}
                className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <dt className="text-muted font-mono text-xs">{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </Container>
  );
}
