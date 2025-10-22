import fs from "node:fs";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("https://peak.wiki.gg");
const bodyHTML = await page.evaluate(() => document.body.innerHTML);
await browser.close();

const $ = cheerio.load(bodyHTML);
const biomeElement = $("a.peakTimerBiome2");

fs.writeFile(
  "src/assets/map.json",
  JSON.stringify({ map: biomeElement.text() }),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  },
);
