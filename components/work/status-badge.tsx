import { statusLabel } from "@/lib/format";
import type { Project } from "@/lib/schema";

export function StatusBadge({ status }: { status: Project["status"] }) {
  const active = status === "in-development";
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs ${
        active ? "text-accent" : "text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-muted"}`}
      />
      {statusLabel(status)}
    </span>
  );
}
