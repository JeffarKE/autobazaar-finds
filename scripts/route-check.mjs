const baseUrl = new URL(process.argv[2] ?? "http://localhost:3002");
const queue = ["/", "/cars", "/sell", "/source", "/about", "/partners", "/admin", "/admin-login", "/robots.txt", "/sitemap.xml"];
const visited = new Set();
const results = [];

while (queue.length > 0) {
  const path = queue.shift();
  if (!path || visited.has(path)) continue;
  visited.add(path);

  try {
    const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
    const expectedAdminRedirect = path === "/admin" && response.status === 307;
    const ok = (response.status >= 200 && response.status < 300) || expectedAdminRedirect;
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("text/html") ? await response.text() : "";

    for (const match of body.matchAll(/href=["']([^"'#?]+)["']/g)) {
      const href = match[1];
      if (!href.startsWith("/") || href.startsWith("/_next/")) continue;
      if (!visited.has(href) && !queue.includes(href)) queue.push(href);
    }

    results.push({ path, status: response.status, ok });
  } catch (error) {
    results.push({ path, status: "ERR", ok: false, error: String(error) });
  }
}

const failures = results.filter((result) => !result.ok);
console.log(JSON.stringify({ checked: results.length, failures, results }, null, 2));
if (failures.length > 0) process.exitCode = 1;
