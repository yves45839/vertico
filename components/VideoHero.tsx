"use client";

interface VideoHeroProps {
  onEnded: () => void;
}

export default function VideoHero({ onEnded }: VideoHeroProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <video
        src="/video/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        className="h-full w-full object-cover portrait:h-full portrait:w-auto"
      />
    </div>
  );
}
