import type { SiteConfig } from "@/lib/schema";
import { Section } from "./section";

export function SkillsStrip({ skills }: { skills: SiteConfig["skills"] }) {
  if (skills.length === 0) return null;
  return (
    <Section id="skills" eyebrow="Toolbox" title="What I build with">
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <div key={g.group}>
            <dt className="text-accent font-mono text-xs tracking-widest uppercase">
              {g.group}
            </dt>
            <dd className="mt-3">
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
