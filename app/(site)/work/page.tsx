import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { WorkList } from "@/components/work/work-list";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Full-stack products and applied machine learning projects, with engineering write-ups.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();
  // Only card fields cross to the client; case-study bodies stay on the server.
  const cards = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    status: p.status,
    tags: p.tags,
    date: p.date,
    stack: p.stack,
    cover: p.cover,
    coverAlt: p.coverAlt,
  }));
  return (
    <Container className="py-16 sm:py-24">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">Work</p>
      <h1 className="font-display mt-4 text-3xl">Things I&apos;ve built</h1>
      <p className="text-muted mt-5 max-w-2xl text-lg">
        Each project has an engineering write-up: the problem, my role, the architecture
        and the trade-offs.
      </p>
      <div className="mt-12">
        <WorkList projects={cards} />
      </div>
    </Container>
  );
}
