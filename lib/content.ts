import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { CASE_STUDY_SECTIONS, projectSchema, type Project } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

function splitFrontmatter(source: string): { data: unknown; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) return { data: {}, body: source };
  return { data: parseYaml(match[1] ?? "") ?? {}, body: match[2] ?? "" };
}

/** Throws at build time when a case study is missing a required section or has them out of order. */
function assertSections(slug: string, body: string): void {
  const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
  let cursor = 0;
  for (const section of CASE_STUDY_SECTIONS) {
    const found = headings.indexOf(section, cursor);
    if (found === -1) {
      throw new Error(
        `content/projects/${slug}.mdx: missing or out-of-order section "## ${section}". ` +
          `Required order: ${CASE_STUDY_SECTIONS.join(" → ")}`,
      );
    }
    cursor = found + 1;
  }
}

async function readProject(file: string): Promise<Project> {
  const slug = file.replace(/\.mdx$/, "");
  const source = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  const { data, body } = splitFrontmatter(source);
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `content/projects/${file}: invalid frontmatter\n${parsed.error.message}`,
    );
  }
  assertSections(slug, body);
  return { ...parsed.data, slug, body };
}

export async function getProjects(): Promise<Project[]> {
  const files = (await fs.readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".mdx"));
  const projects = await Promise.all(files.map(readProject));
  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getProject(slug: string): Promise<Project | null> {
  const files = await fs.readdir(PROJECTS_DIR);
  return files.includes(`${slug}.mdx`) ? readProject(`${slug}.mdx`) : null;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured).slice(0, limit);
}
