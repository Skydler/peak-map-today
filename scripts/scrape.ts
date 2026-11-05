import fs from "node:fs/promises";

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

const api =
  "https://peak.wiki.gg/api.php?action=query&format=json&formatversion=2&prop=revisions&rvprop=content&rvslots=main&titles=";

const getPage = async (title: string): Promise<string> => {
  const response = await fetch(api + title);
  if (!response.ok) {
    throw new Error(`PEAK Wiki returned ${response.status}`);
  }
  const data = await response.json();
  return data.query.pages[0].revisions[0].slots.main.content;
};

const schedule = JSON.parse(await getPage("MediaWiki:Maps.json"));
const maps = (schedule.biomes as { biome: string }[][]).map((day) =>
  day.map((entry) => entry.biome.toUpperCase()),
);

if (
  maps.some(
    (day) => day.length !== 5 || day.some((map) => !validMaps.has(map)),
  )
) {
  throw new Error("Unexpected biome rotation");
}

const js = await getPage("MediaWiki:Common.js");
const value = (name: string) =>
  Number(js.match(new RegExp(`const ${name} = (\\d+)`))?.[1]);
const start = new Date(
  Date.UTC(
    value("RESET_YEAR"),
    value("RESET_MONTH") - 1,
    value("RESET_DAY"),
    value("RESET_HOUR_UTC"),
    value("RESET_MINUTE_UTC"),
  ),
).toISOString();

await fs.writeFile(
  new URL("../src/assets/map.json", import.meta.url),
  JSON.stringify({ start, maps }, null, 2) + "\n",
);
console.log("Map rotation saved.");
