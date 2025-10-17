"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import VideoHero from "@/components/VideoHero";

export type HomePageService = {
  id: string;
  title: string;
  summary: string;
  body: string | null;
  imageUrl: string | null;
  highlights: string[];
};

export type HomePageSection = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  heroImage: string | null;
  services: HomePageService[];
};

type HomePageContentProps = {
  sections: HomePageSection[];
};

const INTRO_STORAGE_KEY = "vertico-intro-viewed";

type SectionTheme = {
  backgroundSrc: string;
  backgroundAlt: string;
  gradientClass: string;
  accentBlobs: string[];
  taglineColor: string;
  descriptionColor: string;
  summaryColor: string;
  bodyColor: string;
  highlightTextColor: string;
  highlightBorderColor: string;
  highlightBgColor: string;
  cardBorderColor: string;
  cardHoverBorderColor: string;
  placeholderGradient: string;
  imageOverlay: string;
};

const SECTION_THEMES: Record<string, SectionTheme> = {
  construction: {
    backgroundSrc: "/construction-loop.gif",
    backgroundAlt: "Animation abstraite de chantiers lumineux",
    gradientClass: "construction-gradient",
    accentBlobs: [
      "absolute left-[12%] top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl",
      "absolute right-[18%] top-40 h-80 w-80 rounded-full bg-rose-500/20 blur-[110px]",
      "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),rgba(255,255,255,0)_55%)] mix-blend-overlay",
      "absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_65%)]",
    ],
    taglineColor: "text-orange-300/80",
    descriptionColor: "text-orange-100/90",
    summaryColor: "text-orange-100/90",
    bodyColor: "text-orange-100/70",
    highlightTextColor: "text-orange-50/90",
    highlightBorderColor: "border-orange-200/50",
    highlightBgColor: "bg-orange-200/15",
    cardBorderColor: "border-orange-200/30",
    cardHoverBorderColor: "hover:border-orange-200/70",
    placeholderGradient:
      "bg-gradient-to-br from-orange-500/40 via-orange-400/10 to-orange-950/60",
    imageOverlay:
      "bg-gradient-to-br from-orange-500/45 via-transparent to-orange-900/70 mix-blend-screen",
  },
  "eaux-irrigation": {
    backgroundSrc: "/water-loop.gif",
    backgroundAlt: "Animation de flux d'eau potable",
    gradientClass: "water-gradient",
    accentBlobs: [
      "absolute left-[14%] top-28 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl",
      "absolute right-[20%] top-40 h-80 w-80 rounded-full bg-sky-500/25 blur-[120px]",
      "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] mix-blend-overlay",
      "absolute inset-0 bg-[linear-gradient(130deg,rgba(177,252,255,0.12)_0%,rgba(5,17,36,0)_70%)]",
    ],
    taglineColor: "text-cyan-200/80",
    descriptionColor: "text-blue-100/85",
    summaryColor: "text-blue-100/85",
    bodyColor: "text-blue-100/70",
    highlightTextColor: "text-cyan-50/90",
    highlightBorderColor: "border-cyan-100/40",
    highlightBgColor: "bg-cyan-100/15",
    cardBorderColor: "border-cyan-200/25",
    cardHoverBorderColor: "hover:border-cyan-200/70",
    placeholderGradient:
      "bg-gradient-to-br from-cyan-400/40 via-cyan-300/10 to-blue-900/60",
    imageOverlay:
      "bg-gradient-to-br from-cyan-400/45 via-transparent to-blue-900/70 mix-blend-screen",
  },
  energie: {
    backgroundSrc: "/energy-loop.gif",
    backgroundAlt: "Animation solaire abstraite",
    gradientClass: "energy-gradient",
    accentBlobs: [
      "absolute left-[15%] top-24 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl",
      "absolute right-[18%] top-48 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]",
      "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,237,204,0.16),rgba(255,237,204,0)_55%)] mix-blend-overlay",
      "absolute inset-0 bg-[linear-gradient(130deg,rgba(255,183,92,0.12)_0%,rgba(23,10,4,0)_70%)]",
    ],
    taglineColor: "text-amber-200/80",
    descriptionColor: "text-amber-100/85",
    summaryColor: "text-amber-100/85",
    bodyColor: "text-amber-100/70",
    highlightTextColor: "text-amber-50/90",
    highlightBorderColor: "border-amber-200/50",
    highlightBgColor: "bg-amber-200/15",
    cardBorderColor: "border-amber-200/35",
    cardHoverBorderColor: "hover:border-amber-200/70",
    placeholderGradient:
      "bg-gradient-to-br from-amber-400/40 via-amber-300/10 to-orange-900/60",
    imageOverlay:
      "bg-gradient-to-br from-amber-400/45 via-transparent to-orange-900/70 mix-blend-screen",
  },
};

const DEFAULT_THEME: SectionTheme = {
  backgroundSrc: "/hero-backdrop.svg",
  backgroundAlt: "Motif abstrait",
  gradientClass: "",
  accentBlobs: [],
  taglineColor: "text-orange-200/80",
  descriptionColor: "text-orange-100/90",
  summaryColor: "text-orange-100/90",
  bodyColor: "text-orange-100/70",
  highlightTextColor: "text-orange-50/90",
  highlightBorderColor: "border-orange-200/50",
  highlightBgColor: "bg-orange-200/15",
  cardBorderColor: "border-orange-200/30",
  cardHoverBorderColor: "hover:border-orange-200/70",
  placeholderGradient:
    "bg-gradient-to-br from-orange-500/40 via-orange-400/10 to-orange-950/60",
  imageOverlay:
    "bg-gradient-to-br from-orange-500/45 via-transparent to-orange-900/70 mix-blend-screen",
};

