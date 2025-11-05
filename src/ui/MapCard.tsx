import TiltedCard from "@/components/TiltedCard";

type MapCardProps = { mapImagePath: string; mapName: string };
export default function MapCard({ mapImagePath, mapName }: MapCardProps) {
  const cardSize = window.innerWidth < 768 ? 250 : 500;

  return (
    <div>
      <TiltedCard
        imageSrc={mapImagePath}
        altText="Mesa map"
        showTooltip={false}
        displayOverlayContent={true}
        imageWidth={cardSize}
        imageHeight={cardSize}
        showMobileWarning={false}
        overlayContent={
          <div className="relative top-5 left-10 p-2 rounded-lg bg-black/40 shadow-lg ring-1 ring-black/5">
            <p className="text-white text-lg font-bold">{mapName}</p>
          </div>
        }
      />
    </div>
  );
}
