import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

/**
 * Structure for a future /notes section. Drop `content/notes/<slug>.mdx` files with this
 * frontmatter and they flow into the RSS feed at /rss.xml. The /notes pages themselves are
 * not built yet, so nothing links to them.
 */
const noteSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type Note = z.infer<typeof noteSchema> & { slug: string };

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export async function getNotes(): Promise<Note[]> {
  let files: string[];
  try {
    files = (await fs.readdir(NOTES_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
  const notes = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(NOTES_DIR, file), "utf8");
      const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
      const data = noteSchema.parse(parseYaml(match?.[1] ?? ""));
      return { ...data, slug: file.replace(/\.mdx$/, "") };
    }),
  );
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}
