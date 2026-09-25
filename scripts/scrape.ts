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
  const response = await page.goto("https://peak.wiki.gg", {
    waitUntil: "domcontentloaded",
  });

  if (!response?.ok()) {
    const status = response?.status() ?? "no response";
    if (status === 403) {
      console.warn(
        "PEAK Wiki denied the automated request (403); keeping the checked-in map rotation.",
      );
    } else {
      throw new Error(`PEAK Wiki returned ${status}`);
    }
  } else {
    // The wiki fills this container asynchronously; avoid relying on an index-specific class.
    await page.waitForFunction(
      () => document.querySelectorAll(".peakTimerLower a").length === 5,
      { timeout: 60_000 },
    );

    const maps = await page.$$eval(".peakTimerLower a", (links) =>
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
  }
} finally {
  await browser.close();
}
