import TiltedCard from "@/components/TiltedCard";

type MapCardProps = { mapImagePath: string; mapName: string };
export default function MapCard({ mapImagePath, mapName }: MapCardProps) {
  return (
    <div>
      <TiltedCard
        imageSrc={mapImagePath}
        altText="Mesa map"
        showTooltip={false}
        displayOverlayContent={true}
        overlayContent={
          <div className="relative top-5 left-10 p-2 rounded-lg bg-black/40 shadow-lg ring-1 ring-black/5">
            <p className="text-white font-bold">{mapName}</p>
          </div>
        }
      />
    </div>
  );
}
