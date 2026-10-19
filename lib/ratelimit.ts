/**
 * Small in-memory sliding-window limiter. On serverless each warm instance keeps its own
 * counters, which is enough to blunt casual abuse. For a hard global limit, swap `hit` for
 * a shared store such as Upstash Redis (see README).
 */
const buckets = new Map<string, number[]>();

export function hit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 1000) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return true;
}
