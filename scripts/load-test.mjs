const baseUrl = process.argv[2] ?? "http://localhost:3002";
const total = Number(process.argv[3] ?? 400);
const concurrency = Number(process.argv[4] ?? 40);
const paths = [
  "/",
  "/cars",
  "/source",
  "/sell",
  "/about",
  "/partners",
  "/robots.txt",
  "/sitemap.xml",
  "/admin",
];

const timings = [];
const statuses = {};
let cursor = 0;
let ok = 0;
let failed = 0;

async function worker() {
  while (cursor < total) {
    const index = cursor++;
    const path = paths[index % paths.length];
    const startedAt = performance.now();

    try {
      const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
      const key = `${path}:${response.status}`;
      statuses[key] = (statuses[key] ?? 0) + 1;
      if (response.status >= 200 && response.status < 400) ok++;
      else failed++;
      await response.arrayBuffer();
    } catch {
      const key = `${path}:ERR`;
      statuses[key] = (statuses[key] ?? 0) + 1;
      failed++;
    }

    timings.push(performance.now() - startedAt);
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
timings.sort((a, b) => a - b);
const percentile = (value) =>
  Math.round(timings[Math.min(timings.length - 1, Math.floor(timings.length * value))]);

console.log(JSON.stringify({
  baseUrl,
  total,
  concurrency,
  ok,
  failed,
  p50Ms: percentile(0.5),
  p95Ms: percentile(0.95),
  p99Ms: percentile(0.99),
  maxMs: Math.round(timings.at(-1)),
  statuses,
}, null, 2));

if (failed > 0) process.exitCode = 1;
