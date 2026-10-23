"use client";

import { useState } from "react";
import { PROJECT_TAGS } from "@/lib/schema";
import { ProjectCard, type ProjectCardData } from "./project-card";

type Filter = "All" | (typeof PROJECT_TAGS)[number];
const FILTERS: Filter[] = ["All", ...PROJECT_TAGS];

export function WorkList({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const count =
            f === "All"
              ? projects.length
              : projects.filter((p) => p.tags.includes(f)).length;
          const pressed = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 font-mono text-xs transition-colors ${
                pressed
                  ? "border-accent bg-accent text-accent-fg"
                  : "text-muted hover:text-fg border-control"
              }`}
            >
              {f} <span aria-hidden="true">· {count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} level={2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
