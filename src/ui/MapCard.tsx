import TiltedCard from "@/components/TiltedCard";

type MapCardProps = { mapImagePath: string; mapName: string };
export default function MapCard({ mapImagePath, mapName }: MapCardProps) {
  // Responsive size: min 200px, prefers ~45vw, max 420px
  const size = "clamp(100px, 30vh, 400px)" as React.CSSProperties["width"];

  return (
    <div className="flex items-center justify-center">
      <TiltedCard
        imageSrc={mapImagePath}
        altText={mapName + " map"}
        showTooltip={false}
        displayOverlayContent={true}
        containerWidth={size}
        containerHeight={size}
        imageWidth={size}
        imageHeight={size}
        showMobileWarning={false}
        overlayContent={
          <div className="relative top-3 left-3 md:top-5 md:left-5 p-2 md:p-3 rounded-lg bg-black/40 shadow-lg ring-1 ring-black/5">
            <p className="text-white text-sm md:text-lg font-bold">{mapName}</p>
          </div>
        }
      />
    </div>
  );
}
