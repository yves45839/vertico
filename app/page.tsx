"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import NavigationDots from "@/components/NavigationDots";
import VideoHero from "@/components/VideoHero";

const INTRO_STORAGE_KEY = "vertico-intro-viewed";

export default function HomePage() {
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const hasSeenIntro = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";

    if (hasSeenIntro) {
      setShouldPlayIntro(false);
      setShowDots(true);
    } else {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    }
  }, []);

  const handleIntroEnded = () => {
    setShowDots(true);
    setShouldPlayIntro(false);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#1e1b18]">
      <Image
        src="/hero-backdrop.svg"
        alt="Intérieur chaleureux avec lumière tamisée"
        fill
        priority
        className={`absolute inset-0 object-cover transition-opacity duration-700 ${
          shouldPlayIntro ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      {shouldPlayIntro && <VideoHero onEnded={handleIntroEnded} />}
      {showDots && <NavigationDots />}
    </main>
  );
}
