import CampfireBackground from "./ui/CampfireBackground";
import MapCard from "./ui/MapCard";
import MesaImage from "./assets/mesa.png";
import AlpineImage from "./assets/alpine.png";
import RootsImage from "./assets/roots.jpg";
import TropicsImage from "./assets/tropics.png";
import MapToday from "./assets/map.json";

type MapKey = "MESA" | "ALPINE" | "ROOTS" | "TROPICS";
type CurrentMapsType = {
  map2: MapKey;
  map3: MapKey;
};

const mapMapping = {
  TROPICS: <MapCard mapImagePath={TropicsImage} mapName="Tropics" />,
  ROOTS: <MapCard mapImagePath={RootsImage} mapName="Roots" />,
  ALPINE: <MapCard mapImagePath={AlpineImage} mapName="Alpine" />,
  MESA: <MapCard mapImagePath={MesaImage} mapName="Mesa" />,
};

const App = () => {
  const currentMaps = MapToday as CurrentMapsType;

  return (
    <div className="min-h-[1100px] relative bg-linear-to-t to-violet-500 from-rose-300 ">
      <CampfireBackground />
      <div className="h-screen w-screen">
        <div className="text-center text-white font-display">
          <h1 className="text-9xl font-bold p-10">PEAK</h1>
          <p className="text-2xl">Today's maps are</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-24 p-10">
          {mapMapping[currentMaps.map2]}
          {mapMapping[currentMaps.map3]}
        </div>
      </div>
    </div>
  );
};

export default App;
