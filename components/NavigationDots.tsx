"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavigationDots() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const baseClass =
    "absolute w-5 h-5 md:w-8 md:h-8 rounded-full bg-orange-500 hover:bg-orange-600 transition-opacity duration-700";

  return (
    <div className="absolute inset-0">
      <Link
        href="/gros-oeuvre"
        className={`${baseClass} left-1/4 bottom-1/3 ${visible ? "opacity-100" : "opacity-0"}`}
        aria-label="Gros œuvre"
      />
      <Link
        href="/amenagement"
        className={`${baseClass} left-1/2 bottom-1/4 -translate-x-1/2 ${visible ? "opacity-100" : "opacity-0"}`}
        aria-label="Aménagement"
      />
      <Link
        href="/hydraulique"
        className={`${baseClass} right-1/4 bottom-1/3 ${visible ? "opacity-100" : "opacity-0"}`}
        aria-label="Hydraulique"
      />
    </div>
  );
}
