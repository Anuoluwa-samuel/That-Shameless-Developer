import { getNotes } from "@/lib/notes";
import { site, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(): Promise<Response> {
  const notes = await getNotes();
  const items = notes
    .map(
      (n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${siteUrl}/notes/${n.slug}</link>
      <guid>${siteUrl}/notes/${n.slug}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description>${esc(n.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)}: notes</title>
    <link>${siteUrl}</link>
    <description>${esc(site.positioning)}</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