export default function HomePageContent({ sections }: HomePageContentProps) {
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const hasSeenIntro = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";

    if (hasSeenIntro) {
      setShouldPlayIntro(false);
      setShowSections(true);
    } else {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    }
  }, []);

  useEffect(() => {
    if (!shouldPlayIntro) {
      const timeout = window.setTimeout(() => setShowSections(true), 150);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return undefined;
  }, [shouldPlayIntro]);

  const handleIntroEnded = () => {
    setShouldPlayIntro(false);
    setShowSections(true);
  };

  const handleSkipIntro = () => {
    setShouldPlayIntro(false);
    setShowSections(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0b0a09] text-white">
      <section id="hero" className="relative h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/40 to-transparent" aria-hidden="true" />
        {shouldPlayIntro && <VideoHero onEnded={handleIntroEnded} />}

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-700 ${
            shouldPlayIntro ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="pointer-events-auto mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-200/80">
              Vertico Engineering
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-orange-50 md:text-5xl">
              Ingénierie, énergie et eau pour des projets durables.
            </h1>
            <p className="mt-6 text-base text-orange-100/85 md:text-lg">
              Nous imaginons et livrons des solutions intégrées pour la construction, la gestion de l&rsquo;eau et
              l&rsquo;énergie, en un seul parcours fluide.
            </p>
            {sections.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {sections.map((section) => (
                  <a
                    key={section.slug}
                    href={`#${section.slug}`}
                    className="rounded-full border border-orange-200/50 bg-orange-200/10 px-5 py-2 text-sm font-medium text-orange-50 transition hover:border-orange-200/80 hover:bg-orange-200/20"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {shouldPlayIntro && (
          <div className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0">
            <button
              type="button"
              onClick={handleSkipIntro}
              className="rounded-full border border-white/40 bg-black/40 px-6 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-black/60"
            >
              Passer l&rsquo;intro
            </button>
          </div>
        )}
      </section>

      <div
        className={`space-y-24 bg-[#050608] transition-opacity duration-700 ${
          showSections ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {sections.map((section) => (
          <SectionShowcase key={section.slug} section={section} />
        ))}

        <footer className="relative bg-[#040507] text-orange-50">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="mt-2 text-sm text-orange-100/80">Restons en contact pour vos projets.</p>
            </div>
            <div className="grid gap-4 text-sm text-orange-100/90 md:grid-cols-2">
              <div>
                <p className="font-medium text-orange-50">Email</p>
                <a href="mailto:info@label-ci.com" className="mt-1 block text-orange-100/80 hover:text-orange-50">
                  info@label-ci.com
                </a>
              </div>
              <div>
                <p className="font-medium text-orange-50">Téléphone</p>
                <a href="tel:+2250788899965" className="mt-1 block text-orange-100/80 hover:text-orange-50">
                  +225 07 888 999 65
                </a>
              </div>
              <div>
                <p className="font-medium text-orange-50">Fixe</p>
                <a href="tel:+2252721585677" className="mt-1 block text-orange-100/80 hover:text-orange-50">
                  +225 27 21 58 56 77
                </a>
              </div>
              <div>
                <p className="font-medium text-orange-50">Adresse</p>
                <p className="mt-1 text-orange-100/80">Abidjan, Côte d&apos;Ivoire</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function SectionShowcase({ section }: { section: HomePageSection }) {
  const theme = SECTION_THEMES[section.slug] ?? DEFAULT_THEME;

  return (
    <section
      id={section.slug}
      className="relative min-h-screen overflow-hidden pb-24 pt-32 text-orange-50"
      aria-labelledby={`${section.slug}-title`}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src={theme.backgroundSrc}
          alt={theme.backgroundAlt}
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        {theme.gradientClass ? (
          <div className={`${theme.gradientClass} absolute inset-0 opacity-95`} aria-hidden="true" />
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {theme.accentBlobs.map((blobClass, index) => (
          <div key={`${section.slug}-blob-${index}`} className={blobClass} />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4">
          {section.subtitle ? (
            <p className={`text-xs uppercase tracking-[0.3em] ${theme.taglineColor}`}>
              {section.subtitle}
            </p>
          ) : null}
          <h2 id={`${section.slug}-title`} className="text-4xl font-semibold text-white md:text-5xl">
            {section.title}
          </h2>
          {section.description ? (
            <p className={`max-w-3xl text-base md:text-lg ${theme.descriptionColor}`}>
              {section.description}
            </p>
          ) : null}
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {section.services.map((service) => {
            const highlights = service.highlights;
            const hasImage = Boolean(service.imageUrl);

            return (
              <article
                key={service.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border bg-white/5 p-0 backdrop-blur-lg transition duration-500 hover:-translate-y-1 hover:bg-white/10 ${theme.cardBorderColor} ${theme.cardHoverBorderColor}`}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={service.imageUrl as string}
                      alt={`${service.title} - illustration du service`}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 90vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className={`h-full w-full ${theme.placeholderGradient}`} />
                  )}
                  <div className={`absolute inset-0 ${theme.imageOverlay} transition duration-500 group-hover:opacity-95`} />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className={`text-sm leading-relaxed ${theme.summaryColor}`}>
                      {service.summary}
                    </p>
                    {service.body ? (
                      <p className={`text-sm leading-relaxed ${theme.bodyColor}`}>
                        {service.body}
                      </p>
                    ) : null}
                  </div>
                  {highlights.length > 0 ? (
                    <ul className={`mt-auto flex flex-wrap gap-2 text-xs font-medium ${theme.highlightTextColor}`}>
                      {highlights.map((item) => (
                        <li
                          key={`${service.id}-${item}`}
                          className={`rounded-full border px-3 py-1 backdrop-blur ${theme.highlightBorderColor} ${theme.highlightBgColor}`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
