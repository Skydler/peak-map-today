import MapToday from "./assets/map.json";
import Plasma from "./components/Plasma";
import CampfireIcon from "./assets/campfire.png";

const App = () => {
  const currentMap = MapToday.map.toUpperCase();

  return (
    <div className="h-screen w-screen bg-yellow-100">
      <div className="h-full w-full">
        <div className="h-full w-full absolute top-0 left-0">
          <Plasma
            color="#000000"
            speed={0.9}
            direction="forward"
            scale={0.4}
            opacity={0.1}
            mouseInteractive={false}
          />
        </div>
        <div>
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            src={CampfireIcon}
            height={200}
            width={200}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
