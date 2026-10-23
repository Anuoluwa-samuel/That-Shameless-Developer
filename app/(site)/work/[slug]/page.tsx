import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagram } from "@/components/case-study/diagram";
import { LinkList } from "@/components/case-study/link-list";
import { MetricList } from "@/components/case-study/metric-list";
import { SectionNav } from "@/components/case-study/section-nav";
import { StackTags } from "@/components/case-study/stack-tags";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { StatusBadge } from "@/components/work/status-badge";
import { getProject, getProjects, splitSections } from "@/lib/content";
import { formatMonth } from "@/lib/format";
import { creativeWorkJsonLd } from "@/lib/jsonld";
import { Prose } from "@/lib/mdx";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const sections = splitSections(project.body);
  const date = formatMonth(project.date);

  return (
    <Container as="article" className="py-12 sm:py-20">
      <JsonLd data={creativeWorkJsonLd(project)} />
      <Link href="/work" className="text-muted hover:text-fg font-mono text-xs">
        ← All work
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <StatusBadge status={project.status} />
          {date ? <span className="text-muted font-mono text-xs">{date}</span> : null}
          <ul className="flex gap-3" aria-label="Tags">
            {project.tags.map((t) => (
              <li key={t} className="text-muted font-mono text-xs">
                #{t}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="font-display mt-5 text-3xl">{project.title}</h1>
        <p className="text-muted mt-5 text-lg">{project.summary}</p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <SectionNav sections={sections} />
        <div className="max-w-3xl">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-heading`}
              className="border-border scroll-mt-24 border-t py-10 first:border-t-0 first:pt-0"
            >
              <p className="text-accent font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 id={`${s.id}-heading`} className="font-display mt-2 mb-5 text-2xl">
                {s.title}
              </h2>
              {s.title === "Results" ? <MetricList metrics={project.metrics} /> : null}
              <div className="prose-case">
                <Prose source={s.content} />
              </div>
              {s.title === "Architecture" && project.diagram ? (
                <Diagram source={project.diagram} title={project.title} />
              ) : null}
              {s.title === "Stack" ? <StackTags stack={project.stack} /> : null}
              {s.title === "Links" ? <LinkList links={project.links} /> : null}
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
