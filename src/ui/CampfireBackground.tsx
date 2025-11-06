import Plasma from "../components/Plasma";
import CampfireIcon from "../assets/campfire.png";

export default function CampfireBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[1250px] sm:min-h-[1500px] md:min-h-dvh overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t to-violet-500 from-rose-300">
        <div className="w-full h-full pointer-events-none absolute inset-0 -top-8">
          <Plasma
            color="#000000"
            speed={0.7}
            direction="forward"
            scale={0.4}
            opacity={0.2}
            mouseInteractive={false}
          />
          <img
            className="sticky bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-48 pointer-events-none"
            src={CampfireIcon}
          />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
