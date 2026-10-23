import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: site.role,
    title: site.name,
    subtitle: site.positioning,
    footer: `${site.handle} · ${site.location}`,
  });
}
