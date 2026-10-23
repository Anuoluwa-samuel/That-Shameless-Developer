import raw from "@/content/site.json";
import { siteSchema, type SiteConfig } from "./schema";

/** Validated at build time; edited through the Keystatic admin (content/site.json). */
export const site: SiteConfig = siteSchema.parse(raw);

export const isTodo = (value: string): boolean => value.startsWith("TODO(");

/** Accepts "https://x.com" or "x.com". Rejects anything that is not a real host (e.g. "*.vercel.app"). */
function toOrigin(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed === "" || trimmed.includes("*")) return null;
  try {
    return new URL(/^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`).origin;
  } catch {
    return null;
  }
}

/**
 * Canonical site origin: NEXT_PUBLIC_SITE_URL if valid, else the Vercel production domain
 * (set automatically on Vercel), else localhost. A bad value never breaks the build.
 */
export const siteUrl: string =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  "http://localhost:3000";

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
