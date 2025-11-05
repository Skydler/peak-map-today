import Plasma from "../components/Plasma";
import CampfireIcon from "../assets/campfire.png";

function CampfireBackground() {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full absolute -top-10 left-0">
        <Plasma
          color="#000000"
          speed={0.7}
          direction="forward"
          scale={0.4}
          opacity={0.2}
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
  );
}
export default CampfireBackground;
