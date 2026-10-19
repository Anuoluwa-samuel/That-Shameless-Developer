import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">404</p>
      <h1 className="font-display mt-4 text-3xl">That page doesn&apos;t exist.</h1>
      <p className="text-muted mt-4 max-w-md">
        It may have moved, or the link is wrong. The work is a good place to start.
      </p>
      <Link
        href="/work"
        className="text-accent mt-8 inline-block underline underline-offset-4"
      >
        View work
      </Link>
    </Container>
  );
}
