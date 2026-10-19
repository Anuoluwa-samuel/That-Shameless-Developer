import Image from "next/image";
import Link from "next/link";
import { formatMonth } from "@/lib/format";
import type { Project } from "@/lib/schema";
import { StatusBadge } from "./status-badge";

export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "summary"
  | "status"
  | "tags"
  | "date"
  | "stack"
  | "cover"
  | "coverAlt"
>;

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const date = formatMonth(project.date);
  return (
    <article className="group border-border bg-surface hover:border-accent relative flex h-full flex-col border p-5 transition-colors sm:p-6">
      {project.cover ? (
        <div className="border-border relative mb-5 aspect-video overflow-hidden border">
          <Image
            src={project.cover}
            alt={project.coverAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        {date ? <span className="text-muted font-mono text-xs">{date}</span> : null}
      </div>
      <h3 className="font-display mt-4 text-xl">
        <Link
          href={`/work/${project.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </Link>
      </h3>
      <p className="text-muted mt-3 text-sm">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5" aria-label="Stack">
        {project.stack.slice(0, 5).map((tech) => (
          <li key={tech} className="text-muted font-mono text-xs">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
