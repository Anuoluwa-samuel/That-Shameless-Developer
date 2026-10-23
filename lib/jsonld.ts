import { clean } from "./format";
import type { Project } from "./schema";
import { site, siteUrl } from "./site";

export function personJsonLd(): Record<string, unknown> {
  const sameAs = [clean(site.links.github), clean(site.links.linkedin)].filter(Boolean);
  const email = clean(site.email);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    jobTitle: site.role,
    description: site.positioning,
    url: siteUrl,
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Akure", addressCountry: "NG" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Technology, Akure",
    },
    knowsAbout: site.skills.flatMap((g) => g.items),
  };
}

export function creativeWorkJsonLd(project: Project): Record<string, unknown> {
  const live = project.links.find((l) => l.kind === "live" && clean(l.href));
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    author: { "@type": "Person", name: site.name, url: siteUrl },
    keywords: [...project.tags, ...project.stack].join(", "),
    ...(/^\d{4}-\d{2}$/.test(project.date) ? { dateCreated: project.date } : {}),
    ...(live ? { sameAs: live.href } : {}),
    ...(project.status === "in-development"
      ? { creativeWorkStatus: "In development" }
      : {}),
  };
}
