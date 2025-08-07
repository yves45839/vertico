"use client";

interface VideoHeroProps {
  onEnded: () => void;
}

export default function VideoHero({ onEnded }: VideoHeroProps) {
  return (
    <video
      src="/video/intro.mp4"
      autoPlay
      muted
      playsInline
      onEnded={onEnded}
      className="h-full w-full object-cover"
    />
  );
}
