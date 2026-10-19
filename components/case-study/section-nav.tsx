import type { Section } from "@/lib/content";

export function SectionNav({ sections }: { sections: Section[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24">
      <p className="text-muted font-mono text-xs tracking-widest uppercase">Contents</p>
      <ol className="mt-4 space-y-2 text-sm">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-3">
            <span className="text-muted font-mono text-xs leading-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a href={`#${s.id}`} className="text-muted hover:text-fg">
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
