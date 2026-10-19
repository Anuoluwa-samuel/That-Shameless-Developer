import { z } from "zod";

export const PROJECT_STATUSES = [
  "shipped",
  "live",
  "in-development",
  "case-study",
] as const;
export const PROJECT_TAGS = ["Full-stack", "ML", "Design"] as const;

/** Sections every case study must contain, as H2 headings, in this order. */
export const CASE_STUDY_SECTIONS = [
  "Overview",
  "Problem",
  "My role",
  "Architecture",
  "Key decisions & trade-offs",
  "Results",
  "What I'd do next",
  "Stack",
  "Links",
] as const;

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(160),
  status: z.enum(PROJECT_STATUSES),
  tags: z.array(z.enum(PROJECT_TAGS)).min(1),
  featured: z.boolean().default(false),
  order: z.number().int().default(100),
  /** YYYY-MM, or a TODO(ayomide) placeholder until the real date is known. */
  date: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string().min(1)).default([]),
  /** Only real, supplied numbers. Never invented. */
  metrics: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .default([]),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
        kind: z.enum(["live", "repo", "docs"]),
      }),
    )
    .default([]),
  cover: z.string().nullish(),
  coverAlt: z.string().nullish(),
  /** Mermaid source, rendered to SVG at build time. */
  diagram: z.string().nullish(),
});
export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type Project = ProjectFrontmatter & { slug: string; body: string };

export const siteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  handle: z.string().min(1),
  role: z.string().min(1),
  positioning: z.string().min(1),
  location: z.string().min(1),
  email: z.string().min(1),
  links: z.object({ github: z.string(), linkedin: z.string() }),
  skills: z
    .array(z.object({ group: z.string().min(1), items: z.array(z.string().min(1)) }))
    .default([]),
  leadership: z
    .array(
      z.object({
        title: z.string().min(1),
        org: z.string().min(1),
        period: z.string().default(""),
        summary: z.string().default(""),
      }),
    )
    .default([]),
});
export type SiteConfig = z.infer<typeof siteSchema>;
