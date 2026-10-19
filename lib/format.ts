import { isTodo } from "./site";

/** Returns the text, or null while it is still a TODO(ayomide) placeholder. */
export function clean(value: string | null | undefined): string | null {
  if (!value || isTodo(value)) return null;
  return value;
}

const STATUS_LABEL = {
  shipped: "Shipped",
  live: "Live",
  "in-development": "In active development",
  "case-study": "Case study",
} as const;

export function statusLabel(status: keyof typeof STATUS_LABEL): string {
  return STATUS_LABEL[status];
}

/** "2026-01" -> "Jan 2026"; anything else (e.g. a TODO) -> null. */
export function formatMonth(value: string): string | null {
  const m = /^(\d{4})-(\d{2})$/.exec(value);
  if (!m) return null;
  const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1));
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
