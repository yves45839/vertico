"use client";

interface VideoHeroProps {
  onEnded: () => void;
}

export default function VideoHero({ onEnded }: VideoHeroProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <video
        src="/video/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        className="h-full w-full object-cover portrait:h-full portrait:w-auto [@media(orientation:portrait)]:w-auto [@media(orientation:portrait)]:object-contain"
      />
    </div>
  );
}
