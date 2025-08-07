"use client";

import { useState } from "react";
import VideoHero from "@/components/VideoHero";
import NavigationDots from "@/components/NavigationDots";

export default function HomePage() {
  const [showDots, setShowDots] = useState(false);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-white">
      <VideoHero onEnded={() => setShowDots(true)} />
      {showDots && <NavigationDots />}
    </main>
  );
}
