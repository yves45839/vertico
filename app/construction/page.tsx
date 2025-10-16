import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionBySlug } from "@/lib/sections";

const SLUG = "construction";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    return {
      title: "Construction & Amenagement",
      description: "Solutions de construction et d'amenagement sur mesure.",
    };
  }

  return {
    title: section.title,
    description: section.description ?? section.subtitle ?? undefined,
  };
}

export default async function ConstructionPage() {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-32 text-orange-50">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/construction-loop.gif"
          alt="Animation abstraite de chantiers lumineux"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="construction-gradient absolute inset-0 opacity-95" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-[12%] top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="absolute right-[18%] top-40 h-80 w-80 rounded-full bg-rose-500/20 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),rgba(255,255,255,0)_55%)] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_65%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">
            {section.subtitle}
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{section.title}</h1>
          {section.description && (
            <p className="max-w-3xl text-base text-orange-100/90 md:text-lg">
              {section.description}
            </p>
          )}
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {section.services.map((service) => {
            const highlights = Array.isArray(service.highlights)
              ? (service.highlights as string[])
              : [];
            const hasImage = Boolean(service.imageUrl);

            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-orange-200/30 bg-white/5 p-0 backdrop-blur-lg transition duration-500 hover:-translate-y-1 hover:border-orange-200/70 hover:bg-white/10"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={service.imageUrl!}
                      alt={`${service.title} - illustration du service`}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 90vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      priority={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-orange-500/40 via-orange-400/10 to-orange-950/60" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/45 via-transparent to-orange-900/70 mix-blend-screen transition duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-white">
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-orange-100/90">
                      {service.summary}
                    </p>
                    {service.body && (
                      <p className="text-sm leading-relaxed text-orange-100/70">
                        {service.body}
                      </p>
                    )}
                  </div>
                  {highlights.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 text-xs font-medium text-orange-50/90">
                      {highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-orange-200/50 bg-orange-200/15 px-3 py-1 backdrop-blur"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}