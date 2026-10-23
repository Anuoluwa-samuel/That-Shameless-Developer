import Link from "next/link";
import { Container } from "@/components/layout/container";
import { site } from "@/lib/site";

const PIPELINE = ["PRD", "Schema", "API", "UI", "Deploy"] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <p className="text-accent font-mono text-xs tracking-widest uppercase">
          {site.role}
        </p>
        <h1 id="hero-title" className="font-display mt-5 max-w-4xl text-4xl">
          {site.name}
        </h1>
        <p className="text-muted mt-8 max-w-2xl text-lg">{site.positioning}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="bg-accent text-accent-fg inline-flex h-12 items-center px-7 text-sm font-medium transition-opacity hover:opacity-90"
          >
            View work
          </Link>
          <a
            href="/cv.pdf"
            download
            className="hover:border-accent border-control inline-flex h-12 items-center border px-7 text-sm font-medium transition-colors"
          >
            Download CV
          </a>
        </div>
        <ol
          aria-label="What I deliver, end to end"
          className="text-muted mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs"
        >
          {PIPELINE.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="text-fg">{step}</span>
              {i < PIPELINE.length - 1 ? <span aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
