import { Container } from "@/components/layout/container";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <Container className="py-24">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">
        {site.role}
      </p>
      <h1 className="font-display mt-4 text-4xl">{site.name}</h1>
      <p className="text-muted mt-6 max-w-xl text-lg">{site.positioning}</p>
    </Container>
  );
}
