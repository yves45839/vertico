"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ServiceDTO = {
  id: string;
  title: string;
  summary: string;
  highlights: string[] | null;
};

type SectionDTO = {
  slug: string;
  title: string;
  subtitle?: string | null;
  heroImage?: string | null;
  services: ServiceDTO[];
};

type Card = {
  href: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
};

const FALLBACK_IMAGES: Record<string, { src: string; alt: string }> = {
  construction: {
    src: "/menu-construction.svg",
    alt: "Illustration abstraite de constructions",
  },
  "eaux-irrigation": {
    src: "/menu-water.svg",
    alt: "Illustration abstraite d'une goutte d'eau",
  },
  energie: {
    src: "/menu-energy.svg",
    alt: "Illustration abstraite d'un eclair",
  },
};

const defaultFallback = {
  src: "/menu-construction.svg",
  alt: "Illustration abstraite",
};

const slugToTitle = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const mapSectionToCard = (section: SectionDTO): Card => {
  const fallback = FALLBACK_IMAGES[section.slug] ?? defaultFallback;

  const highlights = (section.services ?? [])
    .flatMap((service) => {
      if (Array.isArray(service.highlights) && service.highlights.length > 0) {
        return service.highlights;
      }
      return service.summary ? [service.summary] : [service.title];
    })
    .filter(Boolean)
    .slice(0, 3);

  return {
    href: `/${section.slug}`,
    title: section.title,
    subtitle: section.subtitle ?? undefined,
    imageSrc: section.heroImage ?? fallback.src,
    imageAlt: section.heroImage ? section.title : fallback.alt,
    highlights,
  };
};

export default function NavigationDots() {
  const [cards, setCards] = useState<Card[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/sections?withServices=true", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load sections: ${res.status}`);
        }
        const payload = (await res.json()) as { sections: SectionDTO[] };
        if (!cancelled) {
          setCards(payload.sections.map(mapSectionToCard));
        }
      } catch (error) {
        console.error("Unable to fetch sections", error);
        if (!cancelled) {
          const fallbackCards = Object.keys(FALLBACK_IMAGES).map((slug) =>
            mapSectionToCard({
              slug,
              title: slugToTitle(slug),
              subtitle: undefined,
              heroImage: FALLBACK_IMAGES[slug]?.src,
              services: [],
            })
          );
          setCards(fallbackCards);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const cardsToRender = useMemo(() => cards.filter(Boolean), [cards]);

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-end px-4 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav className="pointer-events-auto flex w-full max-w-5xl flex-col space-y-6 rounded-2xl border border-white/40 bg-white/80 p-8 backdrop-blur">
        <ul className="grid gap-6 md:grid-cols-3">
          {cardsToRender.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <h2 className="text-lg font-semibold text-blue-900 group-hover:text-orange-500">
                    {card.title}
                  </h2>
                  {card.subtitle && (
                    <p className="mt-2 text-sm text-blue-900/70">{card.subtitle}</p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-blue-900/80">
                    {card.highlights.map((highlight) => (
                      <li
                        key={`${card.href}-${highlight}`}
                        className="rounded-full bg-orange-50 px-3 py-1 text-blue-900 group-hover:bg-orange-100"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}