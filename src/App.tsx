import CampfireBackgroundLayout from "./ui/CampfireBackground";
import MapCard from "./ui/MapCard";
import MesaImage from "./assets/mesa.jpg";
import AlpineImage from "./assets/alpine.jpg";
import RootsImage from "./assets/roots.jpg";
import TropicsImage from "./assets/tropics.jpg";
import ShoreImage from "./assets/shore.jpg";
import CalderaImage from "./assets/caldera.jpg";
import KilnImage from "./assets/kiln.jpg";
import GloomImage from "./assets/gloom.jpg";
import CitadelImage from "./assets/citadel.jpg";
import MapToday from "./assets/map.json";
import CountdownTimer from "./ui/CountDownTimer";

type MapKey =
  | "SHORE"
  | "TROPICS"
  | "ROOTS"
  | "ALPINE"
  | "MESA"
  | "CALDERA"
  | "KILN"
  | "GLOOM"
  | "CITADEL";
type CurrentMapsType = {
  maps: MapKey[];
};

const mapDefinitions: Record<MapKey, { image: string; name: string }> = {
  SHORE: { image: ShoreImage, name: "Shore" },
  TROPICS: { image: TropicsImage, name: "Tropics" },
  ROOTS: { image: RootsImage, name: "Roots" },
  ALPINE: { image: AlpineImage, name: "Alpine" },
  MESA: { image: MesaImage, name: "Mesa" },
  CALDERA: { image: CalderaImage, name: "Caldera" },
  KILN: { image: KilnImage, name: "The Kiln" },
  GLOOM: { image: GloomImage, name: "Gloom" },
  CITADEL: { image: CitadelImage, name: "Citadel" },
};

const App = () => {
  const currentMaps = MapToday as CurrentMapsType;

  const now = new Date();
  const nextReset = new Date();
  nextReset.setUTCHours(17, 0, 0, 0);
  if (now.getUTCHours() >= 17) {
    nextReset.setUTCDate(nextReset.getUTCDate() + 1);
  }
  const timeDiff = nextReset.getTime() - now.getTime();

  return (
    <CampfireBackgroundLayout>
      <div className="text-center text-white font-display">
        <h1 className="text-9xl font-bold p-10">PEAK</h1>
        <p className="text-2xl">Today's biomes are</p>
      </div>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 justify-items-center gap-5 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {currentMaps.maps.map((mapKey) => {
          const map = mapDefinitions[mapKey];

          return (
            <MapCard
              key={mapKey}
              mapImagePath={map.image}
              mapName={map.name}
            />
          );
        })}
      </div>
      <div className="text-center text-white font-display p-10 text-2xl md:text-4xl">
        <p>Come back tomorrow for a new map rotation!</p>
        <CountdownTimer
          initialRemainingTime={timeDiff}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl"
        />
      </div>
    </CampfireBackgroundLayout>
  );
};

export default App;
