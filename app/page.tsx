"use client";

import { useState } from "react";
import VideoHero from "@/components/VideoHero";
import NavigationDots from "@/components/NavigationDots";

export default function HomePage() {
  const [showDots, setShowDots] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("introPlayed") === "true";
    }
    return false;
  });

  const handleVideoEnd = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowDots(true);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-white">
      {!showDots && <VideoHero onEnded={handleVideoEnd} />}
      {showDots && <NavigationDots />}
    </main>
  );
}
