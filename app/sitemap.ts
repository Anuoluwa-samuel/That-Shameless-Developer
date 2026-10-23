import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const pages = ["", "/work", "/about", "/cv", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    priority: path === "" ? 1 : 0.8,
  }));
  const cases = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    priority: 0.7,
  }));
  return [...pages, ...cases];
}
