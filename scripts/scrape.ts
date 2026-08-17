import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const validMaps = new Set([
  "SHORE",
  "TROPICS",
  "ROOTS",
  "ALPINE",
  "MESA",
  "CALDERA",
  "KILN",
  "GLOOM",
  "CITADEL",
]);

const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // necessary for github action runner
});

try {
  const page = await browser.newPage();
  await page.goto("https://peak.wiki.gg", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("a.peakTimerBiome4");

  const maps = await page.$$eval("a[class*='peakTimerBiome']", (links) =>
    links.map((link) => link.textContent?.trim().toUpperCase() ?? ""),
  );

  if (maps.length !== 5 || maps.some((map) => !validMaps.has(map))) {
    throw new Error(`Unexpected biome rotation: ${maps.join(", ")}`);
  }

  await fs.writeFile(
    new URL("../src/assets/map.json", import.meta.url),
    JSON.stringify({ maps }, null, 2) + "\n",
  );
  console.log("Map rotation saved.");
} finally {
  await browser.close();
}
