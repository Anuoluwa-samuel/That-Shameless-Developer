import type { Project } from "@/lib/schema";

export function MetricList({ metrics }: { metrics: Project["metrics"] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="border-border bg-border my-8 grid gap-px border sm:grid-cols-2">
      {metrics.map((m) => (
        <div key={m.label} className="bg-bg p-5">
          <dd className="text-accent font-mono text-2xl">{m.value}</dd>
          <dt className="text-muted mt-1 text-sm">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}
