import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import type { Project } from "@/lib/schema";
import { Section } from "./section";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <Section
      id="featured"
      eyebrow="Selected work"
      title="Products, end to end"
      action={
        <Link href="/work" className="text-accent text-sm underline underline-offset-4">
          All projects
        </Link>
      }
    >
      <ul className="grid gap-5 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <Reveal className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
