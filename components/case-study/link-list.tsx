import { isTodo } from "@/lib/site";
import type { Project } from "@/lib/schema";

const KIND_LABEL = { live: "Live", repo: "Code", docs: "Docs" } as const;

export function LinkList({ links }: { links: Project["links"] }) {
  const real = links.filter((l) => !isTodo(l.href));
  if (real.length === 0) return null;
  return (
    <ul className="my-6 space-y-3">
      {real.map((l) => (
        <li key={l.href} className="flex items-baseline gap-4">
          <span className="text-muted w-12 shrink-0 font-mono text-xs">
            {KIND_LABEL[l.kind]}
          </span>
          <a href={l.href} className="text-accent underline underline-offset-4">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
