import { getProject, getProjects } from "@/lib/content";
import { statusLabel } from "@/lib/format";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = "Case study";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return ogCard({
    eyebrow:
      project && project.status !== "case-study"
        ? `Case study · ${statusLabel(project.status)}`
        : "Case study",
    title: project?.title ?? site.name,
    subtitle: project?.summary ?? site.positioning,
    footer: project ? project.stack.slice(0, 5).join("  ·  ") : site.name,
  });
}
