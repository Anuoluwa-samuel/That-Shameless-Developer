import "server-only";
import { renderMermaidSVG } from "beautiful-mermaid";

/**
 * Renders Mermaid source to inline SVG at build time (no client JS, no layout shift).
 * Colours are CSS variables (--dg-*, aliases of the site tokens: the library sets --bg/--fg/etc.
 * on the SVG itself, so pointing them at themselves would be a cycle), so the diagram follows
 * the light/dark theme instantly.
 * The source comes from content/projects, which only the site owner can edit.
 */
export function Diagram({ source, title }: { source: string; title: string }) {
  const raw = renderMermaidSVG(source, {
    bg: "var(--dg-bg)",
    fg: "var(--dg-fg)",
    accent: "var(--dg-accent)",
    muted: "var(--dg-muted)",
    surface: "var(--dg-surface)",
    border: "var(--dg-border)",
    line: "var(--dg-muted)",
    transparent: true,
  });
  // The library embeds a Google Fonts @import; drop it and use the already-loaded site fonts instead.
  const svg = raw
    .replace(/@import url\([^)]*\);?/g, "")
    .replace(/font-family:\s*'[^']*'/g, "font-family: var(--font-inter)");
  return (
    <figure className="my-8">
      <div
        role="img"
        aria-label={`${title}: architecture diagram`}
        tabIndex={0}
        className="border-border bg-surface overflow-x-auto border p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="text-muted mt-2 font-mono text-xs">
        Architecture, rendered from Mermaid at build time.
      </figcaption>
    </figure>
  );
}
