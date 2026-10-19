import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, action, children }: Props) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="border-border border-t py-16 sm:py-20"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="font-display mt-3 text-2xl">
              {title}
            </h2>
          </div>
          {action}
        </div>
        {children}
      </Container>
    </section>
  );
}
