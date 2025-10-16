import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionBySlug } from "@/lib/sections";

const SLUG = "energie";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    return {
      title: "Energie",
      description: "Solutions solaires et electriques pour vos sites.",
    };
  }

  return {
    title: section.title,
    description: section.description ?? section.subtitle ?? undefined,
  };
}

export default async function EnergyPage() {
  const section = await getSectionBySlug(SLUG);

  if (!section) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-32 text-amber-50">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/energy-loop.gif"
          alt="Animation solaire abstraite"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="energy-gradient absolute inset-0 opacity-95" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-[15%] top-24 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute right-[18%] top-48 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,237,204,0.16),rgba(255,237,204,0)_55%)] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,183,92,0.12)_0%,rgba(23,10,4,0)_70%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
            {section.subtitle}
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">{section.title}</h1>
          {section.description && (
            <p className="max-w-3xl text-base text-amber-100/85 md:text-lg">
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-amber-200/35 bg-white/5 p-0 backdrop-blur-lg transition duration-500 hover:-translate-y-1 hover:border-amber-200/70 hover:bg-white/10"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={service.imageUrl!}
                      alt={`${service.title} - illustration du service`}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 90vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-amber-400/40 via-amber-300/10 to-orange-900/60" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/45 via-transparent to-orange-900/70 mix-blend-screen transition duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-white">
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-amber-100/85">
                      {service.summary}
                    </p>
                    {service.body && (
                      <p className="text-sm leading-relaxed text-amber-100/70">
                        {service.body}
                      </p>
                    )}
                  </div>
                  {highlights.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 text-xs font-medium text-amber-50/90">
                      {highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-amber-200/50 bg-amber-200/15 px-3 py-1 backdrop-blur"
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