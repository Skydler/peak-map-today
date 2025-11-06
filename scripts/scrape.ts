import fs from "node:fs";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // necessary for github action runner
});
const page = await browser.newPage();
await page.goto("https://peak.wiki.gg");
const bodyHTML = await page.evaluate(() => document.body.innerHTML);
await browser.close();

const $ = cheerio.load(bodyHTML);
// Count starts at 0
const biome2Element = $("a.peakTimerBiome1");
const biome3Element = $("a.peakTimerBiome2");

fs.writeFile(
  "src/assets/map.json",
  JSON.stringify({
    map2: biome2Element.text().toUpperCase(),
    map3: biome3Element.text().toUpperCase(),
  }),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  },
);
