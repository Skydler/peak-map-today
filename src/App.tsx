import MapToday from "./assets/map.json";
import CampfireBackground from "./ui/CampfireBackground";
import MapCard from "./ui/MapCard";
import MesaImage from "./assets/mesa.png";
import AlpineImage from "./assets/alpine.png";

const App = () => {
  const currentMap = MapToday.map.toUpperCase();

  return (
    <div>
      <CampfireBackground />
      <div className="h-screen w-screen bg-yellow-50 z-10">
        <div className="text-center">
          <h1 className="text-8xl font-bold p-10">PEAK</h1>
          <p className="text-2xl">Today's maps are:</p>
        </div>
        <div className="flex flex-row justify-center gap-24 p-10">
          <MapCard mapImagePath={MesaImage} mapName="Mesa" />
          <MapCard mapImagePath={AlpineImage} mapName="Alpine" />
        </div>
      </div>
    </div>
  );
};

export default App;
