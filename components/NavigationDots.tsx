"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { href: "/gros-oeuvre", label: "Gros œuvre" },
  { href: "/amenagement", label: "Aménagement" },
  { href: "/hydraulique", label: "Hydraulique" },
];

export default function NavigationDots() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-end transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav className="pointer-events-auto mr-4 flex flex-col items-end space-y-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center"
            aria-label={item.label}
          >
            <div className="rounded-lg border-2 border-[#D4AF37] bg-white/80 px-4 py-2 text-blue-900">
              {item.label}
            </div>
            <span className="mx-2 h-px w-8 bg-white" />
            <span className="h-5 w-5 rounded-full bg-orange-500 transition-colors group-hover:bg-orange-600 md:h-8 md:w-8" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
