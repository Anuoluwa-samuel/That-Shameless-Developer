import type { ReactNode } from "react";

type Props = { eyebrow: string; title: string; children?: ReactNode };

export function PageHeader({ eyebrow, title, children }: Props) {
  return (
    <header className="max-w-3xl">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">{eyebrow}</p>
      <h1 className="font-display mt-4 text-3xl">{title}</h1>
      {children ? <div className="text-muted mt-5 text-lg">{children}</div> : null}
    </header>
  );
}
