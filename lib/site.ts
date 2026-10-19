import raw from "@/content/site.json";
import { siteSchema, type SiteConfig } from "./schema";

/** Validated at build time; edited through the Keystatic admin (content/site.json). */
export const site: SiteConfig = siteSchema.parse(raw);

export const isTodo = (value: string): boolean => value.startsWith("TODO(");

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
