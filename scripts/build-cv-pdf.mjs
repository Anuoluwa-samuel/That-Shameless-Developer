// Prints the /cv page to public/cv.pdf with headless Chrome, so the PDF always matches the web résumé.
// Usage: npm run build && npm run cv:pdf   (then commit public/cv.pdf)
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = 3199;
const CHROME =
  process.env.CHROME_PATH ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find(existsSync);
if (!CHROME) throw new Error("Chrome not found. Set CHROME_PATH.");

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
try {
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/cv`)).ok) break;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  const r = spawnSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--print-to-pdf=public/cv.pdf",
    `http://localhost:${PORT}/cv`,
  ]);
  if (r.status !== 0) throw new Error(`Chrome exited with ${r.status}`);
  console.log("Wrote public/cv.pdf");
} finally {
  server.kill();
}
